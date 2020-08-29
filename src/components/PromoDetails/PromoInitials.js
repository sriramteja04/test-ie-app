import React, { memo } from 'react'
import { util } from '../../util'

/**
 *
 * @param created_at {Date} -> Promo created date and time
 * @param promo_id {String} -> Promo ID
 * @param modified_at {Date} -> last modified date and time
 * @param created_by {String} -> Created user email
 * @param updated_by {String} -> last modified user email
 * @returns {*}
 * @constructor
 */
const PromoInitials = ({ created_at, promo_id, modified_at, created_by, updated_by }) => {
    const list = [
        {
            className: 'id',
            initial: 'ID#',
            value: promo_id,
        },
        {
            className: 'created_at',
            initial: 'Created',
            value: `${util.getFormattedDate(created_at, 'MM/DD/yyyy')} - ${created_by}`,
        },
        {
            className: 'updated_by',
            initial: 'Last Modified',
            value: `${util.getFormattedDate(modified_at, 'MM/DD/yyyy')} - ${updated_by}`,
        },
    ]
    return (
        <div className={'promo-initials'}>
            <div className={'promo-initials__list'}>
                {list.map(({ initial, className }, i) => (
                    <div key={i} className={`promo-initials__list__heading ${className}`}>
                        {initial}
                    </div>
                ))}
                {list.map(({ value }, i) => (
                    <div key={i} className={'promo-initials__list--value'}>
                        {value}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default memo(PromoInitials)
