import moment from 'moment'

export const dateUtil = {
    getDateFromWeekAndDayNumber: (year, week, day) =>
        moment()
            .year(year)
            .week(week)
            .day(day),

    ISOToLocalTime: date => moment(date).utc(),

    toISOString: (date, time) =>
        moment(`${date} ${time}`, 'MM/DD/YYYY HH:mm a').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),

    toISOStartOfDate: momentDate => momentDate.format('YYYY-MM-DDT00:00:00.000[Z]'),

    toISOEndOfDate: momentDate => momentDate.format('YYYY-MM-DDT23:59:59.000[Z]'),

    tableDateRange: (start, end) =>
        `${moment(start)
            .utc()
            .format('D MMM')} - ${moment(end)
            .utc()
            .format('D MMM, YYYY')}`,

    ISOtoFullDay: date =>
        moment(date)
            .utc()
            .format('MM/DD/YYYY'),

    betweenIN: (currDate, startDate, endDate) =>
        moment(currDate.format('MM/DD/YYYY')).isBetween(
            dateUtil.ISOtoFullDay(startDate),
            dateUtil.ISOtoFullDay(endDate),
            undefined,
            '[]'
        ),

    getStartOfDay: date => moment(date).startOf('day'),

    getEndOfDay: date => moment(date).endOf('day'),
}
