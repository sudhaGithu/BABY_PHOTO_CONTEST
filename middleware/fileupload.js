const path = require('path');
require('dotenv').config();
const multer = require('multer');
const {PrismaClient} = require('@prisma/client')
const AWS = require('@aws-sdk/client-s3')


// const bucketName = process.env.BUCKET_NAME
// const bucketRegion =process.env.BUCKET_REGION
// const accessKey =process.env.ACESS_KEY
// const secretAccessKey =process.env.SECRET_ACCESS_KEY



console.log(process.env.BUCKET_NAME , process.env.BUCKET_REGION, process.env.SECRET_KEY, process.env.SECRET_ACCESS_KEY, process.env.BASE_URL);

const bucketRegion =process.env.BUCKET_REGION
const accessKey =process.env.SECRET_KEY
const secretAccessKey =process.env.SECRET_ACCESS_KEY
const s3 = new AWS.S3({
    region : bucketRegion,
    credentials:{
    accessKeyId : accessKey,
    secretAccessKey : secretAccessKey,
    },
    
    
})

//console.log("s3  ", s3);

const storage = multer.memoryStorage()
//const upload = multer({storage : storage})

// const params = {
//     Bucket : bucketName,
//     Key : req.file.originalname,
//     Body : req.file.buffer,
//     ContentType : req.file.mimetype,
// }

// const command = new PutObjectCommand(params)
//  s3.send(command)


// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         let ext = path.extname(file.originalname);
//         return cb(null,`${file.filename}_${Date.now()+ext}`);
//         // Date.now() + ext
//     }
// });

var upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpeg" ||
            file.mimetype == "image/jpg"
        ) {
            callback(null, true);
        } else {
            console.log('only jpg,jpeg & png supported');
            callback(null, false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
});

module.exports = {
    upload,
s3};
