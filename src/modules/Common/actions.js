export const actionTypes = {
    SET_COMMON_ERROR: 'SET_COMMON_ERROR',
    CLEAR_COMMON_ERROR: 'CLEAR_SET_COMMON_ERROR',
}

export const setCommonError = error => ({
    type: actionTypes.SET_COMMON_ERROR,
    payload: error,
})

export const clearCommonError = () => ({
    type: actionTypes.CLEAR_COMMON_ERROR,
})
