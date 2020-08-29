import React, { memo, useEffect } from 'react'
import PropTypes from 'prop-types'

import { constants } from '../../constants'
import {
    PromoHeading,
    PromoToggles,
    PromoLink,
    PromoInitials,
    EditPromoName,
} from '../../components/PromoDetails'
import { Spinner, ToastMessage } from '../../components/common'
import { useToggle } from '../../components/Custom Hooks/useCustomHooks'

const PromoDetails = ({
    actions,
    display_promo_alert,
    match,
    promo_details,
    promo_loading,
    update_promo_error,
    user_role,
}) => {
    const [edit, setEdit] = useToggle(false)

    useEffect(() => {
        actions.fetchPromoById(match.params.promoId)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match.params.promoId])

    useEffect(() => {
        display_promo_alert && actions.clearPromoAlert(3000)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [display_promo_alert]) // inlineEdit

    const {
        _id,
        name,
        created,
        updated,
        created_by,
        updated_by,
        status,
        qa_is_live,
        is_live,
        type,
    } = promo_details || {}

    const deletePromoHandler = selected => {
        actions.deletePromo(selected[0]._id)
    }

    const cancelModal = () => {
        setEdit()
        update_promo_error && actions.clearUpdatePromoError()
    }

    const publishContentHandler = enableIn => {
        const requestPayload = {
            publishContent: {
                type: enableIn === 'qa' ? 'qa_live' : 'live',
                publish: enableIn === 'qa' ? !qa_is_live : !is_live,
                _id: _id,
            },
            publishFromTable: false,
        }
        actions.publishContent(requestPayload)
    }

    if (!promo_details && !promo_loading) {
        return null
    }

    return (
        <div className={'promo-details'}>
            <Spinner loading={promo_loading} />
            <div className={'promo-details__toolbar'}>
                <div className={'promo-toolbar'}>
                    <PromoHeading
                        promoName={name}
                        editModalHandler={setEdit}
                        deletePromoHandler={deletePromoHandler}
                        id={_id}
                        status={status}
                        qa_is_live={qa_is_live}
                        is_live={is_live}
                        user_role={user_role}
                        publishContentHandler={publishContentHandler}
                    />
                    {edit && (
                        <EditPromoName
                            cancelModalHandler={cancelModal}
                            promo_details={promo_details}
                        />
                    )}
                    <PromoInitials
                        created_at={created}
                        modified_at={updated}
                        promo_id={_id}
                        created_by={created_by}
                        updated_by={updated_by}
                        status={status}
                    />
                    <PromoToggles qa_is_live={qa_is_live} is_live={is_live} type={type} />
                </div>
            </div>
            <div className={'promo-details__links'}>
                {constants.promotionModules.map(title => (
                    <PromoLink key={title} status={status} title={title} open={false} />
                ))}
            </div>
            {display_promo_alert && <ToastMessage message={display_promo_alert} />}
        </div>
    )
}

PromoDetails.propTypes = {
    actions: PropTypes.object,
    display_promo_alert: PropTypes.string,
    history: PropTypes.object,
    match: PropTypes.object,
    promo_details: constants.promoPropType,
    promo_loading: PropTypes.bool,
    update_promo_error: PropTypes.string,
    user_role: PropTypes.string,
}

export default memo(PromoDetails)
