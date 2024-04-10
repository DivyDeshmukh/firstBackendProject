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


