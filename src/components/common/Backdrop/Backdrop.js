import React, { memo } from 'react'
import PropTypes from 'prop-types'

import { util } from '../../../util'

const Backdrop = ({ closeBackdrop, showOpacity }) => (
    <div
        className={util.joinClasses('backdrop', showOpacity && 'showOpacity')}
        onClick={closeBackdrop}
    />
)

Backdrop.propTypes = {
    /**@param closeBackdrop will toggle back drop */
    closeBackdrop: PropTypes.func,
    /**@param showOpacity will display opacity as backdrop */
    showOpacity: PropTypes.bool,
}

export default memo(Backdrop)
