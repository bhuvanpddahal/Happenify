import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

import User from '../models/User.js';
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
    session.startTransaction();
    
    try {
        const { userId } = req;
        const { name, location, capacity, description, type, contact, images, facilities, pricePerHour, termsAndConditions, facebook, twitter } = req.body;
        const user = await User.findById(userId);
        const imageUrls = [
            (await cloudinary.uploader.upload(images[0])).secure_url,
            (await cloudinary.uploader.upload(images[1])).secure_url,
            (await cloudinary.uploader.upload(images[2])).secure_url
        ];
        networkError = false;
        const newPlace = await Place.create({
            name,
            location,
            capacity,
            description,
            type,
            contact,
            images: imageUrls,
            facilities,
            owner: {
                id: user._id,
                picture: user.picture,
                fullName: user.fullName
            },
            pricePerHour,
            termsAndConditions,
            socialMedia: {
                facebook,
                twitter
            }
        });
        user.places.push({
            id: newPlace._id,
            images: imageUrls,
            name
        });
        await user.save();
        session.commitTransaction();
        session.endSession();
        res.status(200).json(newPlace);

    } catch (error) {
        session.abortTransaction();
        session.endSession();
        if(networkError) return res.status(400).json({ message: "Network error" });
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const getPlaces = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const skip = (Number(page) - 1) * limit;
        const totalPlaces = await Place.countDocuments({}, { hint: "_id_" });
        const places = await Place.find().sort({ _id: -1 }).limit(limit).skip(skip);
        const totalPages = Math.ceil(totalPlaces / limit);
        res.status(200).json({ places, totalPages, page: Number(page) + 1 });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};