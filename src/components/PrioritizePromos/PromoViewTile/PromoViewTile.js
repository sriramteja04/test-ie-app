import React, { memo } from 'react'
import PropTypes from 'prop-types'

import { Icon } from '../../common'
import { util } from '../../../util'

const PromoViewTile = ({ name, isRegional, isNational, priority, color, className }) => {
    return (
        <div
            style={{
                borderLeft: `1.7rem solid ${color}`,
                borderRadius: '4px',
            }}
            className={`promo-view-tile ${className}`}
        >
            <p className={'promo-view-tile__name'}>{name}</p>
            <div className={'promo-view-tile__details'}>
                <div className={'promo-view-tile__details--regions'}>
                    {isNational ? <p className={'region'}>N</p> : null}
                    {isRegional ? <p className={'region'}>R</p> : null}
                </div>
                {priority ? (
                    <div className={'promo-view-tile__details--priority'}>
                        <Icon
                            className={'priority-icon'}
                            renderIcon={util.PrioritizeIcon}
                            size={'xxs'}
                        />
                        <p>{priority}</p>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

PromoViewTile.propTypes = {
    promoName: PropTypes.string,
    isRegionExists: PropTypes.bool,
    isNationalExits: PropTypes.bool,
    priority: PropTypes.number,
    color: PropTypes.string,
}

export default memo(PromoViewTile)
