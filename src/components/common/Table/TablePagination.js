import React, { memo } from 'react'

import { SelectInput, DoubleChevron } from '../index'

const TablePagination = ({
    list,
    rowsPerPage,
    rowsPerPageHandler,
    pageCount,
    currentPage,
    pageChangeHandler,
}) => {
    const arrowBackClickHandler = () =>
        currentPage !== 1 ? pageChangeHandler(currentPage - 1) : undefined

    const arrowFrontClickHandler = () =>
        currentPage !== pageCount ? pageChangeHandler(currentPage + 1) : undefined

    const renderContent = () => (
        <span>
            {currentPage} of {pageCount}
        </span>
    )

    return (
        <div className={'pagination'}>
            <SelectInput
                options={list}
                value={rowsPerPage}
                onChange={rowsPerPageHandler}
                id={'rows per page'}
                size={'xxs'}
                color={'light'}
            />
            <DoubleChevron
                iconSize={'xxs'}
                backwardClickHandler={arrowBackClickHandler}
                forwardClickHandler={arrowFrontClickHandler}
                forwardDisabled={currentPage === pageCount}
                backwardDisabled={currentPage === 1}
                renderContent={renderContent}
                display={'inline'}
                className={'ml-6'}
            />
        </div>
    )
}

export default memo(TablePagination)
