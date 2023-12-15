import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';

import User from '../models/User.js';
import Event from '../models/Event.js';

dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const signup = async (req, res) => {
    try {
        const { fullName, email, password, picture } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User with this email already exists" });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        let pictureUrl = '';
        if(picture) pictureUrl = (await cloudinary.uploader.upload(picture)).secure_url;
        const newUser = await User.create({ fullName, email, password: hashedPassword, picture: pictureUrl });
        const token = jwt.sign({ email, id: newUser._id }, process.env.SECRET_KEY);
        res.status(200).json({ user: newUser, token });

    } catch (error) {
        console.log(error.message);
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