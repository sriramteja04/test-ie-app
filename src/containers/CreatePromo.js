import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import CreatePromo from '../components/Promotions/CreatePromo/CreatePromo'
import * as actions from '../modules/Promotions/actions'

const mapStateToProps = ({ promotions, auth }) => {
    return {
        id: promotions.id,
        promo_loading: promotions.promo_loading,
        modalClose: promotions.modalClose,
        user: auth.user,
        create_promo_error: promotions.create_promo_error,
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreatePromo)
