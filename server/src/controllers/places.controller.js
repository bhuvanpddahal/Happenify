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
        console.log(imageUrls);
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
            name,
            image: imageUrls[0]
        });
        await user.save();
        session.commitTransaction();
        session.endSession();
        res.status(200).json(newPlace);

    } catch (error) {
        console.log(error);
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

export const getUserPlaces = async (req, res) => {
    try {
        const { userId } = req;
        const { page, limit } = req.query;
        const user = await User.findById(userId);
        const skip = (Number(page) - 1) * limit;
        const totalPlaces = await Place.countDocuments({ 'owner.id': user._id }, { hint: "_id_" });
        const places = await Place.find({ 'owner.id': user._id }).sort({ _id: -1 }).limit(limit).skip(skip);
        const totalPages = Math.ceil(totalPlaces / limit);
        res.status(200).json({ places, totalPages, page: Number(page) + 1 });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const getPlaceById = async (req, res) => {
    try {
        const { id } = req.params;
        if(!ObjectId.isValid(id)) return res.status(404).json({ message: "Place not found" });
        const place = await Place.findById(id);
        if(!place) return res.status(404).json({ message: "Place not found" });
        res.status(200).json(place);

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const searchTrendingPlaces = async (req, res) => {
    try {
        let value, totalPlaces, places;
        const { name, location, page, limit } = req.query;
        const skip = (Number(page) - 1) * limit;
        if(name) value = new RegExp(name, 'i');
        else if(location) value = new RegExp(location, 'i');

        if(name) {
            totalPlaces = await Place.countDocuments({ name: value }, { hint: "_id_" });
            places = await Place.find({ name: value }).sort({ _id: -1 }).limit(limit).skip(skip);
        } else if(location) {
            totalPlaces = await Place.countDocuments({ location: value }, { hint: "_id_" });
            places = await Place.find({ location: value }).sort({ _id: -1 }).limit(limit).skip(skip);
        }

        const totalPages = Math.ceil(totalPlaces / limit);
        res.status(200).json({ places, totalPages, page: Number(page) + 1 });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const searchUserPlaces = async (req, res) => {
    try {
        let value, totalPlaces, places;
        const { userId } = req;
        const { name, location, page, limit } = req.query;
        const skip = (Number(page) - 1) * limit;
        const user = await User.findById(userId);
        if(name) value = new RegExp(name, 'i');
        else if(location) value = new RegExp(location, 'i');

        if(name) {
            totalPlaces = await Place.countDocuments({ 'owner.id': user._id, name: value }, { hint: "_id_" });
            places = await Place.find({ 'owner.id': user._id, name: value }).sort({ _id: -1 }).limit(limit).skip(skip);
        } else if(location) {
            totalPlaces = await Place.countDocuments({ 'owner.id': user._id, location: value }, { hint: "_id_" });
            places = await Place.find({ 'owner.id': user._id, location: value }).sort({ _id: -1 }).limit(limit).skip(skip);
        }

        const totalPages = Math.ceil(totalPlaces / limit);
        res.status(200).json({ places, totalPages, page: Number(page) + 1 });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const updatePlace = async (req, res) => {
    let networkError = true;
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { userId } = req;
        const { id: placeId } = req.params;
        if(!ObjectId.isValid(placeId)) return res.status(404).json({ message: "Place not found" });
        const { name, location, capacity, description, type, contact, images, facilities, pricePerHour, termsAndConditions, facebook, twitter } = req.body;
        const user = await User.findById(userId);
        const place = await Place.findById(placeId);
        if(userId !== place.owner.id.toString()) return res.status(403).json({ message: "Not allowed" });
        const imageUrls = [
            (await cloudinary.uploader.upload(images[0])).secure_url,
            (await cloudinary.uploader.upload(images[1])).secure_url,
            (await cloudinary.uploader.upload(images[2])).secure_url
        ];
        networkError = false;

        const updatePlace = {
            name,
            location,
            capacity,
            description,
            type,
            contact,
            images: imageUrls,
            facilities,
            pricePerHour,
            termsAndConditions,
            socialMedia: {
                facebook,
                twitter
            }
        };
        const updatedPlace = await Place.findByIdAndUpdate(placeId, updatePlace, { new: true });
        user.places = user.places.map((place) => place.id.toString() === placeId ? {
            id: place.id,
            name,
            image: imageUrls[0]
        } : place);

        await user.save();
        session.commitTransaction();
        session.endSession();
        res.status(200).json(updatedPlace);
        
    } catch (error) {
        session.abortTransaction();
        session.endSession();
        if(networkError) return res.status(400).json({ message: "Network error" });
        res.status(500).json({ message: "Something went wrong" });
    }
};