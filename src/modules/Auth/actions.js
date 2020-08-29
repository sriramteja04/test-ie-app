export const actionTypes = {
    CLEAR_AUTH_SESSION: 'CLEAR_AUTH_SESSION',
    HANDLE_USER_LOGOUT: 'HANDLE_USER_LOGOUT',
    REDIRECT_AUTH_INFO: 'REDIRECT_AUTH_INFO',
    SAGA_SIGN_IN: 'SAGA_SIGN_IN',
    SET_AUTH_SESSION: 'SET_AUTH_SESSION',
    SET_USER_INFO: 'SET_USER_INFO',
    SET_EXPIRATION: 'SET_EXPIRATION',
    DISABLE_IS_LOGOUT: 'DISABLE_IS_LOGOUT',
    ENABLE_IS_LOGOUT: 'ENABLE_IS_LOGOUT',
    SET_LOGOUT_HIT_COUNTER: 'SET_LOGOUT_HIT_COUNTER',
    CLEAR_REFRESH_COUNT: 'CLEAR_REFRESH_COUNT',
    SET_REFRESH_COUNT: 'SET_REFRESH_COUNT',
    CLEAR_COUNTS: 'CLEAR_COUNTS',
}

export const sagaSignIn = () => ({
    type: actionTypes.SAGA_SIGN_IN,
})

export const clearAuthSession = () => ({
    type: actionTypes.CLEAR_AUTH_SESSION,
})

export const sagaRedirectAuthInfo = () => ({
    type: actionTypes.REDIRECT_AUTH_INFO,
})

export const setUserInfo = payload => ({
    type: actionTypes.SET_USER_INFO,
    payload: payload,
})

export const disableLogout = () => ({
    type: actionTypes.DISABLE_IS_LOGOUT,
})

export const setLogout = () => ({
    type: actionTypes.ENABLE_IS_LOGOUT,
})

export const dispatchExp = payload => ({
    type: actionTypes.SET_EXPIRATION,
    payload: payload,
})

export const clearAuth = () => ({
    type: actionTypes.CLEAR_AUTH_SESSION,
})

export const setRefreshCount = payload => ({
    type: actionTypes.SET_REFRESH_COUNT,
    payload,
})

export const setAuthSession = payload => ({
    type: actionTypes.SET_AUTH_SESSION,
    payload: payload,
})

export const logout = () => ({
    type: actionTypes.HANDLE_USER_LOGOUT,
})

export const setLogoutCounter = payload => ({
    type: actionTypes.SET_LOGOUT_HIT_COUNTER,
    payload,
})

export const clearRefreshCount = () => ({
    type: actionTypes.CLEAR_REFRESH_COUNT,
})

export const clearCounts = () => ({
    type: actionTypes.CLEAR_COUNTS,
})
