import React, { memo } from 'react'

const Container = props => <div className={'container'}>{props.children}</div>

export default memo(Container)
