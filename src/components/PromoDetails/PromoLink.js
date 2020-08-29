import React, { memo } from 'react'

import { useHistory, useRouteMatch } from 'react-router-dom'
import { Icon } from '../common'
import { util } from '../../util'

/**
 *
 * @param title {String} is the heading of the promo details section
 * @param open {Boolean} will define, whether a section is expanded or not
 * @param status
 * @param id
 * @returns {*} a promo detail section bar that includes heading, status of that promo section and a caret
 * @constructor
 */
const PromoLink = ({ title, open, status, id }) => {
    const history = useHistory()
    const match = useRouteMatch()

    const linkHandler = (props, endpoint) =>
        props.history.push({
            pathname: props.match.url + `/${endpoint}`,
            state: { fromPromoDetails: true },
        })

    const ClickIconHandler = e => {
        e.stopPropagation()
        if (open) {
            history.push({
                pathname: `/dashboard/promotions/${id}`,
                state: { fromMarketing: true },
            })
        } else {
            linkHandler({ history, match }, title)
        }
    }

    const isComplete = status !== 'incomplete'

    return (
        <div
            className={`link-item ${open ? 'open' : 'close'} `}
            onClick={() => !open && linkHandler({ history, match }, title)}
        >
            <p className={`${!open ? 'paragraph secondary' : 'paragraph primary'}`}>{title}</p>
            <div className={'link-item__status'}>
                <Icon
                    size={'md'}
                    color={!isComplete ? 'disable' : 'success'}
                    display={'inline'}
                    renderIcon={util.CheckCircleOutlineIcon}
                />
                <p
                    className={util.joinClasses(
                        !isComplete
                            ? 'paragraph italic sub ml-4 disabled'
                            : 'paragraph italic sub ml-4 success'
                    )}
                >
                    {!isComplete ? status : 'complete'}
                </p>
            </div>
            <Icon
                className={'link-item__expand-icon'}
                onClick={ClickIconHandler}
                size={'lg'}
                pointer={true}
                renderIcon={open ? util.ExpandLessIcon : util.ExpandMoreIcon}
            />
        </div>
    )
}

const shouldComponentUpdate = (prevProps, nextProps) =>
    !(
        prevProps.open !== nextProps.open ||
        prevProps.title !== nextProps.title ||
        prevProps.id !== nextProps.id ||
        prevProps.status !== nextProps.status
    )

export default memo(PromoLink, shouldComponentUpdate)
