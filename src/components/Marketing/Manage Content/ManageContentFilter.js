import React, { memo, useEffect } from 'react'

import FilterActions from '../../common/Filter/FilterActions'
import { useFilter } from '../../Custom Hooks/useFilterReducer'
import { Checkbox, FilterToolBar } from '../../common'
import { util } from '../../../util'
import { constants } from '../../../constants'

/**
 *
 * @param toggleHandler
 * @param appliedFilters
 * @param dispatchFilters
 * @param configurations
 * @returns {*}
 * @constructor
 */
const ManageContentFilter = ({
    toggleHandler,
    appliedFilters,
    dispatchFilters,
    configurations,
}) => {
    const { marketingStatusFields } = constants
    const initialState = {
        filterState: appliedFilters || {
            placement_location: [],
            region: [],
            status: [],
        },
        placement_location: { list: [] },
        region: { list: [] },
        status: { list: [] },
        enableSaveBtn: false,
        enableClearAll: false,
    }

    const {
        checkboxHandler,
        clearAllHandler,
        closeSideMenuHandler,
        filterApplyHandler,
        state: manageContentState,
        updateStateFields,
    } = useFilter(initialState, toggleHandler, appliedFilters, dispatchFilters)

    const { placement_location, region, status, enableSaveBtn, enableClearAll } = manageContentState

    useEffect(() => {
        const enableBtn = Object.keys(manageContentState).reduce((initial, key) => {
            if (manageContentState[key] && manageContentState[key]['list']) {
                const { list } = manageContentState[key]
                if (list && list.length > 0) {
                    return true
                } else {
                    return initial
                }
            } else {
                return initial
            }
        }, false)
        updateStateFields('enableSaveBtn', enableBtn)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [placement_location, region, status])

    const placementsCheckboxes = util.findUniqueValues(configurations, 'placement_location')
    const regionCheckboxes = util.getRegionsList(configurations)

    return (
        <div className={'filter-container'}>
            <div className={'filter-menu'}>
                <FilterToolBar
                    clearAllHandler={clearAllHandler}
                    closeSideMenuHandler={toggleHandler}
                    isClearAll={enableClearAll}
                />
                <div className={'filter-menu__body'}>
                    <div className={'filter-menu__item'}>
                        <p className={'filter-menu__item__heading'}>Placement</p>
                        <div>
                            {placementsCheckboxes.map(appPlacement => (
                                <Checkbox
                                    checked={placement_location.list.includes(appPlacement)}
                                    display={'block'}
                                    key={appPlacement}
                                    label={'7Now ' + appPlacement}
                                    id={appPlacement}
                                    margin={'mt-3'}
                                    name={'placement_location'}
                                    onChange={checkboxHandler}
                                />
                            ))}
                        </div>
                    </div>
                    <div className={'filter-menu__item'}>
                        <p className={'filter-menu__item__heading'}>Region</p>
                        <div>
                            {regionCheckboxes.map(configRegion => (
                                <Checkbox
                                    checked={region.list.includes(configRegion)}
                                    display={'block'}
                                    key={configRegion}
                                    label={configRegion}
                                    id={configRegion}
                                    margin={'mt-3'}
                                    name={'region'}
                                    onChange={checkboxHandler}
                                />
                            ))}
                        </div>
                    </div>
                    <div className={'filter-menu__item'}>
                        <p className={'filter-menu__item__heading'}>Status</p>
                        <div>
                            {marketingStatusFields.map(configStatus => (
                                <Checkbox
                                    checked={status.list.includes(configStatus)}
                                    display={'block'}
                                    key={configStatus}
                                    label={configStatus}
                                    id={configStatus}
                                    margin={'mt-3'}
                                    name={'status'}
                                    onChange={checkboxHandler}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <FilterActions
                isEnable={enableSaveBtn}
                closeSideMenuHandler={closeSideMenuHandler}
                filterApplyHandler={filterApplyHandler}
            />
        </div>
    )
}

export default memo(ManageContentFilter)
