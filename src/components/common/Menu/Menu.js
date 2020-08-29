import React, { useState, memo } from 'react'
import PropTypes from 'prop-types'

import { useToggle } from '../../Custom Hooks/useCustomHooks'
import { Backdrop } from '../index'
import { util } from '../../../util'

/**
 *
 * @param renderProps {callback} is a callback function which invokes and renders menu icon or text etc.
 * @param className {String} class name that will over ride the menu class
 * @param children {JSX} renders the JSX which was wrapped in between Menu Component
 * @param listWidth {String} -> ( 'sm' | 'md' | 'lg' | 'xl' ) width of the menu list
 * @param placement {String} -> ('left' | 'middle' | 'right') determines the position of the menu list
 * @param tipPlacement {String} -> ('left' | 'middle' | 'right') determines the position of the tip
 * @param hover {Boolean} hover State
 * @param rest {props} remaining props
 * @returns {JSX}
 */
const Menu = ({
    renderProps,
    className,
    children,
    listWidth = 'lg',
    placement = 'middle',
    tipPlacement = 'middle',
    hover = false,
    ...rest
}) => {
    const { margin } = { ...rest }
    const [showMenuList, toggleMenuList] = useToggle(false)
    const [ShowComponent, setShowComponent] = useState(null)

    const _showMenuListComponent = component => {
        toggleMenuList()
        setShowComponent(component() || null)
    }

    const unMountComponentHandler = () => setShowComponent(null)

    const menuListClass = util.joinClasses(
        'menu__list tip bottom',
        listWidth,
        placement,
        `tip-${tipPlacement}`
    )

    const renderMenuView = () =>
        React.cloneElement(
            <span className={util.joinClasses('menu__content', hover && 'hover')} {...rest}>
                {renderProps()}
            </span>,
            {
                onClick: toggleMenuList,
            }
        )

    const renderMenuListItems = () =>
        showMenuList ? (
            <div className={util.joinClasses('menu__wrapper', margin)}>
                {/* The following code is to render all children wrapped in between the menu component
                 * and setShowComponent callback will execute on clicking the menu item */}
                <div className={menuListClass}>
                    {React.Children.toArray(children).map(child =>
                        React.cloneElement(child, {
                            setShowComponent: _showMenuListComponent,
                        })
                    )}
                </div>
            </div>
        ) : null

    return (
        <div className={util.joinClasses('menu', className, showMenuList ? 'open' : 'close')}>
            {/* renderProps will render JSX, finally we are wrapping a div element to the rendered JSX and assigning
                the event handlers to change the state of the showMenuList using React Clone Element */}
            {renderMenuView()}

            {/* on Clicking the Menu View item, menu list will toggle and menu list component will appear according
                to its position and placement specified in the props */}
            {renderMenuListItems()}
            {showMenuList && <Backdrop closeBackdrop={toggleMenuList} />}

            {/* ShowComponent is JSX object, using React.cloneElement we can render it */}
            {/* The following statement is to mount the component when the user clicks on the menu list item, and
                we are sending a close callback to unmount the mounted component */}
            {ShowComponent && React.cloneElement(ShowComponent, { close: unMountComponentHandler })}
        </div>
    )
}

/**
 *
 * @param children {JSX}
 * @param onClick {renderProps}
 * @param show {Boolean}
 * @param setShowComponent {Callback}
 * @param rest {Object}
 * @returns {null|*}
 */
const MenuItem = ({ children, onClick, show = true, setShowComponent, ...rest }) => {
    if (!show) {
        return null
    }
    const itemClickHandler = () => (onClick ? setShowComponent(onClick) : undefined)
    return (
        <div className={'menu__list--item'} onClick={itemClickHandler} {...rest}>
            {children}
        </div>
    )
}

Menu.MenuItem = memo(MenuItem)

Menu.propTypes = {
    renderProps: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    listWidth: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
    placement: PropTypes.oneOf(['left', 'middle', 'right']),
    tipPlacement: PropTypes.oneOf(['left', 'middle', 'right']),
    hover: PropTypes.bool,
    rest: PropTypes.object,
}

MenuItem.propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    onClick: PropTypes.func,
    show: PropTypes.bool,
    setShowComponent: PropTypes.func,
    rest: PropTypes.object,
}

export default Menu
