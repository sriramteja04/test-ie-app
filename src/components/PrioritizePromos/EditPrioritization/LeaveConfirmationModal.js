import React, { memo } from 'react'

import { Modal, Button } from '../../common'
import { ModalHeading } from '../../common/Modal/ModalHeading'

const LeaveConfirmationModal = ({ show, cancelAlertModal, leaveClickHandler }) => {
    if (!show) {
        return null
    }

    const header = (
        <ModalHeading heading={'Leave without saving'} cancelModalHandler={cancelAlertModal} />
    )

    const content = (
        <p>
            You’ve made changes but haven’t saved yet. If you choose to leave, no changes will be
            saved.
        </p>
    )

    const actions = (
        <div>
            <Button color={'dark'} size={'lg'} className={'mr-3'} onClick={leaveClickHandler}>
                LEAVE
            </Button>
            <Button size={'lg'} onClick={cancelAlertModal}>
                CANCEL
            </Button>
        </div>
    )

    return (
        <Modal
            className={'alert__modal'}
            header={header}
            content={content}
            actions={actions}
            type={'alert'}
        />
    )
}

export default memo(LeaveConfirmationModal)
