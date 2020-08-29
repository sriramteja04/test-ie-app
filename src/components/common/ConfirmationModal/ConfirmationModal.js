import React, { memo } from 'react'

import { Modal } from '../index'
import ModalActions from '../Modal/ModalActions'
import { strings } from '../../../strings'
import { ModalHeading } from '../Modal/ModalHeading'
import Proptypes from 'prop-types'

/**
 *
 * @param submitHandler {Callback function} -> Callback to perform submit action
 * @param close {Callback function} -> Callback to perform close action
 * @param action {String} -> The action that needs to be confirmed, ex: Delete
 * @param records {String} -> if its singular/plural form of records displayed in heading message, ex: promo/promos
 * @param renderList {renderProps} -> callback which invokes list of selected records, to which the action is performed
 * @returns {*}
 * @constructor
 */
const ConfirmationModal = ({ submitHandler, close, action, records, renderList }) => {
    const onConfirm = () => {
        submitHandler()
        close()
    }

    const heading = (
        <ModalHeading
            heading={`Are you sure you want to ${action} the following ${records}?`}
            cancelModalHandler={close}
        />
    )

    const content = <div className={'confirmation-content'}>{renderList()}</div>

    const actions = (
        <ModalActions
            cancelModalHandler={close}
            saveClickHandler={onConfirm}
            submitBtn={strings.confirmationSubmit}
            cancelBtn={strings.confirmationCancel}
            disabledBtn={false}
            color={'dark'}
            size={'xl'}
        />
    )

    return <Modal header={heading} content={content} actions={actions} size={'sm'} />
}

ConfirmationModal.propTypes = {
    submitHandler: Proptypes.func,
    close: Proptypes.func,
    action: Proptypes.string,
    records: Proptypes.string,
    renderList: Proptypes.func,
}

export default memo(ConfirmationModal)
