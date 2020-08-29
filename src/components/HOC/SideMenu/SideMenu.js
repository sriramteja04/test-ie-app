import React, { memo, useRef } from 'react'
import { util } from '../../../util'
import { Backdrop } from '../../common'

/**
 *
 * @param open {Boolean} -> property that determines whether to open the side menu or not
 * @param direction {String} -> From which side that the side menu should come from (left or right)
 * @param width {String} -> width of the side menu (sm, lg, xl, xxl)
 * @param children {JSX} -> wrapped Component
 * @param toggleMenu {callback} -> callback to close the side menu
 * @param showBackdrop {Boolean} -> determines whether to show the opacity in backdrop
 * @returns {JSX} -> A component that exists inside the side menu
 */
const SideMenu = ({ open, direction, width, children, toggleMenu, showBackdrop = true }) => {
    const sideMenuRef = useRef({})
    const sideMenuClass = util.joinClasses(open ? 'side-menu open' : 'side-menu', direction, width)
    return (
        <>
            {open && <Backdrop showOpacity={showBackdrop} closeBackdrop={toggleMenu} />}
            <div className={sideMenuClass} ref={sideMenuRef}>
                {open
                    ? React.cloneElement(children, {
                          sideMenuRef: sideMenuRef,
                      })
                    : null}
            </div>
        </>
    )
}

export default memo(SideMenu)
