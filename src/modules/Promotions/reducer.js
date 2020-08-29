import { actionTypes } from './actions'
import { util } from '../../util'

const initialState = {
    categories_list: null,
    count: 0,
    create_promo_error: '',
    display_promo_alert: '',
    id_editing_completed_promo: false,
    modalClose: false,
    order: 'asc',
    orderBy: 'start_date',
    pageNo: 1,
    promo_details: null,
    promo_loading: false,
    promotions_list: [],
    showConfirmationModal: false,
    promo_error: '',
    size: 10,
    update_promo_error: '',
    update_prioritization_success: false,
    update_prioritization_failed: false,
    prioritize_promos: [],
}

export default (state = initialState, action) => {
    const { type, payload } = action
    const { shallowHelper } = util

    switch (type) {
        case actionTypes.CLEAR_DISPLAY_CONFIRMATION: {
            return shallowHelper(state, {
                display_promo_alert: '',
            })
        }

        case actionTypes.CLEAR_PROMO_ERROR: {
            return shallowHelper(state, {
                create_promo_error: '',
            })
        }

        case actionTypes.CREATE_PROMO_FAIL: {
            return shallowHelper(state, {
                create_promo_error: action.payload,
                promo_loading: false,
                isEdit: false,
            })
        }

        case actionTypes.CREATE_PROMO_SUCCESS: {
            return shallowHelper(state, {
                promo_details: payload,
                promo_loading: false,
                create_promo_error: '',
            })
        }

        case actionTypes.DISPLAY_PROMO_ALERT: {
            return shallowHelper(state, {
                display_promo_alert: payload,
            })
        }

        case actionTypes.FETCH_ALL_PROMOS_SUCCESS: {
            return shallowHelper(state, {
                ...payload,
                promo_error: '',
                promo_loading: false,
            })
        }

        case actionTypes.FETCH_PRIORITIZE_PROMOS_SUCCESS: {
            return shallowHelper(state, {
                ...payload,
                promo_loading: false,
            })
        }

        case actionTypes.MODAL_CLOSE: {
            return shallowHelper(state, { modalClose: true })
        }

        case actionTypes.MODAL_OPEN: {
            return shallowHelper(state, { modalClose: false })
        }

        case actionTypes.PROMO_LOADING_END: {
            return shallowHelper(state, { promo_loading: false })
        }

        case actionTypes.PROMO_LOADING_START: {
            return shallowHelper(state, { promo_loading: true })
        }

        case actionTypes.PROMO_ERROR: {
            return shallowHelper(state, { promo_error: payload })
        }

        case actionTypes.UPDATE_HEAD_CELLS: {
            return shallowHelper(state, {
                promotions_head_cells: payload.headCellList,
                remaining_promo_head_cells: payload.addColumnList,
            })
        }

        case actionTypes.UPDATE_PROMO_MARKETING_SUCCESS: {
            return shallowHelper(state, {
                ...payload,
                promo_error: '',
                promo_loading: false,
            })
        }

        case actionTypes.FETCH_PROMO_SUCCESS: {
            return shallowHelper(state, {
                ...payload,
                promo_error: '',
                promo_loading: false,
            })
        }

        case actionTypes.UPDATE_PROMO_MARKETING_FAIL: {
            return shallowHelper(state, {
                update_promo_error: payload,
            })
        }

        case actionTypes.CLEAR_UPDATE_PROMO_ERROR: {
            return shallowHelper(state, {
                update_promo_error: '',
            })
        }

        case actionTypes.UPDATE_INLINE_EDIT_SUCCESS: {
            return shallowHelper(state, {
                promotions_list: payload,
                promo_loading: false,
            })
        }

        case actionTypes.UPDATE_PRIORITY_SUCCESS: {
            return shallowHelper(state, {
                ...payload,
                promo_loading: false,
            })
        }

        case actionTypes.UPDATE_CATEGORIES_LIST_SUCCESS: {
            return shallowHelper(state, {
                categories_list: payload,
            })
        }

        case actionTypes.UPDATE_PRIORITIZATION_SUCCESS: {
            return shallowHelper(state, {
                prioritize_promos: payload,
                update_prioritization_success: true,
                promo_loading: false,
            })
        }

        case actionTypes.CLEAR_PRIORITIZATION_SUCCESS: {
            return shallowHelper(state, {
                update_prioritization_success: false,
            })
        }

        case actionTypes.CLEAR_PRIORITIZATION_FAILED: {
            return shallowHelper(state, {
                update_prioritization_failed: false,
            })
        }

        case actionTypes.UPDATE_PRIORITIZATION_FAILED: {
            return shallowHelper(state, {
                update_prioritization_failed: true,
                promo_loading: false,
            })
        }

        default:
            return state
    }
}
