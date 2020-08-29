// import { Map } from 'immutable'
// import { actionTypes } from './actions'
// import { constants } from '../../constants'
//
// const initialState = Map({
//     notifications_list: [],
//     notification_loading: false,
//     notification_filters: {
//         pushNotificationId: [],
//         date_range: [],
//         createdBy: [],
//         lastModifiedBy: [],
//         status: [],
//         audienceSize: [0, 0],
//     },
//     display_delete_confirmation: false,
//     notifications_head_cells: constants.notificationsHeadCells,
//     remaining_notifications_head_cells: constants.addRemainingHeadCells,
// })
//
// export default (state = initialState, action) => {
//     const { type, payload } = action
//
//     switch (type) {
//         case actionTypes.NOTIFICATION_LOADING_START:
//             return state.set('notification_loading', true)
//
//         case actionTypes.NOTIFICATION_LOADING_END:
//             return state.set('notification_loading', false)
//
//         case actionTypes.GET_NOTIFICATION_SUCCESS:
//             return state.merge({
//                 notifications_list: payload,
//                 notification_loading: false,
//             })
//
//         case actionTypes.NOTIFICATION_APPLIED_FILTERS: {
//             return state.merge({
//                 notification_filters: action.payload,
//             })
//         }
//
//         case actionTypes.NOTIFICATION_CLEAR_FILTERS: {
//             return state.merge({
//                 notification_filters: action.payload,
//                 filterPills: {},
//             })
//         }
//
//         case actionTypes.NOTIFICATION_SET_FILTER_PILLS: {
//             return state.merge({
//                 filterPills: action.payload,
//             })
//         }
//
//         case actionTypes.NOTIFICATION_CLEAR_REDUCER: {
//             return initialState
//         }
//
//         case actionTypes.DISPLAY_DELETE_CONFIRMATION: {
//             return state.merge({
//                 display_delete_confirmation: action.payload,
//             })
//         }
//
//         case actionTypes.DELETE_RECORDS: {
//             return state.merge({
//                 notifications_list: state
//                     .get('notifications_list')
//                     .filter(({ id }) => !payload.some(({ id: innerId }) => innerId === id)),
//                 display_delete_confirmation: true,
//             })
//         }
//
//         case actionTypes.CLEAR_DISPLAY_CONFIRMATION: {
//             return state.merge({
//                 display_delete_confirmation: false,
//             })
//         }
//
//         case actionTypes.UPDATE_TABLE_CELLS: {
//             return state.merge({
//                 notifications_head_cells: payload.headCellList,
//                 remaining_notifications_head_cells: payload.addColumnList,
//             })
//         }
//
//         default:
//             return state
//     }
// }
