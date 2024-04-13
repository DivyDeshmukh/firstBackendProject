// import { ApiError } from "../utils/ApiError.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import jwt from "jsonwebtoken";
// import { User } from "../models/user.model.js";

// export const verifyJWT = asyncHandler(async(req, _, next) => {
//     // as we have used cookieparser middleware and hence we can access tokens with it from req and res objects
//     try {
//         const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
//         // in case of mobile apps cookies can be handled differently with header read it
    
//         if (!token) {
//             throw new ApiError(401, "Unauthorized request")
//         }
    
//         const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
//         // this _id we have passed in access token payload 
        
//         const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
    
//         if (!user) {
//             throw new ApiError(401, "Invalid Access Token");
//         }
    
//         // adding user to request object
//         req.user = user;
//         next();
//     } catch (error) {
//         throw new ApiError(401, error?.message || "Invalid Access Token");
//     }
// });

import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async(req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        // console.log("Token: ", typeof token, typeof process.env.ACCESS_TOKEN_SECRET);
        
        // console.log(token);
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
        // ok so token coming from client side itself consists of header, payload, and signature but in encrypted form and then we provide secret key so verify method extracts header and payload from token given and then generates a signature using secret key we provided and then finally compares it with the signature present in token 
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // console.log("DecodedToken: ", decodedToken);
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!user) {
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
    
})


