export const actionTypes = {
    UPDATE_PROMOTION_FILTERS: 'UPDATE_PROMOTION_FILTERS',
    CLEAR_ALL_FILTERS: 'CLEAR_ALL_FILTERS',
}

export const updatePromotionFilters = payload => ({
    type: actionTypes.UPDATE_PROMOTION_FILTERS,
    payload: payload,
})

export const clearAllFilters = page => ({
    type: actionTypes.CLEAR_ALL_FILTERS,
    payload: page,
})
