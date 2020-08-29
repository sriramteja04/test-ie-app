import React, { memo, Fragment } from 'react'

import logoutIcon from '../../../assets/icons/logout.svg'
import { useToggle } from '../../Custom Hooks/useCustomHooks'
import { Backdrop } from '../../common'

const AccountInfo = ({ userDetails, logout }) => {
    const [showAccountInfo, setShowAccountInfo] = useToggle(false)
    if (!userDetails) {
        return null
    }

    const { name, email } = userDetails
    const [lName, fName] = userDetails ? name.split(', ') : [undefined, undefined]

    return (
        <Fragment>
            <div className={`toolbar--actions accountIcon ${showAccountInfo && 'underline'}`}>
                <span className={'userIcon'} onClick={setShowAccountInfo}>
                    {fName && lName ? fName[0] + lName[0] : null}
                </span>
            </div>
            {showAccountInfo && (
                <div className={'account_outer'}>
                    <div className={'account_info'}>
                        <div className={'account_info__userIcon'}>
                            {fName && lName && fName[0] + lName[0]}
                        </div>
                        <div className={'account_info__details'}>
                            <div className={'name'}>{fName && lName && `${lName}, ${fName}`}</div>
                            <div className={'email'}>{email}</div>
                        </div>
                        <div className={'account_info__logout'} onClick={logout}>
                            <img
                                src={logoutIcon}
                                alt={'logout'}
                                className={'account_info__logout__icon'}
                            />
                            <span className={'account_info__logout__text'}>Log out</span>
                        </div>
                    </div>
                </div>
            )}
            {showAccountInfo && <Backdrop closeBackdrop={setShowAccountInfo} />}
        </Fragment>
    )
}

export default memo(AccountInfo)
