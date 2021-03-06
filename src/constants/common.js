export const customConstants = {
    endList: ['Never', 'Until', 'Count'],
    repeatList: ['Does Not Repeat', 'Daily'],
    ocurrenceList: ['First', 'Second', 'Third', 'Fourth', 'Last'],
    months: {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December',
    },
    dayList: [
        { key: 'sun', value: 'Sunday' },
        { key: 'mon', value: 'Monday' },
        { key: 'tue', value: 'Tuesday' },
        { key: 'wed', value: 'Wednesday' },
        { key: 'thu', value: 'Thursday' },
        { key: 'fri', value: 'Friday' },
        { key: 'sat', value: 'Saturday' },
    ],
    roles: {
        admin: 'USER-7NOW Admin Portal Administrators',
        user: 'USER-7NOW Admin Portal Users',
        admin_test: 'USER-7NOW Admin Portal Administrator - TEST',
        user_test: 'USER-7NOW Admin Portal Users - TEST',
    },
    networkErrors: {
        Network_Error: 'There is a Network issue, Please check your Internet Connection',
        Internal_Server_Error: 'Server Error, Please try again',
        timeout_of_0ms_exceeded: 'Server time out, Please try again',
    },
    routePaths: {
        dashboard: '/dashboard',
        promotions: '/dashboard/promotions',
        promo_details: '/dashboard/promotions/:promoId',
        marketing: '/dashboard/promotions/:promoId/marketing',
        prioritize_promos: '/dashboard/promotions/prioritize-promos',
    },
    PROMO_COLORS: [
        '#32C5FF',
        '#44D7B6',
        '#F8CC46',
        '#9861D8',
        '#FA6400',
        '#425AF6',
        '#C7B556',
        '#EA4161',
        '#EC69C0',
        '#A8D04B',
    ],
}
