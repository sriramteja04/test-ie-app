import React, { memo } from 'react'

import { Icon } from '../index'
import { util } from '../../../util'

export const ModalHeading = memo(({ heading, cancelModalHandler }) => {
    return (
        <>
            <h2 className={'heading'}>{heading}</h2>
            <Icon
                id={'close-icon'}
                size={'sm'}
                pointer={true}
                onClick={cancelModalHandler}
                renderIcon={util.CloseIcon}
            />
        </>
    )
})
