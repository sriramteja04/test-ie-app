import { useReducer, useCallback, useEffect } from 'react'
import { util } from '../../util'
import { awsUtil } from '../../services/aws'

export const useUploadImage = (initialState, rules) => {
    const stateTypes = {
        UPLOAD_IMAGE: 'UPLOAD_IMAGE',
        IMG_ERROR: 'IMG_ERROR',
        CLEAR_IMG_ERROR: 'CLEAR_IMG_ERROR',
        UPDATE_WIDTH_HEIGHT: 'UPDATE_WIDITH_HEIGHT',
        CLEAR_STATE: 'CLEAR_STATE',
        UPDATE_STATE: 'UPDATE_STATE',
        LOAD_IMAGE_START: 'LOAD_IMAGE_START',
        LOAD_IMAGE_END: 'LOAD_IMAGE_END',
    }

    const reducer = (state, action) => {
        const { type, payload } = action
        const { shallowHelper } = util

        switch (type) {
            case stateTypes.UPLOAD_IMAGE:
                return shallowHelper(state, {
                    image: payload.image,
                    image_url: payload.image_url,
                    error: false,
                })

            case stateTypes.IMG_ERROR:
                return shallowHelper(state, { error: true })

            case stateTypes.CLEAR_IMG_ERROR:
                return shallowHelper(state, { error: false })

            case stateTypes.UPDATE_WIDTH_HEIGHT:
                return shallowHelper(state, {
                    maxWidth: payload.maxWidth,
                    maxHeight: payload.maxHeight,
                })

            case stateTypes.CLEAR_STATE:
                return shallowHelper(state, initialState)

            case stateTypes.UPDATE_STATE:
                return shallowHelper(state, payload)

            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(reducer, { ...initialState, rules: rules })

    useEffect(() => {
        updateState({
            rules: rules,
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rules])

    const updateState = payload => dispatch({ type: stateTypes.UPDATE_STATE, payload: payload })

    const promoImageLoader = state => {
        dispatch({
            type: stateTypes.UPDATE_STATE,
            payload: { imageLoading: state },
        })
    }

    const updateImageError = () => dispatch({ type: stateTypes.IMG_ERROR })

    const uploadImageHandler = useCallback(
        e => {
            e.preventDefault()
            if (e.target.files && e.target.files[0]) {
                updateImageFile(e.target.files[0])
            }
        },

        // eslint-disable-next-line react-hooks/exhaustive-deps
        [state.rules]
    )

    const dropHandler = useCallback(
        e => {
            e.preventDefault()
            if (e.dataTransfer.files[0]) {
                updateImageFile(e.dataTransfer.files[0])
            }
        },

        // eslint-disable-next-line react-hooks/exhaustive-deps
        [state.rules]
    )

    const updateImageFile = async file => {
        const { rules } = state
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = async () => {
            if (
                file.size < rules.maxImgSize &&
                rules.imgFormat.some(el => el === file.type) &&
                !file.name.includes(' ')
            ) {
                const image = new Image()
                image.src = window.URL.createObjectURL(file)
                // loading the image to find the image width and height
                image.onload = async function() {
                    // if the current upload image is not satisfying the rules then throw an error
                    if (this.width !== rules.maxWidth || this.height !== rules.maxHeight) {
                        updateImageError()
                    } else {
                        try {
                            promoImageLoader(true)
                            const res = await awsUtil.uploadFile(file)
                            updateState({
                                image_url: res.fileName,
                                imageLoading: false,
                                error: false,
                                size: file.size,
                                lastModifiedAt: new Date().toISOString(),
                            })
                        } catch (e) {
                            console.log(e)
                            updateImageError()
                            promoImageLoader(false)
                        }
                    }
                }
            } else {
                dispatch({
                    type: stateTypes.IMG_ERROR,
                })
            }
        }
    }

    const clearUploadedImage = async () => {
        try {
            promoImageLoader(true)
            await awsUtil.deleteFile(state.image_url)
            promoImageLoader(false)
            dispatch({
                type: stateTypes.CLEAR_STATE,
            })
        } catch (e) {
            promoImageLoader(false)
            console.log(e)
        }
    }

    const onLoadImageHandler = useCallback(
        async e => {
            const { rules } = state
            if (e.target.width > rules.maxWidth || e.target.height > rules.maxHeight) {
                await clearUploadedImage()
                updateImageError()
            } else {
                dispatch({ type: stateTypes.CLEAR_IMG_ERROR })
                dispatch({
                    type: stateTypes.UPDATE_WIDTH_HEIGHT,
                    payload: {
                        maxWidth: e.target.width,
                        maxHeight: e.target.height,
                    },
                })
            }
        },

        // eslint-disable-next-line react-hooks/exhaustive-deps
        [state.rules]
    )

    const dragOverHandler = useCallback(
        e => e.preventDefault(),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    return {
        state,
        dispatch,
        uploadImageHandler,
        onLoadImageHandler,
        clearUploadedImage,
        dropHandler,
        dragOverHandler,
        updateState,
        promoImageLoader,
    }
}
