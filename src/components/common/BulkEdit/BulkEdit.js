import React, { memo } from 'react'
import { Button } from '../index'
import PropTypes from 'prop-types'

const BulkEdit = ({ clearSelection, selectAll, children }) => {
    return (
        <div className={'bulk-edit'}>
            <div className={'bulk-edit__records'}>{selectAll.length} item(s) selected</div>
            <div className={'bulk-edit__actions'}>
                <Button
                    className={'clear mt-0 mb-0'}
                    color={'transparent'}
                    onClick={clearSelection}
                >
                    Clear
                </Button>
                {children}
            </div>
        </div>
    )
}

BulkEdit.propTypes = {
    /** @param clearSelection {CallableFunction} -> Callback to clear the selected records. */
    clearSelection: PropTypes.func,

    /** @param selectAll {array} -> Array(Object) of records selected */
    selectAll: PropTypes.arrayOf(PropTypes.object),

    /** @param children {JSX} renders the JSX wrapped in between BulkEdit Component */
    children: PropTypes.element,
}

export default memo(BulkEdit)
