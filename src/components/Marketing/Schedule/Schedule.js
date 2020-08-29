import React, { memo, useReducer, useCallback, useEffect } from 'react'
import moment from 'moment'

import { util } from '../../../util'
import { SchedulePicker, RepeatSetting } from '../../common'
import { strings } from '../../../strings'

const Schedule = ({ schedule, setSchedule, className, scheduledDates }) => {
    const today = moment().format('MM/DD/YYYY')

    /* returns a rounded time moment object, 10:16 am will be converted to 10:30 am (moment object) */
    const startTime = util.calcStartTime()
    const initialState = {
        startDate: {
            option: !schedule ? today : null,
            error: '',
        },
        endDate: {
            option: !schedule ? (startTime.hour() === 23 ? moment().add(1, 'days') : today) : null,
            error: '',
        },
        startTime: {
            option: !schedule ? startTime.format('LT') : '',
            error: '',
        },
        endTime: {
            option: !schedule ? startTime.add(1, 'hours').format('LT') : '',
            error: '',
        },
        isAllDay: false,
        repeat: {
            option: 'Does Not Repeat',
            counter: 1,
            error: '',
        },
    }

    const stateTypes = {
        IS_ALL_DAY: 'IS_ALL_DAY',
        CHANGE_OPTION: 'CHANGE_OPTION',
        INCREMENT_COUNTER: 'INCREMENT_COUNTER',
        DECREMENT_COUNTER: 'DECREMENT_COUNTER',
        ERROR: 'ERROR',
        CLEAR_ERROR: 'CLEAR_ERROR',
        COUNTER_INPUT_CHANGE: 'COUNTER_INPUT_CHANGE',
        UPDATE_MULTIPLE_FIELDS: 'UPDATE_MULTIPLE_FIELDS',
    }

    const scheduleReducer = (state, action) => {
        const { type, payload, field } = action
        const { shallowHelper, deepShallowHelper } = util
        switch (type) {
            case stateTypes.IS_ALL_DAY:
                return shallowHelper(state, { isAllDay: !state.isAllDay })

            case stateTypes.CHANGE_OPTION:
                return deepShallowHelper(state, 'option', field, payload)

            case stateTypes.ERROR:
                return deepShallowHelper(state, 'error', field, payload)

            case stateTypes.CLEAR_ERROR:
                return deepShallowHelper(state, 'error', field, '')

            case stateTypes.INCREMENT_COUNTER:
                return field === 'monthly' && state[field].counter >= 31
                    ? state
                    : deepShallowHelper(state, 'counter', field, state[field].counter + 1)

            case stateTypes.DECREMENT_COUNTER:
                return state[field].counter - 1 > 0
                    ? deepShallowHelper(state, 'counter', field, state[field].counter - 1)
                    : state

            case stateTypes.COUNTER_INPUT_CHANGE:
                return deepShallowHelper(state, 'counter', field, payload)

            case stateTypes.UPDATE_MULTIPLE_FIELDS:
                return shallowHelper(state, { ...payload })

            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(scheduleReducer, initialState)
    const {
        startDate: { option: startDateOption, error: startDateError },
        endDate: { option: endDateOption, error: endDateError },
        startTime: { option: startTimeOption, error: startTimeError },
        endTime: { option: endTimeOption, error: endTimeError },
        isAllDay,
        repeat: { option: repeatOption, counter: repeatCounter, error: repeatError },
    } = state

    useEffect(() => {
        DiffInDaysValidation()
        setScheduleRequest()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        startDateOption,
        endDateOption,
        startTimeOption,
        endTimeOption,
        repeatOption,
        repeatCounter,
        startDateError,
        endDateError,
        startTimeError,
        endTimeError,
    ])

    useEffect(() => {
        if (!schedule) {
            DiffInDaysValidation()
            setScheduleRequest()
        }
        if (schedule && !schedule.isError) {
            const {
                start_date = null,
                end_date = null,
                all_day = false,
                repeat_daily = {},
            } = schedule
            updateMultipleState({
                startDate: {
                    ...state.startDate,
                    option: util.ISOToLocalTime(start_date).format('MM/DD/YYYY'),
                },
                endDate: {
                    ...state.endDate,
                    option: util.ISOToLocalTime(end_date).format('MM/DD/YYYY'),
                },
                startTime: {
                    ...state.startTime,
                    option: util.ISOToLocalTime(start_date).format('LT'),
                },
                endTime: {
                    ...state.endTime,
                    option: util.ISOToLocalTime(end_date).format('LT'),
                },
                isAllDay: all_day,
                ...(repeat_daily.hasOwnProperty('every') && {
                    repeat: { option: 'Daily', counter: repeat_daily.every },
                }),
            })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [schedule])

    //Function to update multiple state fields
    const updateMultipleState = useCallback(payload => {
        dispatch({
            type: stateTypes.UPDATE_MULTIPLE_FIELDS,
            payload: payload,
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //Handler Responsible to change datepickers and time pickers
    const datePickerChangeHandler = useCallback((value, name) => {
        let isValid = true,
            errorPayload = ''
        if (name === 'startTime' || name === 'endTime') {
            isValid = util.regexTimeValidation.test(value)
            !isValid && (errorPayload = strings.timeFormatError)
        } else {
            isValid = moment(value).isAfter(moment()) || moment(value).isSame(moment(), 'day')
            !isValid && (errorPayload = strings.pastDayError)
        }
        dispatch({
            type: stateTypes.CHANGE_OPTION,
            payload: value,
            field: name,
            option: name,
        })
        dispatch({
            type: stateTypes.ERROR,
            payload: errorPayload,
            field: name,
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //Handler responsible for All day selection
    const toggleAllDay = e => {
        const checked = e.target.checked
        const today = moment()
        const isPreviouslyScheduled = scheduledDates && !scheduledDates.all_day
        dispatch({
            type: stateTypes.IS_ALL_DAY,
        })
        const start_time = checked
            ? util.getStartOfDay(today)
            : isPreviouslyScheduled
            ? moment(scheduledDates.start_date).utc()
            : util.calcStartTime()
        const end_time = checked
            ? util.getEndOfDay(today)
            : isPreviouslyScheduled
            ? moment(scheduledDates.end_date).utc()
            : util.calcStartTime().add(1, 'hours')
        updateMultipleState({
            startTime: { option: start_time.format('LT') },
            endTime: { option: end_time.format('LT') },
        })
    }

    //Checks for errors and clears them
    const clearError = () => {
        updateMultipleState({
            ...(startDateError && { startDate: { ...state.startDate, error: '' } }),
            ...(endDateError && { endDate: { ...state.endDate, error: '' } }),
            ...(startTimeError && { startTime: { ...state.startTime, error: '' } }),
            ...(endTimeError && { endTime: { ...state.endTime, error: '' } }),
        })
    }

    //Handler responsible to change repeat option
    const optionChangeHandler = useCallback(
        (value, name) => dispatch({ type: stateTypes.CHANGE_OPTION, payload: value, field: name }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    //Handler responsible for counter increment and decrement
    const counterChangeHandler = useCallback((label, counterName) => {
        counterName === 'arrowUp'
            ? dispatch({
                  type: stateTypes.INCREMENT_COUNTER,
                  field: label,
              })
            : dispatch({
                  type: stateTypes.DECREMENT_COUNTER,
                  field: label,
              })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //Handler responsible for input change in counter
    const counterInputHandler = useCallback((value, field) => {
        const inputValue = parseInt(value)
        inputValue <= 0
            ? dispatch({
                  type: stateTypes.COUNTER_INPUT_CHANGE,
                  field: field,
                  payload: 1,
              })
            : dispatch({
                  type: stateTypes.COUNTER_INPUT_CHANGE,
                  field: field,
                  payload: inputValue,
              })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //Handler responsible for counter blur function
    //check if the counter value is empty, default the value to 1
    const counterBlurHandler = useCallback(e => {
        const { value, name } = e.target
        if (value === '') {
            dispatch({
                type: stateTypes.COUNTER_INPUT_CHANGE,
                field: name,
                payload: 1,
            })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const setScheduleRequest = () => {
        const isValid = checkForValidation()
        let payload = null
        if (isValid !== null) {
            payload = {}
            if (isValid) {
                payload['start_date'] = util.toISOString(startDateOption, startTimeOption)
                payload['end_date'] = util.toISOString(endDateOption, endTimeOption)
                payload['all_day'] = isAllDay

                if (repeatOption !== 'Does Not Repeat') {
                    const isRepeat = {
                        every: repeatCounter,
                    }
                    if (state.repeat.option === 'Daily') {
                        payload['repeat_daily'] = isRepeat
                    }
                }
            } else {
                payload['isError'] = true
            }
        }
        setSchedule(payload)
    }

    const DiffInDaysValidation = () => {
        if (startDateOption && endDateOption && startTimeOption && endTimeOption) {
            if (
                !(
                    (startTimeError && startTimeError.includes('Please')) ||
                    (endTimeError && endTimeError.includes('Please')) ||
                    (startDateError && startDateError.includes('past')) ||
                    (endDateError && endDateError.includes('past'))
                )
            ) {
                const startTimestamp = moment(`${startDateOption} ${startTimeOption}`)
                const endTimestamp = moment(`${endDateOption} ${endTimeOption}`)
                const diffInMinutes = moment.duration(endTimestamp.diff(startTimestamp)).asMinutes()
                const diffInDays = moment
                    .duration(moment(endDateOption).diff(moment(startDateOption)))
                    .asDays()

                if (diffInDays < 0) {
                    dispatch({
                        type: stateTypes.ERROR,
                        field: 'endDate',
                        payload: strings.dateRangeError,
                    })
                } else if (diffInMinutes <= 0) {
                    dispatch({
                        type: stateTypes.ERROR,
                        field: 'endTime',
                        payload: strings.timeRangeError,
                    })
                } else {
                    clearError()
                }
            }
        }
    }

    //Function that validates the dates and enable the save button based on the conditions
    const checkForValidation = () => {
        //If none of the dates and All day and repeat option are selected, then enable save button
        if (
            !startDateOption &&
            !endDateOption &&
            !startTimeOption &&
            !endTimeOption &&
            !isAllDay &&
            repeatOption === 'Does Not Repeat'
        ) {
            return null
        } //If all the values are entered and valid, then enable save button
        else if (
            startDateOption &&
            endDateOption &&
            startTimeOption &&
            endTimeOption &&
            !startTimeError &&
            !endTimeError &&
            !startDateError &&
            !endDateError &&
            moment(startDateOption).isValid() &&
            moment(endDateOption).isValid()
        ) {
            return true
        } else {
            return false
        } //If the scheduled dates are incomplete, then disable save button
    }

    return (
        <div className={util.joinClasses('schedule', className)}>
            <div className={'schedule__content'}>
                <SchedulePicker
                    startDate={startDateOption}
                    startTime={startTimeOption}
                    endDate={endDateOption}
                    endTime={endTimeOption}
                    isAllDay={isAllDay}
                    toggleAllday={toggleAllDay}
                    startTimeError={startTimeError}
                    endTimeError={endTimeError}
                    startDateError={startDateError}
                    endDateError={endDateError}
                    datePickerChangeHandler={datePickerChangeHandler}
                />
                <div className={'schedule__repeat-setup'}>
                    <RepeatSetting
                        repeatOption={repeatOption}
                        repeatCounter={repeatCounter}
                        repeatError={repeatError}
                        RepeatOptionHandler={optionChangeHandler}
                        counterChangeHandler={counterChangeHandler}
                        InputCounterHandler={counterInputHandler}
                        counterBlurHandler={counterBlurHandler}
                        name={'every'}
                    />
                </div>
            </div>
        </div>
    )
}

export default memo(Schedule)
