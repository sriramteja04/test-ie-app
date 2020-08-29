// import { useReducer, useCallback, useEffect, useRef, createRef, useState } from 'react'
// import { util } from '../../util'
//
// export const useManageColumns = (
//     head_cells,
//     dispatchHeadCells,
//     columnHandler,
//     remaining_head_cells
// ) => {
//     const scrollBtmRef = createRef()
//
//     const initialState = {
//         tableColumns: head_cells,
//         addTableColumns: remaining_head_cells,
//         selectedTableColumn: null,
//         columnLabels: head_cells.map(cell => cell.label) || [],
//     }
//
//     const stateTypes = {
//         SET_DRAGGED_ITEM: 'SET_DRAGGED_ITEM',
//         SET_HEAD_CELLS: 'SET_HEAD_CELLS',
//         UPDATE_MULTIPLE_FIELDS: 'UPDATE_MULTIPLE_FIELDS',
//     }
//
//     const reducer = (state, action) => {
//         const { type, payload, field } = action
//         const { shallowHelper } = util
//
//         switch (type) {
//             case stateTypes.UPDATE_STATE_FIELD:
//                 return shallowHelper(state, { [field]: payload })
//
//             case stateTypes.UPDATE_MULTIPLE_FIELDS:
//                 return shallowHelper(state, { ...payload })
//
//             case stateTypes.SET_HEAD_CELLS:
//                 return shallowHelper(state, { tableColumns: payload })
//
//             default:
//                 return state
//         }
//     }
//
//     const [state, dispatch] = useReducer(reducer, initialState)
//
//     const closeModalHandler = () => {
//         dispatch({
//             type: stateTypes.UPDATE_MULTIPLE_FIELDS,
//             payload: {
//                 tableColumns: head_cells,
//                 addTableColumns: remaining_head_cells,
//             },
//         })
//
//         columnHandler()
//     }
//
//     const checkIfDraggable = label => {
//         let tableColumn = head_cells.filter(cell => cell.label === label)
//         if (tableColumn.length === 0) {
//             tableColumn = remaining_head_cells.filter(cell => cell.label === label)
//         }
//         return tableColumn[0].draggable
//     }
//
//     const updateColumnConfiguration = columnLabels => {
//         const updatedColumns = []
//         columnLabels.forEach(label => {
//             const tableLabel = state.tableColumns.filter(column => column.label === label)
//             updatedColumns.push(tableLabel[0])
//         })
//         const updatedAddColumns = state.addTableColumns
//         dispatchHeadCells(updatedColumns, updatedAddColumns)
//         columnHandler()
//     }
//
//     const removeColumnHandler = cell => {
//         const columnArray = state.columnLabels.filter(column => column !== cell)
//
//         let updatedAddColumnList = [...state.addTableColumns]
//         let tableColumns = [...state.tableColumns]
//         let tableColumnList = tableColumns.filter(column => column.label === cell)
//
//         tableColumnList.length > 0 && updatedAddColumnList.push(tableColumnList[0])
//         dispatch({
//             type: stateTypes.UPDATE_MULTIPLE_FIELDS,
//             payload: {
//                 columnLabels: columnArray,
//                 addTableColumns: updatedAddColumnList,
//             },
//         })
//     }
//
//     const addColumnHandler = value => {
//         scrollBtmRef.current.scrollIntoView({
//             behavior: 'smooth',
//             block: 'start',
//         })
//
//         let columnList = [...state.columnLabels]
//         columnList.splice(columnList.length - 1, 0, value)
//
//         const item = state.addTableColumns.filter(cell => cell.label === value)
//         let tableColumns = [...state.tableColumns]
//         item.length > 0 && tableColumns.push(item[0])
//
//         let updatedAddColumnList = []
//         state.addTableColumns.forEach(cell => {
//             if (cell.label !== value) {
//                 updatedAddColumnList.push(cell)
//             }
//         })
//         dispatch({
//             type: stateTypes.UPDATE_MULTIPLE_FIELDS,
//             payload: {
//                 columnLabels: columnList,
//                 tableColumns: tableColumns,
//                 addTableColumns: updatedAddColumnList,
//             },
//         })
//     }
//
//     return {
//         state,
//         checkIfDraggable,
//         closeModalHandler,
//         scrollBtmRef,
//         updateColumnConfiguration,
//         removeColumnHandler,
//         addColumnHandler,
//     }
// }
