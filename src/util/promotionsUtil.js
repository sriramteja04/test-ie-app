import { constants } from '../constants'
import { common } from './common'
import moment from 'moment'

export const promotions = {
    regexTimeValidation: /(((0[1-9])|(1[0-2])):([0-5])([0-9])\s(A|P|a|p)(M|m))/,

    clearStateFields: state => {
        const updatedState = { ...state }
        Object.keys(updatedState).forEach(field => {
            if (
                typeof updatedState[field] === 'object' &&
                updatedState[field] &&
                field !== 'filterState'
            ) {
                const updatedStateField = updatedState[field]
                updatedStateField['value'] = ''
                updatedStateField['list'] = []
                updatedState[field] = updatedStateField
            } else if (field !== 'filterState') {
                updatedState[field] = ''
            }
        })
        return updatedState
    },

    clearAllStateFields: state => {
        //Clear All fields in the filter side menu
        const clearingState = { ...state }
        const filterState = [...clearingState['filterState']]
        filterState.forEach(({ key }) => {
            if (key !== 'name') {
                key === 'audienceSize'
                    ? (clearingState[key]['list'] = [0, 0])
                    : (clearingState[key]['list'] = [])
                if (clearingState[key]['value']) {
                    clearingState[key]['value'] = ''
                }
            }
        })
        clearingState['startDateError'] = ''
        clearingState['endDateError'] = ''
        clearingState['enableClearAll'] = true
        return clearingState
    },

    editConfigWarningMsg: section =>
        `You are about to save changes to your ${section} settings. This change will result in new Marketing Content Configurations, and Prioritization Rules that may need your attention in step 4 and 5 of your setup.`,

    listOfTime: () => {
        let startTime = moment(promotions.calcStartTime())
        const endTime = moment(startTime).add(1, 'days')

        const timeList = []
        while (startTime.isBefore(endTime)) {
            timeList.push(common.getFormattedDate(startTime.valueOf(), 'hh:mm a'))
            startTime = moment(startTime).add(30, 'minutes')
        }
        timeList.sort(function(a, b) {
            return new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b)
        })
        return timeList
    },

    calcStartTime: () => {
        const ROUNDING = 30 * 60 * 1000
        return moment(Math.ceil(+moment() / ROUNDING) * ROUNDING)
    },

    _QAStatus: qa => (qa ? 'Disable QA Testing for' : 'Enable QA Testing for'),

    _ProdStatus: prod => (prod ? 'Unpublish from Production' : 'Publish to Production'),

    toCommas: value => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),

    getStatusValues: (list, env) => {
        const mappedList = []
        if (list.length > 0) {
            const mappedValues =
                env === 'is_live' ? constants.publishStatusMap : constants.publishQAStatusMap
            list.forEach(val => {
                const value = val.split(' ').join('_')
                mappedList.push(mappedValues[value])
            })
        }
        return mappedList
    },

    getRegionsList: configurations =>
        common
            .findUniqueValues(configurations, 'region')
            .map(code => (code === 'all' ? 'National' : constants.statesList[code]))
            .filter(val => val),

    getRegionByCode: regionCode => {
        return regionCode === 'all' ? 'National' : constants.statesList[regionCode]
    },

    getRegionCodesList: statesList => {
        const regionCodesList = []
        if (statesList && statesList.length) {
            statesList.forEach(state => {
                regionCodesList.push(common.getKeyByValue(constants.statesList, state))
            })
        }
        return regionCodesList
    },

    getUniqueAppPlacements: configs => {
        const set = new Set()
        configs.forEach(({ app, placement_location }) => {
            set.add(app + ' ' + placement_location)
        })
        return [...set.values()]
    },
    prioritizePromosPayload: (start, end) => ({
        search: {
            start_date: start,
            end_date: end,
            status: ['scheduled', 'live', 'finished'],
        },
        sort: { start_date: 'asc' },
        size: 250 /* size is a hardcoded value */,
        pageNo: 1,
    }),

    prioritizingPromos: promos => promos.sort((a, b) => a.priority - b.priority),

    isPromoExisted: (schedule, currentDate) => {
        let showPromo = false
        const { repeat_weekly = null } = schedule

        if (!repeat_weekly) {
            showPromo = true
        } else if (repeat_weekly) {
            showPromo =
                repeat_weekly.repeat_day_of_week.find(day => {
                    return day === currentDate.format('ddd').toLowerCase()
                }) && true
        }
        return showPromo
    },
}
