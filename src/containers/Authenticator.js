import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../modules/Auth/actions'
import Authenticator from '../components/HOC/Authenticator'

const mapStateToProps = ({ auth }) => {
    return {
        isAuth: auth.isAuth,
        is_logout: auth.is_logout,
        refreshCount: auth.refreshCount,
        logout_hit_counter: auth.logout_hit_counter,
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Authenticator)
