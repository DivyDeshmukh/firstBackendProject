# To connect with mongo DB:-
1. Our IP address must be allowed so that we can access it.
2. correct Id and password (not contain special characters)
3. URL 

-> In professional setting, we never allow allow access from anywhere and give the IP address of our m/c where our all backend code is stored. Just for using it in our project we are allowing access from anywhere.

// solve env variables problem but first complete whole lecture of connecting with mongo db

-> ERROR:  MongoParseError: Invalid scheme, expected connection string to start with "mongodb://" or "mongodb+srv://" -> This error comes when the MONGODB_URI is not correct.

-> Solved: This error is solved when we created nodemon.json in the root directory and declared variable like this:- {
  "env": {
    "MONGO_ATLAS_PW": "xxxx",
    "JWT_KEY": "secret_this_should_be_longer"
  }
}
# The above error can be due to different node version and we are using experimental feature for dotenv, so try with type: commonjs and then use require to import dotenv and perform samething.

# Always, give custom error messages for identifying what element is causing problems

<!-- #  In an Express.js application, the req, res, err, and next objects are provided by Express to middleware functions and route handlers (controllers) to handle HTTP requests and responses. When you're performing database operations using Mongoose or any other database library, these objects are typically available within the scope of the route handler where the database operations are invoked. Express middleware functions and route handlers have access to the req (request) and res (response) objects, and optionally to next for error handling and middleware chaining. When you define route handlers (controllers) to handle specific routes, you have access to these objects within the scope of those handlers. When your controller invokes database operations using Mongoose, you would typically pass the relevant data from the req object (such as parameters, query parameters, or request body) to Mongoose functions to perform CRUD operations on the database. The res object is used to send back responses to the client based on the results of the database operations. -->

# In Mongoose, plugins indeed serve as a way to add additional functionality to your application. They are reusable pieces of code that you can apply to Mongoose schemas to extend their capabilities. While they are commonly custom functions tailored to specific needs, they can also utilize functions from third-party libraries or packages.

# mongooseAggregatePaginate
This plugin simplifies the process of paginating results obtained through aggregation pipelines. Instead of manually handling pagination logic, you can use the aggregatePaginate() method provided by the plugin, passing in your aggregation query and pagination options.

While you can certainly implement pagination with aggregation pipelines without this plugin, using it can save you time and effort by providing a pre-built solution that's specifically tailored for pagination with Mongoose aggregation results. It encapsulates the pagination logic and makes your code cleaner and more maintainable.



# When a JWT is created by the server and sent to the client, it consists of three parts: header, payload, and signature. These parts are typically Base64-encoded and concatenated with dots to form the JWT.
<!-- Here's how the process works:

Server creates the JWT: When a user is authenticated, the server creates a JWT containing relevant information (payload), such as user ID, permissions, or any other data needed for authentication and authorization. The server then signs this JWT using its secret key to create the signature.

JWT is sent to the client: The JWT (containing the header, payload, and signature) is sent to the client, usually as part of an HTTP response or included in the response body or headers.

Client presents the JWT: When the client needs to access protected resources on the server, it includes the JWT in subsequent requests, typically in the Authorization header or as a cookie.

Server verifies the JWT: When the server receives a request with a JWT, it decodes the JWT to extract the header and payload. Then, it re-signs the extracted header and payload using its secret key to generate a new signature. If this new signature matches the signature included in the JWT, the server considers the JWT valid. It then processes the payload to determine the user's identity and permissions, allowing or denying access to the requested resources. 

In this context, it's important to clarify that the header of the JWT token is automatically handled by the jwt.sign() method itself. The JWT specification dictates that the header must include information about the algorithm used for signing the token. By default, the jwt.sign() method will use HS256 algorithm unless explicitly specified otherwise.
-->

# While it's technically possible to handle file uploads without Multer by directly accessing the incoming request payload and parsing it manually, this approach can be cumbersome and error-prone. Multer abstracts away much of this complexity, providing a more convenient and efficient solution for handling file uploads in Node.js applications. Additionally, Multer's built-in features and middleware integration make it a popular choice for developers looking to implement file upload functionality quickly and securely.

# WHy to store files first on local server before uploading it to other server?
Storing uploaded files locally before further processing or uploading to another server allows for better control over file management, security, and reliability. It ensures faster access to files, reduces network latency, and provides a backup in case of network failures during transfer to another server. After accessing files using Multer, you typically have to manually handle further processing, such as uploading the files to another server if needed, or storing them locally on your server for access and processing within your application. 

# To use routes declared in different files we have to use middlewares to attach them with the main file.

# We can send raw data when we do not have to send files but when we want to send files also then do it with form-data

# Error:- (File is not uploading on Cloudinary 721568484595782 CJLWl_V-4iXDPjAIzkuuFSIWt6g dnigolsg6 public\temp\divy.jpg (2).jpg
<!-- File is not uploading on Cloudinary {
  message: 'Stale request - reported time is 2024-04-11 13:23:38 +0000 which is more than 1 hour ago',
  name: 'Error',
  http_code: 400
}
Error: File upload failed
    at uploadOnCloudinary (file:///I:/Web%20Development/Backend/Backend%20Project%203/src/utils/cloudinary.js:29:15)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)      
    at async file:///I:/Web%20Development/Backend/Backend%20Project%203/src/controllers/user.controller.js:50:20)

    Solved:- It was because of incorrect time on the system>>The error message indicates that the request to upload the file to Cloudinary is considered stale because the reported time is more than 1 hour ago. This suggests that the timestamp of the request is incorrect or outdated, causing Cloudinary to reject the request.

To resolve this issue, you can ensure that the timestamp of the request is accurate and within an acceptable range for Cloudinary. Here are a few steps you can take:

1. **Check System Time**: Verify that the system time on your server running the Node.js application is correct. If the system time is incorrect, it can lead to issues with timestamps in requests.

2. **Check Request Time**: Ensure that the timestamp of the request being sent to Cloudinary is accurate. If your application is running on multiple servers or instances, make sure they are synchronized in terms of time.

3. **Cloudinary Configuration**: Check the Cloudinary configuration and settings to ensure that there are no restrictions or limitations related to the timestamp of requests.

4. **Error Handling**: Improve error handling in your code to handle this specific error scenario. You can catch the specific error message indicating a stale request and handle it appropriately, such as retrying the upload with a fresh timestamp.

5. **Retry Mechanism**: Implement a retry mechanism in your code to automatically retry the upload if it fails due to a stale request error. You can set a reasonable delay between retries to avoid flooding Cloudinary with repeated requests.

By addressing these points and ensuring that the timestamp of your requests is accurate and within an acceptable range, you should be able to resolve the issue of stale requests when uploading files to Cloudinary. -->






# Error: listen EADDRINUSE: address already in use :::8000: This is the main error message indicating that the address (port) is already in use. Just restart the pc.