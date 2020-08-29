import React, { Fragment, useState, memo, useCallback } from 'react'

import BreadCrumb from '../../components/Layout/BreadCrumb'
import Container from '../../components/HOC/Container'
import Header from '../../containers/Header'
import { SideDrawer } from '../../components/Layout/SideDrawer'
import SideMenu from '../../components/HOC/SideMenu'
import { Icon } from '../../components/common'
import { util } from '../../util'

const Layout = ({ pathname, children }) => {
    const [open, setOpen] = useState(false)

    /**
     * Toggles the hamburger menu and side menu bar.
     */
    const toggleSideMenu = () => setOpen(!open)

    /**
     * toggleBackdrop Controls the backdrop when the side menu is opened.
     */
    const toggleBackdrop = useCallback(() => setOpen(false), [])

    return (
        <Fragment>
            <Header open={open} toggleHandler={toggleSideMenu} />
            <BreadCrumb paths={pathname} />
            <SideMenu
                showBackdrop={false}
                open={open}
                toggleMenu={toggleBackdrop}
                direction={'left'}
                width={'sm'}
                position={'fix-left'}
            >
                <>
                    <Icon
                        className={'mt-6 ml-6'}
                        size={'md'}
                        pointer={true}
                        onClick={toggleSideMenu}
                        renderIcon={util.CloseIcon}
                    />

                    <SideDrawer toggleSideMenu={toggleSideMenu} />
                </>
            </SideMenu>
            <Container>{children}</Container>
        </Fragment>
    )
}

export default memo(Layout, (prevProps, nextProps) => !(prevProps.pathname !== nextProps.pathname))
