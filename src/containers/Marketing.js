import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../modules/Promotions/actions'
import Marketing from '../pages/Marketing'

const mapStateToProps = ({ promotions }) => ({
    promo_loading: promotions.promo_loading,
    promo_details: promotions.promo_details,
    id_editing_completed_promo: promotions.id_editing_completed_promo,
    promo_error: promotions.promo_error,
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Marketing)
