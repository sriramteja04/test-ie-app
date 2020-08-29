import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import PromoDetails from '../pages/PromoDetails'
import * as actions from '../modules/Promotions/actions'

const mapStateToProps = ({ promotions, auth }) => {
    return {
        promo_loading: promotions.promo_loading,
        promo_details: promotions.promo_details,
        modalClose: promotions.modalClose,
        display_promo_alert: promotions.display_promo_alert,
        user_role: auth.user_role,
        update_promo_error: promotions.update_promo_error,
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PromoDetails)
