import React, { memo, useCallback } from 'react'
import QATestingIcon from '../../assets/icons/qatesting.svg'

import { util } from '../../util'
import { Indicator } from '../common'

const PromoToggles = ({ qa_is_live, is_live, type }) => {
    const renderQAImage = useCallback(() => <img alt={'QA Enable'} src={QATestingIcon} />, [])
    return (
        <div className={'promo-toggles'}>
            <div className={'type_indicator'}>
                <Indicator
                    size={'sm'}
                    color={type && type.includes('marketing') ? 'success' : 'disable'}
                    img={util.FiberManualRecordIcon}
                    label={'Marketing'}
                />
            </div>
            {qa_is_live && (
                <Indicator
                    size={'sm'}
                    color={is_live ? 'success' : 'disable'}
                    img={renderQAImage}
                    label={'Testing in QA'}
                />
            )}
            <Indicator
                size={'sm'}
                color={is_live ? 'success' : 'disable'}
                img={util.FiberManualRecordIcon}
                label={'Production'}
            />
        </div>
    )
}

export default memo(PromoToggles)
