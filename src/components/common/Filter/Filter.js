import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'

import { Button } from '../index'
import { util } from '../../../util'
import SideMenu from '../../HOC/SideMenu'
import { useToggle } from '../../Custom Hooks/useCustomHooks'

/**
 *  Filter component will render a button, when a user clicks button a side menu will
 *  render and renderFilterComp callback will be invoked. renderFilterComp will return a
 *  filter component with respect to parent component.
 *
 * @param renderFilterComp {renderProps} -> callback function which will invoke after while mounting the filter component
 * @returns {*} a Filter component inside of a side menu
                SideMenu -> Filter Component {Promotions Filter, manage content filter etc}
 */
const Filter = ({ renderFilterComp }) => {
    const [toggleFilter, setToggleFilter] = useToggle(false)
    const inputProps = useMemo(
        () => ({
            start: util.TuneIcon,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )
    return (
        <div className={'filter-table'}>
            <Button
                color={'light'}
                className={'filter-btn'}
                inputProps={inputProps}
                onClick={setToggleFilter}
            />
            <SideMenu
                open={toggleFilter}
                direction={'right'}
                width={'lg'}
                toggleMenu={setToggleFilter}
            >
                {renderFilterComp({ toggleHandler: setToggleFilter })}
            </SideMenu>
        </div>
    )
}

Filter.propTypes = {
    renderFilterComp: PropTypes.func,
}

export default memo(Filter)
