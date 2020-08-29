import React, { memo, useEffect, useState, useRef, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { Icon } from '../../common'
import { util } from '../../../util'

const BreadCrumb = ({ paths, promoDetails }) => {
    const [breadCrumbPaths, setBreadCrumbPaths] = useState({})
    const previous = useRef('')

    useEffect(() => {
        updateBreadCrumbPaths(promoDetails, paths)
        return () => (previous.current = '')
    }, [promoDetails, paths])

    const updateBreadCrumbPaths = (promoDetails, paths) => {
        const enhancedPaths =
            promoDetails && promoDetails._id
                ? /* replacing promo id with promo name */
                  paths
                      .replace(promoDetails._id, promoDetails.name)
                      .split('/')
                      .slice(1)
                : paths.split('/').slice(1)

        const viewPaths = paths.split('/').slice(1)

        const viewLinks = {}
        for (let i = 0; i < viewPaths.length; i++) {
            viewLinks[enhancedPaths[i]] = `${previous.current}/${viewPaths[i]}`
            previous.current = viewLinks[enhancedPaths[i]]
        }

        setBreadCrumbPaths(viewLinks)
    }

    const iterator = Object.keys(breadCrumbPaths)

    const prevPage = (i, key) => (
        <Fragment key={i}>
            <Link to={breadCrumbPaths[key]} className={'breadCrumb__prevPage'}>
                {key}
            </Link>
            <Icon
                size={'xxxs'}
                display={'inline'}
                className={'breadCrumb__arrow'}
                renderIcon={util.ArrowForwardIosIcon}
            />
        </Fragment>
    )

    return (
        <div className={'breadCrumb__outline'}>
            <div className={'breadCrumb'}>
                <div className={'breadCrumb__list'}>
                    {iterator.map((key, i) =>
                        i === iterator.length - 1 ? (
                            <span key={i} className={'breadCrumb__currentPage'}>
                                {key}
                            </span>
                        ) : (
                            prevPage(i, key)
                        )
                    )}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ promotions }) => ({
    promoDetails: promotions.promo_details,
})

export default connect(mapStateToProps)(memo(BreadCrumb))
