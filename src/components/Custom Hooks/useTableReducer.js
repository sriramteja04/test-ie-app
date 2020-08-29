import { util } from '../../util'
import { useCallback, useEffect, useReducer } from 'react'

export const useTableReducer = (
    order,
    orderBy,
    page,
    rowsPerPage,
    tableList,
    head_cells,
    count,
    applied_filters = null,
    fixedColRules = null
) => {
    const initialState = {
        deletingRow: [],
        editRow: {},
        order: order,
        orderBy: orderBy,
        page: page,
        pageCount: 1,
        rowsPerPage: rowsPerPage,
        selected: [],
        showDelete: false,
        // tableList: tableList || [],
        toggleDelete: false,
        toggleEdit: {},
        publishContent: '',
        filters: null,
    }

    const stateTypes = {
        CHANGE_PAGE: 'CHANGE_PAGE',
        CHANGE_ROWS_PER_PAGE: 'CHANGE_ROWS_PER_PAGE',
        CLEAR_STATE_FIELD: 'CLEAR_STATE_FIELD',
        DELETE_ROW_ACTION: 'DELETE_ROW_ACTION',
        FILTER_SELECT_ALL: 'FILTER_SELECT_ALL',
        PUSH_SELECT_ALL: 'PUSH_SELECT_ALL',
        REQUEST_SORT: 'REQUEST_SORT',
        SELECT_ALL_ROW: 'SELECT_ALL_ROW',
        TOGGLE_COLUMN_MODAL: 'TOGGLE_COLUMN_MODAL',
        TOGGLE_SHOW_DELETE: 'TOGGLE_SHOW_DELETE',
        UPDATE_STATE_FIELD: 'UPDATE_STATE_FIELD',
        UPDATE_MULTIPLE_FIELDS: 'UPDATE_MUTIPLE_FIELDS',
    }

    const reducer = useCallback((state, action) => {
        const { type, payload, field } = action
        const { shallowHelper } = util

        switch (type) {
            case stateTypes.CHANGE_ROWS_PER_PAGE:
                return shallowHelper(state, {
                    rowsPerPage: payload.rowsPerPage,
                    pageCount: payload.pageCount,
                })

            case stateTypes.CLEAR_STATE_FIELD:
                return shallowHelper(state, { [field]: initialState[field] })

            case stateTypes.FILTER_SELECT_ALL:
                return shallowHelper(state, {
                    selected: state.selected.filter(row => row._id !== payload),
                })

            case stateTypes.PUSH_SELECT_ALL:
                return shallowHelper(state, { selected: state.selected.concat(payload) })

            case stateTypes.REQUEST_SORT:
                return shallowHelper(state, { order: payload.order, orderBy: payload.orderBy })

            case stateTypes.TOGGLE_COLUMN_MODAL:
                return shallowHelper(state, { showColumnModal: payload })

            case stateTypes.TOGGLE_SHOW_DELETE:
                return shallowHelper(state, { showDelete: !state.showDelete })

            case stateTypes.UPDATE_STATE_FIELD:
                return shallowHelper(state, { [field]: payload })

            case stateTypes.UPDATE_MULTIPLE_FIELDS:
                return shallowHelper(state, payload)

            default:
                return state
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    /*
        tableState: State of an Object
        setTableState: dispatch function used to update state of a table component
     */
    const [tableState, setTableState] = useReducer(reducer, initialState)

    useEffect(() => {
        let updatedCount = Math.ceil(count / tableState.rowsPerPage)
        if (updatedCount === 0) {
            updatedCount = 1
        }
        setTableState({
            type: stateTypes.UPDATE_MULTIPLE_FIELDS,
            payload: { pageCount: updatedCount, page: page },
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count, page, tableState.rowsPerPage])

    useEffect(() => {
        applied_filters !== null && getAppliedFiltersObj()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [applied_filters])

    const checkboxHandler = useCallback((e, row) => {
        if (e.target.checked) {
            setTableState({
                type: stateTypes.PUSH_SELECT_ALL,
                payload: row,
            })
        } else {
            setTableState({
                type: stateTypes.FILTER_SELECT_ALL,
                payload: row._id,
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const clearSelectAll = useCallback(
        () => setTableState({ type: stateTypes.CLEAR_STATE_FIELD, field: 'selected' }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    const handleRequestSort = useCallback(
        id => {
            const isAsc = tableState.orderBy === id && tableState.order === 'asc'
            setTableState({
                type: stateTypes.REQUEST_SORT,
                payload: {
                    order: isAsc ? 'desc' : 'asc',
                    orderBy: id,
                },
            })
        },

        // eslint-disable-next-line react-hooks/exhaustive-deps
        [tableState.order, tableState.orderBy]
    )

    const onSelectAllHandler = useCallback(
        e => {
            if (e.target.checked) {
                setTableState({
                    type: stateTypes.UPDATE_STATE_FIELD,
                    field: 'selected',
                    payload: tableList,
                })
            } else {
                clearSelectAll()
            }
        },

        // eslint-disable-next-line react-hooks/exhaustive-deps
        [tableList]
    )

    const rowsPerPageHandler = useCallback((value, id) => {
        setTableState({
            type: stateTypes.UPDATE_STATE_FIELD,
            field: 'rowsPerPage',
            payload: value,
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const clearStateField = useCallback(field => {
        setTableState({
            type: stateTypes.CLEAR_STATE_FIELD,
            field,
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const setEditRow = useCallback(editingRow => {
        setTableState({
            type: stateTypes.UPDATE_STATE_FIELD,
            field: 'editRow',
            payload: editingRow,
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const pageChangeHandler = useCallback(
        currentPage => {
            setTableState({
                type: stateTypes.UPDATE_STATE_FIELD,
                field: 'page',
                payload: currentPage,
            })
        },

        // eslint-disable-next-line react-hooks/exhaustive-deps
        [tableState.page, tableState.rowsPerPage]
    )

    const togglePublishContentModal = useCallback(value => {
        setTableState({
            type: stateTypes.UPDATE_STATE_FIELD,
            field: 'publishContent',
            payload: value,
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getAppliedFiltersObj = () => {
        const searchFilters = {}
        applied_filters.forEach(filter => {
            if (filter.type === 'range') {
                if (filter.start_value !== '') {
                    searchFilters['start_date'] = filter.start_value
                    searchFilters['end_date'] = filter.end_value
                }
            } else if (filter.post_value.length > 0) {
                searchFilters[filter.key] = filter.post_value
            }
        })
        setTableState({
            type: stateTypes.UPDATE_STATE_FIELD,
            field: 'filters',
            payload: searchFilters,
        })
    }

    return {
        checkboxHandler,
        clearSelectAll,
        clearStateField,
        handleRequestSort,
        onSelectAllHandler,
        pageChangeHandler,
        rowsPerPageHandler,
        setEditRow,
        setTableState,
        stateTypes,
        tableState,
        togglePublishContentModal,
        // tableRowRef,
        // tableInnerRef,
        // tableOuterRef,
        // fixedEndCol,
        // fixedStartCol,
        // headCellsRef,
        // checkboxRef,
        // isScrollable,
    }
}

// const fixedEndCol = useRef({}) //ref pointing to end column
// const fixedStartCol = useRef({}) //ref pointing to start column
// const headCellsRef = useRef({}) //ref pointing to all the table heads
// const tableRowRef = useRef({}) //ref to pointing to table row and controls the height of the table
// const tableInnerRef = useRef({}) //ref pointing to inner div which is wrapping the table
// const tableOuterRef = useRef({}) //ref pointing to outer div which is wrapping the table
// const checkboxRef = useRef({})
//
// const isScrollable = head_cells.length > 8

// let throttleSetTableWidths = null
//
// /**
//  * Use Layout Effect will execute before before DOM Render and DOM Painting.
//  */
// useLayoutEffect(() => {
//     // console.log('headCellsRef', headCellsRef.current['Audience'].offsetWidth)
//
//     //Checking conditions in order to proceed responsive table.
//     if (
//         fixedColRules &&
//         fixedColRules.scrollable &&
//         tableList.length &&
//         tableOuterRef.current &&
//         tableInnerRef.current &&
//         isScrollable
//     ) {
//         _responsiveTableWidths()
//         window.addEventListener('resize', _throttleEffect)
//     }
//     return () => window.removeEventListener('resize', _throttleEffect)
// }, [head_cells, page, tableState.rowsPerPage, tableList])
//
// /**
//  * Using a throttle function in order to resist the unnecessary rendering.
//  * For resize event handler
//  */
// const _throttleEffect = () => {
//     clearTimeout(throttleSetTableWidths)
//     throttleSetTableWidths = setTimeout(() => _responsiveTableWidths(), 300)
// }
//
// const _responsiveTableWidths = () => {
//     // if(!isScrollable) return
//     if (!tableList.length) return
//     //Calculating the outer width of the table
//     const tableWidth = tableOuterRef.current.offsetWidth
//     //assigning outer with to inner width
//     tableInnerRef.current.style.width = tableWidth
//     console.log('Calc Widths...')
//     /**
//      * Iterating the heading cells in order to apply widths
//      * table body cells will follow table head cells widths
//      */
//     head_cells.forEach(cell => {
//         Object.keys(headCellsRef.current).forEach(ref => {
//             if (ref === cell.label && headCellsRef.current[ref]) {
//                 const length = (parseInt(cell.width) / 100) * parseInt(tableWidth)
//
//                 headCellsRef.current[ref].style.width = `${length}px`
//
//                 if (cell.label === fixedColRules.fixedStart && !isScrollable)
//                     if (cell.label === fixedColRules.fixedEnd && !isScrollable)
//                         _setTableCellWidth(fixedStartCol, length)
//
//                 if (isScrollable) _setTableCellWidth(fixedEndCol, length)
//
//                 /* Adding extra width when cells are scrollable so that we will eliminate remaining space */
//                 headCellsRef.current[ref].style.width = `${length + 24}px`
//
//                 /**
//                  * if a table reaches the max number of columns. we need to fixed the
//                  * first two cols and scroll the remaining table
//                  */
//                 if (cell.label === fixedColRules.fixedEnd && isScrollable) {
//                     //Moving the table to right. First two cols will have a abs position.
//                     tableInnerRef.current.style.marginRight = `${length + 24}px`
//                     _setTableCellWidth(fixedEndCol, length + 24)
//                 }
//
//                 if (cell.label === fixedColRules.fixedStart && isScrollable) {
//                     tableInnerRef.current.style.marginLeft = `${length + 64 + 24}px`
//                     _setTableCellWidth(fixedStartCol, length + 24)
//                 }
//
//                 if (!isScrollable) {
//                     tableInnerRef.current.style.marginLeft = '0px'
//                     tableInnerRef.current.style.marginRight = '0px'
//                 }
//             }
//         })
//     })
// }
//
// /**
//  * In order to have a fixed cols we are making the first columns and last col absolute.
//  * Now there are not following the table properties. so we need to manually
//  * set the width and height of that table cells(start cols and end col)
//  * @param ref {Ref} fixed columns refs (fixedStartCol, fixedEndCol)
//  * @param length{Number} length of the each width
//  * @private
//  */
// const _setTableCellWidth = (ref, length) => {
//     Object.keys(ref.current).forEach(node => {
//         if (ref.current[node] !== null) {
//             ref.current[node].style.width = ref.current[node] !== null ? `${length}px` : 'null'
//             ref.current[node].style.height =
//                 tableRowRef.current[node] && `${tableRowRef.current[node].offsetHeight}px`
//             checkboxRef.current[node].style.height =
//                 tableRowRef.current[node] && `${tableRowRef.current[node].offsetHeight}px`
//         }
//     })
// }
