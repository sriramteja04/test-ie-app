import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../modules/Promotions/actions'
import EditPromoName from '../components/PromoDetails/EditPromoName'

const mapStateToProps = ({ promotions }) => {
    return {
        promo_loading: promotions.promo_loading,
        modalClose: promotions.modalClose,
        update_promo_error: promotions.update_promo_error,
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditPromoName)
