import React, { memo } from 'react'

import { TableHead, TableRow, TableHeadCell, TableSortLabel } from './index'
import { Checkbox } from '../index'
import { util } from '../../../util'

const EnhancedTableHead = ({
    headCells,
    onRequestSort,
    order,
    orderBy,
    className,
    onChange,
    checked,
    isScrollable,
    hideCheckBox,
}) => {
    return (
        <TableHead className={className}>
            <TableRow>
                {hideCheckBox !== true && (
                    <TableHeadCell
                        className={util.joinClasses('checkbox-head', isScrollable && 'fixed head')}
                        align={'center'}
                        width={'5%'}
                    >
                        <Checkbox onChange={onChange} checked={checked > 0 || false} />
                    </TableHeadCell>
                )}
                {headCells.map(({ id, label, sortable, align, width }, i) => (
                    <TableHeadCell
                        key={id}
                        width={!isScrollable ? width : null}
                        align={align}
                        className={util.joinClasses(
                            i === 0 && isScrollable && 'fixed head',
                            label === 'Action' && isScrollable && 'fixed-last head',
                            i === 0 && hideCheckBox && 'hideCheckBox'
                        )}
                    >
                        <TableSortLabel
                            sortable={sortable}
                            active={orderBy === id}
                            direction={orderBy === id ? order : 'asc'}
                            onClick={() => sortable && onRequestSort(id)}
                        >
                            {label}
                        </TableSortLabel>
                    </TableHeadCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

export default memo(EnhancedTableHead)
