import { useCallback, useEffect, useReducer, useRef } from 'react'
import { util } from '../../util'
import { constants } from '../../constants'

export const useFilter = (initialState, toggleHandler, appliedFilters, dispatchFilters) => {
    const { statesList } = constants

    const initializeStateFromPayload = (state, payload) => {
        const updatedState = { ...state }
        payload.forEach(filter => {
            if (filter.type !== 'string') {
                const updateStateObj = { ...filter }
                if (updateStateObj.type === 'range') {
                    updatedState[updateStateObj.key]['list'] =
                        updateStateObj.start_value !== ''
                            ? [
                                  util.ISOToLocalTime(updateStateObj.start_value),
                                  util.ISOToLocalTime(updateStateObj.end_value),
                              ]
                            : []
                } else {
                    updatedState[updateStateObj.key]['list'] = updateStateObj.display_value
                }
            }
        })
        return updatedState
    }

    const stateTypes = {
        INPUT_CHANGE: 'INPUT_CHANGE',
        UPDATE_FILTER_LIST: 'UPDATE_FILTER_LIST',
        CLEAR_INPUT_FIELD: 'CLEAR_INPUT_FIELD',
        FILTER_LIST: 'FILTER_LIST',
        ADD_CHECKBOX: 'ADD_CHECKBOX',
        REMOVE_CHECKBOX: 'REMOVE_CHECKBOX',
        ADD_DATE_RANGE: 'ADD_DATE_RANGE',
        REMOVE_DATE_RANGE: 'REMOVE_DATE_RANGE',
        SET_FILTER_STATE: 'SET_FILTER_STATE',
        CLEAR_ALL_FIELDS: 'CLEAR_ALL_FIELDS',
        CLEAR_STATE_FIELDS: 'CLEAR_STATE_FIELDS',
        DATE_CHANGE: 'DATE_CHANGE',
        UPDATE_AUDIENCE_SIZE: 'UPDATE_AUDIENCE_SIZE',
        UPDATE_STATE_FIELD: 'UPDATE_STATE_FIELD',
    }

    const reducer = (state, action) => {
        const { type, field, payload } = action
        const {
            clearStateFields,
            clearAllStateFields,
            shallowHelper,
            deepShallowHelper,
            deepShallowArrayHelper,
            deepShallowFilterHelper,
        } = util
        switch (type) {
            case stateTypes.ADD_CHECKBOX:
                return deepShallowArrayHelper(state, 'list', field, payload)

            case stateTypes.CLEAR_ALL_FIELDS:
                //Clearing all state fields
                return clearAllStateFields(state)

            case stateTypes.CLEAR_INPUT_FIELD:
                return deepShallowHelper(state, 'value', field, '')

            case stateTypes.CLEAR_STATE_FIELDS:
                //Clear State fields but not the filterState
                return clearStateFields(state)

            case stateTypes.DATE_CHANGE:
                return deepShallowHelper(state, 'list', field, payload)

            case stateTypes.FILTER_LIST:
                return deepShallowFilterHelper(state, 'list', field, payload)

            case stateTypes.INPUT_CHANGE:
                return deepShallowHelper(state, 'value', field, payload)

            case stateTypes.REMOVE_CHECKBOX:
                return deepShallowFilterHelper(state, 'list', field, payload)

            case stateTypes.SET_FILTER_STATE:
                return initializeStateFromPayload(state, payload)

            case stateTypes.UPDATE_AUDIENCE_SIZE:
                return deepShallowHelper(state, 'list', field, payload)

            case stateTypes.UPDATE_FILTER_LIST:
                return deepShallowArrayHelper(state, 'list', field, payload)

            case stateTypes.UPDATE_STATE_FIELD:
                return shallowHelper(state, { [field]: payload })

            default:
                return state
        }
    }

    const applyBtnRef = useRef({})
    const [state, dispatch] = useReducer(reducer, initialState)
    const actionsRef = useRef({})
    const filterMenuRef = useRef({})

    useEffect(() => {
        dispatch({
            type: stateTypes.SET_FILTER_STATE,
            payload: appliedFilters,
        })
        enableClearAllButton(appliedFilters)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [appliedFilters])

    const inputChangeHandler = useCallback(e => {
        dispatch({
            type: stateTypes.INPUT_CHANGE,
            field: e.target.name,
            payload: e.target.value,
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const updateFilterList = useCallback((value, name) => {
        dispatch({
            type: stateTypes.UPDATE_FILTER_LIST,
            field: name,
            payload: value,
        })

        dispatch({
            type: stateTypes.CLEAR_INPUT_FIELD,
            field: name,
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const removeFilterList = useCallback((value, name) => {
        dispatch({
            type: stateTypes.FILTER_LIST,
            field: name,
            payload: value,
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const checkboxHandler = useCallback(e => {
        if (e.target.checked) {
            dispatch({
                type: stateTypes.ADD_CHECKBOX,
                field: e.target.name,
                payload: e.target.id,
            })
        } else {
            dispatch({
                type: stateTypes.REMOVE_CHECKBOX,
                field: e.target.name,
                payload: e.target.id,
            })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const dateChangeHandler = useCallback(
        (value, name) => {
            let dateRange = state.date_range.list
            if (name === 'startDate') {
                dateRange[0] = value
            } else {
                dateRange[1] = value
            }
            if (dateRange.every(date => date === null)) {
                dateRange = []
            }
            dispatch({
                type: stateTypes.DATE_CHANGE,
                field: 'date_range',
                payload: dateRange,
            })
        },

        // eslint-disable-next-line react-hooks/exhaustive-deps
        [state.date_range]
    )

    const clearAllHandler = useCallback(() => {
        applyBtnRef.current.isEnable = false
        dispatch({
            type: stateTypes.CLEAR_ALL_FIELDS,
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const closeSideMenuHandler = useCallback(() => {
        // dispatch({
        //     type: stateTypes.CLEAR_STATE_FIELDS,
        // })
        dispatch({
            type: stateTypes.SET_FILTER_STATE,
            payload: appliedFilters,
        })
        toggleHandler()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toggleHandler])

    const filterApplyHandler = useCallback(() => {
        const filterState = [...state.filterState]
        filterState.forEach(filter => {
            if (filter.type !== 'string') {
                const key = filter.key
                const { list } = state[key]
                let appliedFilterState = filterState.filter(filterObj => filterObj.key === key)[0]
                const index = filterState.indexOf(appliedFilterState)
                //get the object that needs to be updated, update the object and dispatch the filterState
                if (key === 'date_range') {
                    appliedFilterState = getDateRangeObject(list, appliedFilterState)
                } else if (key === 'created_by' || key === 'updated_by' || key === 'region') {
                    appliedFilterState = getAutoSuggestedObject(key, appliedFilterState)
                } else if (key === 'is_live' || key === 'qa_is_live') {
                    appliedFilterState['post_value'] = util.getStatusValues(list, key)
                    appliedFilterState['display_value'] = list
                } else {
                    appliedFilterState['post_value'] = list
                    appliedFilterState['display_value'] = list
                }
                filterState.splice(index, 1, appliedFilterState)
            }
        })
        dispatchFilters(filterState)
        // dispatch({
        //     type: stateTypes.CLEAR_STATE_FIELDS,
        // })
        toggleHandler()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toggleHandler, dispatchFilters, state])

    const audienceChangeHandler = useCallback((event, value) => {
        dispatch({
            type: stateTypes.UPDATE_AUDIENCE_SIZE,
            field: 'audienceSize',
            payload: value,
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const updateStateFields = useCallback((field, payload) => {
        dispatch({
            type: stateTypes.UPDATE_STATE_FIELD,
            field,
            payload,
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getSuggestedUsersList = (value, key, set) => {
        const searchFromList = key === 'region' ? Object.values(statesList) : state.usersList[key]
        const suggestedList = searchFromList && util.searchByInput(value, searchFromList)
        if (suggestedList && suggestedList.length) {
            suggestedList.forEach(item => set.add(item))
        } else {
            set.add(value)
        }

        return set
    }

    const getDateRangeObject = (list, appliedFilterState) => {
        const isNonEmptyList = list.length > 0 && true
        appliedFilterState['start_value'] = isNonEmptyList
            ? util.getFormattedDate(util.getStartOfDay(list[0]), 'YYYY-MM-DDTHH:mm:ss.SSS[Z]')
            : ''
        appliedFilterState['end_value'] = isNonEmptyList
            ? util.getFormattedDate(util.getEndOfDay(list[1]), 'YYYY-MM-DDTHH:mm:ss.SSS[Z]')
            : ''
        appliedFilterState['display_value'] = isNonEmptyList
            ? util.getScheduleDateRange(list[0], list[1])
            : []
        return appliedFilterState
    }

    const getAutoSuggestedObject = (key, appliedFilterState) => {
        const { value, list } = state[key]
        let newPostValueList = new Set([])
        // get the auto suggest values for all the entered and pill list values that are applicable for filter
        if (list.length > 0) {
            list.forEach(item => {
                newPostValueList = getSuggestedUsersList(item, key, newPostValueList)
            })
        }
        if (value && value.length > 0) {
            list.indexOf(value) === -1 && list.push(value)
            //If a value is entered and not added to the pill list, get the suggested users list for the value entered
            newPostValueList = getSuggestedUsersList(value, key, newPostValueList)
        }
        let updatedPostList = Array.from(newPostValueList)
        if (key === 'region') {
            updatedPostList = getRegionObject(updatedPostList)
        }
        appliedFilterState['post_value'] = updatedPostList
        appliedFilterState['display_value'] = list
        return appliedFilterState
    }

    const enableClearAllButton = appliedFilters => {
        //Enable Clear All button only if a filter is already applied
        let enableClearAllBtn = false
        appliedFilters.forEach(({ key, display_value }) => {
            if (key !== 'name' && display_value.length > 0 && !enableClearAllBtn) {
                enableClearAllBtn = true
                dispatch({
                    type: stateTypes.UPDATE_STATE_FIELD,
                    field: 'enableClearAll',
                    payload: true,
                })
            }
        })
    }

    const getRegionObject = updatedPostList => {
        const regionPostList = []
        updatedPostList.forEach(region => {
            const regionCode =
                region === 'National' ? 'all' : util.getKeyByValue(statesList, region)
            regionPostList.push(regionCode)
        })
        return regionPostList
    }

    return {
        applyBtnRef,
        audienceChangeHandler,
        checkboxHandler,
        clearAllHandler,
        closeSideMenuHandler,
        dateChangeHandler,
        dispatch,
        filterApplyHandler,
        inputChangeHandler,
        removeFilterList,
        state,
        stateTypes,
        updateFilterList,
        updateStateFields,
        filterMenuRef,
        actionsRef,
    }
}
