import React, { memo } from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'
import { util } from '../../../util'

const Calendar = ({ currWeek, selectedYear, renderPlacements, cellClickHandler }) => {
    const renderDay = (date, day) => {
        const isToday = date.isSame(moment(), 'day')

        return (
            <div className={'cell grid-date'}>
                <p className={util.joinClasses('grid-date__day', isToday && 'today')}>
                    {util.weeks[day]}
                </p>
                <p className={util.joinClasses('grid-date__date', isToday && 'today')}>
                    {date.format('D')}
                </p>
            </div>
        )
    }

    const renderGridColumns = () =>
        util.weeks.map((day, i) => {
            const currDate = util.getDateFromWeekAndDayNumber(selectedYear, currWeek, i)
            const onClickHandler = () => cellClickHandler(currDate)

            return (
                <div className={'calendar__column'} onClick={onClickHandler} key={i}>
                    {renderDay(currDate, i)}
                    {renderPlacements ? renderPlacements(currDate) : null}
                </div>
            )
        })

    return <div className={'calendar'}>{renderGridColumns()}</div>
}

Calendar.propTypes = {
    currWeek: PropTypes.number,
    selectedYear: PropTypes.number,
    renderPlacements: PropTypes.func,
    cellClickHandler: PropTypes.func,
}

export default memo(Calendar)
