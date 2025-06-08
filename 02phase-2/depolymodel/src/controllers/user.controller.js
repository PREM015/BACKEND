import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

/**
 * Generates new access and refresh tokens for a given userId.
 * Saves the new refresh token in the user document.
 * @param {String} userId
 * @returns {Object} { accessToken, refreshToken }
 */
const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        // Generate JWT tokens using user instance methods
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        // Update user's refreshToken in DB
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        // Throw ApiError with 500 status code if token generation fails
        throw new ApiError(500, "Something went wrong while generating referesh and access token");
    }
}


/**
 * Registers a new user.
 * Steps:
 *  - Validate required fields from req.body
 *  - Check if user already exists by username or email
 *  - Upload avatar (and cover image if provided) to Cloudinary
 *  - Create user document in MongoDB
 *  - Return sanitized user data (no password, no refresh token)
 */
const registeruser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    const { fullName, email, username, password } = req.body;
    //console.log("email: ", email);

    // Validate that none of the required fields are empty strings or whitespace
    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if a user with the same username or email already exists
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists");
    }
    console.log(req.files);

    // Extract avatar file path from uploaded files
    const avatarLocalPath = req.files?.avatar[0]?.path;
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;
     // Avatar is mandatory, throw error if missing
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    let coverImageLocalPath;
    // Check if coverImage exists and is an array with at least one element
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path;
    }

   

    // Upload avatar and cover image (if any) to Cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    // Defensive check if avatar upload failed
    if (!avatar) {
        throw new ApiError(400, "Avatar file is required");
    }

    // Create new user document with all required fields and uploaded image URLs
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    });

    // Fetch created user excluding sensitive fields before sending response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    // Send success response with sanitized user info
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    );
});

/**
 * Logs in a user using username/email and password.
 * Steps:
 *  - Validate username or email presence
 *  - Find user by username or email
 *  - Verify password correctness
 *  - Generate access and refresh tokens
 *  - Set tokens in HTTP-only secure cookies
 *  - Return logged-in user info with tokens
 */
const loginUser = asyncHandler(async (req, res) => {
    // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie

    const { email, username, password } = req.body;
    console.log(email);

    if (!username && !email) {
        throw new ApiError(400, "username or email is required");
    }

    // Here is an alternative of above code based on logic discussed in video:
    // if (!(username || email)) {
    //     throw new ApiError(400, "username or email is required")
    // }

    // Find user by either username or email
    const user = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    // Validate password using instance method
    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }

    // Generate tokens for authenticated user
    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);

    // Fetch logged in user data excluding sensitive fields
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    // Set cookie options for security (httpOnly + secure)
    const options = {
        httpOnly: true,
        secure: true
    };

    // Respond with user data and tokens, set cookies for client
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
        );
});

/**
 * Logs out the current user.
 * Steps:
 *  - Remove refreshToken from user's document in DB
 *  - Clear the accessToken and refreshToken cookies from client
 *  - Send a success response
 */
const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    );

    const options = {
        httpOnly: true,
        secure: true
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged Out"));
});

/**
 * Refreshes access token using valid refresh token.
 * Steps:
 *  - Extract refresh token from cookie or request body
 *  - Verify refresh token's validity and match with DB token
 *  - Generate new access and refresh tokens
 *  - Send new tokens as cookies and response JSON
 */
const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request");
    }

    try {
        // Verify refresh token signature & decode payload
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        // Find user by decoded token user id
        const user = await User.findById(decodedToken?._id);

        if (!user) {
            throw new ApiError(401, "Invalid refresh token");
        }

        // Compare incoming refresh token with stored one to prevent reuse or theft
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used");
        }

        const options = {
            httpOnly: true,
            secure: true
        };

        // Generate new tokens
        const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefereshTokens(user._id);

        // Send new tokens via cookies and JSON response
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access token refreshed"
                )
            );
    } catch (error) {
        // Handle JWT verification errors
        throw new ApiError(401, error?.message || "Invalid refresh token");
    }
});

/**
 * Changes current logged-in user's password.
 * Steps:
 *  - Verify old password correctness
 *  - Update password with new password
 *  - Save user without re-validating all fields
 */
const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user?._id);
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password");
    }

    // Update user password and save
    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password changed successfully"));
});

/**
 * Returns current logged-in user's details.
 */
const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(
            200,
            req.user,
            "User fetched successfully"
        ));
});

/**
 * Updates logged-in user's account details (fullName and email).
 * Validates input and returns updated user excluding password.
 */
const updateAccountDetails = asyncHandler(async (req, res) => {
    const { fullName, email } = req.body;

    if (!fullName || !email) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName,
                email: email
            }
        },
        { new: true }

    ).select("-password");

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Account details updated successfully"));
});

/**
 * Updates user's avatar image.
 * Steps:
 *  - Validate uploaded file existence
 *  - Upload new avatar to Cloudinary
 *  - Update user document with new avatar URL
 *  - Return updated user (no password)
 */
const updateUserAvatar = asyncHandler(async (req, res) => {
    const avatarLocalPath = req.file?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is missing");
    }

    //TODO: delete old image - assignment

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar.url) {
        throw new ApiError(400, "Error while uploading on avatar");
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar: avatar.url
            }
        },
        { new: true }
    ).select("-password");

    return res
        .status(200)
        .json(
            new ApiResponse(200, user, "Avatar image updated successfully")
        );
});

/**
 * Updates user's cover image.
 * Similar to avatar update flow.
 */
const updateUserCoverImage = asyncHandler(async (req, res) => {
    const coverImageLocalPath = req.file?.path;

    if (!coverImageLocalPath) {
        throw new ApiError(400, "Cover image file is missing");
    }

    //TODO: delete old image - assignment

    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!coverImage.url) {
        throw new ApiError(400, "Error while uploading on avatar");
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                coverImage: coverImage.url
            }
        },
        { new: true }
    ).select("-password");

    return res
        .status(200)
        .json(
            new ApiResponse(200, user, "Cover image updated successfully")
        );
});

/**
 * Fetches channel profile data for a given username.
 * Steps:
 *  - Validate username param
 *  - Use aggregation to fetch user info + subscribers + subscriptions counts + subscription status
 *  - Return first matched channel
 */
const getUserChannelProfile = asyncHandler(async (req, res) => {
    const { username } = req.params;

    if (!username?.trim()) {
        throw new ApiError(400, "username is missing");
    }

    const channel = await User.aggregate([
        {
            $match: {
                username: username?.toLowerCase()
            }
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "channel",
                as: "subscribers"
            }
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "subscriber",
                as: "subscribedTo"
            }
        },
        {
            $addFields: {
                subscribersCount: {
                    $size: "$subscribers"
                },
                channelsSubscribedToCount: {
                    $size: "$subscribedTo"
                },
                isSubscribed: {
                    $cond: {
                        if: { $in: [req.user?._id, "$subscribers.subscriber"] },
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $project: {
                fullName: 1,
                username: 1,
                subscribersCount: 1,
                channelsSubscribedToCount: 1,
                isSubscribed: 1,
                avatar: 1,
                coverImage: 1,
                email: 1
            }
        }
    ]);

    if (!channel?.length) {
        throw new ApiError(404, "channel does not exists");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, channel[0], "User channel fetched successfully")
        );
});

/**
 * Fetches the current logged-in user's watch history.
 * Uses aggregation to join watchHistory videos with their owners' info.
 */
const getWatchHistory = asyncHandler(async (req, res) => {
    const user = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup: {
                from: "videos",
                localField: "watchHistory",
                foreignField: "_id",
                as: "watchHistory",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "owner",
                            pipeline: [
                                {
                                    $project: {
                                        fullName: 1,
                                        username: 1,
                                        avatar: 1
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $addFields: {
                            owner: {
                                $first: "$owner"
                            }
                        }
                    }
                ]
            }
        }
    ]);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                user[0].watchHistory,
                "Watch history fetched successfully"
            )
        );
});

export {
    registeruser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
    getUserChannelProfile,
    getWatchHistory
}
