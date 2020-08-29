import React, { memo } from 'react'

import { Icon } from '../index'
import { util } from '../../../util'

const TableSortLabel = ({ direction, children, sortable, active, ...rest }) => {
    const renderIcon = active && direction === 'asc' ? util.ArrowDropUpIcon : util.ArrowDropDownIcon
    return (
        <span className={'cell-flex-direction'} {...rest}>
            <span>{children}</span>
            {sortable ? (
                <Icon size={'sm'} pointer={true} display={'inline'} renderIcon={renderIcon} />
            ) : null}
        </span>
    )
}

export default memo(TableSortLabel)
