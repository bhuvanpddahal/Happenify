import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

import User from '../models/User.js';

dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const signup = async (req, res) => {
    let networkError = true;

    try {
        const { fullName, email, password, picture } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User with this email already exists" });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        let pictureUrl = '';
        if(picture) pictureUrl = (await cloudinary.uploader.upload(picture)).secure_url;
        networkError = false;
        const newUser = await User.create({ fullName, email, password: hashedPassword, picture: pictureUrl });
        const token = jwt.sign({ email, id: newUser._id }, process.env.SECRET_KEY);
        res.status(200).json({ user: newUser, token });

    } catch (error) {
        if(networkError) return res.status(400).json({ message: "Network error" });
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });
        const passwordIsMatching = await bcrypt.compare(password, user.password);
        if (!passwordIsMatching) return res.status(400).json({ message: "Password is not matching" });
        const token = jwt.sign({ email, id: user._id }, process.env.SECRET_KEY);
        res.status(200).json({ user, token });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const loginWithToken = async (req, res) => {
    try {
        const { userId } = req;
        const user = await User.findById(userId);
        const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET_KEY);
        res.status(200).json({ user, token });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        if(!ObjectId.isValid(id)) return res.status(404).json({ message: "User not found" });
        const user = await User.findById(id);
        if(!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const followUser = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { userId } = req;
        const { id } = req.params;
        const user = await User.findById(userId);
        const toBeFollowed = await User.findById(id);
        if(!toBeFollowed) return res.status(404).json({ message: "User not found" });
        const isFollowing = user.following.find((followedUser) => followedUser.id === toBeFollowed._id);
        if(isFollowing) return res.status(400).json({ message: "Already followed user" });

        const newFollowing = {
            id: toBeFollowed._id,
            fullName: toBeFollowed.fullName,
            email: toBeFollowed.email,
            picture: toBeFollowed.picture
        };
        const newFollower = {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            picture: user.picture
        };
        user.following.push(newFollowing);
        toBeFollowed.followers.push(newFollower);

        await user.save();
        await toBeFollowed.save();
        session.commitTransaction();
        session.endSession();
        res.status(200).json({ newFollowing, newFollower });

    } catch (error) {
        session.abortTransaction();
        session.endSession();
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const unfollowUser = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { userId } = req;
        const { id } = req.params;
        const user = await User.findById(userId);
        const toBeUnfollowed = await User.findById(id);
        if(!toBeUnfollowed) return res.status(404).json({ message: "User not found" });
        const isFollowing = user.following.find((followedUser) => followedUser.id.toString() === toBeUnfollowed._id.toString());
        if(!isFollowing) return res.status(400).json({ message: "User is not followed" });

        user.following = user.following.filter((followedUser) => followedUser.id.toString() !== toBeUnfollowed._id.toString());
        toBeUnfollowed.followers = toBeUnfollowed.followers.filter((follower) => follower.id.toString() !== user._id.toString());

        await user.save();
        await toBeUnfollowed.save();
        session.commitTransaction();
        session.endSession();
        res.status(200).json({ message: "Unfollowed successfully" });

    } catch (error) {
        session.abortTransaction();
        session.endSession();
        res.status(500).json({ message: "Something went wrong" });
    }
};