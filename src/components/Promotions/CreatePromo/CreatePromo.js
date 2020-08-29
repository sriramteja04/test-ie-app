import React, { memo, useState, useEffect, useCallback } from 'react'

import { ModalHeading } from '../../common/Modal/ModalHeading'
import ModalActions from '../../common/Modal/ModalActions'
import { strings } from '../../../strings'
import { Indicator, InputField, Modal } from '../../common'
import { util } from '../../../util'

const CreatePromo = ({
    actions,
    close, //close call back was defined in menu component
    modalClose,
    promo_loading,
    user,
    create_promo_error,
}) => {
    const [promo_name, setPromoName] = useState('')
    const [promoType] = useState(['marketing'])

    useEffect(() => {
        modalClose && close()
        return () => actions.modalOpen()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalClose])

    /** Function to change the State of the promo name.
     *
     * @param e - event object to track the value entered
     */
    const changeHandler = e => setPromoName(e.target.value)

    /**
     * Function to close modal.
     */
    const cancelModalHandler = useCallback(() => {
        close()
        create_promo_error && actions.clearPromoError()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [create_promo_error])

    /**
     * Function to post newly created promo, if success then navigates to promo details pages.
     */
    const saveClickHandler = () => {
        const type = promoType && promoType.length ? promoType : ['marketing']
        const promoName = util.regexString(promo_name)
        actions.createPromo({
            name: promoName,
            type: type,
            created_by: user.email,
        })
    }

    const header = (
        <ModalHeading
            heading={strings.createPromoHeading}
            cancelModalHandler={cancelModalHandler}
        />
    )

    const content = (
        <div className={'content'}>
            <InputField
                label={strings.createNewPromo}
                value={promo_name}
                onChange={changeHandler}
                type={'text'}
                size={'xl'}
                placeholder={'Create Promo'}
                required
                name={'create promo'}
                error={create_promo_error}
            />
            <div className={'details'}>
                <p className={'details__sub-heading'}>{strings.promoParts}</p>
                <div className={'details__toggles'}>
                    <Indicator
                        size={'sm'}
                        color={'success'}
                        img={util.FiberManualRecordIcon}
                        label={'Marketing'}
                    />
                </div>
            </div>
        </div>
    )

    const modalActions = (
        <ModalActions
            color={promo_name.trim() && promo_name.length ? 'dark' : 'disabled'}
            cancelModalHandler={cancelModalHandler}
            saveClickHandler={saveClickHandler}
            submitBtn={strings.save}
            cancelBtn={strings.cancel}
            disabledBtn={!promo_name.trim().length || false}
            size={'xl'}
        />
    )

    return (
        <Modal
            size={'md'}
            header={header}
            content={content}
            actions={modalActions}
            loading={promo_loading}
        />
    )
}

export default memo(CreatePromo)
