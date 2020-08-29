import React, { memo, useRef } from 'react'
import PropTypes from 'prop-types'

import { util } from '../../../util'
import { Spinner, Icon } from '../index'

/** This component will return either an image requirements, or an uploaded image along with its details
 *
 * @param imgURL {String} -> CloudFront promotion banner url
 * @param onChange {EventHandler} -> change handler to handle image uploads
 * @param onLoad {EventHandler} -> load handler to handle after the image has been uploaded
 * @param rules {Object} -> object consists of image uploading rules
 * @param maxHeight {Number} maximum height of the image
 * @param maxWidth {Number} maximum width of the image
 * @param clearImage {EventHandler} -> Click Handler to remove image
 * @param loading {Boolean} -> state when uploading image
 * @param lastModifiedAt {Date} -> At what date an image has been uploaded
 * @param size {String} -> image size value
 * @returns {JSX}
 */
const UploadImage = ({
    imgURL,
    onChange,
    onLoad,
    rules,
    maxHeight,
    maxWidth,
    clearImage,
    loading,
    lastModifiedAt,
    size,
}) => {
    const renderImageReq = () => (
        <div className={'upload-image__container'}>
            <div className={'choose-file'}>
                <div>
                    <Icon pointer={true} size={'lg'} renderIcon={util.CloudUploadOutlinedIcon} />
                </div>
                <div>
                    <p className={'upload-image__text'}>Drag files here to upload or </p>
                    <label className={'upload-image__choose-file'} htmlFor="files">
                        Choose File
                    </label>
                    <input
                        ref={editRef}
                        id="files"
                        className={'upload-image__input-file'}
                        type="file"
                        onChange={onChange}
                    />
                </div>
            </div>
            <div className={'requirements'}>
                <p className={'paragraph italic bold'}>Upload Requirements</p>
                <p className={'paragraph'}>
                    Dimensions: {rules.maxWidth} px width x {rules.maxHeight} px height
                </p>
                <p className={'paragraph'}>Format: {rules.imgFormat.map(el => `${el}, `)}</p>
                <p className={'paragraph'}>Max file size: {rules.maxImgSize / 1000} KB</p>
            </div>
        </div>
    )

    const renderUploadedImage = () => (
        <div className={'upload-image__preview'}>
            <img
                src={imgURL}
                className={maxHeight && maxWidth && 'preview-image'}
                onLoad={onLoad}
                alt={'preview'}
            />
            <div className={'upload-image--aside'}>
                <div className={'uploaded-img-config'}>
                    <div className={'requirements'}>
                        <p className={'paragraph italic bold'}>
                            {
                                imgURL.split(
                                    /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/
                                )[2]
                            }
                        </p>
                        <p className={'paragraph'}>
                            {lastModifiedAt && util.getFormattedDate(lastModifiedAt, 'MMM D, yyyy')}
                        </p>
                        <p className={'paragraph'}>{size / 1000} KB</p>
                        <p className={'paragraph'}>
                            {maxWidth} x {maxHeight} pixels
                        </p>
                    </div>
                </div>
                <div className={'uploaded-actions'}>
                    <label className={'paragraph sub mr-4'} htmlFor="files">
                        Edit
                    </label>
                    <input
                        ref={editRef}
                        id="files"
                        className={'input-file'}
                        type="file"
                        onChange={onChange}
                    />
                    <p className={'paragraph sub'} onClick={clearImage}>
                        Delete
                    </p>
                </div>
            </div>
        </div>
    )

    const editRef = useRef(null)

    if (loading) {
        return <Spinner isInline={true} />
    }

    return (
        <div className={'upload-image'}>
            {!imgURL && renderImageReq()}
            {imgURL && !loading && renderUploadedImage()}
        </div>
    )
}

UploadImage.propTypes = {
    imgURL: PropTypes.string,
    onChange: PropTypes.func,
    onLoad: PropTypes.func,
    rules: PropTypes.object,
    maxHeight: PropTypes.number,
    maxWidth: PropTypes.number,
    clearImage: PropTypes.func,
    loading: PropTypes.bool,
    lastModifiedAt: PropTypes.string,
    size: PropTypes.number,
}

export default memo(UploadImage)
