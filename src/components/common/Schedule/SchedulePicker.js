import React, { memo } from 'react'

import { Checkbox, DatePicker, SelectInput } from '../index'
import { util } from '../../../util'
import { useIconHandler } from '../../Custom Hooks/useCustomHooks'
import moment from 'moment'

const SchedulePicker = ({
    startDate,
    startTime,
    endDate,
    endTime,
    isAllDay,
    toggleAllday,
    datePickerChangeHandler,
    startTimeError,
    endTimeError,
    startDateError,
    endDateError,
}) => {
    const _renderEndProps = () => useIconHandler(util.AccessTimeIcon)
    const today = moment()
    const minStartDate = moment(startDate).isBefore(today) ? startDate : today
    const timePickerOptions = util.listOfTime()
    return (
        <div className={'schedule__time mb-3'}>
            <p className={'paragraph bold'}>
                Set the time interval(s) you would like your marketing content to remain in effect.
            </p>
            <div className={'pickers'}>
                <DatePicker
                    minDate={minStartDate}
                    handleDateChange={datePickerChangeHandler}
                    selectedDate={startDate}
                    name={'startDate'}
                    label={'Start Date'}
                    error={startDateError}
                    size={'sm'}
                />
                {!isAllDay && (
                    <SelectInput
                        margin={'ml-4'}
                        size={'md'}
                        value={startTime}
                        onChange={datePickerChangeHandler}
                        error={startTimeError}
                        label={'Start Time'}
                        name={'startTime'}
                        options={timePickerOptions}
                        readOnly={false}
                        inputProps={{ end: _renderEndProps }}
                    />
                )}
                <p className={'ml-5 mr-5'}> to </p>
                <DatePicker
                    minDate={startDate}
                    handleDateChange={datePickerChangeHandler}
                    selectedDate={endDate}
                    name={'endDate'}
                    label={'End Date'}
                    size={'sm'}
                    error={endDateError}
                />
                {!isAllDay && (
                    <SelectInput
                        margin={'ml-4'}
                        size={'md'}
                        onChange={datePickerChangeHandler}
                        value={endTime}
                        error={endTimeError}
                        label={'End Time'}
                        name={'endTime'}
                        options={timePickerOptions}
                        readOnly={false}
                        inputProps={{ end: _renderEndProps }}
                    />
                )}
            </div>
            <p className={'schedule__rule-label paragraph italic text mt-5'}>
                All dates and times are in customer local time.{' '}
            </p>
            <div className={'schedule__allDay'}>
                <Checkbox
                    label={'All day'}
                    margin={'ml-0'}
                    checked={isAllDay}
                    onChange={toggleAllday}
                />
            </div>
        </div>
    )
}

export default memo(
    SchedulePicker,
    (prevProps, nextProps) =>
        !(
            prevProps.startDate !== nextProps.startDate ||
            prevProps.endDate !== nextProps.endDate ||
            prevProps.startTime !== nextProps.startTime ||
            prevProps.endTime !== nextProps.endTime ||
            prevProps.startTimeError !== nextProps.startTimeError ||
            prevProps.endTimeError !== nextProps.endTimeError ||
            prevProps.isAllDay !== nextProps.isAllDay ||
            prevProps.startDateError !== nextProps.startDateError ||
            prevProps.endDateError !== nextProps.endDateError
        )
)
