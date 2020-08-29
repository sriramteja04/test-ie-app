// import React, { memo, useEffect } from 'react'
//
// import { strings } from '../strings'
// import { constants } from '../constants/index'
// import { PushNotificationsTable } from '../components/Push Notifications/PushNotificationsTable'
// import { Spinner } from '../common/Spinner'
// import { util } from '../util'
// import { Button } from '../common/Button'
// import { TableColumnConfiguration } from '../common/TableColumnConfig'
// import { useSearchReducer } from '../components/Custom Hooks/useSearchReducer'
// import { useToggle } from '../components/Custom Hooks/useCustomHooks'
// import { PushNotificationFilter } from '../components/Push Notifications/PushNotificationFilter'
// import { TableFilterToolBar } from '../common/TableFilterToolBar'
//
// export const PushNotification = memo(
//     ({
//         notifications_list,
//         notification_loading,
//         notification_filters,
//         display_delete_confirmation,
//         sagaGetNotifications,
//         NotificationClearReducer,
//         dispatchDeleteRecords,
//         dispathNotificationFilters,
//         sagaClearDisplayConfirm,
//         notifications_head_cells,
//         remaining_notifications_head_cells,
//         dispatchTableCells,
//     }) => {
//         // NotificationClearReducer()
//         const {
//             state,
//             dispatch,
//             inputChangeHandler,
//             enterSearchHandler,
//             stateTypes,
//         } = useSearchReducer('', false, notifications_list)
//
//         const { search, tableList, headCells } = state
//         const [showColumnModal, setToggleColumnModal] = useToggle(false)
//
//         useEffect(() => {
//             sagaGetNotifications()
//         }, [])
//
//         const _renderFilterComp = props => (
//             <PushNotificationFilter
//                 appliedFilters={notification_filters}
//                 dispatchFilters={dispathNotificationFilters}
//                 {...props}
//             />
//         )
//
//         return (
//             <>
//                 {notification_loading ? (
//                     <Spinner />
//                 ) : (
//                     <div className={'push-notification'}>
//                         <TableFilterToolBar
//                             title={strings.pushNotificationsTitle}
//                             numberOfRows={notifications_list.length}
//                             value={search}
//                             searchOnChange={inputChangeHandler}
//                             searchOnKeyPress={enterSearchHandler}
//                             renderFilterComp={_renderFilterComp}
//                             searchPlaceHolder={'SearchInput Promo'}
//                             apply_filters={notification_filters}
//                             dispatchFilters={dispathNotificationFilters}
//                             fields={constants.pushNotificationFilterLabels}
//                         />
//
//                         <PushNotificationsTable
//                             tableData={tableList}
//                             notifications_head_cells={notifications_head_cells}
//                             dispatchDeleteRecords={dispatchDeleteRecords}
//                             sagaClearDisplayConfirm={sagaClearDisplayConfirm}
//                             display_delete_confirmation={display_delete_confirmation}
//                         />
//
//                         {showColumnModal && (
//                             <TableColumnConfiguration
//                                 setToggleColumnModal={setToggleColumnModal}
//                                 showColumnModal={showColumnModal}
//                                 head_cells={notifications_head_cells}
//                                 dispatchHeadCells={dispatchTableCells}
//                                 remaining_head_cells={remaining_notifications_head_cells}
//                             />
//                         )}
//
//                         <div className={'column-config'}>
//                             <Button
//                                 color={'light'}
//                                 className={'ml-0'}
//                                 inputProps={{
//                                     start: util.SettingsIcon(),
//                                 }}
//                                 onClick={setToggleColumnModal}
//                             >
//                                 Columns
//                             </Button>
//                         </div>
//                     </div>
//                 )}
//             </>
//         )
//     }
// )
