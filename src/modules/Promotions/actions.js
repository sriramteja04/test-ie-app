export const actionTypes = {
    CLEAR_DISPLAY_CONFIRMATION: 'CLEAR_DISPLAY_CONFIRMATION',
    CLEAR_PROMO_ALERT: 'CLEAR_PROMO_ALERT',
    CLEAR_PROMO_ERROR: 'CLEAR_PROMO_ERROR',
    CLEAR_UPDATE_PROMO_ERROR: 'CLEAR_UPDATE_PROMO_ERROR',
    CREATE_PROMO_FAIL: 'CREATE_PROMO_FAIL',
    CREATE_PROMO_SUCCESS: 'CREATE_PROMO_SUCCESS',
    DISPLAY_DELETE_PROMO_CONFIRMATION: 'DISPLAY_DELETE_PROMO_CONFIRMATION',
    DISPLAY_PROMO_ALERT: 'DISPLAY_PROMO_ALERT',
    FETCH_ALL_PROMOS_SUCCESS: 'FETCH_ALL_PROMOS_SUCCESS',
    FETCH_PRIORITIZE_PROMOS_SUCCESS: 'FETCH_PRIORITIZE_PROMOS_SUCCESS',
    FETCH_PROMO: 'FETCH_PROMO',
    FETCH_PROMO_DETAILS: 'FETCH_PROMO_DETAILS',
    FETCH_PROMO_SUCCESS: 'FETCH_PROMO_SUCCESS',
    MODAL_CLOSE: 'MODAL_CLOSE',
    MODAL_OPEN: 'MODAL_OPEN',
    PROMO_ERROR: 'PROMO_ERROR',
    PROMO_LOADING_END: 'PROMO_LOADING_END',
    PROMO_LOADING_START: 'PROMO_LOADING_START',
    SAGA_BULK_DELETE: 'SAGA_BULK_DELETE',
    SAGA_CREATE_PROMO: 'SAGA_CREATE_PROMO',
    SAGA_DELETE_PROMO: 'SAGA_DELETE_PROMO',
    SAGA_FETCH_CATEGORIES_LIST: 'SAGA_FETCH_CATEGORIES_LIST',
    SAGA_FETCH_PRIORITIZE_PROMOS: 'SAGA_FETCH_PRIORITIZE_PROMOS',
    SAGA_FETCH_PROMO: 'SAGA_FETCH_PROMO',
    SAGA_FETCH_PROMO_SUCCESS: 'SAGA_FETCH_PROMO_SUCCESS',
    SAGA_FETCH_PROMOS: 'SAGA_FETCH_PROMOS',
    SAGA_PUBLISH_CONTENT: 'SAGA_PUBLISH_CONTENT',
    SAGA_UPDATE_INLINE_EDIT: 'SAGA_UPDATE_INLINE_EDIT',
    SAGA_UPDATE_PROMO_MARKETING: 'UPDATE_PROMO_MARKETING',
    SAGA_UPDATE_PROMO_NAME: 'SAGA_UPDATE_PROMO_NAME',
    UPDATE_CATEGORIES_LIST_SUCCESS: 'UPDATE_CATEGORIES_LIST_SUCCESS',
    UPDATE_HEAD_CELLS: 'UPDATE_HEAD_CELLS',
    UPDATE_INLINE_EDIT_SUCCESS: 'UPDATE_INLINE_EDIT_SUCCESS',
    UPDATE_PRIORITY_SUCCESS: 'UPDATE_PRIORITY_SUCCESS',
    UPDATE_PROMO_MARKETING_FAIL: 'UPDATE_PROMO_MARKETING_FAIL',
    UPDATE_PROMO_MARKETING_SUCCESS: 'UPDATE_PROMO_MARKETING_SUCCESS',
    UPDATE_PRIORITIZATION_FAILED: 'UPDATE_PRIORITIZATION_FAILED',
    UPDATE_PRIORITIZATION_SUCCESS: 'UPDATE_PRIORITIZATION_SUCCESS',
    CLEAR_PRIORITIZATION_SUCCESS: 'CLEAR_PRIORITIZATION_SUCCESS',
    CLEAR_PRIORITIZATION_FAILED: 'CLEAR_PRIORITIZATION_FAILED',
    SAGA_UPDATE_PRIORITIZED_PROMOS: 'SAGA_UPDATE_PRIORITIZED_PROMOS',
}

export const bulkDeletePromos = data => ({
    type: actionTypes.SAGA_BULK_DELETE,
    payload: data,
})

export const clearPromoAlert = delayBy => ({
    type: actionTypes.CLEAR_PROMO_ALERT,
    payload: delayBy,
})

export const clearPromoError = () => ({
    type: actionTypes.CLEAR_PROMO_ERROR,
})

export const clearUpdatePromoError = () => ({
    type: actionTypes.CLEAR_UPDATE_PROMO_ERROR,
})

export const createPromo = promo => ({
    type: actionTypes.SAGA_CREATE_PROMO,
    payload: promo,
})

export const createPromoFail = err => ({
    type: actionTypes.CREATE_PROMO_FAIL,
    payload: err,
})

export const createPromoSuccess = payload => ({
    type: actionTypes.CREATE_PROMO_SUCCESS,
    payload: payload,
})

export const deletePromo = data => ({
    type: actionTypes.SAGA_DELETE_PROMO,
    payload: data,
})

export const enablePromoAlert = payload => ({
    type: actionTypes.DISPLAY_PROMO_ALERT,
    payload,
})

export const fetchCategoriesList = () => ({
    type: actionTypes.SAGA_FETCH_CATEGORIES_LIST,
})

export const fetchCategoriesListSuccess = payload => ({
    type: actionTypes.UPDATE_CATEGORIES_LIST_SUCCESS,
    payload,
})

export const fetchPromo = id => ({
    type: actionTypes.FETCH_PROMO_DETAILS,
    payload: id,
})

export const fetchPromoById = data => ({
    type: actionTypes.SAGA_FETCH_PROMO,
    payload: data,
})

export const fetchPromoListSuccess = payload => ({
    type: actionTypes.FETCH_ALL_PROMOS_SUCCESS,
    payload: payload,
})

export const fetchPromos = data => ({
    type: actionTypes.SAGA_FETCH_PROMOS,
    payload: data,
})

export const fetchPrioritizePromos = data => ({
    type: actionTypes.SAGA_FETCH_PRIORITIZE_PROMOS,
    payload: data,
})

export const fetchPrioritizePromosSuccess = payload => ({
    type: actionTypes.FETCH_PRIORITIZE_PROMOS_SUCCESS,
    payload,
})

export const fetchPromoSuccess = payload => ({
    type: actionTypes.FETCH_PROMO_SUCCESS,
    payload: payload,
})

export const modalClose = () => ({
    type: actionTypes.MODAL_CLOSE,
})

export const modalOpen = () => ({
    type: actionTypes.MODAL_OPEN,
})

export const promoLoadingEnd = () => ({
    type: actionTypes.PROMO_LOADING_END,
})

export const promoLoadingStart = () => ({
    type: actionTypes.PROMO_LOADING_START,
})

export const publishContent = payload => ({
    type: actionTypes.SAGA_PUBLISH_CONTENT,
    payload,
})

export const setHeadCells = (headCellList, addColumnList) => ({
    type: actionTypes.UPDATE_HEAD_CELLS,
    payload: { headCellList, addColumnList },
})

export const setPromoError = payload => ({
    type: actionTypes.PROMO_ERROR,
    payload,
})

export const updateInlineEdit = data => ({
    type: actionTypes.SAGA_UPDATE_INLINE_EDIT,
    payload: data,
})

export const updateInlineEditSuccess = data => ({
    type: actionTypes.UPDATE_INLINE_EDIT_SUCCESS,
    payload: data,
})

export const updateMarketing = data => ({
    type: actionTypes.SAGA_UPDATE_PROMO_MARKETING,
    payload: data,
})

export const updateMarketingFail = err => ({
    type: actionTypes.UPDATE_PROMO_MARKETING_FAIL,
    payload: err,
})

export const updateMarketingSuccess = data => ({
    type: actionTypes.UPDATE_PROMO_MARKETING_SUCCESS,
    payload: data,
})

export const updatePrioritySuccess = payload => ({
    type: actionTypes.UPDATE_PRIORITY_SUCCESS,
    payload,
})

export const updatePromoName = data => ({
    type: actionTypes.SAGA_UPDATE_PROMO_NAME,
    payload: data,
})

export const updatePrioritizedPromos = promos => ({
    type: actionTypes.SAGA_UPDATE_PRIORITIZED_PROMOS,
    payload: promos,
})

export const updatePrioritizationSuccess = promos => ({
    type: actionTypes.UPDATE_PRIORITIZATION_SUCCESS,
    payload: promos,
})

export const updatePrioritizationFailed = () => ({
    type: actionTypes.UPDATE_PRIORITIZATION_FAILED,
})

export const clearPrioritizationSuccess = () => ({
    type: actionTypes.CLEAR_PRIORITIZATION_SUCCESS,
})

export const clearPrioritizationFailed = () => ({
    type: actionTypes.CLEAR_PRIORITIZATION_FAILED,
})
