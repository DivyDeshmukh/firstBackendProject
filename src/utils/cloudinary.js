import {v2 as cloudinary} from "cloudinary";
import fs from "fs";
          
cloudinary.config({ 
  cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`, 
  api_key: `${process.env.CLOUDINARY_API_KEY}`, 
  api_secret: `${process.env.CLOUDINARY_API_SECRET}` ,
  secure: true
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            return `${localFilePath} localFilepath not present}`;
        }
        // upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        // file has been uploaded successfully
        // console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath);
        // console.log(response);
        return response;
    } catch (error) {
        console.log("File is not uploading on Cloudinary", process.env.CLOUDINARY_API_KEY, process.env.CLOUDINARY_API_SECRET, process.env.CLOUDINARY_CLOUD_NAME, localFilePath);
        fs.unlinkSync(localFilePath);       // remove the locally saved temporary file as the upload operation got failed
        console.error("File is not uploading on Cloudinary", error);
        throw new Error("File upload failed");;
    }
}

export {uploadOnCloudinary}


