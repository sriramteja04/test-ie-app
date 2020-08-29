import React, { memo } from 'react'

import sevenNowLogo from '../../../assets/images/7now-logo-2x.png'
import { util } from '../../../util'
import { Menu, Icon } from '../../common'
import AccountInfo from '../AccountInfo'
import CreatePromo from '../../../containers/CreatePromo'

/**
 *
 * @param userDetails
 * @param logout
 * @returns {*}
 */
const Header = ({ userDetails, logout, toggleHandler }) => {
    const renderCreateNew = () => (
        <>
            <Icon
                size={'sm'}
                className={'add-button'}
                display={'inline-block'}
                renderIcon={util.AddIcon}
            />
            <p className={'paragraph bold mt--1'}>Create New</p>
        </>
    )
    return (
        <header className={'header'}>
            <div className={'header__top-bar'} />
            <div className={'toolbar'}>
                <Icon
                    className={'menu-icon'}
                    pointer={true}
                    renderIcon={util.MenuIcon}
                    onClick={toggleHandler}
                />
                <div className={'toolbar__heading heading-secondary'}>
                    <img className={'sevenNowLogo'} src={sevenNowLogo} alt={'7-now'} />
                    <div className={'vertical-line'} />
                    <p className={'heading-primary'}>Admin Portal</p>
                </div>
                <div className={'toolbar--actions'}>
                    <Menu
                        placement={'middle'}
                        tipPlacement={'middle'}
                        className={'mr-4'}
                        hover={true}
                        margin={'mt-3'}
                        renderProps={renderCreateNew}
                    >
                        <Menu.MenuItem onClick={props => <CreatePromo {...props} />}>
                            <Icon
                                size={'sm'}
                                pointer
                                className={'mr-3'}
                                renderIcon={util.ListAltIcon}
                            />
                            <p className={'mt--1 hover'}>Promotion</p>
                        </Menu.MenuItem>
                    </Menu>
                    <AccountInfo userDetails={userDetails} logout={logout} />
                </div>
            </div>
        </header>
    )
}

export default memo(
    Header
    // (prevProps, nextProps) => !(prevProps.userDetails.email !== nextProps.userDetails.email)
)
