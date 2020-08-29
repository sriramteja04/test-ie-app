import React, { memo } from 'react'

const DisplayPill = ({ label }) => {
    return (
        <div className={'displayPill'}>
            <div className={'displayPill__label'}>{label}</div>
        </div>
    )
}

export default memo(DisplayPill)
