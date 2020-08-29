import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../modules/Promotions/actions'
import PromotionsTable from '../components/Promotions/PromotionsTable'

const mapStateToProps = ({ promotions, auth, filters }) => {
    return {
        count: promotions.count,
        display_promo_alert: promotions.display_promo_alert,
        pageNo: promotions.pageNo,
        promo_loading: promotions.promo_loading,
        promotions_list: promotions.promotions_list,
        user_role: auth.user_role,
        sort_order: promotions.order,
        sort_orderBy: promotions.orderBy,
        applied_filters: filters.get('promotion_filters'),
        size: promotions.size,
        promo_error: promotions.promo_error,
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PromotionsTable)
