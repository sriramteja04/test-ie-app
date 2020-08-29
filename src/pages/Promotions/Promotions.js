import React, { memo, useCallback } from 'react'
import PropTypes from 'prop-types'

import { strings } from '../../strings'
import PromotionsTable from '../../containers/PromotionsTable'
import PromotionsFilter from '../../components/Promotions/PromotionsFilter'
import { TableFilterToolBar } from '../../components/common'

/**
 *
 * @param actions {Object} {action dispatchers} -> actions binder object which consists of filter actions.
 * @param applied_filters {Object} {Redux filter State} -> promotions Filter options.
 * @param count {Number} {Redux promotions State} -> total number of promotions.
 * @returns {JSX} -> Table Tool bar -> Search, filter button and filter pills
 *                   Promotions Table -> in place editing toggle, table with filters, Table pagination
 */
const Promotions = ({ actions, applied_filters, count }) => {
    const clearAllFiltersHandler = () => actions.clearAllFilters('promotion_filters')

    /**
     * This callback will be invoked in filter component conditionally.
     * TableFilterToolBar -> Filter -> PromotionsFilter
     * @param props {Object} -> props are send to promotions filter from filter component.
     * @returns {JSX} -> returns a Promotion filter component
     * @private
     */
    const _renderPromotionsFilter = useCallback(
        props => (
            <PromotionsFilter
                appliedFilters={applied_filters}
                dispatchFilters={actions.updatePromotionFilters}
                {...props}
            />
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [applied_filters]
    )

    return (
        <div className={'promotions'}>
            <TableFilterToolBar
                title={strings.promotionsTableTitle}
                numberOfRows={count}
                renderFilterComp={_renderPromotionsFilter}
                searchPlaceHolder={''}
                applied_filters={applied_filters}
                dispatchFilters={actions.updatePromotionFilters}
                isSearch={true}
                dispatchClearAllFilters={clearAllFiltersHandler}
            />

            <PromotionsTable />
        </div>
    )
}

Promotions.propTypes = {
    actions: PropTypes.object,
    applied_filters: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    count: PropTypes.number,
}

export default memo(Promotions)
