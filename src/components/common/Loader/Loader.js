import React, { memo } from 'react'

const Loader = ({ loading }) => {
    if (!loading) {
        return null
    }

    const loaderColor = 'rgba(44,47,53,1)'

    const renderLoader = () => (
        <div className={'loader'}>
            <svg className="svg-loader" width="54" height="54" viewBox="0 0 48 48">
                <circle cx="24" cy="4" r="4" fill={loaderColor} />
                <circle cx="12.19" cy="7.86" r="3.7" fill={loaderColor} />
                <circle cx="5.02" cy="17.68" r="3.4" fill={loaderColor} />
                <circle cx="5.02" cy="30.32" r="3.1" fill={loaderColor} />
                <circle cx="12.19" cy="40.14" r="2.8" fill={loaderColor} />
                <circle cx="24" cy="44" r="2.5" fill={loaderColor} />
                <circle cx="35.81" cy="40.14" r="2.2" fill={loaderColor} />
                <circle cx="42.98" cy="30.32" r="1.9" fill={loaderColor} />
                <circle cx="42.98" cy="17.68" r="1.6" fill={loaderColor} />
                <circle cx="35.81" cy="7.86" r="1.3" fill={loaderColor} />
            </svg>
        </div>
    )
    return renderLoader()
}

export default memo(Loader)
