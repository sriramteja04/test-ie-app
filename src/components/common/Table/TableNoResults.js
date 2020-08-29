import React, { memo } from 'react'
import { strings } from '../../../strings'

const TableNoResults = () => {
    return (
        <div className={'no-results'}>
            <h1 className={'no-results__heading paragraph secondary'}>{strings.noResultsFound}</h1>
            <p className={' no-results__heading paragraph sub mt-5'}>{strings.noResultsMessage}</p>
        </div>
    )
}

export default memo(TableNoResults)
