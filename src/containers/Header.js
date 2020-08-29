import { connect } from 'react-redux'
import Header from '../components/Layout/Header'
import { logout } from '../modules/Auth/actions'

const mapStateToProps = ({ auth }) => ({
    userDetails: auth.user,
})

const mapDispatchToProps = {
    logout,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)
