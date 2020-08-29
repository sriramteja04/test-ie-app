import React, { memo } from 'react'
import PropTypes from 'prop-types'
import PriorityCard from '../PriorityCard'

const PlacementCards = ({ title, description, promos, priorityChangeHandler }) => {
    // console.log('rendering placement cards', title)
    return (
        <div className={'placements-cards'}>
            <div className={'placements-cards__titles'}>
                <p className={'paragraph primary block'}>{title}</p>
                <p className={'paragraph sub regular mt-2 block'}>{description}</p>
            </div>
            {promos && promos.length
                ? promos.map((promo, i) => (
                      <PriorityCard
                          className={'mb-2'}
                          {...promo}
                          key={i}
                          priorityChangeHandler={priorityChangeHandler}
                      />
                  ))
                : null}
        </div>
    )
}

PlacementCards.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
}

export default memo(PlacementCards)
