import React, { Fragment, memo, useEffect, useState } from 'react'

import { ModalHeading } from '../common/Modal/ModalHeading'
import ModalActions from '../common/Modal/ModalActions'
import { strings } from '../../strings'
import { util } from '../../util'
import { Indicator, InputField, Modal } from '../common'

const EditPromoName = ({
    actions,
    cancelModalHandler,
    modalClose,
    promo_loading,
    update_promo_error,
    promo_details,
}) => {
    const { name: recentPromoName, isConflictCheckReqd, type } = promo_details || {}
    const [promoName, setPromoName] = useState(recentPromoName || '')
    const [promoType] = useState(type || '')

    /** Function to change the State of the promo name.
     *
     * @param e - event object to track the value entered
     */
    const changeHandler = e => setPromoName(e.target.value)

    // const promoTypeChangeHandler = e =>
    //     e.target.checked ? setPromoType(e.target.name) : setPromoType('')

    /**
     * Function to post edited promo name, if success then navigates to promo details pages.
     */
    const saveClickHandler = () => {
        if (recentPromoName !== promoName.trim()) {
            const updatedName = util.regexString(promoName)
            actions.updatePromoName({
                isConflictCheckReqd: isConflictCheckReqd || false,
                promo: {
                    ...promo_details,
                    name: updatedName,
                    type: promoType,
                },
            })
        }
    }

    const closeModalHandler = () => cancelModalHandler()

    useEffect(() => {
        modalClose && cancelModalHandler()
        return () => actions.modalOpen()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalClose])

    const header = (
        <Fragment>
            <ModalHeading heading={'Edit Promo'} cancelModalHandler={cancelModalHandler} />
        </Fragment>
    )

    const content = (
        <div className={'content'}>
            <InputField
                label={'Name this promo'}
                value={promoName}
                onChange={changeHandler}
                type={'text'}
                size={'xl'}
                placeholder={'Edit Promo Title'}
                error={update_promo_error}
                required
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
        <Fragment>
            <ModalActions
                color={promoName.trim() !== recentPromoName ? 'dark' : 'disabled'}
                cancelModalHandler={closeModalHandler}
                saveClickHandler={saveClickHandler}
                submitBtn={strings.save}
                cancelBtn={strings.cancel}
                disabledBtn={!(promoName.trim() !== recentPromoName && true)}
                size={'xl'}
            />
        </Fragment>
    )
    return (
        <div className={'edit-promo'}>
            <Modal
                size={'sm'}
                header={header}
                content={content}
                actions={modalActions}
                loading={promo_loading}
            />
        </div>
    )
}

export default memo(EditPromoName)
