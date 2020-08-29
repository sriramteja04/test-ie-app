import React, { memo } from 'react'
import PrioritizationTable from './PrioritizationTable'

const Prioritization = ({ priority, setPriority }) => {
    return (
        <div className={'prioritization'}>
            <div className={'prioritization_msg'}>
                Select a prioritization tier from the table below
            </div>
            <PrioritizationTable priority={priority} setPriority={setPriority} />
        </div>
    )
}

export default memo(Prioritization)
