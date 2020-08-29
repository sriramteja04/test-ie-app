import React, { memo } from 'react'
import { util } from '../../../util'

const TableBody = ({ className, children }) => (
    <tbody className={util.joinClasses('table__body', className)}>{children}</tbody>
)

export default memo(TableBody)
