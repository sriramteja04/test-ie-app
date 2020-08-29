import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Button } from '../index'

const ModalActions = ({
    cancelModalHandler,
    saveClickHandler,
    submitBtn,
    cancelBtn,
    disabledBtn,
    color,
    size,
}) => {
    return (
        <>
            <Button color={'light'} size={size} className={'mr-7'} onClick={cancelModalHandler}>
                {cancelBtn}
            </Button>
            <Button color={color} size={size} disabled={disabledBtn} onClick={saveClickHandler}>
                {submitBtn}
            </Button>
        </>
    )
}

ModalActions.propTypes = {
    cancelModalHandler: PropTypes.func,
    saveClickHandler: PropTypes.func,
    submitBtn: PropTypes.string,
    cancelBtn: PropTypes.string,
    disabledBtn: PropTypes.bool,
    color: PropTypes.string,
    size: PropTypes.string,
}

export default memo(ModalActions)
