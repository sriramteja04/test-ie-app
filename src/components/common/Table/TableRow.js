import React, { memo } from 'react'
import { util } from '../../../util'

const TableRow = ({ hover, selected, className, children }) => {
    return (
        <tr
            className={util.joinClasses(
                'table-row',
                hover,
                selected && 'table-row__selected',
                className
            )}
        >
            {children}
        </tr>
    )
}

export default memo(TableRow)
