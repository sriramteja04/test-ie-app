import React, { memo } from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'

import { usePortal } from '../../Custom Hooks/useCustomHooks'
import { Spinner } from '../index'
import { util } from '../../../util'

/**
 * Modal Component is responsible to render Modal with the header, context and actions.
 *
 * @returns Modal Component
 */
const Modal = ({
    header = null,
    content = null,
    actions = null,
    loading,
    type,
    size,
    className,
}) => {
    const renderModal = () => {
        return (
            <div className={'modal__background'}>
                <div className={util.joinClasses('modal__card', size, type, className)}>
                    {loading ? (
                        <Spinner modal={true} />
                    ) : (
                        <>
                            <div className={'modal__heading'}>{header}</div>
                            <div className={'modal__content'}>{content}</div>
                            <div className={`modal__actions ${size}`}>{actions}</div>
                        </>
                    )}
                </div>
            </div>
        )
    }

    const target = usePortal()
    return ReactDom.createPortal(renderModal(), target)
}

Modal.propTypes = {
    /** @param header {Component} -> Modal header component, sits on the top of the component */
    header: PropTypes.node,

    /** @param content {Component} -> Modal Content component, usually consists of content that relates to the modal */
    content: PropTypes.node,

    /** @param actions {Component} -> Modal Actions component, eg: Save, continue buttons etc */
    actions: PropTypes.node,

    /** @param loading {Boolean} -> loading prop determines whether to render spinner or not */
    loading: PropTypes.bool,

    /** @param modalType {String} -> */
    type: PropTypes.string,

    /** @param size {String} -> different sizes of the modal, please checkout in modal.scss file for more details */
    size: PropTypes.oneOf(['sm', 'md', 'xl', 'xs']),

    /** @param className {String} -> className that overrides the current designs */
    className: PropTypes.string,
}

export default memo(Modal)
