import React, { memo } from 'react'
import { util } from '../../../util'

const TableCell = ({ align, size, className, children, inputProps, layout, ...rest }) => {
    return (
        <td
            className={util.joinClasses('table-row__cell', layout, align, size, className)}
            {...rest}
        >
            {children}
        </td>
    )
}

export default memo(TableCell)
