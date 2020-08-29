import React, { memo, useCallback, useEffect, useReducer, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { util } from '../../../util'
import { DropZone } from '../../HOC/DropZone'
import {
    Button,
    ErrorMessage,
    SearchInput,
    SelectInput,
    Icon,
    TextArea,
    UploadImage,
} from '../../common'
import { strings } from '../../../strings'
import { useUploadImage } from '../../Custom Hooks/useUploadImage'
import { awsUtil } from '../../../services/aws'
import { api } from '../../../modules/api'
import { getProductsListURL } from '../../../modules/Promotions/url'
import { useDebounce } from '../../Custom Hooks/useCustomHooks'
import { constants } from '../../../constants'
import * as actions from '../../../modules/Promotions/actions'

const { sevenAppPlacementTiles } = constants

const DIMENSIONS = {
    Homepage_Carousel: [sevenAppPlacementTiles[0].width, sevenAppPlacementTiles[0].height],
    Deal_Tile: [sevenAppPlacementTiles[1].width, sevenAppPlacementTiles[1].height],
}

const EditConfiguration = ({
    toggleEditSideMenu,
    selected,
    saveEditConfigsHandler,
    categoriesList,
    actions,
    isPublished,
}) => {
    const uploadImageInitialState = {
        image: {},
        image_url: '',
        error: false,
        maxWidth: 0,
        maxHeight: 0,
        imageLoading: false,
        size: 0,
        lastModifiedAt: '',
    }

    const [rules, setRules] = useState({
        maxImgSize: 1000000,
        imgFormat: ['image/png', 'image/jpeg'],
    })

    const [productsList, setProductsList] = useState([])

    const {
        state: { image_url, error, maxWidth, maxHeight, imageLoading, size, lastModifiedAt },
        uploadImageHandler,
        onLoadImageHandler,
        clearUploadedImage,
        dropHandler,
        dragOverHandler,
        updateState: updateImageState,
        promoImageLoader,
    } = useUploadImage(uploadImageInitialState, rules)

    const initialState = {
        landing_page_type: 'None',
        landing_page_name: '',
        copy: '',
        legal_disclaimer: '',
        landing_page_id: 0,
        products_loading: false,
    }

    const editStateTypes = {
        INPUT_CHANGE: 'INPUT_CHANGE',
        UPDATE_STATE_FIELD: 'UPDATE_STATE_FIELD',
    }

    const reducer = (state, action) => {
        const { type, payload, field } = action
        const { shallowHelper } = util
        switch (type) {
            case editStateTypes.INPUT_CHANGE:
                return shallowHelper(state, { [field]: payload })

            case editStateTypes.UPDATE_STATE_FIELD:
                return shallowHelper(state, { ...payload })

            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    const {
        landing_page_type,
        landing_page_name,
        copy,
        legal_disclaimer,
        landing_page_id,
        products_loading,
    } = state

    const inputChangeHandler = useCallback(
        e => {
            landing_page_id !== 0 && updateState({ landing_page_id: 0 })
            dispatch({
                type: editStateTypes.INPUT_CHANGE,
                field: e.target.name,
                payload: e.target.value,
            })
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [landing_page_id]
    )

    const lpExistsChangeHandler = useCallback(
        value => {
            updateState({
                landing_page_type: value,
                landing_page_id: 0,
                landing_page_name: '',
            })
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [categoriesList]
    )

    const lpNameHandler = useCallback(
        value => {
            const pageNameList = landing_page_type === 'Category' ? categoriesList : productsList
            const selectedPageName = pageNameList.filter(nameList => nameList.name === value)[0]
            if (selectedPageName) {
                updateState({
                    landing_page_id: selectedPageName.id,
                    landing_page_name: selectedPageName.name,
                })
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [landing_page_type, categoriesList, productsList]
    )

    const updateState = useCallback(payload => {
        dispatch({
            type: editStateTypes.UPDATE_STATE_FIELD,
            payload: payload,
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const debouncedProductName = useDebounce(landing_page_name.trim(), 500)

    useEffect(() => {
        !categoriesList && actions.fetchCategoriesList()
        if (selected.length === 1) {
            const {
                image_url = '',
                copy = '',
                legal_disclaimer = '',
                landing_page_type = 'None',
                landing_page_name = '',
                landing_page_id = 0,
            } = selected[0]
            updateState({
                copy: copy,
                legal_disclaimer: legal_disclaimer,
                landing_page_name: landing_page_name,
                landing_page_type: landing_page_type,
                lpExists: landing_page_type && true,
                landing_page_id: landing_page_id,
            })
            image_url && _getImageDetails(image_url)
            updateImageState({ image_url: image_url })
        }
        _getDimensions(selected)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (landing_page_type === 'Product' && debouncedProductName) {
            debouncedProductName.length >= 3 &&
                landing_page_id === 0 &&
                fetchProductsList(debouncedProductName)
        } else {
            productsList.length > 0 && setProductsList([])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedProductName])

    const fetchProductsList = useCallback(
        async product => {
            try {
                updateState({
                    products_loading: true,
                })
                const requestPayload = {
                    searchText: product,
                }
                const res = await api(getProductsListURL, 'POST', requestPayload)
                res &&
                    res.data.searchText === landing_page_name.trim() &&
                    setProductsList(res.data.products)

                updateState({
                    products_loading: false,
                })
            } catch (e) {
                console.log(e)
                updateState({
                    products_loading: false,
                })
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [landing_page_name]
    )

    const _getImageDetails = async url => {
        try {
            promoImageLoader(true)
            const res = await awsUtil.getObject(url)
            updateImageState({
                size: res.ContentLength,
                lastModifiedAt: res.LastModified,
            })
            promoImageLoader(false)
        } catch (e) {
            console.log(e)
            promoImageLoader(false)
        }
    }

    const _getDimensions = selected => {
        const uniqueRecords = util.findUniqueValues(selected, 'placement_location')
        let imageDimensions = null
        if (uniqueRecords.length === 1) {
            imageDimensions = DIMENSIONS[uniqueRecords[0].replace(' ', '_')]
        } else {
            const mapDimensions = uniqueRecords.map(rec => DIMENSIONS[rec.replace(' ', '_')])
            const minWidth = util.getMax(mapDimensions.map(dim => dim[0]))
            const minHeight = util.getMax(mapDimensions.map(dim => dim[1]))
            imageDimensions = [minWidth, minHeight]
        }
        const updatedRules = { ...rules }
        updatedRules['maxWidth'] = imageDimensions[0]
        updatedRules['maxHeight'] = imageDimensions[1]
        setRules(updatedRules)
    }

    const saveHandler = () => {
        const reqValues = [
            'image_url',
            'copy',
            'legal_disclaimer',
            'landing_page_name',
            'landing_page_type',
            'landing_page_id',
        ]

        const configuredData = {}
        reqValues.forEach(val => {
            if (state.hasOwnProperty(val)) {
                if (selected[0][val]) {
                    configuredData[val] = state[val]
                } else if (state[val]) {
                    configuredData[val] = state[val]
                }
            }
        })
        if (selected[0]['image_url'] || image_url) {
            configuredData['image_url'] = image_url
        }

        if (process.env.REACT_APP_ENV === 'local') {
            configuredData['image_url'] =
                'https://d29irc0qtwuvxe.cloudfront.net/promo-images/2020-08-18T16:02:58.961Z7N-App-OfferTile-Monster.jpeg'
        }

        saveEditConfigsHandler(configuredData)
    }

    let isDisabled = false
    if ((landing_page_name !== '' && landing_page_id === 0) || isPublished) {
        isDisabled = true
    }

    const renderTitle = () =>
        selected.length > 1 ? (
            <div>
                <div>
                    <p className={'heading-secondary trasandina'}>Bulk Edit</p>
                    <p className={'paragraph italic ml-4'}>{selected.length} records</p>
                </div>
                <ErrorMessage
                    className={'mt-4'}
                    type={'info'}
                    messages={[`Any edits below will effect ${selected.length} records `]}
                />
            </div>
        ) : (
            <p className={'heading-secondary trasandina'}>Edit Configuration</p>
        )

    const renderActions = () => (
        <div className={'actions'}>
            <Button
                onClick={toggleEditSideMenu}
                className={'mr-7 ml-0'}
                color={'light'}
                size={'xxl'}
            >
                CANCEL
            </Button>
            <Button color={'dark'} size={'xxl'} onClick={saveHandler} disabled={isDisabled}>
                SAVE
            </Button>
        </div>
    )

    const renderUploadImage = () => (
        <div className={'edit-configuration__item uploadImage'}>
            <p className={'paragraph sub bold mb-6'}>Image Upload</p>
            {error && (
                <ErrorMessage
                    type={'warning'}
                    className={'mb-6'}
                    messages={[
                        'Image upload failed.',
                        `Image must be less than ${rules['maxImgSize'] / 1000} kilobytes in size.`,
                        `Image must be ${rules['maxWidth']} pixes wide and ${
                            rules['maxHeight']
                        } pixels high.`,
                        `Image must be ${rules['imgFormat'].map(el => ` ${el}`)} format.`,
                        `Image name must not have any spaces`,
                    ]}
                />
            )}
            <DropZone onDrop={dropHandler} onDragOver={dragOverHandler}>
                <UploadImage
                    size={size}
                    lastModifiedAt={lastModifiedAt}
                    imgURL={image_url}
                    rules={rules}
                    onChange={uploadImageHandler}
                    onLoad={onLoadImageHandler}
                    maxWidth={maxWidth}
                    maxHeight={maxHeight}
                    clearImage={clearUploadedImage}
                    loading={imageLoading}
                />
            </DropZone>
        </div>
    )

    const renderTextArea = () => (
        <>
            <div className={'edit-configuration__item copy'}>
                <TextArea
                    className={'config-text-area'}
                    name={'copy'}
                    label={'Copy'}
                    value={copy}
                    onChange={inputChangeHandler}
                />
                {selected.length > 1 && (
                    <ErrorMessage
                        className={'mt-2'}
                        type={'info'}
                        messages={[strings.copyAlertMessage]}
                    />
                )}
            </div>
            <div className={'edit-configuration__item legal'}>
                <TextArea
                    className={'config-text-area'}
                    name={'legal_disclaimer'}
                    label={'Legal Disclaimer'}
                    value={legal_disclaimer}
                    onChange={inputChangeHandler}
                />
            </div>
        </>
    )

    const searchList = new Set([])
    if (landing_page_type !== 'None') {
        const list = landing_page_type === 'Category' ? categoriesList : productsList
        list && list.forEach(category => searchList.add(category.name))
    }

    const renderLandingDetails = () => (
        <div className={'edit-configuration__item landing'}>
            <p className={'paragraph bold mb-7'}>Set Landing Page</p>
            <SelectInput
                size={'xxl'}
                className={'select-lp'}
                value={landing_page_type}
                name={'landing_page_type'}
                label={'Page Type'}
                options={['None', 'Category', 'Product']}
                onChange={lpExistsChangeHandler}
            />
            {landing_page_type && landing_page_type !== 'None' && (
                <>
                    <SearchInput
                        searchList={Array.from(searchList)}
                        type={'text'}
                        size={'md'}
                        placeholder={'Landing Page'}
                        value={landing_page_name}
                        onChange={inputChangeHandler}
                        pillListHandler={lpNameHandler}
                        name={'landing_page_name'}
                        className={'mt-7'}
                        loading={products_loading}
                    />
                    {landing_page_name && landing_page_id === 0 && (
                        <span className={'error'}>Please select a valid landing page name</span>
                    )}
                </>
            )}
        </div>
    )

    return (
        <div className={'side-menu__body'}>
            <div className={'edit-configuration'}>
                <div className={'edit-configuration__item heading'}>
                    <div className={'title'}>{renderTitle()}</div>
                    <Icon pointer={true} onClick={toggleEditSideMenu} renderIcon={util.CloseIcon} />
                </div>
                {renderUploadImage()}
                {renderTextArea()}
                {renderLandingDetails()}
            </div>
            {renderActions()}
        </div>
    )
}

const mapStateToProps = ({ promotions }) => ({
    categoriesList: promotions.categories_list,
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
})

export default memo(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(EditConfiguration)
)
