import React, { memo, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { Alert, ProgressBar, TableFilterToolBar } from '../../common'
import { constants } from '../../../constants'
import ManageContentFilter from './ManageContentFilter'
import ManageContentTable from './ManageContentTable'
import { strings } from '../../../strings'
import { useToggle } from '../../Custom Hooks/useCustomHooks'
import { util } from '../../../util'

/**
 * This Component is responsible to render progress bar, Tool bar and manage content table
 *
 */
const ManageContent = ({
    configurations,
    setConfigurations,
    isEditingCompletedPromo,
    isPublished,
    schedule,
}) => {
    let initialFilters = constants.manageContentFilter

    const getContentFilters = () => {
        initialFilters = initialFilters.toJS()
        if (isEditingCompletedPromo) {
            initialFilters = initialFilters.map(filter => {
                const updatedFilter = { ...filter }
                if (updatedFilter.key === 'status') {
                    updatedFilter.post_value.push('incomplete')
                    updatedFilter.display_value.push('incomplete')
                }
                return updatedFilter
            })
        }
        return initialFilters
    }

    const [percentage, setPercentage] = useState(0)
    const [filteredConfigurations, setFilteredConfigurations] = useState(configurations)
    const [contentFilters, setContentFilters] = useState(() => getContentFilters())
    const [showEditWarning, setEditWarning] = useToggle(isEditingCompletedPromo)

    const _completedConfigs = configurations.filter(config => config.status === 'complete').length

    useEffect(() => {
        const completedPer = (_completedConfigs / configurations.length) * 100
        completedPer !== percentage && setPercentage(completedPer)
        _updateFilter(contentFilters)
        showEditWarning !== isEditingCompletedPromo && setEditWarning()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [configurations, contentFilters, isEditingCompletedPromo])

    const _updateFilter = contentFilters => {
        const filteredConfigurations = contentFilters.reduce((acc, filter) => {
            const updatedList = [...acc]
            let filteredList = new Set([])
            if (filter.post_value.length > 0) {
                filter.post_value.forEach(value => {
                    const list = updatedList.filter(obj => obj[filter.key] === value)
                    if (list.length > 0) {
                        list.map(config => filteredList.add(config))
                    }
                })
            } else {
                filteredList = updatedList
            }
            return Array.from(filteredList)
        }, configurations)

        setFilteredConfigurations(filteredConfigurations)
    }

    const _renderManageContentFilter = props => (
        <ManageContentFilter
            appliedFilters={contentFilters}
            dispatchFilters={setContentFilters}
            configurations={configurations}
            {...props}
        />
    )

    const setInitialFilters = () => {
        setContentFilters(initialFilters.toJS())
    }

    return (
        <div className={`manage-content`}>
            <div className={'manage-content__configurations'}>
                <div className={'manage-content__alert'}>
                    <Alert
                        show={true}
                        type={'warning'}
                        title={strings.promoConfigEditWarningTitle}
                        description={strings.promoConfigEditWarningDesc}
                        closeAlertHandler={setEditWarning}
                        renderIcon={util.ReportProblemIcon}
                    />
                </div>
                <p className={'paragraph bold'}>
                    Based on your selected app placements, time intervals and audience segments,
                    below are the {configurations.length} content configurations you will need to
                    complete
                </p>
                <div className={'manage-content__progress'}>
                    <p className={'progress-details'}>
                        {_completedConfigs} of {configurations.length} configurations completed
                    </p>
                    <ProgressBar percentage={percentage} />
                </div>
                <div className={'manage-content__configurations__grid'}>
                    <div className={'table-toolbar'}>
                        <TableFilterToolBar
                            title={strings.configurationsTitle}
                            numberOfRows={filteredConfigurations.length}
                            renderFilterComp={_renderManageContentFilter}
                            searchPlaceHolder={'SearchInput Content'}
                            applied_filters={contentFilters}
                            dispatchFilters={setContentFilters}
                            fields={constants.contentFilters}
                            isSearch={false}
                            dispatchClearAllFilters={setInitialFilters}
                        />
                    </div>
                    <ManageContentTable
                        tableData={filteredConfigurations}
                        headCells={constants.manageContentHeadCells}
                        setConfigurations={setConfigurations}
                        applied_filters={contentFilters}
                        isPublished={isPublished}
                        configurations={configurations}
                        schedule={schedule}
                    />
                </div>
            </div>
        </div>
    )
}

ManageContent.propTypes = {
    /** @param configurations {Array} -> current promo configurations */
    configurations: constants.promoConfigPropType,

    /** @param setConfigurations {Callback} -> callback ro update the current promo configurations */
    setConfigurations: PropTypes.func,

    /** @param schedule {Object} -> object contains date and time details */

    /** @param isEditingCompletedPromo {Boolean} -> If user updates the scheduled promo then throw warning alerts. */
    isEditingCompletedPromo: PropTypes.bool,

    categories_list: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
        })
    ),

    isPublished: PropTypes.bool,
}

export default memo(ManageContent)
