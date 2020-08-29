import React, { memo } from 'react'
import { util } from '../../../util'

const Table = ({ className, size, stickyHead, children, ...rest }) => {
    return (
        <table className={util.joinClasses('table', size, stickyHead, className)} {...rest}>
            {children}
        </table>
    )
}

export default memo(Table)
