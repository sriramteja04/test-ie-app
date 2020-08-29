import React, { memo } from 'react'

const WeeklyCircleField = ({ list, weekList, handleClick, name, ...rest }) => {
    const filterUpdatedList = (weekList, item) => {
        if (weekList.findIndex(el => el === item) >= 0) {
            const filterList = weekList.filter(el => el !== item)
            filterList.length > 0 && handleClick(filterList, name)
        } else {
            handleClick([...weekList, item], name)
        }
    }

    return (
        <div className={'repeat-setting__weekly'}>
            <div className={'days'}>
                {list.map(obj => (
                    <span
                        className={`dot ${weekList.includes(obj.key) && 'selected'}`}
                        key={obj.key}
                        onClick={() => filterUpdatedList(weekList, obj.key)}
                    >
                        {obj.value[0]}
                    </span>
                ))}
            </div>
        </div>
    )
}

export default memo(WeeklyCircleField)
