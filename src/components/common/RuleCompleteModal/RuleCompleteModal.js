import React, { memo } from 'react'

import { Button, Modal, Icon } from '../index'
import { util } from '../../../util'
import Proptypes from 'prop-types'

/**
 *
 * @param close {Callback} -> Callback function to close Modal
 * @returns {*}
 */
export const RuleCompleteModal = ({ close }) => {
    const content = (
        <div className={'rule_complete_content'}>
            <Icon
                size={'lg'}
                color={'success'}
                display={'inline'}
                renderIcon={util.CheckCircleIcon}
            />
            <p>MARKETING RULE COMPLETED</p>
        </div>
    )

    const actions = (
        <Button color={'dark'} size={'md'} onClick={close} className={'rule_complete_action'}>
            CLOSE
        </Button>
    )

    return <Modal content={content} actions={actions} className={'rule_complete'} />
}

RuleCompleteModal.propTypes = {
    close: Proptypes.func,
}

export default memo(RuleCompleteModal)
