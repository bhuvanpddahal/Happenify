import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

import Place from '../models/Place.js';

dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const createPlace = async (req, res) => {
    let networkError = true;
    const session = await mongoose.startSession();
    
    try {
        const { userId } = req;
        const { name, dateAndTime, location, description, ticketPrice, type, image, facebook, twitter, contact } = req.body;
        const user = await User.findById(userId);
        const imageUrl = (await cloudinary.uploader.upload(image)).secure_url;
        networkError = false;
        const newEvent = await Event.create({
            name,
            dateAndTime,
            location,
            description,
            ticketPrice,
            organizer: {
                id: user._id,
                picture: user.picture,
                fullName: user.fullName
            },
            type,
            image: imageUrl,
            socialMedia: {
                facebook,
                twitter
            },
            contact
        });
        user.events.push({
            id: newEvent._id,
            image: imageUrl,
            name
        });
        await user.save();
        session.commitTransaction();
        session.endSession();
        res.status(200).json(newEvent);

    } catch (error) {
        session.abortTransaction();
        session.endSession();
        if(networkError) return res.status(400).json({ message: "Network error" });
        res.status(500).json({ message: "Something went wrong" });
    }
};