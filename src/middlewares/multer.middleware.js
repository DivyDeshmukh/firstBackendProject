import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
        // use any other than originalname
    }
});

export const upload = multer({
    storage,
});


/*
In your Multer configuration:

diskStorage is specified, which means files will be stored on the local disk of the server.

The destination option specifies the directory where uploaded files will be stored. In this case, it's "./public/temp".

The filename option specifies how the uploaded files will be named. By default, it uses the original name of the file being uploaded. You can modify this function to change the file naming convention if needed.

The upload export creates a Multer middleware with the specified storage configuration.

When you use this upload middleware in your routes or controllers to handle file uploads, it will process the incoming request, save the uploaded file(s) to the specified destination directory, and pass control to the next middleware or route handler.

If you need to access the local file path of the uploaded file within your application logic, you would typically handle that within your route or controller logic after Multer has processed the upload. You can obtain the file path from the req.file object, which contains information about the uploaded file(s), including the file name and path.

*/

