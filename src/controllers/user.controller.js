import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"
import { response } from "express";

// const generateAccessAndRefreshTokens = async (userId) => {
//     try {
//         // always remember that whenever we want to use custom methods then before that first take the user and then apply those methods on the user.
//         const user = await User.findById(userId);
//         console.log(user);
//         const accessToken = user.generateAccessToken();
//         console.log(accessToken);
//         const refreshToken = user.generateRefreshToken();
//         console.log(refreshToken);

//         user.refreshToken = refreshToken;
//         await user.save({validateBeforeSave: false});

//         return {accessToken, refreshToken}

//     } catch (error) {
//         throw new ApiError(500, "Something went wrong while generating refresh and access token");
//     }
// }

const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const registerUser = asyncHandler( async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    // console.log(req.body);
    const { fullName, email, username, password } = req.body;
    
    // if (fullName === "") {
    //     throw new ApiError(400, "Fullname is required");
    // }

    // check if any one field is empty even after removing spaces
    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    });

    if (existedUser) {
        throw new ApiError(409, "User with or username already exists");
    }

    // console.log(req.files);
    const avatarLocalPath =  req.files?.avatar[0]?.path
    // const coverImageLocalPath = req.files?.coverImage[0]?.path; 

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length) {
        coverImageLocalPath = req.files.coverImage[0].path
    }

    console.log(avatarLocalPath);

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    console.log(avatar);

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required");
    }

    const user = await User.create({
        fullName,
        avatar: avatar?.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    });

    const createdUser = await User.findById(user._id).select (
        "-password -refreshToken"
    );

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

});

const loginUser = asyncHandler(async(req, res) => {
    // user credentials take from req.body
    // username or email
    // find the user 
    // password check
    // access and refresh token
    // send cookie

    const {email, username, password} = req.body
    
    if (!username && !email) {
        throw new ApiError(400, "username or email is required");
    }

    const user = await User.findOne({
        $or: [{username}, {email}]
    });

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }

    const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id);

    // here, we still have access to the old user that we have taken but after generating tokens we have updated the user. So, either we can update old user here by adding refreshToken property in it or we can make another db call to fetch updated data.

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )
})

const logoutUser = asyncHandler(async (req, res) => {
    // removing refreshToken from db and then from cookie
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User loggged Out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    try {
        const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    
        if (!incomingRefreshToken) {
            throw new ApiError(401, "Unauthorized request");
        }
    
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );
    
        const user = await User.findById(decodedToken?._id);
    
        if (!user) {
            throw new ApiError(401, "Invalid Refresh Token");
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used");
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(user._id);
    
        return response.
        status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    accessToken, refreshToken: newRefreshToken
                },
                "Access token refreshed"
            )
        );
        
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token");
    }
});

const changeCurrentPassword = asyncHandler (async (req, res) => {
    // this variables will come from frontend form fields
    const {oldPassword, newPassword} = req.body;
    const user = await User.findById(req.user?._id);
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old Password");
    }

    user.password = newPassword;
    await user.save({validateBeforeSave: false});             // bcoz I do not want to run other validations

    return res.status(200)
    .json(
        new ApiResponse(200, {}, "Password Changed Successfully")
    )
});

const getCurrentUser = asyncHandler( async (req, res) => {
    return (
        res.status(200)
        .json(
            new ApiResponse(200, req.user, "User data sent successfully")
        )
    )
});

const updateAccountDetails = asyncHandler(async(req, res) => {
    const {fullName, email, } = req.body;
    // for updating files create a sepereate controller and seperate route
    if (!fullName || !email) {
        throw new ApiError(400, "All fields are required")
    }

    const user = User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName,
                email: email
            }
        },
        {new: true}         // updated info will come
    ).select("-password");

    return res.status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));

});

const updateUserAvatar = asyncHandler(async (req, res) => {
    const avatarLocalPath = req.file?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is missing")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar.url) {
        throw new ApiError(400, "Error while uplaoding on avatar");
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                avatar: avatar.url
            }
        },
        {new: true}
    ).select("-password");

    return res.status(200)
    .json(
        new ApiResponse(200, user, "Cover image updated successfully")
    )

});

const updateCoverImage = asyncHandler(async (req, res) => {
    const coverImageLocalPath = req.file?.path;

    if (!coverImageLocalPath) {
        throw new ApiError(400, "Cover Image file is missing")
    }

    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!coverImage.url) {
        throw new ApiError(400, "Error while uplaoding on coverImage");
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                coverImage: coverImage.url
            }
        },
        {new: true}
    ).select("-password");

    return res.status(200)
    .json(
        new ApiResponse(200, user, "Cover image updated successfully")
    )
});

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateCoverImage
}



// In Mongoose (assuming you're referring to MongoDB with Node.js), User is typically the model defined using mongoose.model() and user is the instance of that model returned from querying the database.

// When you define methods on a Mongoose schema using schema.methods, those methods are available on instances of the model. So, in your example, any custom methods defined on the schema using methods would be available to the user instance after it's retrieved from the database, but not directly on the User model itself.

