import React, { memo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from './modules/Common/actions'
import { GenericAlertModal } from './components/common'

/**
 * enhancePage will take component as parameter and return the Page component
 * along with handling the common page scenarios like error.
 * @param Page {Component}
 * @returns {*}
 */
const enhancePage = Page => {
    /**
     *
     * @param common_error {String} -> Common Error messages like Network error, internal server errors etc.
     * @param actions {Object} -> actions object contains action methods which will update the common global state values.
     * @param rest {props} -> remaining props for a page component like router props etc
     * @returns {JSX}
     */
    const EnhancePage = ({ common_error, actions, ...rest }) => {
        return (
            <>
                {common_error.length ? (
                    <GenericAlertModal
                        message={common_error}
                        toggleModal={actions.clearCommonError}
                    />
                ) : null}
                <Page {...rest} />
            </>
        )
    }

    const mapStateToProps = ({ common }) => ({
        common_error: common.common_error,
    })

    const mapDispatchToProps = dispatch => ({
        actions: bindActionCreators(actions, dispatch),
    })

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(memo(EnhancePage))
}

export default enhancePage
