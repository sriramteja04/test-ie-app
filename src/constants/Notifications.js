export const notificationConstants = {
    notificationsHeadCells: [
        { id: 'title', label: 'Push Title', align: 'left', draggable: false, width: '14%' },
        {
            id: 'message',
            label: 'Message',
            sortable: true,
            align: 'left',
            draggable: true,
            width: '20%',
        },
        {
            id: 'total_sent_count',
            label: 'Audience',
            sortable: true,
            align: 'right',
            draggable: true,
            width: '8%',
        },
        { id: 'startDate', label: 'Start Date/Time', align: 'left', draggable: true, width: '14%' },
        { id: 'createdDate', label: 'Created', align: 'left', draggable: true, width: '8%' },
        { id: 'published', label: 'Published', align: 'left', draggable: true, width: '15%' },
        { id: 'status', label: 'Status', align: 'left', draggable: true, width: '10%' },
        { id: 'action', label: 'Action', align: 'left', draggable: false, width: '6%' },
    ],
    pushNotificationFilterLabels: [
        { key: 'pushNotificationId', label: 'Push Notification ID', after: 'comma' },
        { key: 'createdBy', label: 'Created By', after: 'comma' },
        { key: 'lastModifiedBy', label: 'Last Modified', after: 'comma' },
        { key: 'status', label: 'Status', after: 'comma' },
        { key: 'audienceSize', label: 'Audience Size', after: 'hyphen' },
        { key: 'date_range', label: 'Date Range', after: 'hyphen' },
    ],
    pushNotificationStatusFields: ['Published', 'Unpublished', 'Scheduled', 'Incomplete', 'Sent'],
    rangeSliderMarks: [
        {
            value: 0,
            label: '0k',
        },
        {
            value: 100,
            label: '100k',
        },
    ],
}
