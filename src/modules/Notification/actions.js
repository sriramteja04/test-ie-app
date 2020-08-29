export const actionTypes = {
    ADD_NOTIFICATION: 'ADD_NOTIFICATION',
    GET_NOTIFICATION: 'GET_NOTIFICATION',
    GET_NOTIFICATION_SUCCESS: 'GET_NOTIFICATION_SUCCESS',
    NOTIFICATION_LOADING_START: 'NOTIFICATION_LOADING_START',
    NOTIFICATION_LOADING_END: 'NOTIFICATION_LOADING_END',
    NOTIFICATION_APPLIED_FILTERS: 'NOTIFICATION_APPLIED_FILTERS',
    NOTIFICATION_CLEAR_FILTERS: 'NOTIFICATION_CLEAR_FILTERS',
    NOTIFICATION_SET_FILTER_PILLS: 'NOTIFICATION_SET_FILTER_PILLS',
    NOTIFICATION_CLEAR_REDUCER: 'NOTIFICATION_CLEAR_REDUCER',
    DELETE_NOTIFICATION: 'DELETE_NOTIFICATION',
    DISPLAY_DELETE_CONFIRMATION: 'DISPLAY_DELETE_CONFIRMATION',
    DELETE_RECORDS: 'DELETE_RECORDS',
    CLEAR_DISPLAY_CONFIRMATION: 'CLEAR_DISPLAY_CONFIRMATION',
    CLEAR_ALERT: 'CLEAR_ALERT',
    UPDATE_TABLE_CELLS: 'UPDATE_TABLE_CELLS',
}

export const sagaAddNotification = notification => {
    console.log(notification)
    return {
        type: actionTypes.ADD_NOTIFICATION,
        payload: notification,
    }
}

export const sagaGetNotifications = () => ({
    type: actionTypes.GET_NOTIFICATION,
})

export const notificationLoadingStart = () => ({
    type: actionTypes.NOTIFICATION_LOADING_START,
})

export const notificationLoadingEnd = () => ({
    type: actionTypes.NOTIFICATION_LOADING_END,
})

export const dispathNotificationFilters = filterObj => ({
    type: actionTypes.NOTIFICATION_APPLIED_FILTERS,
    payload: filterObj,
})

export const NotificationClearReducer = () => ({
    type: actionTypes.NOTIFICATION_CLEAR_REDUCER,
})

export const dispatchDeleteRecords = list => ({
    type: actionTypes.DELETE_RECORDS,
    payload: list,
})

export const sagaClearDisplayConfirm = () => ({
    type: actionTypes.CLEAR_ALERT,
    delay: 2000,
})

export const dispatchTableCells = (headCellList, addColumnList) => ({
    type: actionTypes.UPDATE_TABLE_CELLS,
    payload: { headCellList, addColumnList },
})
