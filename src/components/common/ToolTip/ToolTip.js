import React, { memo, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { util } from '../../../util'
import { Backdrop } from '../index'

/** This component is responsible for rendering tool tip when the user hovers or clicks on this component
 */
const ToolTip = ({
    children,
    className,
    display = 'block',
    placement,
    render,
    highlight,
    isOnClicked = false,
    width = 62,
    height = 20,
    ...rest
}) => {
    const [showToolTip, setToolTip] = useState(false)
    const childRef = useRef()
    const bodyRef = useRef()

    const mouseLeaveHandler = () => setToolTip(false)
    const moveOverHandler = () => setToolTip(true)

    const childProps = !isOnClicked
        ? {
              onMouseOver: moveOverHandler,
              onMouseLeave: mouseLeaveHandler,
              className: highlight && 'highlight',
          }
        : {
              onClick: setToolTip,
          }

    const _getLeftPosition = () =>
        placement === 'right'
            ? `${childRef.current.offsetWidth + 12}px`
            : placement === 'left'
            ? `-${width + 2}rem`
            : `-25rem`

    const _getTopPosition = () =>
        placement === 'right' || placement === 'left' ? `-${height / 2}rem` : '2rem'

    return (
        <div className={`tool-tip ${display}`} {...rest}>
            <div className={util.joinClasses('tool-tip__main', className)}>
                {React.cloneElement(<div ref={childRef}>{children}</div>, childProps)}
                {showToolTip && isOnClicked && <Backdrop closeBackdrop={setToolTip} />}
                {showToolTip && (
                    <div className={'tool-tip__wrapper'}>
                        <div
                            ref={bodyRef}
                            className={util.joinClasses('tool-tip__main--body', placement)}
                            style={{
                                width: `${width}rem`,
                                height: `${height}rem`,
                                left: _getLeftPosition(),
                                top: _getTopPosition(),
                            }}
                        >
                            {render({ closeToolTipHandler: setToolTip })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

ToolTip.propTypes = {
    /** @param children {JSX} -> JSX that has been wrapped in between ToolTip component */
    children: PropTypes.node,
    /** @param className {String} -> className to override the default css */
    className: PropTypes.string,
    display: PropTypes.oneOf(['inline-block']),
    /** @param placement {String} -> placement of the tip */
    placement: PropTypes.oneOf(['right', 'left', 'bottom']),
    /** @param renderBody {renderProp} -> Content that needs to be displayed after hovering the tooltip component */
    render: PropTypes.func,
    /** @param highlight {Boolean} -> if the tooltip component should be highlighted */
    highlight: PropTypes.bool,
    /** @param isOnClicked  {Boolean} -> if true then render child on click events */
    isOnClicked: PropTypes.bool,
    /** @param width {Number} -> width of the tool tip */
    width: PropTypes.number,
    /** @param height {Number} -> height of the tool tip */
    height: PropTypes.number,
}

export default memo(ToolTip)
