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






