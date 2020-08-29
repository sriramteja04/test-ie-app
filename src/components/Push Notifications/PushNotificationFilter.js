// import React, { memo, useEffect, useMemo, useRef, useState } from 'react'
// import { strings } from '../../strings'
// import { DatePicker } from '../../common/DatePicker'
// import { Checkbox } from '../../common/Checkbox'
// import { SearchInput } from '../../common/SearchInput'
//
// import { constants } from '../../constants'
// import { useFilter } from '../Custom Hooks/useFilterReducer'
// import { FilterToolBar } from '../../common/FilterToolBar'
// import { FilterActions } from '../../common/FilterActions'
// // import { RangeSlider } from '../../common/Range Slider'
//
// export const PushNotificationFilter = memo(({ toggleHandler, appliedFilters, dispatchFilters }) => {
//     const {
//         listPromoId,
//         listCreatedBy,
//         listLastModifiedBy,
//         pushNotificationStatusFields,
//         rangeSliderMarks,
//     } = constants
//
//     const initialState = {
//         filterState: appliedFilters || {
//             pushNotificationId: [],
//             date_range: [],
//             createdBy: [],
//             lastModifiedBy: [],
//             status: [],
//             audienceSize: [0, 0],
//         },
//         pushNotificationId: { value: '', list: [] },
//         startDateError: '',
//         endDateError: '',
//         date_range: { list: [] },
//         createdBy: { value: '', list: [] },
//         lastModifiedBy: { value: '', list: [] },
//         status: { list: [] },
//         audienceSize: { list: [0, 0] },
//         enableSaveBtn: false,
//     }
//
//     const {
//         state,
//         inputChangeHandler,
//         updateFilterList,
//         removeFilterList,
//         checkboxHandler,
//         dateChangeHandler,
//         clearAllHandler,
//         closeSideMenuHandler,
//         filterApplyHandler,
//         audienceChangeHandler,
//         updateStateFields,
//     } = useFilter(initialState, toggleHandler, appliedFilters, dispatchFilters)
//
//     const {
//         filterState,
//         pushNotificationId,
//         lastModifiedBy,
//         startDateError,
//         endDateError,
//         createdBy,
//         status,
//         audienceSize,
//         date_range: {
//             list: [startDate, endDate],
//         },
//         enableSaveBtn,
//     } = state
//
//     useEffect(() => {
//         const enableBtn = Object.keys(state).reduce((initial, key) => {
//             if (state.filterState.hasOwnProperty(key)) {
//                 const { list } = state[key]
//                 if (key === 'date_range') {
//                     if (list.length === 2) return true
//                     else if (list.length === 0) return initial
//                     else return false
//                 }
//                 if (list && list.length > 0) return true
//                 else return initial
//             } else return initial
//         }, false)
//         updateStateFields('enableSaveBtn', enableBtn)
//
//         const { list: dates } = state.date_range
//         if (dates[0] && !dates[1]) updateStateFields('endDateError', strings.filterEndDateError)
//         else if (dates[0] && dates[1]) updateStateFields('endDateError', '')
//     }, [
//         state.pushNotificationId,
//         state.lastModifiedBy,
//         state.date_range,
//         state.status,
//         state.createdBy,
//         state.audienceSize,
//     ])
//
//     return (
//         <div className={'filter-menu'}>
//             <FilterToolBar clearAllHandler={clearAllHandler} closeSideMenuHandler={toggleHandler} />
//             <div className={'filter-menu__body'}>
//                 <div className={'filter-menu__item'}>
//                     <p className={'filter-menu__label'}>Push Notification ID</p>
//                     <SearchInput
//                         searchList={listPromoId}
//                         type={'text'}
//                         placeholder={'Push Notification ID'}
//                         pillList={useMemo(() => pushNotificationId.list, [pushNotificationId.list])}
//                         value={pushNotificationId.value}
//                         size={'lg'}
//                         onChange={inputChangeHandler}
//                         pillListHandler={updateFilterList}
//                         name={'pushNotificationId'}
//                         removeFilterList={removeFilterList}
//                     />
//                 </div>
//                 <div className={'filter-menu__item'}>
//                     <p className={'filter-menu__label'}>Audience Size</p>
//                     {/*<RangeSlider*/}
//                     {/*    marks={rangeSliderMarks}*/}
//                     {/*    value={audienceSize.list}*/}
//                     {/*    handleChange={audienceChangeHandler}*/}
//                     {/*    name={'audienceSize'}*/}
//                     {/*/>*/}
//                 </div>
//                 <div className={'filter-menu__item'}>
//                     <p className={'filter-menu__label'}>Date Range</p>
//                     <div className={'filter-menu__dateRange'}>
//                         <DatePicker
//                             handleDateChange={dateChangeHandler}
//                             selectedDate={
//                                 startDate ||
//                                 (filterState &&
//                                     filterState.date_range &&
//                                     filterState.date_range[0]) ||
//                                 null
//                             }
//                             name={'startDate'}
//                             placeholder={'Start Date'}
//                         />
//                         <p className={'filter-menu__error'}>{startDateError}</p>
//                     </div>
//                     <div className={'filter-menu__dateRange'}>
//                         <DatePicker
//                             minDate={
//                                 startDate ||
//                                 (filterState && filterState.date_range && filterState.date_range[1])
//                             }
//                             className={'mt-3'}
//                             handleDateChange={dateChangeHandler}
//                             selectedDate={endDate || (filterState && filterState.endDate) || null}
//                             name={'endDate'}
//                             placeholder={'End Date'}
//                             disabled={
//                                 !startDate &&
//                                 !(
//                                     filterState &&
//                                     filterState.date_range &&
//                                     filterState.date_range[0]
//                                 )
//                             }
//                         />
//                         <p className={'filter-menu__error'}>{endDateError}</p>
//                     </div>
//                 </div>
//
//                 <div className={'filter-menu__item'}>
//                     <p className={'filter-menu__label'}>Created By</p>
//                     <SearchInput
//                         searchList={listCreatedBy}
//                         type={'text'}
//                         size={'lg'}
//                         name={'createdBy'}
//                         placeholder={'Created By'}
//                         pillList={useMemo(() => createdBy.list, [createdBy.list])}
//                         value={createdBy.value}
//                         onChange={inputChangeHandler}
//                         pillListHandler={updateFilterList}
//                         removeFilterList={removeFilterList}
//                     />
//                 </div>
//                 <div className={'filter-menu__item'}>
//                     <p className={'filter-menu__label'}>Last Modified By</p>
//                     <SearchInput
//                         searchList={listLastModifiedBy}
//                         type={'text'}
//                         size={'lg'}
//                         name={'lastModifiedBy'}
//                         placeholder={'Last Modified By'}
//                         pillList={useMemo(() => lastModifiedBy.list, [lastModifiedBy.list])}
//                         value={lastModifiedBy.value}
//                         onChange={inputChangeHandler}
//                         pillListHandler={updateFilterList}
//                         removeFilterList={removeFilterList}
//                     />
//                 </div>
//                 <div className={'filter-menu__item'}>
//                     <p className={'filter-menu__label'}>Status</p>
//                     <div className={'filter-menu__checkbox'}>
//                         {pushNotificationStatusFields.map(item => (
//                             <React.Fragment key={item}>
//                                 <Checkbox
//                                     label={item}
//                                     checked={status.list.includes(item) || false}
//                                     onChange={checkboxHandler}
//                                     margin={'mt-3'}
//                                     name={'status'}
//                                 />
//                             </React.Fragment>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//             <FilterActions
//                 isEnable={enableSaveBtn}
//                 closeSideMenuHandler={closeSideMenuHandler}
//                 filterApplyHandler={filterApplyHandler}
//             />
//         </div>
//     )
// })
