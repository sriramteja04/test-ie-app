import S3 from 'aws-sdk/clients/s3'

const s3 = new S3({
    accessKeyId: process.env.REACT_APP_AWSACCESSKEY,
    secretAccessKey: process.env.REACT_APP_AWSSECRETKEY,
    region: process.env.REACT_APP_AWSREGION,
})

const uploadFile = fileContent => {
    const fileName = new Date().toISOString() + fileContent.name
    const params = {
        Bucket: process.env.REACT_APP_S3_BUCKET,
        Key: `promo-images/${fileName}`, // File name you want to save as in S3
        Body: fileContent,
        contentType: fileContent.type,
    }

    return new Promise((resolve, reject) => {
        s3.upload(params, function(err, data) {
            if (err) {
                reject(err)
                return
            }
            resolve({
                data: data,
                fileName: `${process.env.REACT_APP_CLOUDFRONT_URL}/${fileName}`,
            })
        })
    })
}

const deleteFile = cloudFrontURL => {
    const fileName = cloudFrontURL.split('promo-images/')[1]
    const params = {
        Bucket: process.env.REACT_APP_S3_BUCKET,
        Key: `https://7now-admin-promo-2.s3.us-west-2.amazonaws.com/promo-images/${fileName}`,
    }
    return new Promise((resolve, reject) => {
        s3.deleteObject(params, function(err, res) {
            if (err) {
                reject(err)
                return
            }
            resolve(res)
        })
    })
}

const getObject = cloudFrontURL => {
    const fileName = cloudFrontURL.split('promo-images/')[1]
    const params = {
        Bucket: process.env.REACT_APP_S3_BUCKET,
        Key: `promo-images/${fileName}`,
    }
    return new Promise((resolve, reject) => {
        s3.getObject(params, function(err, res) {
            if (err) {
                reject(err)
                return
            }
            resolve(res)
        })
    })
}

export const awsUtil = {
    uploadFile,
    deleteFile,
    getObject,
}
