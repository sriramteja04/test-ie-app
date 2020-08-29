import React, { useRef, memo, useState } from 'react'
import PropTypes from 'prop-types'

import { util } from '../../../util'
import { Spinner, Icon } from '../index'

/**
 *
 * @param className
 * @param label
 * @param searchList
 * @param pillList
 * @param onChange
 * @param size {String} -> ('sm' | 'md' | 'lg' | 'xl')
 * @param name
 * @param value
 * @param pillListHandler
 * @param removeFilterList
 * @param loading
 * @param rest
 * @returns {*}
 * @constructor
 */
const SearchInput = ({
    className,
    label,
    searchList,
    pillList,
    onChange,
    size = 'md',
    name,
    value,
    pillListHandler,
    removeFilterList,
    loading,
    ...rest
}) => {
    const refInput = useRef()
    const focusInput = () => refInput.current.focus()
    const [showSearchList, setShowSearchList] = useState(false) // handles show/hide the search list

    const addSearchedItem = (value, name) => {
        setShowSearchList(false)
        const filterData = pillList
            ? typeof value === 'number'
                ? pillList.filter(item => item === value)
                : pillList.filter(item => item.toLowerCase() === value.toLowerCase())
            : []
        filterData.length <= 0 && pillListHandler(value, name)
    }

    const changeHandler = e => {
        e.target.value && !showSearchList && setShowSearchList(true)
        onChange(e)
    }

    const getSearchList = () => {
        const filterList = util.searchByInput(value.trim(), searchList)
        if (loading) {
            return (
                <div className={'search-input__list__loading'}>
                    <Spinner isInline={true} />
                </div>
            )
        }

        const listClassName = util.joinClasses(
            'search-input__list',
            size,
            filterList.length > 15 && 'enableScroll'
        )

        return (
            filterList.length > 0 &&
            value && (
                <div className={listClassName}>
                    {filterList.map(item => (
                        <div
                            onClick={() => addSearchedItem(item, name)}
                            key={item}
                            className={'search-input__list__item'}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            )
        )
    }

    const renderPillList = () => (
        <div className={'selected-list'}>
            {pillList
                ? pillList.length > 0 &&
                  pillList.map(item => {
                      return (
                          <div key={item} className={'selected-list__pill'}>
                              <span>{item}</span>
                              <Icon
                                  size={'xxs'}
                                  onClick={() => removeFilterList(item, name)}
                                  className={'selected-list__cancel'}
                                  renderIcon={util.CancelIcon}
                              />
                          </div>
                      )
                  })
                : null}
        </div>
    )

    const inputClass = util.joinClasses(
        'input-search',
        value && 'has-value',
        pillList && pillList.length === 0 && 'no-data',
        size
    )

    return (
        <div className={`search-input ${className} ${size}`}>
            <div className={'search-input__wrapper'}>
                <div className={'search-input-field'}>
                    <input
                        ref={refInput}
                        className={inputClass}
                        value={value}
                        onChange={changeHandler}
                        name={name}
                        placeholder={name}
                        autoComplete={'off'}
                        {...rest}
                    />
                    <label className={'label'} onClick={focusInput}>
                        {label}
                    </label>
                    <Icon
                        onClick={() => refInput.current.focus()}
                        pointer={true}
                        className={'search-icon'}
                        size={'sm'}
                        renderIcon={util.SearchIcon}
                    />
                </div>
                {renderPillList()}
            </div>
            {showSearchList && getSearchList()}
        </div>
    )
}

SearchInput.propTypes = {
    className: PropTypes.string,
    label: PropTypes.any,
    searchList: PropTypes.array,
    pillList: PropTypes.array,
    onChange: PropTypes.func,
    size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
    name: PropTypes.string,
    value: PropTypes.any,
    pillListHandler: PropTypes.func,
    removeFilterList: PropTypes.func,
    loading: PropTypes.bool,
    res: PropTypes.object,
}

export default memo(SearchInput)
