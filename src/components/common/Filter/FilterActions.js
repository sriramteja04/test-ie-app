import React, { forwardRef, memo } from 'react'
import { Button } from '../index'

const FilterActions = ({ closeSideMenuHandler, filterApplyHandler, isEnable }, ref) => {
    return (
        <div className={'filter_actions'} ref={ref}>
            <Button color={'light'} size={'lg'} onClick={closeSideMenuHandler}>
                CANCEL
            </Button>
            <Button color={'dark'} size={'lg'} disabled={!isEnable} onClick={filterApplyHandler}>
                APPLY
            </Button>
        </div>
    )
}

export default memo(forwardRef(FilterActions))
