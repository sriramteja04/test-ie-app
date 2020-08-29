import React, { memo } from 'react'

import TablePagination from './TablePagination'

const TableFooter = ({
    rowsPerPageOptions,
    rowsPerPage,
    rowsPerPageHandler,
    pageCount,
    currentPage,
    pageChangeHandler,
}) => {
    return (
        <div className={'table__footer'}>
            <TablePagination
                list={rowsPerPageOptions}
                rowsPerPage={rowsPerPage}
                rowsPerPageHandler={rowsPerPageHandler}
                pageCount={pageCount}
                currentPage={currentPage}
                pageChangeHandler={pageChangeHandler}
            />
        </div>
    )
}

export default memo(TableFooter)
