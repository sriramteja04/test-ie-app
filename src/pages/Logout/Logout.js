import React, { memo } from 'react'
import { Redirect } from 'react-router-dom'

import { Button } from '../../components/common'
import sevenNowLogo from '../../assets/images/7now-logo-2x.png'

const Logout = ({ actions, isAuth }) => {
    const handleLogout = () => {
        actions.sagaSignIn()
    }

    if (isAuth) {
        return <Redirect to={'/'} />
    }

    return (
        <React.Fragment>
            <header className={'header'}>
                <div className={'header__top-bar'} />
                <div className={'toolbar'}>
                    <div className={'toolbar__heading heading-secondary ml--3'}>
                        <img className={'sevenNowLogo'} src={sevenNowLogo} alt={'7-now'} />
                        <div className={'vertical-line'} />
                        <p className={'heading-primary'}>Admin Portal</p>
                    </div>
                </div>
            </header>
            <div className={'logout'}>
                <p className={'heading-terinary'}>Your session has expired due to inactivity</p>
                <Button size={'lg'} color={'dark'} onClick={handleLogout}>
                    LOGIN
                </Button>
            </div>
        </React.Fragment>
    )
}

export default memo(Logout)
