import React, { memo, useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

import { strings } from '../../../strings'
import { util } from '../../../util'
import { Button, Filter, FilterPill, InputField, TableTitle } from '../index'

/** This component is responsible to display search input, filter button, Filter menu and filter pills.
 *
 * @param title {String}
 * @param numberOfRows {Number}
 * @param searchPlaceHolder {String}
 * @param dispatchClearAllFilters {action}
 * @param renderFilterComp {renderProps}
 * @param applied_filters {Object}
 * @param isSearch {Boolean}
 * @param dispatchFilters {action}
 * @returns {JSX} -> return a Table Filter Tool bar with search input, filter button and filter pills
 */
const TableFilterToolBar = ({
    title,
    numberOfRows,
    searchPlaceHolder,
    dispatchClearAllFilters,
    renderFilterComp,
    applied_filters,
    isSearch,
    dispatchFilters,
}) => {
    const [search, setSearch] = useState('')

    const searchMemo = useMemo(
        () => ({
            end: util.SearchIcon,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    const clearPillHandler = useCallback(
        /**
         *
         * @param keyPill
         */
        keyPill => {
            const filterState = [...applied_filters]
            //Clear the state of the pill and dispatch the updated state to redux
            const clearPillState = filterState.map(filter => {
                const updatedFilterState = { ...filter }
                if (updatedFilterState.key === keyPill) {
                    if (updatedFilterState.type === 'list') {
                        updatedFilterState['display_value'] = []
                        updatedFilterState['post_value'] = []
                    } else {
                        updatedFilterState['display_value'] = ''
                        updatedFilterState['post_value'] = ''
                    }
                    if (updatedFilterState.type === 'range') {
                        updatedFilterState['start_value'] = ''
                        updatedFilterState['end_value'] = ''
                    }
                }
                return updatedFilterState
            })
            dispatchFilters(clearPillState)
        },

        // eslint-disable-next-line react-hooks/exhaustive-deps
        [applied_filters]
    )

    const searchInputChangeHandler = useCallback(e => setSearch(e.target.value), [])

    const enterSearchHandler = useCallback(
        e => {
            const enteredVal = e.target.value
            if (e.keyCode === 13 && enteredVal !== '') {
                const payload = { display_value: enteredVal, post_value: enteredVal }
                const filterState = [...applied_filters]
                const updatedFilterState = filterState.map(filter => {
                    let updatedFilter = { ...filter }
                    if (filter.key === 'name') {
                        updatedFilter = util.shallowHelper(filter, payload)
                    }
                    return updatedFilter
                })
                dispatchFilters(updatedFilterState)
                setSearch('')
            }
        },

        // eslint-disable-next-line react-hooks/exhaustive-deps
        [applied_filters]
    )

    /**
     *
     * @returns {*}
     */
    const renderFilters = () => (
        <div className={'table-toolbar__search'}>
            {isSearch ? (
                <InputField
                    className={util.joinClasses('search', isSearch && 'mr-4')}
                    size={'sm'}
                    value={search}
                    name={'search'}
                    onChange={searchInputChangeHandler}
                    onKeyUp={enterSearchHandler}
                    inputProps={searchMemo}
                    label={strings.searchLabel}
                    placeholder={searchPlaceHolder}
                />
            ) : null}
            <Filter renderFilterComp={renderFilterComp} />
        </div>
    )

    const renderFilterPills = () =>
        applied_filters.filter(filter => filter.display_value.length > 0).length > 0 && (
            <div className={'table-toolbar__pill-list'}>
                {applied_filters.map(({ key, display_name, type, display_value }, i) => (
                    <FilterPill
                        className={'mr-4'}
                        key={i}
                        label={display_name}
                        keyPill={key}
                        clearPillHandler={clearPillHandler}
                        filterList={display_value}
                        type={type}
                    />
                ))}
                <Button
                    variant={'basic'}
                    color={'dark'}
                    margin={'mt-3'}
                    onClick={dispatchClearAllFilters}
                >
                    Clear All
                </Button>
            </div>
        )

    return (
        <div className={'table-toolbar'}>
            <TableTitle title={title} listLength={numberOfRows} />
            {renderFilters()}
            {renderFilterPills()}
        </div>
    )
}

TableFilterToolBar.propTypes = {
    title: PropTypes.string,
    numberOfRows: PropTypes.number,
    searchPlaceHolder: PropTypes.string,
    dispatchClearAllFilters: PropTypes.func,
    renderFilterComp: PropTypes.func,
    applied_filters: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    isSearch: PropTypes.bool,
    dispatchFilters: PropTypes.func,
}

const shouldComponentUpdate = (prevProps, nextProps) =>
    !(
        prevProps.numberOfRows !== nextProps.numberOfRows ||
        prevProps.applied_filters !== nextProps.applied_filters
    )

export default memo(TableFilterToolBar, shouldComponentUpdate)
