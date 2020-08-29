import axios from 'axios'

import { store } from '../../config/redux'
import { setCommonError } from '../Common/actions'
import { logout } from '../Auth/actions'
import { constants } from '../../constants'
import { util } from '../../util'

const METHODS_WITH_BODY = ['POST', 'PATCH', 'DELETE']

const fetchData = (url, requestInfo) =>
    axios({
        method: requestInfo.method,
        url: url,
        headers: requestInfo.headers,
        data: requestInfo.body,
    })

/**
 *
 * @param url {String} Endpoint URL
 * @param method {String} RESTFul api method
 * @param request {Object} data of the request body
 * @returns {Promise<AxiosResponse<any>>}
 */
export const api = (url, method, request) => {
    const {
        auth: { idToken, expires_at },
    } = store.getState()

    const defaultHeaders = {
        'x-api-key': process.env.REACT_APP_API_KEY,
        'Content-Type': 'application/json',
    }

    if (idToken) {
        defaultHeaders.Authorization = `Bearer ${idToken}`
    }
    const timeDiff = util.sessionExpiresInMS(expires_at)

    if (timeDiff < 0) {
        store.dispatch(logout())
    }

    const requestInfo = {
        method,
        headers: defaultHeaders,
    }

    if (METHODS_WITH_BODY.includes(method) && request) {
        requestInfo.body = JSON.stringify(request)
    }

    return fetchData(url, requestInfo)
        .then(response => response)
        .catch(err => {
            console.log(err)
            const errorKey = err.message.replace(' ', '_')
            const isCommonError = constants.networkErrors[errorKey]
            /**
             * Common Error are like Network Errors, Internal Server Error etc
             * Which are common irrespective to page which is the reason why we
             * created a separate set of actions and reducer
             */
            if (isCommonError.length) {
                store.dispatch(setCommonError(isCommonError))
            } else {
                console.log(err)
                throw err.response
            }
        })
}
