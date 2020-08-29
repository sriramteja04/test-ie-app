import { memo } from 'react'

const Authenticator = ({ actions, isAuth, children, is_logout, refreshCount }) => {
    const currURL = window.location.href
    const codeMatch = currURL.match('[?#&]code=([^&]*)')

    if (is_logout) {
        return null
    } else if (refreshCount === 1 && !isAuth && currURL.includes('/logout')) {
        return null
    } else if (!isAuth) {
        if (!(codeMatch && codeMatch[1])) {
            actions.sagaSignIn()
            return
        }
    } else {
        return children
    }
}

export default memo(Authenticator)
