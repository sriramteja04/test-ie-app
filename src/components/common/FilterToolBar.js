import React, { memo } from 'react'
import { Button, Icon } from './index'
import { util } from '../../util'

/**
 *
 * @param clearAllHandler
 * @param closeSideMenuHandler
 * @param isClearAll
 * @returns {*}
 * @constructor
 */
const FilterToolBar = ({ clearAllHandler, closeSideMenuHandler, isClearAll }) => {
    return (
        <div className={'filter-menu__header'}>
            <p className={'filterBy'}> Filter By</p>
            {isClearAll && (
                <Button
                    className={'mr-4 clearAllBtn'}
                    variant={'basic'}
                    color={'dark'}
                    onClick={clearAllHandler}
                >
                    Clear All
                </Button>
            )}
            <Icon
                size={'sm'}
                pointer={true}
                onClick={closeSideMenuHandler}
                display={'inline'}
                className={'filterCloseIcon'}
                renderIcon={util.CloseIcon}
            />
        </div>
    )
}

export default memo(FilterToolBar)
