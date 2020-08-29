import React, { memo } from 'react'

import { util } from '../../../util'

const TableHeadCell = ({ align, size, className, children, inputProps, layout, ...rest }) => (
    <th className={util.joinClasses('table-row__cell', layout, align, size, className)} {...rest}>
        {children}
    </th>
)

export default memo(TableHeadCell)
