import React, { memo } from 'react'
import { Button, Modal, Icon } from '../index'
import { util } from '../../../util'

/**
 *
 * @param message
 * @param toggleModal
 * @returns {*}
 * @constructor
 */
const GenericAlertModal = ({ message, toggleModal }) => {
    const header = <Icon color={'danger'} size={'lg'} renderIcon={util.ReportProblemIcon} />

    const content = <div className={'generic-alert-modal__content'}>{message}</div>

    const actions = (
        <div className={'generic-alert-modal__actions'}>
            <Button color={'dark'} size={'md'} onClick={toggleModal}>
                OK
            </Button>
        </div>
    )

    return <Modal header={header} content={content} actions={actions} size={'xs'} />
}

export default memo(GenericAlertModal)
