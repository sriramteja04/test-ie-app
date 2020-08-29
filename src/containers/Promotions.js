import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../modules/Filters/actions'
import Promotions from '../pages/Promotions'

const mapStateToProps = ({ promotions, filters }) => {
    return {
        count: promotions.count,
        applied_filters: filters.get('promotion_filters'),
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Promotions)
