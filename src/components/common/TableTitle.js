import React, { memo } from 'react'

import { strings } from '../../strings'

/**
 *
 * @param title
 * @param listLength
 * @returns {*}
 * @constructor
 */
const TableTitle = ({ title, listLength }) => {
    return (
        <div className={'table__title'}>
            <p className={'heading-secondary'}>{title}</p>
            <p className={'paragraph sub regular ml-6'}>
                {listLength} {strings.tableItems}
            </p>
        </div>
    )
}

export default memo(TableTitle)
