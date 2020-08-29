import React, { memo } from 'react'
import { util } from '../../../util'

const TableHead = ({ className, children }) => (
    <thead className={util.joinClasses('table__head', className)}>{children}</thead>
)

export default memo(TableHead)
