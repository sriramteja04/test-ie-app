import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Logout from '../pages/Logout'
import * as actions from '../modules/Auth/actions'

const mapStateToProps = ({ auth }) => ({
    logout_hit_counter: auth.logout_hit_counter,
    isAuth: auth.isAuth,
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Logout)
