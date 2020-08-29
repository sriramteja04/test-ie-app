import immutable from 'immutable'
import { actionTypes } from './actions'
import { util } from '../../util'

const initialPromoFilter = [
    {
        type: 'string',
        key: 'name',
        display_name: 'Search',
        display_value: '',
        post_value: '',
    },
    {
        type: 'list',
        key: 'placement_location',
        display_name: 'Placement',
        display_value: [],
        post_value: [],
    },
    {
        type: 'range',
        key: 'date_range',
        display_name: 'Date Range',
        start_value: '',
        end_value: '',
        display_value: '',
    },
    {
        type: 'list',
        key: 'region',
        display_name: 'Region',
        display_value: [],
        post_value: [],
    },
    {
        type: 'list',
        key: 'created_by',
        display_name: 'Created By',
        display_value: [],
        post_value: [],
    },
    {
        type: 'list',
        key: 'updated_by',
        display_name: 'Last Modified By',
        display_value: [],
        post_value: [],
    },
    {
        type: 'list',
        key: 'status',
        display_name: 'Status',
        display_value: [],
        post_value: [],
    },
    {
        type: 'list',
        key: 'is_live',
        display_name: 'Production Status',
        display_value: [],
        post_value: [],
    },
    {
        type: 'list',
        key: 'qa_is_live',
        display_name: 'QA Status',
        display_value: [],
        post_value: [],
    },
]

const initialState = immutable.Map({
    promotion_filters: util.cloneArrOfObj(initialPromoFilter),
})

export default (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case actionTypes.UPDATE_PROMOTION_FILTERS: {
            return state.merge({
                promotion_filters: payload,
            })
        }

        case actionTypes.CLEAR_ALL_FILTERS: {
            return state.merge({
                promotion_filters: util.cloneArrOfObj(initialPromoFilter),
            })
        }

        default:
            return state
    }
}
