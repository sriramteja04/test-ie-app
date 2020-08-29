import React, { memo } from 'react'
import { Table, TableRow, EnhancedTableHead, TableBody, TableCell, Radio } from '../../common'
import { constants } from '../../../constants'

const PrioritizationTable = ({ priority, setPriority }) => {
    const { prioritizeContentHeadCells, prioritizationCategoriesList } = constants

    const renderTable = () => (
        <Table>
            <EnhancedTableHead
                headCells={prioritizeContentHeadCells}
                checked={false}
                hideCheckBox={true}
            />
            <TableBody>
                {prioritizationCategoriesList.map(({ label, tier }) => {
                    const isChecked = priority && priority === tier
                    return (
                        <TableRow key={label}>
                            <TableCell>
                                <Radio
                                    id={label}
                                    name={'category'}
                                    onChange={e => setPriority(tier)}
                                    checked={isChecked}
                                />
                            </TableCell>
                            <TableCell>{tier}</TableCell>
                            <TableCell>{label}</TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )

    return <>{renderTable()}</>
}

export default memo(PrioritizationTable)
