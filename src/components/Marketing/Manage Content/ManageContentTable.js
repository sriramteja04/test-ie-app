import React, { memo, useCallback, useEffect, useState, useMemo } from 'react'

import { util } from '../../../util'
import {
    Button,
    BulkEdit,
    Checkbox,
    Icon,
    Table,
    TableRow,
    EnhancedTableHead,
    TableBody,
    TableCell,
    TableNoResults,
    TableIconCell,
} from '../../common'
import SideMenu from '../../HOC/SideMenu'
import EditConfiguration from './EditConfiguration'
import { useTableReducer } from '../../Custom Hooks/useTableReducer'
import { useToggle } from '../../Custom Hooks/useCustomHooks'

const ManageContentTable = ({
    tableData,
    headCells,
    setConfigurations,
    applied_filters,
    isPublished,
    configurations,
    schedule,
}) => {
    const [tableList, setTableList] = useState(tableData)
    const [showSideMenu, toggleSideMenu] = useToggle(false)
    const {
        checkboxHandler,
        clearSelectAll,
        tableState,
        handleRequestSort,
        setTableState,
        stateTypes,
        rowsPerPageHandler,
    } = useTableReducer('asc', 'app', 0, 8, tableList, headCells, 0, applied_filters)

    const { selected, rowsPerPage, order, orderBy } = tableState

    useEffect(() => {
        setTableList(tableData)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tableData])

    useEffect(() => {
        if (!showSideMenu && selected) {
            setTableState({
                type: stateTypes.CLEAR_STATE_FIELD,
                field: 'selected',
            })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showSideMenu])

    const editMenuHandler = payload => {
        // selected.length === 0 ? editActions(payload) : editActions(selected.concat(payload))

        if (!selected.length) {
            editActions([payload])
        } else {
            editActions([...selected])
        }

        toggleSideMenu()
    }

    const editActions = useCallback(
        payload =>
            setTableState({
                type: stateTypes.UPDATE_STATE_FIELD,
                field: 'selected',
                payload: payload,
            }),

        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    const onSelectAllHandler = useCallback(
        e =>
            e.target.checked
                ? setTableState({
                      type: stateTypes.UPDATE_STATE_FIELD,
                      field: 'selected',
                      payload: tableList,
                  })
                : clearSelectAll(),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [tableList]
    )

    const saveEditConfigsHandler = configuredData => {
        const updatedConfigs = configurations.reduce(
            (acc, config) =>
                selected.find(({ id }) => config.id === id)
                    ? acc.concat({ ...config, ...configuredData })
                    : acc.concat(config),
            []
        )
        setConfigurations(updatedConfigs, true)
        toggleSideMenu()
    }

    const loadAllClickHandler = useCallback(
        () => rowsPerPageHandler(tableList.length),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [tableList]
    )

    const memoizedInputProps = useMemo(
        () => ({
            edit: {
                edit: util.EditIcon,
                pointer: true,
                color: 'success',
                size: 'md',
            },
            status: {
                incomplete: util.ErrorOutlineOutlinedIcon,
                complete: util.CheckCircleIcon,
                color: 'warning',
            },
        }),
        []
    )

    /**
     * on Edit action of any row clicked, the following JSX will be returned.
     * @returns {JSX} return edit configuration menu
     */
    const renderEditMenu = () => (
        <SideMenu open={showSideMenu} toggleMenu={toggleSideMenu} direction={'right'} width={'xl'}>
            <EditConfiguration
                selected={selected}
                toggleEditSideMenu={toggleSideMenu}
                saveEditConfigsHandler={saveEditConfigsHandler}
                isPublished={isPublished}
            />
        </SideMenu>
    )

    const renderBulkEdit = () => {
        const bulkEditClickHandler = () => editMenuHandler(selected)
        return selected.length > 0 ? (
            <BulkEdit clearSelection={clearSelectAll} selectAll={selected}>
                <Button className={'mr-4'} color={'transparent'} onClick={bulkEditClickHandler}>
                    Edit
                </Button>
            </BulkEdit>
        ) : null
    }

    const renderImage = image_url =>
        image_url ? (
            <img className={'uploaded-image'} src={image_url} alt={'uploaded-promo'} />
        ) : (
            <Icon
                size={'xl'}
                color={'disable'}
                className={'uploading-image'}
                renderIcon={util.PanoramaOutlinedIcon}
            />
        )

    const renderTable = tableList => (
        <Table>
            <EnhancedTableHead
                headCells={headCells}
                onRequestSort={handleRequestSort}
                order={order}
                orderBy={orderBy}
                onChange={onSelectAllHandler}
                checked={selected.length === tableList.length}
                isScrollable={false}
            />
            <TableBody>
                {util
                    .stableSort(tableList, util.getSorting(order, orderBy))
                    .slice(0, rowsPerPage)
                    .map(config => {
                        const { app, placement_location, region, status, image_url, id } = config

                        return (
                            <TableRow key={id}>
                                <TableCell align={'center'} width={'5%'}>
                                    <Checkbox
                                        checked={selected.some(el => el.id === id) || false}
                                        onChange={e => checkboxHandler(e, config)}
                                    />
                                </TableCell>
                                <TableCell>{app}</TableCell>
                                <TableCell>{placement_location}</TableCell>
                                <TableCell>{util.getRegionByCode(region)}</TableCell>
                                <TableCell className={'image-cell'} width={'20%'}>
                                    {renderImage(image_url)}
                                </TableCell>
                                <TableCell>
                                    {schedule
                                        ? util.tableDateRange(
                                              schedule.start_date,
                                              schedule.end_date
                                          )
                                        : null}
                                </TableCell>
                                <TableIconCell
                                    inputProps={memoizedInputProps['status']}
                                    label={status || 'incomplete'}
                                    value={status || 'incomplete'}
                                />
                                <TableIconCell
                                    className={'table__cell edit-action highlight'}
                                    inputProps={memoizedInputProps['edit']}
                                    onClick={() => editMenuHandler(config)}
                                    pointer={true}
                                    value={'edit'}
                                    label={'edit'}
                                />
                            </TableRow>
                        )
                    })}
            </TableBody>
        </Table>
    )

    const renderLoadMore = () =>
        tableList.length > 8 && rowsPerPage === 8 ? (
            <div className={'table__load-more middle'}>
                <Button color={'dark'} size={'md'} onClick={loadAllClickHandler}>
                    {`Load all ${tableData.length}`}
                </Button>
            </div>
        ) : null

    return (
        <>
            {renderEditMenu()}
            {renderBulkEdit()}
            {renderTable(tableList)}
            {tableList.length <= 0 && <TableNoResults />}
            {renderLoadMore()}
        </>
    )
}

export default memo(ManageContentTable)
