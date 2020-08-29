import React, { memo, useEffect, useState } from 'react'
import moment from 'moment'

import { constants } from '../../../constants'
import { util } from '../../../util'
import { Icon } from '../index'

const weeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

/**
 *
 * @param renderEvents {renderProps} -> renders Event pop up after clicking on any event.
 * @param monthChangeHandler {callback} -> callback to handle month change events
 * @param selectedMonth {Number} ->
 * @param selectedYear {Number} ->
 * @param setMonth
 * @param setYear
 * @returns {*}
 */
const MonthScheduler = ({
    renderEvents,
    scheduleFilters,
    selectedMonth,
    selectedYear,
    setMonth,
    setYear,
}) => {
    const [startingWeek, setStartingWeek] = useState(null)
    const [endingWeek, setEndingWeek] = useState(null)

    useEffect(() => {
        const currentFirstWeekNum = moment(new Date(selectedYear, selectedMonth, 1)).week()

        let currentLastWeekNum

        if (selectedMonth !== 11) {
            currentLastWeekNum = moment(new Date(selectedYear, selectedMonth))
                .endOf('month')
                .week()
        } else {
            currentLastWeekNum = moment(new Date()).isoWeeksInYear()
        }

        setStartingWeek(currentFirstWeekNum)
        setEndingWeek(currentLastWeekNum)
    }, [selectedMonth, selectedYear])

    const _getDateFormat = (week, day) => {
        const date = util.getDateFromWeekAndDayNumber(selectedYear, week, day)
        return moment(date).date() === 1 ? moment(date).format('MMM DD') : moment(date).format('DD')
    }

    const monthClickHandler = arrowType => {
        if (arrowType === 'forward') {
            if (selectedMonth === 11) {
                setMonth(0)
                setYear(selectedYear + 1)
            }
            if (selectedMonth < 11) setMonth(selectedMonth + 1)
        } else {
            if (selectedMonth === 0) {
                setMonth(11)
                setYear(selectedYear - 1)
            }
            if (selectedMonth > 0) setMonth(selectedMonth - 1)
        }
    }

    const yearClickHandler = arrowType => {
        // const arrowType = e.target.name
        if (arrowType === 'forward') {
            if (selectedYear > 2019) {
                setYear(selectedYear + 1)
            }
        } else {
            if (selectedYear > 2020) {
                setYear(selectedYear - 1)
            }
        }
    }

    // const ForwardBackward = ({ onClickHandler, currentValue }) => (
    //     <div className={'icons'}>
    //         <Icon name={'backward'} pointer={true} size={'xs'} onClick={onClickHandler}>
    //             {util.ArrowBackIosIcon()}
    //         </Icon>
    //         <p className={'text'}>{currentValue}</p>
    //         <Icon name={'forward'} pointer={true} size={'xs'} onClick={onClickHandler}>
    //             {util.ArrowForwardIosIcon()}
    //         </Icon>
    //     </div>
    // )

    // const renderScheduleActions = () => (
    //     <>
    //         <ForwardBackward
    //             currentValue={constants.months[selectedMonth]}
    //             onClickHandler={monthClickHandler}
    //         />
    //         <ForwardBackward currentValue={selectedYear} onClickHandler={yearClickHandler} />
    //     </>
    // )

    const renderScheduleTools = () => (
        <>
            <div className={'icons'}>
                <Icon
                    pointer={true}
                    size={'xs'}
                    onClick={() => monthClickHandler('backward')}
                    renderIcon={util.ArrowBackIosIcon}
                />
                <p className={'text'}>{constants.months[selectedMonth]}</p>
                <Icon
                    pointer={true}
                    size={'xs'}
                    onClick={() => monthClickHandler('forward')}
                    renderIcon={util.ArrowForwardIosIcon}
                />
            </div>
            <div className={'icons'}>
                <Icon
                    pointer={true}
                    size={'xs'}
                    onClick={() => yearClickHandler('backward')}
                    renderIcon={util.ArrowBackIosIcon}
                />
                <p className={'text'}>{selectedYear}</p>
                <Icon
                    pointer={true}
                    size={'xs'}
                    onClick={() => yearClickHandler('forward')}
                    renderIcon={util.ArrowForwardIosIcon}
                />
            </div>
        </>
    )

    const renderDateCells = () => {
        const dateCells = []
        // Iterating from start of the week to end of the week in a month
        for (let i = startingWeek; i <= endingWeek; i++) {
            // Iterating from Sunday(0) to Saturday(6)
            for (let j = 0; j <= 6; j++) {
                const tooltipPosition = j <= 3 ? 'right' : 'left'
                dateCells.push(
                    <div className={'grid-row--date-cell'} key={`${i}${j}`}>
                        <span className={'curr-date'}>{_getDateFormat(i, j)}</span>
                        {renderEvents && renderEvents(i, j, tooltipPosition)}
                    </div>
                )
            }
        }
        return dateCells
    }

    return (
        <div className={'scheduler'}>
            <div className={'scheduler__toolbar'}>
                {renderScheduleTools()}
                {scheduleFilters && scheduleFilters()}
            </div>
            <div className={'scheduler__grid-system'}>
                <div className={'grid-row'}>
                    {weeks.map(day => (
                        <div className={'grid-row--header'} key={day}>
                            {day}
                        </div>
                    ))}
                </div>
                <div className={'grid-row'}>
                    {startingWeek && endingWeek && renderDateCells().map(child => child)}
                </div>
            </div>
        </div>
    )
}

export default memo(MonthScheduler)
