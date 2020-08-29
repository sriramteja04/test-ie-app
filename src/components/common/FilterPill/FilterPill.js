import React, { memo } from 'react'
import { util } from '../../../util'
import { Icon } from '../index'
import PropTypes from 'prop-types'

/**
 *
 * @returns {null|*}
 * @constructor
 */
const FilterPill = ({ label, clearPillHandler, keyPill, filterList, className, type }) => {
    if (filterList.length <= 0) {
        return null
    }
    if (keyPill === 'audienceSize' && filterList[0] === 0 && filterList[1] === 0) {
        return null
    }
    if (keyPill === 'placement_location') {
        filterList = filterList.map(placement => '7Now '.concat(placement))
    }

    return (
        <div className={util.joinClasses('filter-pill mt-3', className)}>
            <span className={'filter-pill__label'}>
                <span className={'filter-name'}>{label}</span>
                {type === 'list' ? <span>{filterList.join(', ')}</span> : <span>{filterList}</span>}
            </span>
            <Icon
                onClick={() => clearPillHandler(keyPill)}
                className={'ml-3 mt-1'}
                pointer={true}
                size={'xxs'}
                display={'inline'}
                renderIcon={util.HighlightOffIcon}
            />
        </div>
    )
}

FilterPill.propTypes = {
    /** @param label {String} -> which represents the filter value {DateRange or search or created By etc} */
    label: PropTypes.string,

    /** @param clearPillHandler {Callback} -> callback function to clear the filtered pill */
    clearPillHandler: PropTypes.func,

    /** @param keyPill {String} -> unique key value of the pill, {placement_location or region etc} */
    keyPill: PropTypes.string,

    /** @param filterList {Array} -> list of Displayed values in the pill {Texas, california etc} */
    filterList: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),

    /** @param className {String} -> className which can override the default design behavior */
    className: PropTypes.string,

    /** @param type {String} -> type of applied filter {list, string or range etc} */
    type: PropTypes.string,
}

export default memo(FilterPill)
