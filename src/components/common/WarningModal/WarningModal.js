import React, { memo } from 'react'

import { Modal } from '../index'
import { Button, Icon } from '../index'
import { util } from '../../../util'
import PropTypes from 'prop-types'

/**
 *
 * @param cancelHandler {Callback} -> Function triggered on click of cancel button
 * @param proceedHandler {Callback} -> Function triggered on click of save
 * @param description {String} -> The warning message that displays inside warning model
 * @param title {String} -> Title of the warning message
 * @returns {*}
 * @constructor
 */
const WarningModal = ({ cancelHandler, proceedHandler, description, title }) => {
    const header = (
        <div className={'warning-modal__heading'}>
            <Icon color={'danger'} size={'lg'} renderIcon={util.ReportProblemIcon} />
            <p className={'warning-text mt-4'}>{title}</p>
        </div>
    )

    const content = <p className={'warning-modal__content'}>{description}</p>

    const actions = (
        <div className={'warning-modal__actions'}>
            <Button variant={'basic'} color={'dark'} size={'md'} onClick={cancelHandler}>
                Cancel
            </Button>
            <Button className={'ml-4'} size={'md'} color={'dark'} onClick={proceedHandler}>
                Save & Continue
            </Button>
        </div>
    )

    return <Modal className={'warning-modal'} header={header} content={content} actions={actions} />
}

WarningModal.propTypes = {
    cancelHandler: PropTypes.func,
    proceedHandler: PropTypes.func,
    description: PropTypes.string,
    title: PropTypes.string,
}

export default memo(WarningModal)
