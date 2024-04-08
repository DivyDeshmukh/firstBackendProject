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

