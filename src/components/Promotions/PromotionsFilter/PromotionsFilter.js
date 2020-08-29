import React, { memo, Fragment, useEffect, useMemo, useCallback, useState } from 'react'
import PropTypes from 'prop-types'

import { strings } from '../../../strings'
import { Checkbox, DatePicker, SearchInput, FilterToolBar } from '../../common'
import { constants } from '../../../constants'
import { useFilter } from '../../Custom Hooks/useFilterReducer'
import FilterActions from '../../common/Filter/FilterActions'
import { api } from '../../../modules/api'
import { getUsersURL } from '../../../modules/Promotions/url'

/**
 *
 * @param toggleHandler {Callback} -> callback to toggle side menu
 * @param appliedFilters {Object} {Redux State} -> promotions table filter objects
 * @param dispatchFilters {action} -> action dispatcher to update promotions filter object value
 * @returns {*}
 */
const PromotionsFilter = ({ toggleHandler, appliedFilters, dispatchFilters }) => {
    const {
        placements,
        statusFields,
        publishedStatusFields,
        statesList,
        qaStatusFields,
    } = constants

    const initialState = {
        filterState: appliedFilters || {
            created_by: [],
            updated_by: [],
            status: [],
            is_live: [],
            date_range: [],
            placement_location: [],
            region: [],
            qa_is_live: [],
        },
        startDateError: '',
        endDateError: '',
        created_by: { value: '', list: [] },
        updated_by: { value: '', list: [] },
        status: { list: [] },
        is_live: { list: [] },
        date_range: { list: [] },
        placement_location: { list: [] },
        region: { value: '', list: [] },
        qa_is_live: { list: [] },
        enableSaveBtn: false,
        isFetchUsers: false,
        usersList: null,
        enableClearAll: false,
    }

    const {
        state,
        inputChangeHandler,
        updateFilterList,
        removeFilterList,
        checkboxHandler,
        dateChangeHandler,
        clearAllHandler,
        closeSideMenuHandler,
        filterApplyHandler,
        updateStateFields,
        filterMenuRef,
        actionsRef,
    } = useFilter(initialState, toggleHandler, appliedFilters, dispatchFilters)

    const {
        filterState,
        created_by,
        updated_by,
        status,
        is_live,
        startDateError,
        endDateError,
        date_range: {
            list: [startDate, endDate],
        },
        enableSaveBtn,
        usersList,
        enableClearAll,
        placement_location,
        region,
        qa_is_live,
    } = state

    const [userLoading, setLoading] = useState(false)

    const fetchAutoSuggestUsers = useCallback(async () => {
        if (!usersList) {
            try {
                setLoading(true)
                const res = await api(getUsersURL, 'GET')
                res && updateStateFields('usersList', res.data)
                setLoading(false)
            } catch (e) {
                console.log(e)
                setLoading(false)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [usersList])

    useEffect(() => {
        _shouldEnableSave(state)
        _checkDateRange(state)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        state.created_by,
        state.updated_by,
        state.status,
        state.is_live,
        state.date_range,
        state.placement_location,
        state.region,
        state.qa_is_live,
    ])

    useEffect(() => {
        const { created_by, updated_by } = state
        // If Created by or Updated by filters are applied and filter menu is reopened call Fetch users call
        if (created_by.list.length || updated_by.list.length) {
            fetchAutoSuggestUsers()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const _shouldEnableSave = state => {
        const enableBtn = Object.keys(state).reduce((initial, key) => {
            if (state[key] && state[key]['list']) {
                const { list, value } = state[key]
                if (key === 'date_range') {
                    if (list.length === 2 && Date.parse(list[0]) <= Date.parse(list[1])) {
                        return true
                    } else if (list.length === 0) {
                        return initial
                    } else {
                        return false
                    }
                }
                if ((list && list.length > 0) || (value && value.length)) {
                    return true
                } else {
                    return initial
                }
            } else {
                return initial
            }
        }, false)
        enableBtn !== state.enableSaveBtn && updateStateFields('enableSaveBtn', enableBtn)
    }

    const _checkDateRange = state => {
        const { list: dates } = state.date_range
        if (dates[0] && !dates[1]) {
            updateStateFields('endDateError', strings.filterEndDateError)
        } else if (!dates[0] && dates[1]) {
            updateStateFields('startDateError', strings.filterStartDateError)
        } else {
            updateStateFields('endDateError', '')
            updateStateFields('startDateError', '')
        }
    }

    const renderAppPlacements = () => (
        <div className={'filter-menu__item'}>
            <p className={'filter-menu__label'}>Placements</p>
            <div className={'filter-menu__checkbox'}>
                {placements.map(item => (
                    <Fragment key={item}>
                        <Checkbox
                            key={item}
                            label={'7NOW App ' + item}
                            checked={placement_location.list.includes(item) || false}
                            onChange={checkboxHandler}
                            margin={'mt-3'}
                            name={'placement_location'}
                            id={item}
                        />
                    </Fragment>
                ))}
            </div>
        </div>
    )

    const renderDateRange = () => (
        <div className={'filter-menu__item'}>
            <div className={'filter-menu__dateRange'}>
                <p className={'filter-menu__label'}>Start Date</p>
                <DatePicker
                    handleDateChange={dateChangeHandler}
                    selectedDate={
                        startDate || (filterState.date_range && filterState.date_range[0]) || null
                    }
                    name={'startDate'}
                    placeholder={'Start Date'}
                    error={startDateError}
                    size={'md'}
                />
                <p className={'filter-menu__label mt-7'}>End Date</p>
                <DatePicker
                    minDate={startDate || filterState.startDate}
                    handleDateChange={dateChangeHandler}
                    selectedDate={
                        endDate || (filterState.date_range && filterState.date_range[1]) || null
                    }
                    name={'endDate'}
                    placeholder={'End Date'}
                    error={endDateError}
                    size={'md'}
                />
            </div>
        </div>
    )

    const regionsList = useMemo(() => {
        return region.list
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [region.list])

    //nonNationalRegionsList is to filter national checkbox and not display 'national' in the audience pills
    const nonNationalRegionsList = useMemo(
        () => region.list.filter(region => region !== 'National'),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [region.list]
    )
    const memoStates = useMemo(() => {
        return Object.values(statesList)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderAudience = () => (
        <div className={'filter-menu__item'}>
            <p className={'filter-menu__label'}>Audience</p>
            <SearchInput
                searchList={memoStates}
                type={'text'}
                size={'sm'}
                name={'region'}
                placeholder={'Region'}
                pillList={nonNationalRegionsList || []}
                value={region.value}
                onChange={inputChangeHandler}
                pillListHandler={updateFilterList}
                removeFilterList={removeFilterList}
            />
            <div className={'filter-menu__checkbox'}>
                <Fragment key={'national'}>
                    <Checkbox
                        key={'region'}
                        label={'National'}
                        checked={regionsList.includes('National') || false}
                        onChange={checkboxHandler}
                        margin={'mt-3'}
                        name={'region'}
                        id={'National'}
                    />
                </Fragment>
            </div>
        </div>
    )

    const renderMarketingStatuses = () => (
        <div className={'filter-menu__item'}>
            <p className={'filter-menu__label'}>Status</p>
            <div className={'filter-menu__statusCheckbox'}>
                {statusFields.map(item => (
                    <Fragment key={item}>
                        <Checkbox
                            key={item}
                            label={item}
                            checked={status.list.includes(item) || false}
                            onChange={checkboxHandler}
                            margin={'mt-3'}
                            name={'status'}
                            id={item}
                        />
                    </Fragment>
                ))}
            </div>
        </div>
    )

    const renderPublishedStatuses = () => (
        <div className={'filter-menu__item'}>
            <p className={'filter-menu__label'}>Production Status</p>
            <div className={'filter-menu__checkbox'}>
                {publishedStatusFields.map(item => (
                    <Fragment key={item}>
                        <Checkbox
                            key={item}
                            label={item}
                            checked={is_live.list.includes(item) || false}
                            onChange={checkboxHandler}
                            margin={'mt-3'}
                            name={'is_live'}
                            id={item}
                        />
                    </Fragment>
                ))}
            </div>
        </div>
    )

    const renderQAStatus = () => (
        <div className={'filter-menu__item'}>
            <p className={'filter-menu__label'}>QA Status</p>
            <div className={'filter-menu__checkbox'}>
                {qaStatusFields.map(item => (
                    <Fragment key={item}>
                        <Checkbox
                            key={item}
                            label={item}
                            checked={qa_is_live.list.includes(item) || false}
                            onChange={checkboxHandler}
                            margin={'mt-3'}
                            name={'qa_is_live'}
                            id={item}
                        />
                    </Fragment>
                ))}
            </div>
        </div>
    )

    const createdByUsers = useMemo(
        () => (usersList && usersList.created_by) || [],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [usersList && usersList.created_by]
    )

    const memoCreatedBy = useMemo(
        () => created_by.list,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [created_by.list]
    )

    const renderCreatedBy = () => (
        <div className={'filter-menu__item'}>
            <p className={'filter-menu__label'}>Created By</p>
            <SearchInput
                searchList={createdByUsers}
                type={'text'}
                size={'sm'}
                name={'created_by'}
                placeholder={'Created By'}
                pillList={memoCreatedBy}
                value={created_by.value}
                onChange={inputChangeHandler}
                pillListHandler={updateFilterList}
                removeFilterList={removeFilterList}
                onClick={fetchAutoSuggestUsers}
                loading={userLoading}
            />
        </div>
    )
    const updatedByUsers = useMemo(
        () => (usersList && usersList.updated_by) || [],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [usersList && usersList.updated_by]
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const memoUpdatedBy = useMemo(() => updated_by.list, [updated_by.list])

    const renderUpdatedBy = () => (
        <div className={'filter-menu__item'}>
            <p className={'filter-menu__label'}>Modified By</p>
            <SearchInput
                searchList={updatedByUsers}
                type={'text'}
                size={'sm'}
                name={'updated_by'}
                placeholder={'Last Modified By'}
                pillList={memoUpdatedBy}
                value={updated_by.value}
                onChange={inputChangeHandler}
                pillListHandler={updateFilterList}
                removeFilterList={removeFilterList}
                onClick={fetchAutoSuggestUsers}
            />
        </div>
    )

    return (
        <div className={'filter-container'}>
            <div className={'filter-menu'} ref={filterMenuRef}>
                <FilterToolBar
                    clearAllHandler={clearAllHandler}
                    closeSideMenuHandler={toggleHandler}
                    isClearAll={enableClearAll}
                />
                <div className={'filter-menu__body'}>
                    {renderAppPlacements()}
                    {renderDateRange()}
                    {renderAudience()}
                    {renderMarketingStatuses()}
                    {renderPublishedStatuses()}
                    {renderQAStatus()}
                    {renderCreatedBy()}
                    {renderUpdatedBy()}
                </div>
            </div>
            <FilterActions
                isEnable={enableSaveBtn}
                closeSideMenuHandler={closeSideMenuHandler}
                filterApplyHandler={filterApplyHandler}
                ref={actionsRef}
            />
        </div>
    )
}

PromotionsFilter.propTypes = {
    toggleHandler: PropTypes.func,
    appliedFilters: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    dispatchFilters: PropTypes.func,
}

export default memo(PromotionsFilter)
