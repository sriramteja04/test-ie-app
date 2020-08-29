import { actionTypes } from './actions'
import { util } from '../../util'

const initialState = {
    isAuth: false,
    expires_at: 0,
    user: null,
    idToken: '',
    accessToken: '',
    refreshCount: 0,
    is_logout: false,
    user_role: '',
    logout_hit_counter: 0,
}

export default (state = initialState, action) => {
    const { type, payload } = action
    const { shallowHelper } = util
    switch (type) {
        case actionTypes.CLEAR_AUTH_SESSION: {
            return util.shallowHelper(state, {
                idToken: '',
                accessToken: '',
                isAuth: false,
                refreshToken: '',
                expires_at: 0,
                user: null,
                user_role: '',
                is_logout: true,
            })
        }

        case actionTypes.SET_AUTH_SESSION:
            return shallowHelper(state, {
                ...payload,
                is_logout: false,
            })

        case actionTypes.SET_USER_INFO:
            return shallowHelper(state, {
                ...payload,
            })

        case actionTypes.SET_EXPIRATION:
            return shallowHelper(state, {
                exp: payload,
            })

        case actionTypes.SET_REFRESH_COUNT:
            return shallowHelper(state, {
                refreshCount: payload,
            })

        case actionTypes.CLEAR_COUNTS: {
            return shallowHelper(state, {
                refreshCount: 0,
                logout_hit_counter: 0,
            })
        }

        default:
            return state
    }
}
