import React, { memo, useState } from 'react'
import { Link } from 'react-router-dom'

import { Icon } from '../../common'
import { util } from '../../../util'
import { constants } from '../../../constants'

const SideDrawer = ({ toggleSideMenu }) => {
    const [menu, setMenu] = useState({})

    const sideDrawerList = [
        { icon: util.DashboardIcon, label: 'Dashboard', link: constants.routePaths.dashboard },
        {
            icon: util.ListAltIcon,
            label: 'Promotions',
            subMenu: [
                { label: 'Manage Content', link: constants.routePaths.promotions },
                { label: 'Prioritize Promos', link: constants.routePaths.prioritize_promos },
            ],
        },
    ]

    const clickHandler = item =>
        setMenu(prevState => {
            return { [item]: !prevState[item] }
        })

    const renderMainMenu = ({ icon, label, link }) => (
        <Link className={'side-drawer__link'} to={link} key={label}>
            <div className={'side-drawer__item'} onClick={toggleSideMenu}>
                {icon && <Icon renderIcon={icon} />}
                <div className={'side-drawer__item__main'}>{label}</div>
            </div>
        </Link>
    )

    const renderSubMenu = ({ icon, label, subMenu }) => (
        <div
            key={label}
            className={util.joinClasses('side-drawer__item', menu[label] && 'selected')}
            onClick={() => clickHandler(label)}
        >
            {icon && <Icon renderIcon={icon} />}
            <div className={util.joinClasses('side-drawer__item__main', menu[label] && 'selected')}>
                {label}
            </div>
            <Icon
                size={'md'}
                renderIcon={menu[label] ? util.ExpandLessIcon : util.ExpandMoreIcon}
            />
            {menu[label] && (
                <div onClick={e => e.stopPropagation()} className={'side-drawer__item__sub-menu'}>
                    {renderSideDrawer(subMenu)}
                </div>
            )}
        </div>
    )

    const renderSideDrawer = menuList =>
        menuList.map(({ icon, label, link, subMenu }) => {
            return !subMenu
                ? renderMainMenu({ icon, label, link })
                : renderSubMenu({ icon, label, subMenu })
        })

    return <div className={'side-drawer'}>{renderSideDrawer(sideDrawerList)}</div>
}

export default memo(SideDrawer)
