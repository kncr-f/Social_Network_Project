const aws = require('aws-sdk');
const fs = require('fs');

let secrets;
if (process.env.NODE_ENV == 'production') {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require('./server/secrets'); // in dev they are in secrets.json which is listed in .gitignore
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET
});

exports.upload = (req, res, next) => {
    if (!req.file) {
        console.log('"multer failed"');
        return res.sendStatus(500);
    }
    const { filename, mimetype, size, path } = req.file;

    const promise = s3.putObject({
        Bucket: 'spicedling',
        ACL: 'public-read',
        Key: filename,
        Body: fs.createReadStream(path),
        ContentType: mimetype,
        ContentLength: size
    }).promise();

    promise.then(
        () => {
            // it worked!!!
            next();
        }
    ).catch(
        err => {
            // uh oh
            console.log(err);

            return res.sendStatus(500);
        }
    );

};

//Version 1 promisify s3.delete function

// exports.delete = (arg) => {
//     console.log('arg from s3.js......', arg);
//     var params = {
//         Bucket: "spicedling",
//         Key: arg
//     };
//     const promise = s3.deleteObject(params).promise();

//     return promise;

// };

//Version 2
exports.delete = (arg) => {
    var params = {
        Bucket: "spicedling",
        Key: arg
    };
    const aaa = s3.deleteObject(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data);           // successful response
    });

    return aaa;
};

