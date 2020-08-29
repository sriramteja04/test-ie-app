import React, { memo } from 'react'

import { Icon, PromoMenuActions } from '../common'
import { util } from '../../util'

const PromoHeading = ({
    promoName,
    editModalHandler,
    id,
    status,
    qa_is_live,
    is_live,
    user_role,
    deletePromoHandler,
    publishContentHandler,
}) => {
    if (!promoName) {
        return null
    }
    const renderMenu = () => <Icon size={'xs'} renderIcon={util.MoreVertIcon} />

    return (
        <div className={'promo-heading'}>
            <div className={'promo-heading__name svg-icon'}>
                <h3 className={'promo-title mr-2'}>{promoName}</h3>
            </div>
            <PromoMenuActions
                deleteHandler={deletePromoHandler}
                editHandler={editModalHandler}
                id={id}
                is_live={is_live}
                name={promoName}
                qa_is_live={qa_is_live}
                renderMenu={renderMenu}
                status={status}
                user_role={user_role}
                publishContentHandler={publishContentHandler}
                isEditable={!(qa_is_live || is_live)}
            />
        </div>
    )
}

export default memo(PromoHeading)
