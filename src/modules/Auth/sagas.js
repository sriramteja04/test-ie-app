import { race, takeEvery, all, call, put, select, delay, spawn, take } from 'redux-saga/effects'
import jwtDecode from 'jwt-decode'

import * as actions from './actions'
import { authClient } from './helper'
import { util } from '../../util'
import history from '../../util/history'
import { constants } from '../../constants'

/**
 * This Generator starts the OAuth Authentication process
 */
function* signIn() {
    try {
        yield authClient.authorize()
    } catch (e) {
        console.log('e')
    }
}

/**
 * parseRedirectAuthInfo generator was invoked from redux store setup file (src/config/redux)
 * generators runs on every page loads ( User Force reloads or OAuth redirect load )
 */
function* parseRedirectAuthInfo() {
    const codeMatch = window.location.href.match('[?#&]code=([^&]*)')
    /**
     * If App is redirected from oAuth server then OAuth will append the code value in the URL eg: http://localhost:3000?code='****'
     *  OAuth -> App -> redux store (invokes the parseRedirectAuthInfo respective action dispatcher) -> parseRedirectAuthInfo*
     *                            ------------- OR -------------------
     * App -> redux store (invokes the parseRedirectAuthInfo respective action dispatcher) -> parseRedirectAuthInfo*
     */
    if (codeMatch && codeMatch[1]) {
        /**
         *  this condition executes only if user is redirected form OAuth with code.
         *  using the code value Make an POST request call for OAuth token endpoint..
         */
        try {
            const {
                data: { access_token, id_token, refresh_token, expires_in },
            } = yield call(authClient.getTokens(codeMatch[1]))

            const { exp } = jwtDecode(access_token)

            process.env.REACT_APP_ENV !== 'production' &&
                console.log('Session Expires at', new Date(exp * 1000))

            /**
             *  Update Redux Auth with tokens and expires at values.
             */
            yield put(
                actions.setAuthSession({
                    accessToken: access_token,
                    idToken: id_token,
                    refreshToken: refresh_token,
                    expiresIn: expires_in,
                    refreshCount: 0,
                    is_logout: false,
                    expires_at: exp,
                })
            )
            /**
             * After Fetching tokens, yield for user info and start the session
             */
            yield* getCognitoUser(access_token)
            yield spawn(getUserSession)
            history.push('/')
        } catch (error) {
            yield signOut()
        }
    }

    if (!codeMatch) {
        /**
         * This condition executes on every user force page loads
         * If the user isn't authenticated then logout the user otherwise check for valid expiration time
         * If the current time passes the expiration time then logout the user otherwise continue the session.
         */
        const currentAuthInfo = yield select(util.getCurrentAuthInfo)
        if (currentAuthInfo.isAuth) {
            if (util.sessionExpiresInMS(currentAuthInfo.expires_at) > 0) {
                yield spawn(getUserSession)
            } else {
                yield signOut()
            }
        }
    }
}

function* getUserSession() {
    const currentAuthInfo = yield select(util.getCurrentAuthInfo)
    const currentTime = new Date().getTime()
    const timeDifference = currentAuthInfo.expires_at * 1000 - currentTime
    /**
     * If timeOut wins the race meaning session is completed, and we have to refresh the session
     * by providing the refresh token to token endpoint with refresh_token grant type.
     */
    const winner = yield race({
        timeOut: delay(timeDifference),
        logout: take(actions.actionTypes.HANDLE_USER_LOGOUT),
    })

    if (winner.timeOut) {
        // console.log('refreshToken', refreshToken)
        try {
            const {
                data: { access_token, id_token, expires_in },
            } = yield call(authClient.getRefreshToken(currentAuthInfo.refreshToken))

            const { exp } = jwtDecode(access_token)
            yield put(
                actions.setAuthSession({
                    accessToken: access_token,
                    idToken: id_token,
                    expiresIn: expires_in,
                    refreshCount: 1,
                    expires_at: exp,
                })
            )
            yield* getCognitoUser(access_token)
            yield spawn(getUserSession)
        } catch (err) {
            console.log(err)
            yield signOut()
        }
    }
}

function* getCognitoUser(token) {
    /**
     * currently, we are having 4 roles for Admin Portal application
     * admin: 'USER-7NOW Admin Portal Administrators', (PROD)
       user: 'USER-7NOW Admin Portal Users', (PROD)
       admin_test: 'USER-7NOW Admin Portal Administrator - TEST', (local, dev and QA)
       user_test: 'USER-7NOW Admin Portal Users - TEST', (local, dev and QA)
     */
    const { user, user_test, admin, admin_test } = constants.roles
    const ROLES =
        process.env.REACT_APP_ENV === 'production' ? [user, admin] : [user_test, admin_test]

    try {
        const user = yield authClient.getUser(token)
        const { profile } = user.data
        let isAuth = false
        const profiles = profile.substring(1, profile.length - 1).split(',')
        const sevenNowRoles = profiles.filter(role => role.includes('USER-7NOW'))
        const currentRole = ROLES.find(role => {
            sevenNowRoles.forEach(rl => {
                isAuth = rl.trim() === role.trim() && true
            })
            return isAuth
        })
        if (!isAuth) {
            yield signOut()
        } else {
            yield put(
                actions.setUserInfo({
                    user: user.data,
                    isAuth: isAuth,
                    user_role: currentRole,
                })
            )
        }
    } catch (e) {
        console.log(e)
        yield signOut()
    }
}

function* signOut() {
    try {
        yield put(actions.clearAuth())
        yield authClient.logout()
    } catch (e) {
        console.log(e)
    }
}

export default function* watchAuth() {
    yield all([takeEvery(actions.actionTypes.SAGA_SIGN_IN, signIn)])
    yield all([takeEvery(actions.actionTypes.REDIRECT_AUTH_INFO, parseRedirectAuthInfo)])
    yield all([takeEvery(actions.actionTypes.HANDLE_USER_LOGOUT, signOut)])
}
