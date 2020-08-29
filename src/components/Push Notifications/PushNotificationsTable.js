// import React, { memo, useEffect, useMemo, Fragment } from 'react'
//
// import CheckCircleIcon from '@material-ui/icons/CheckCircle'
// import {
//     GenericTableCell,
//     Table,
//     TableBody,
//     TableCell,
//     TableNoResults,
//     EnhancedTableHead,
//     TableRow,
//     TablePagination,
// } from '../../common/Table'
// import { BulkEdit } from '../../common/BulkEdit/BulkEdit'
// import { Button } from '../../common/Button'
// import { Checkbox } from '../../common/Checkbox'
// // import { DropDownMenu } from '../../common/se_menu'
// import { Icon } from '../../common/Icon'
// import { ToggleButton } from '../../common/ToggleButton'
// import { useTableReducer } from '../Custom Hooks/useTableReducer'
// import { useToggle } from '../Custom Hooks/useCustomHooks'
// import { util } from '../../util'
// import { ConfirmationModal } from '../../common/ConfirmationModal'
//
// export const PushNotificationsTable = memo(
//     ({
//         dispatchDeleteRecords,
//         display_delete_confirmation,
//         notifications_head_cells,
//         sagaClearDisplayConfirm,
//         tableData,
//     }) => {
//         const {
//             checkboxHandler,
//             clearSelectAll,
//             clearStateField,
//             closeBackDrop,
//             deleteRowAction,
//             fixedEndCol,
//             fixedStartCol,
//             handleRequestSort,
//             headCellsRef,
//             onSelectAllHandler,
//             pageChangeHandler,
//             rowsPerPageHandler,
//             setEditRow,
//             setTableState,
//             tableInnerRef,
//             tableOuterRef,
//             tableState,
//             toggleDeleteModal,
//         } = useTableReducer('asc', 'message', 0, 10, tableData, notifications_head_cells, {
//             scrollable: true,
//             fixedStart: 'Push Title',
//             fixedEnd: 'Action',
//         })
//
//         const {
//             deletingRow,
//             editRow,
//             order,
//             orderBy,
//             page,
//             pageCount,
//             rowsPerPage,
//             selected,
//             showDelete,
//             tableList,
//         } = tableState
//
//         const [inlineEdit, toggleInlineEdit] = useToggle(false)
//
//         useEffect(() => {
//             display_delete_confirmation && sagaClearDisplayConfirm()
//             !inlineEdit && clearStateField('editRow')
//         }, [display_delete_confirmation, inlineEdit])
//
//         const deleteRecordHandler = () => {
//             dispatchDeleteRecords(selected)
//             toggleDeleteModal()
//             clearStateField('selected')
//         }
//
//         const deleteActionHandler = () => {
//             dispatchDeleteRecords(deletingRow)
//             clearStateField('deletingRow')
//         }
//
//         const editRowMemo = useMemo(() => editRow, [editRow])
//         const isScrollable = notifications_head_cells.length > 8
//
//         const memoizedInputProps = useMemo(
//             () => ({
//                 message: {
//                     end: inlineEdit && util.EditIcon(),
//                     pointer: true,
//                     color: 'disable',
//                     size: 'xxs',
//                     className: 'ml-3',
//                 },
//                 published: {
//                     published: util.FiberManualRecordIcon(),
//                     unpublished: util.FiberManualRecordIcon('action'),
//                     end: inlineEdit && util.EditIcon(),
//                     color: 'disable',
//                     pointer: true,
//                     size: 'xxs',
//                     className: 'ml-3',
//                 },
//                 status: {
//                     Incomplete: util.ReportProblemOutlinedIcon('error'),
//                     Sent: util.CheckIcon(),
//                     Scheduled: util.ScheduleIcon(),
//                 },
//                 action: {
//                     start: util.MoreHorizIcon(),
//                     pointer: true,
//                 },
//             }),
//             [inlineEdit]
//         )
//
//         return (
//             <>
//                 <div className={'toggle-inplace-edit'}>
//                     <ToggleButton
//                         label={'Inplace Editing'}
//                         checked={inlineEdit}
//                         onChange={toggleInlineEdit}
//                         position={'end'}
//                     />
//                 </div>
//                 {selected.length > 0 && (
//                     <BulkEdit clearSelection={clearSelectAll} selectAll={selected}>
//                         <Button
//                             className={'ml-0 mt-0 mb-0'}
//                             color={'transparent'}
//                             size={'sm'}
//                             onClick={toggleDeleteModal}
//                         >
//                             Delete
//                         </Button>
//                     </BulkEdit>
//                 )}
//                 {showDelete && (
//                     <ConfirmationModal
//                         submitHandler={deleteRecordHandler}
//                         close={toggleDeleteModal}
//                         selectAll={selected}
//                         action={'Delete'}
//                         records={'push notifications'}
//                     />
//                 )}
//                 <div className={'table-outer'} ref={tableOuterRef}>
//                     <div
//                         className={util.getClassName('table-inner', isScrollable && 'shift')}
//                         ref={tableInnerRef}
//                     >
//                         <Table>
//                             <EnhancedTableHead
//                                 headCells={notifications_head_cells}
//                                 onRequestSort={handleRequestSort}
//                                 order={order}
//                                 orderBy={orderBy}
//                                 onChange={onSelectAllHandler}
//                                 checked={selected.length === tableList.length}
//                                 ref={headCellsRef}
//                                 isScrollable={isScrollable}
//                             />
//                             <TableBody>
//                                 {util
//                                     .stableSort(tableList, util.getSorting(order, orderBy))
//                                     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                                     .map(
//                                         (
//                                             {
//                                                 title,
//                                                 id,
//                                                 message,
//                                                 total_sent_count,
//                                                 startDate,
//                                                 createdDate,
//                                                 published,
//                                                 status,
//                                                 created_by,
//                                                 updated_by,
//                                                 target,
//                                                 active,
//                                             },
//                                             i
//                                         ) => (
//                                             <TableRow key={id}>
//                                                 <TableCell className={isScrollable && 'fixed'}>
//                                                     <Checkbox
//                                                         checked={selected.some(e => e.id === id)}
//                                                         onChange={e =>
//                                                             checkboxHandler(e, { id, title })
//                                                         }
//                                                     />
//                                                 </TableCell>
//                                                 <TableCell
//                                                     className={util.getClassName(
//                                                         'highlight',
//                                                         isScrollable && 'fixed',
//                                                         'push-title'
//                                                     )}
//                                                     // width={'15.55%'}
//                                                     ref={ref => (fixedStartCol.current[i] = ref)}
//                                                 >
//                                                     {title}
//                                                 </TableCell>
//
//                                                 {notifications_head_cells.map(({ id: key }, i) => (
//                                                     <Fragment key={i}>
//                                                         {key === 'message' && (
//                                                             <GenericTableCell
//                                                                 id={id}
//                                                                 value={message}
//                                                                 editType={'input'}
//                                                                 inlineEdit={inlineEdit}
//                                                                 inputProps={
//                                                                     memoizedInputProps['message']
//                                                                 }
//                                                                 toggleEditHandler={setEditRow}
//                                                                 toggleEdit={
//                                                                     inlineEdit && editRowMemo
//                                                                         ? editRowMemo.id === id &&
//                                                                           editRowMemo.editType ===
//                                                                               'input'
//                                                                         : false
//                                                                 }
//                                                             />
//                                                         )}
//                                                         {key === 'total_sent_count' && (
//                                                             <TableCell align={'right'}>
//                                                                 {util.toCommas(total_sent_count)}
//                                                             </TableCell>
//                                                         )}
//                                                         {key === 'startDate' && (
//                                                             <TableCell>{startDate}</TableCell>
//                                                         )}
//                                                         {key === 'createdDate' && (
//                                                             <TableCell>{createdDate}</TableCell>
//                                                         )}
//                                                         {key === 'published' && (
//                                                             <GenericTableCell
//                                                                 id={id}
//                                                                 editType={'select'}
//                                                                 inlineEdit={inlineEdit}
//                                                                 inputProps={
//                                                                     memoizedInputProps['published']
//                                                                 }
//                                                                 value={published}
//                                                                 toggleEditHandler={setEditRow}
//                                                                 toggleEdit={
//                                                                     inlineEdit && editRowMemo
//                                                                         ? editRowMemo.id === id &&
//                                                                           editRowMemo.editType ===
//                                                                               'select'
//                                                                         : false
//                                                                 }
//                                                             />
//                                                         )}
//                                                         {key === 'status' && (
//                                                             <GenericTableCell
//                                                                 inputProps={
//                                                                     memoizedInputProps['status']
//                                                                 }
//                                                                 value={status}
//                                                             />
//                                                         )}
//                                                         {key === 'created_by' && (
//                                                             <TableCell>{created_by}</TableCell>
//                                                         )}
//                                                         {key === 'updated_by' && (
//                                                             <TableCell>{updated_by}</TableCell>
//                                                         )}
//                                                         {key === 'active' && (
//                                                             <TableCell>{active}</TableCell>
//                                                         )}
//                                                         {key === 'target' && (
//                                                             <TableCell>{target}</TableCell>
//                                                         )}
//                                                     </Fragment>
//                                                 ))}
//                                                 <TableCell
//                                                     inputProps={memoizedInputProps['action']}
//                                                     className={util.getClassName(
//                                                         isScrollable && 'fixed-last'
//                                                     )}
//                                                     ref={ref => (fixedEndCol.current[i] = ref)}
//                                                 >
//                                                     {/*<DropDownMenu*/}
//                                                     {/*    // list={useMemo(*/}
//                                                     {/*    //     () => ,*/}
//                                                     {/*    //     [id, title, deleteRecordHandler]*/}
//                                                     {/*    // )}*/}
//                                                     {/*    list={[*/}
//                                                     {/*        {*/}
//                                                     {/*            label: 'Edit',*/}
//                                                     {/*        },*/}
//                                                     {/*        {*/}
//                                                     {/*            label: 'Delete',*/}
//                                                     {/*            render: props => (*/}
//                                                     {/*                <ConfirmationModal*/}
//                                                     {/*                    submitHandler={*/}
//                                                     {/*                        deleteActionHandler*/}
//                                                     {/*                    }*/}
//                                                     {/*                    selectAll={[{ id, title }]}*/}
//                                                     {/*                    action={'Delete'}*/}
//                                                     {/*                    records={*/}
//                                                     {/*                        'push notifications'*/}
//                                                     {/*                    }*/}
//                                                     {/*                    {...props}*/}
//                                                     {/*                />*/}
//                                                     {/*            ),*/}
//                                                     {/*        },*/}
//                                                     {/*    ]}*/}
//                                                     {/*>*/}
//                                                     {/*    <Icon size={'sm'}>*/}
//                                                     {/*        {util.MoreHorizIcon()}*/}
//                                                     {/*    </Icon>*/}
//                                                     {/*</DropDownMenu>*/}
//                                                 </TableCell>
//                                             </TableRow>
//                                         )
//                                     )}
//                             </TableBody>
//                         </Table>
//                     </div>
//                 </div>
//                 {tableList.length <= 0 && <TableNoResults />}
//                 {display_delete_confirmation && (
//                     <div className={'confirmationMsg'}>
//                         <CheckCircleIcon className={'circleIcon'} />
//                         <p className={'promoMsg'}>Promo was successfully deleted</p>
//                     </div>
//                 )}
//                 <div className={'table__footer'}>
//                     <TablePagination
//                         list={[10, 25, 50, 100]}
//                         rowsPerPage={rowsPerPage}
//                         rowsPerPageHandler={rowsPerPageHandler}
//                         pageCount={pageCount}
//                         currentPage={page + 1}
//                         pageChangeHandler={pageChangeHandler}
//                     />
//                 </div>
//             </>
//         )
//     }
// )
