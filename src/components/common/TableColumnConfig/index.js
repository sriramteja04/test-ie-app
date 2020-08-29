// import React, { Fragment, memo, useState } from 'react'
//
// import { Modal } from '../Modal/Modal.js'
// import { ModalHeading } from '../Modal/ModalHeading'
// import { ModalActions } from '../Modal/ModalActions'
// import { strings } from '../../strings'
// import { Icon } from '../Icon'
// import { SelectInput } from '../SelectInput'
// import { useDragDropReducer } from '../../components/Custom Hooks/UseDragDropReducer'
// import { useManageColumns } from '../../components/Custom Hooks/useManageColumns'
// import { Draggable } from '../Draggable'
// import { util } from '../../util'
///.
// export const TableColumnConfiguration = memo(
//     ({
//         setToggleColumnModal,
//         head_cells,
//         showColumnModal,
//         updateHeadCellsHandler,
//         remaining_head_cells,
//     }) => {
//         const HEIGHT = 60
//
//         const {
//             state,
//             checkIfDraggable,
//             closeModalHandler,
//             scrollBtmRef,
//             updateColumnConfiguration,
//             removeColumnHandler,
//             addColumnHandler,
//         } = useManageColumns(
//             head_cells,
//             updateHeadCellsHandler,
//             setToggleColumnModal,
//             remaining_head_cells,
//             showColumnModal
//         )
//
//         const { addTableColumns, selectedTableColumn, columnLabels } = state
//
//         const { dragState, handleDrag, handleDragEnd } = useDragDropReducer(columnLabels, HEIGHT)
//         const [enableSaveBtn, setEnableSaveBtn] = useState(false)
//
//         const header = (
//             <Fragment>
//                 <ModalHeading
//                     heading={strings.manageColumns}
//                     cancelModalHandler={setToggleColumnModal}
//                 />
//             </Fragment>
//         )
//
//         const content = (
//             <div className={'columnContent mb-7'}>
//                 <p className={'columnMsg'}>{strings.columnMsg}</p>
//                 <div className={'columnList'}>
//                     {columnLabels.map(index => {
//                         const draggable = checkIfDraggable(index)
//                         const isDragging = dragState.draggedIndex === index
//                         const top = isDragging
//                             ? dragState.order.indexOf(index) * (HEIGHT + 10)
//                             : dragState.dragOrder.indexOf(index) * (HEIGHT + 10)
//                         const transition = isDragging ? 'none' : 'all 500ms'
//                         return (
//                             <Fragment>
//                                 {draggable ? (
//                                     <Draggable
//                                         key={index}
//                                         id={index}
//                                         onDrag={handleDrag}
//                                         onDragEnd={handleDragEnd}
//                                     >
//                                         <div
//                                             key={index}
//                                             className={'columnCell'}
//                                             style={{ top: `${top}px`, transition: transition }}
//                                         >
//                                             <Icon
//                                                 className={`dragIcon ${
//                                                     draggable ? 'enable' : 'disable'
//                                                 }`}
//                                                 size={'xs'}
//                                             >
//                                                 {util.OpenWithIcon()}
//                                             </Icon>
//                                             <span className={'columnTitle'} key={index}>
//                                                 {index}
//                                             </span>
//                                             {draggable && (
//                                                 <Icon
//                                                     size={'xs'}
//                                                     className={'removeIcon'}
//                                                     onClick={() => removeColumnHandler(index)}
//                                                 >
//                                                     {util.HighlightOffIcon()}
//                                                 </Icon>
//                                             )}
//                                         </div>
//                                     </Draggable>
//                                 ) : (
//                                     <div
//                                         key={index}
//                                         className={'columnCell'}
//                                         style={{ top: `${top}px`, transition: transition }}
//                                         ref={scrollBtmRef}
//                                     >
//                                         <Icon className={'dragIcon disable'} size={'xs'}>
//                                             {util.OpenWithIcon()}
//                                         </Icon>
//                                         <span className={'columnTitle'} key={index}>
//                                             {index}
//                                         </span>
//                                     </div>
//                                 )}
//                             </Fragment>
//                         )
//                     })}
//                 </div>
//                 <SelectInput
//                     label={'Add new column'}
//                     className={'addColumn'}
//                     list={addTableColumns.map(({ label }) => label)}
//                     name={'addColumn'}
//                     value={selectedTableColumn}
//                     readOnly={true}
//                     onChange={addColumnHandler}
//                 />
//             </div>
//         )
//
//         const actions = (
//             <div className={'mt-5'}>
//                 <ModalActions
//                     saveClickHandler={() => updateColumnConfiguration(dragState.dragOrder)}
//                     cancelModalHandler={closeModalHandler}
//                     submitBtn={strings.save}
//                     cancelBtn={strings.cancel}
//                     disabledBtn={enableSaveBtn}
//                     color={'dark'}
//                     size={'xxl'}
//                 />
//             </div>
//         )
//
//         return <Modal header={header} content={content} actions={actions} size={'xl'} />
//     }
// )
