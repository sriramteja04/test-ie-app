import moment from 'moment'

export const common = {
    joinClasses: (...args) =>
        args
            .map(list => list)
            .filter(Boolean)
            .join(' '),

    getSorting: (order, orderBy) =>
        order === 'desc'
            ? (a, b) => common.desc(a, b, orderBy)
            : (a, b) => -common.desc(a, b, orderBy),

    desc: (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy]) {
            return -1
        }
        if (b[orderBy] > a[orderBy]) {
            return 1
        }
        return 0
    },

    sessionExpiresInMS: expiresAt => expiresAt * 1000 - new Date().getTime(),

    stableSort: (array, cmp) => {
        const stabilizedThis = array.map((el, index) => {
            return [el, index]
        })
        stabilizedThis.sort((a, b) => {
            const order = cmp(a[0], b[0])
            return order !== 0 ? order : a[1] - b[1]
        })
        return stabilizedThis.map(el => el[0])
    },

    thousands_separators: num => {
        const num_parts = num.toString().split('.')
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        return num_parts.join('.')
    },

    intToString: value => {
        const suffixes = ['', 'k', 'm', 'b', 't']
        const suffixNum = Math.floor(('' + value).length / 4)
        let shortValue = parseFloat(
            (suffixNum !== 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(2)
        )
        if (shortValue % 1 !== 0) {
            shortValue = shortValue.toFixed(1)
        }
        return shortValue + suffixes[suffixNum]
    },

    deepShallowHelper: (state, prop, field, payload) => {
        const updatedState = { ...state } //Shallow Copy
        const selectOptions = { ...updatedState[field] } //Deep Copy
        selectOptions[prop] = payload // Change value
        updatedState[field] = selectOptions //updating Repeat/End object to updatedState
        return updatedState
    },

    deepShallowArrayHelper: (state, prop, field, payload) => {
        const updatedState = { ...state }
        const selectOptions = { ...updatedState[field] }
        selectOptions[prop] = [...selectOptions[prop], payload]
        updatedState[field] = selectOptions
        return updatedState
    },

    deepShallowFilterHelper: (state, prop, field, payload) => {
        const updatedState = { ...state }
        const selectOptions = { ...updatedState[field] }
        selectOptions[prop] = selectOptions[prop].filter(el => el !== payload)
        updatedState[field] = selectOptions
        return updatedState
    },

    cloneArrOfObj: arr => arr.map(obj => ({ ...obj })),

    shallowHelper: (state, updatedFields) => ({ ...state, ...updatedFields }),

    /**
     *
     * @param list: {Array} ['a','b','c','d']
     * @returns {String} a, b, c, d
     */
    getStringsFromArray: list =>
        list.reduce(
            (acc, item, i) => (i === 0 ? (item === 'all' ? 'National' : item) : `${acc}, ${item}`),
            ''
        ),

    getMaxIndex: (list, maxChar) => {
        let maxLength = 0
        let maxIndex = 0

        for (let i = 0; i < list.length; i++) {
            if (maxLength <= maxChar) {
                maxLength += list[i].length
            } else {
                maxIndex = i
                break
            }
        }

        /**
         * The following operation is to make sure, if the characters
         * are less than maxChar then return the length of the list but not 0
         */
        maxIndex = maxIndex === 0 ? list.length : maxIndex

        return maxIndex
    },

    promoUpdatedBy: (data, email) => {
        data.promo['updated_by'] = email
        return data
    },

    regexString: string => string.replace(/\s\s+/g, ' ').trim(),

    findUniqueValues: (list, value) => {
        const uniqueSet = new Set()
        list.forEach(el => {
            if (el[value]) {
                uniqueSet.add(el[value])
            }
        })
        return [...uniqueSet.values()]
    },

    findUniqueNestedValues: (list, prop, nestedProp) => {
        const uniqueSet = new Set()
        list.forEach(el => {
            if (el[prop]) {
                uniqueSet.add(el[prop][nestedProp])
            }
        })
        return [...uniqueSet.values()]
    },

    getScheduleDateRange: (startDate, endDate) =>
        `${common.getFormattedDate(startDate, 'MMM D')} - ${common.getFormattedDate(
            endDate,
            'MMM D, yyyy'
        )}`,
    getMax: array => Math.max.apply(Math, array),

    getMin: array => Math.min.apply(Math, array),

    searchByInput: (value, list) => {
        let searchedList = []
        list &&
            list.length > 0 &&
            (searchedList = list.filter(item =>
                item
                    .toString()
                    .toLowerCase()
                    .includes(value.toString().toLowerCase())
            ))
        return searchedList
    },

    /**
     *
     * @param value {date}
     * @param formatValue {format}
     * @returns {string} Example format'24 Mar, 2020'
     */
    getFormattedDate: (value, formatValue) => (value ? moment(value).format(formatValue) : null),

    getKeyByValue: (object, value) => {
        return Object.keys(object).find(key => object[key].toLowerCase() === value.toLowerCase())
    },

    getPartialContentDateRange: (startDate, endDate) =>
        `${common.getFormattedDate(startDate, 'MMM D, yyyy hh:mm a')} - ${common.getFormattedDate(
            endDate,
            'MMM D, yyyy hh:mm a'
        )}`,

    replaceStrUNS: str => str.replace(' ', '_'),
    weeks: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
}
