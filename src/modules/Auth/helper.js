import axios from 'axios'

const authorize = () => {
    const url = `${process.env.REACT_APP_COGNITO_DOMAIN}/authorize?identity_provider=${process.env.REACT_APP_IDP}&response_type=${process.env.REACT_APP_SSO_RESPONSE_TYPE}&client_id=${process.env.REACT_APP_CLIENT_ID}&scope=${process.env.REACT_APP_SSO_SCOPE}&redirect_uri=${process.env.REACT_APP_SSO_REDIRECT_URL}`
    window.location.replace(url)
}

const getUser = token =>
    axios({
        url: `${process.env.REACT_APP_COGNITO_DOMAIN}/oauth2/userInfo`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

const getTokens = code => async () => {
    const reqData = `grant_type=${process.env.REACT_APP_GRANT_TYPE}&code=${code}&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_SSO_REDIRECT_URL}`
    return axios({
        url: `${process.env.REACT_APP_COGNITO_DOMAIN}/oauth2/token`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
        data: reqData,
    })
}

const getRefreshToken = refreshToken => async () => {
    const reqData = `grant_type=refresh_token&client_id=${process.env.REACT_APP_CLIENT_ID}&refresh_token=${refreshToken}`
    return axios({
        url: `${process.env.REACT_APP_COGNITO_DOMAIN}/oauth2/token`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
        data: reqData,
    })
}

const logout = () => {
    const url = `${process.env.REACT_APP_COGNITO_DOMAIN}/logout?&client_id=${process.env.REACT_APP_CLIENT_ID}&logout_uri=${process.env.REACT_APP_SSO_LOGOUT_URL}`
    window.location.replace(url)
}

export const authClient = {
    authorize,
    getTokens,
    getRefreshToken,
    getUser,
    logout,
}
