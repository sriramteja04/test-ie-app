import React, { memo } from 'react'

export const DropZone = memo(({ children, ...rest }) => {
    return <div {...rest}>{children}</div>
})
