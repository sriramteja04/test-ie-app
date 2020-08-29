import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { DoubleChevron } from '../../common'

const EditPrioritizationToolBar = ({ selectedDate, ...rest }) => {
    return (
        <div className={'tool-bar'}>
            <div className={'tool-bar__date'}>
                <p className={'tool-bar__date--day'}>{selectedDate.format('ddd')}</p>
                <p className={'tool-bar__date--complete-date'}>
                    {selectedDate.format('MMMM DD, YYYY')}
                </p>
            </div>
            <DoubleChevron className={'tool-bar__navs'} iconSize={'xxs'} gap={'md'} {...rest} />
        </div>
    )
}

EditPrioritizationToolBar.propTypes = {
    /* moment object */
    selectedDate: PropTypes.object,
}

export default memo(EditPrioritizationToolBar)
