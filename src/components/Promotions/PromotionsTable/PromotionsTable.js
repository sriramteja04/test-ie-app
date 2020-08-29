import React, { memo, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import { util } from '../../../util'
import {
    BulkEdit,
    Checkbox,
    ConfirmationModal,
    Menu,
    Spinner,
    Icon,
    Table,
    TableRow,
    TableCell,
    TableBody,
    TableNoResults,
    TablePagination,
    TableActionCell,
    EnhancedTableHead,
    TableIconCell,
    ToastMessage,
    ToggleButton,
    ToolTip,
    PromoMenuActions,
} from '../../common'
import { useTableReducer } from '../../Custom Hooks/useTableReducer'
import { usePrevious, useToggle } from '../../Custom Hooks/useCustomHooks'
import { constants } from '../../../constants'

/**
 * @returns {JSX} -> Promotions Table -> In place Toggle, Table, Table Pagination.
 */
const PromotionsTable = ({
    actions,
    applied_filters,
    count,
    display_promo_alert,
    pageNo,
    promo_loading,
    promotions_list,
    sort_order,
    sort_orderBy,
    user_role,
    size,
    promo_error,
}) => {
    const history = useHistory()
    const promotions_head_cells = constants.promotionsHeadCells
    const [inlineEdit, toggleInlineEdit] = useToggle(false)
    const {
        checkboxHandler,
        clearSelectAll,
        clearStateField,
        onSelectAllHandler,
        pageChangeHandler,
        rowsPerPageHandler,
        tableState,
        setEditRow,
        handleRequestSort,
    } = useTableReducer(
        sort_order,
        sort_orderBy,
        pageNo,
        size,
        promotions_list,
        promotions_head_cells,
        count,
        applied_filters
    )

    const { order, orderBy, page, pageCount, rowsPerPage, selected, editRow, filters } =
        tableState || {}

    const prevRowsPerPage = usePrevious(rowsPerPage)

    useEffect(() => {
        display_promo_alert && actions.clearPromoAlert(2000)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [display_promo_alert])

    useEffect(() => {
        _fetchPromos()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rowsPerPage, page, orderBy, order, filters])

    const _fetchPromos = () => {
        if (!filters) {
            return
        }

        //If bulk edit is activated, clear all selections
        selected.length > 0 && clearSelectAll()

        //If rows per page changes then the current page should fallback to 1
        const updatedPage = prevRowsPerPage !== rowsPerPage ? 1 : page

        actions.fetchPromos({
            search: filters,
            sort: { [orderBy]: order },
            size: rowsPerPage,
            pageNo: updatedPage,
        })
    }

    const memoizedProps = useMemo(
        () => ({
            status: {
                incomplete: util.ReportProblemOutlinedIcon,
                finished: util.CheckIcon,
                live: util.LiveStatusIcon,
                scheduled: util.ScheduleIcon,
                incompleteSetup: null,
                pointer: false,
            },
            qa_is_live: {
                qa_is_live: util.QATestIcon,
                pointer: false,
            },
            prod_is_live: {
                prod_is_live: util.FiberManualRecordIcon,
                color: 'success',
                pointer: false,
            },
            prod_not_live: {
                prod_not_live: util.FiberManualRecordIcon,
                color: 'disable',
                pointer: false,
            },
            name: {
                end: inlineEdit && util.EditIcon,
                pointer: true,
                color: 'disable',
                size: 'xxs',
                className: 'ml-3',
            },
        }),
        [inlineEdit]
    )

    const deletePromoHandler = selected => {
        const promoIds = selected.map(({ _id }) => _id)
        clearStateField('selected')

        /* When deleting whole promotions table, revert to previous page */
        const updatedPage = promotions_list.length === selected.length && page > 1 ? page - 1 : page

        actions.bulkDeletePromos({
            search: filters,
            _id: promoIds,
            size: rowsPerPage,
            pageNo: updatedPage,
            sort: { [orderBy]: order },
        })
    }

    /* Navigating the user to promo details page */
    const editPromoHandler = id =>
        history.push({
            pathname: `/dashboard/promotions/${id}`,
            state: { fromTable: true },
        })

    /* Renders a list of promo placements or regions */
    const tableCellToolTip = (list, maxChar) => {
        const hyperLinkIndex = util.getMaxIndex(list, maxChar)
        const viewList = list.slice(0, hyperLinkIndex)
        const toolTipList = list.slice(hyperLinkIndex)
        const renderToolTip = () => <div>{util.getStringsFromArray(toolTipList)}</div>
        return (
            <div className={'table-row__cell--tool-tip-wrapper'}>
                <p className={'show-content'}>{util.getStringsFromArray(viewList)}</p>
                {toolTipList.length > 0 && (
                    <ToolTip
                        className={'ml-3'}
                        display={'inline-block'}
                        highlight
                        placement={'bottom'}
                        render={renderToolTip}
                    >
                        {toolTipList.length}+ more
                    </ToolTip>
                )}
            </div>
        )
    }

    const renderActionMenu = ({ name, _id, status, qa_is_live, is_live }) => {
        const publishContentHandler = type => {
            const requestPayload = {
                publishContent: {
                    type: type === 'qa' ? 'qa_live' : 'live',
                    publish: type === 'qa' ? !qa_is_live : !is_live,
                    _id: _id,
                },
                publishFromTable: true,
            }
            actions.publishContent(requestPayload)
        }

        const renderMenuBody = () => (
            <Icon className={'menu-icon'} size={'xs'} renderIcon={util.MoreHorizIcon} />
        )

        return (
            <PromoMenuActions
                deleteHandler={deletePromoHandler}
                editHandler={editPromoHandler}
                id={_id}
                is_live={is_live}
                name={name}
                qa_is_live={qa_is_live}
                renderMenu={renderMenuBody}
                status={status}
                user_role={user_role}
                publishContentHandler={publishContentHandler}
                isEditable={true}
            />
        )
    }

    const renderBulkEditActions = () => {
        if (selected.length === 0) {
            return null
        }

        const renderConfirmList = () => (
            <ul>
                {selected.map(({ name }, index) => (
                    <li key={index}>{name}</li>
                ))}
            </ul>
        )

        const renderMenuBody = () => (
            <Icon size={'sm'} className={'mt-1'} renderIcon={util.MoreHorizIcon} />
        )

        const deleteHandler = () => deletePromoHandler(selected)

        return (
            <BulkEdit clearSelection={clearSelectAll} selectAll={selected}>
                <Menu
                    className={'bulk-edit__actions__menu mr-4'}
                    placement={'left'}
                    tipPlacement={'right'}
                    margin={'mt-4'}
                    renderProps={renderMenuBody}
                >
                    <Menu.MenuItem
                        onClick={props => (
                            <ConfirmationModal
                                renderList={renderConfirmList}
                                submitHandler={deleteHandler}
                                action={'Delete'}
                                records={'promos'}
                                {...props}
                            />
                        )}
                    >
                        Delete
                    </Menu.MenuItem>
                </Menu>
            </BulkEdit>
        )
    }

    const editRowMemo = useMemo(() => editRow, [editRow])

    const updateInlineEdit = (id, value) => {
        const promo = promotions_list.filter(promo => promo._id === id)[0]
        if (promo.name !== value) {
            actions.updateInlineEdit({ promo: { ...promo, name: value } })
        }
    }

    const renderTableBody = tableList => (
        <TableBody>
            {tableList.map((rowData, i) => {
                const {
                    _id,
                    configurations,
                    schedule,
                    is_live,
                    name,
                    qa_is_live,
                    status,
                    priority,
                } = rowData
                const isPromoNameEdit =
                    inlineEdit && editRowMemo
                        ? editRowMemo._id === _id && editRowMemo.editType === 'input'
                        : false
                const editHandler = () => editPromoHandler(_id)

                return (
                    <TableRow key={i} selected={selected.some(el => el._id === _id) || false}>
                        <TableCell align={'center'}>
                            <Checkbox
                                checked={selected.some(e => e._id === _id)}
                                onChange={e => checkboxHandler(e, rowData)}
                            />
                        </TableCell>
                        <TableActionCell
                            _id={_id}
                            className={util.joinClasses('highlight lower', 'promo-name')}
                            editType={'input'}
                            inlineEdit={inlineEdit && !(qa_is_live || is_live)}
                            inputProps={memoizedProps['name']}
                            onClick={editHandler}
                            value={name}
                            toggleEditHandler={setEditRow}
                            toggleEdit={isPromoNameEdit}
                            saveEditHandler={updateInlineEdit}
                        />

                        <TableCell>
                            {configurations && configurations.length > 0
                                ? tableCellToolTip(util.getUniqueAppPlacements(configurations), 54)
                                : null}
                        </TableCell>

                        <TableCell>
                            {schedule
                                ? util.tableDateRange(schedule.start_date, schedule.end_date)
                                : null}
                        </TableCell>

                        <TableCell>
                            {configurations && configurations.length > 0
                                ? tableCellToolTip(util.getRegionsList(configurations), 36)
                                : null}
                        </TableCell>

                        <TableCell>{priority}</TableCell>

                        <TableIconCell
                            position={'start'}
                            inputProps={memoizedProps['status']}
                            label={status}
                            value={status === 'incomplete' ? 'incomplete setup' : status}
                        />

                        {qa_is_live ? (
                            <TableIconCell
                                position={'start'}
                                inputProps={memoizedProps['qa_is_live']}
                                label={qa_is_live ? 'qa_is_live' : ''}
                                value={'Testing'}
                            />
                        ) : (
                            <TableCell className={'QA not there'} />
                        )}

                        <TableIconCell
                            inputProps={memoizedProps[is_live ? 'prod_is_live' : 'prod_not_live']}
                            label={is_live ? 'prod_is_live' : 'prod_not_live'}
                        />

                        <TableCell>{renderActionMenu(rowData)}</TableCell>
                    </TableRow>
                )
            })}
        </TableBody>
    )

    const renderTable = tableList => (
        <div className={'table-outer'}>
            <div className={'table-inner'}>
                <Table>
                    <EnhancedTableHead
                        headCells={promotions_head_cells}
                        onRequestSort={handleRequestSort}
                        order={order}
                        orderBy={orderBy}
                        onChange={onSelectAllHandler}
                        checked={tableList.length && selected.length === tableList.length}
                    />
                    {tableList.length > 0 && !promo_error ? renderTableBody(tableList) : null}
                </Table>
            </div>
        </div>
    )

    const renderTableFooter = () => (
        <div className={'table__footer'}>
            <TablePagination
                currentPage={page}
                list={tableRows}
                pageChangeHandler={pageChangeHandler}
                pageCount={pageCount}
                rowsPerPage={rowsPerPage}
                rowsPerPageHandler={rowsPerPageHandler}
            />
        </div>
    )

    const tableRows = useMemo(() => [10, 25, 50, 100], [])

    /***
     * Following layout is in Grid System, please checkout scss mixins
     */
    return (
        <>
            <Spinner loading={promo_loading} />
            <div className={'toggle-inplace-edit mb-2'}>
                <ToggleButton
                    label={'Inplace Editing'}
                    checked={inlineEdit}
                    onChange={toggleInlineEdit}
                />
            </div>
            {renderBulkEditActions()}
            {renderTable(promotions_list)}
            {(promotions_list.length <= 0 || promo_error) && <TableNoResults />}
            {display_promo_alert && <ToastMessage message={display_promo_alert} />}
            {renderTableFooter()}
        </>
    )
}

PromotionsTable.propTypes = {
    /* actions {Object} {actions dispatchers} -> promotion bind action dispatchers */
    actions: PropTypes.object,

    /* applied_filters {Object} {Redux Filter State} -> Promotion Filter Options */
    applied_filters: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),

    /* count {Number} {Redux promotions State} -> Total number of promos */
    count: PropTypes.number,

    /* display_promo_alert {String} {Redux promotions State} -> Alert toast messages Eg: Promo successfully deleted */
    display_promo_alert: PropTypes.string,

    /*  pageNo {Number} {Redux promotions State} -> Current page number */
    pageNo: PropTypes.number,

    /* promo_loading {Boolean} {Redux promotions State} -> if true shows a spinner */
    promo_loading: PropTypes.bool,

    /* promotions_list {Array} {Redux promotions State} -> list of promos */
    promotions_list: PropTypes.arrayOf(constants.promoPropType),

    /* sort_order {String} {Redux promotions State} -> 'asc' or 'desc' */
    sort_order: PropTypes.string,

    /* sort_orderBy {String} {Redux promotions State} */
    sort_orderBy: PropTypes.string,

    /* user_role {String} {Redux Auth State} -> Authenticated user role  */
    user_role: PropTypes.string,

    /*  size {Number} {Redux promotions State} -> current table number of rows [10, 25, 50, 100]  */
    size: PropTypes.number,

    /* promo_error {String} {Redux Promotions State} */
    promo_error: PropTypes.string,
}

export default memo(PromotionsTable)
