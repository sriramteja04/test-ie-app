import React, { memo, useMemo } from 'react'
import { useHistory } from 'react-router-dom'

import { util } from '../../../util'
import { Icon, SelectInput, DisplayPill, ToolTip } from '../../common'
import { constants } from '../../../constants'

const PriorityCard = ({
    regions,
    startDate,
    endDate,
    _id,
    name,
    priority,
    className,
    color,
    warning,
    priorityChangeHandler,
}) => {
    const history = useHistory()
    const { prioritizationCategoriesList } = constants
    const nonNationalList = regions
        .map(code => util.getRegionByCode(code))
        .filter(region => region !== 'National')

    const editPromoHandler = () =>
        history.push({
            pathname: `/dashboard/promotions/${_id}/marketing`,
        })

    const inputChangeHandler = (value, name) => {
        priorityChangeHandler(name, value)
    }

    const tableCellToolTip = (list, maxChar) => {
        const hyperLinkIndex = util.getMaxIndex(list, maxChar)
        const viewList = list.slice(0, hyperLinkIndex)
        const toolTipList = list.slice(hyperLinkIndex)
        const renderToolTip = () => (
            <div className={'card__regions'}>
                {toolTipList.map(region => (
                    <DisplayPill key={region} label={region} />
                ))}
            </div>
        )
        return (
            <>
                {viewList.map(reg => (
                    <DisplayPill key={reg} label={reg} />
                ))}
                {toolTipList.length > 0 && (
                    <ToolTip
                        className={'ml-3'}
                        display={'inline-block'}
                        highlight
                        placement={'bottom'}
                        render={renderToolTip}
                        // height={'auto'}
                    >
                        <Icon
                            size={'xs'}
                            className={'mt-1 card__color'}
                            renderIcon={util.MoreHorizIcon}
                        />
                    </ToolTip>
                )}
            </>
        )
    }

    const priorityOptions = useMemo(
        () => prioritizationCategoriesList.map(list => list.tier),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    const renderPriorityUpdate = () =>
        priority ? (
            <SelectInput
                label={'Priority'}
                className={'mt-2 card__priority'}
                size={'sm'}
                options={priorityOptions}
                value={priority}
                name={_id}
                onChange={inputChangeHandler}
            />
        ) : null

    const renderWarning = () =>
        warning ? (
            <div className={'card__warning'}>
                <Icon
                    size={'xs'}
                    className={'card__warning_icon'}
                    renderIcon={util.ReportProblemOutlinedIcon}
                />
                <span className={'card__warning_msg'}>{warning}</span>
            </div>
        ) : null

    return (
        <div
            style={{
                borderLeft: `1.75rem solid ${color}`,
                borderRadius: '1rem',
            }}
            className={`card ${className}`}
        >
            <div>
                <div className={'card__promo'}>{name}</div>
                <div className={'card__schedule'}>
                    {util.getScheduleDateRange(startDate, endDate)}
                </div>
            </div>
            <div>{regions.includes('all') ? <DisplayPill label={"Nat'l"} /> : null}</div>
            <div className={'card__regions'}>
                {nonNationalList.length > 0 ? tableCellToolTip(nonNationalList, 30) : null}
            </div>
            <Icon
                size={'xs'}
                className={'mt-1 card__edit'}
                renderIcon={util.EditIcon}
                onClick={editPromoHandler}
            />
            {renderPriorityUpdate()}
            {renderWarning()}
        </div>
    )
}

export default memo(PriorityCard)
