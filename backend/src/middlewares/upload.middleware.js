const path = require('path');
const fs = require('fs');

const multer = require('multer');

const getDestination = (req) => {
    const dest = req.baseUrl.split('/')[3];
    return path.resolve(__dirname, `../../public/images/${dest}/`);
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const rootDestination = getDestination(req);
        fs.access(rootDestination, (err) => {
            if (err) {
                fs.mkdir(rootDestination, { recursive: true }, (err) => {
                    if (err) {
                        cb(err);
                    } else {
                        cb(null, rootDestination);
                    }
                });
            } else {
                cb(null, rootDestination);
            }
        });
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = file.mimetype.split('/')[1];
        const fileName = file.fieldname + '-' + uniqueSuffix + '.' + ext;
        // if (!req.files[0]) {
        //     return cb(null, fileName);
        // }

        cb(null, fileName);
    },
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
            return cb(new Error('You can only upload image files.'));
        }
        cb(null, true);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;