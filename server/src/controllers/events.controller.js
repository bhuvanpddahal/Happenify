import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

import User from '../models/User.js';
import Event from '../models/Event.js';

dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const createEvent = async (req, res) => {
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

export const getEvents = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const skip = (Number(page) - 1) * limit;
        const totalEvents = await Event.countDocuments({}, { hint: "_id_" });
        const allEvents = await Event.find().sort({ _id: -1 }).limit(limit).skip(skip);
        const totalPages = Math.ceil(totalEvents / limit);
        res.status(200).json({ events: allEvents, totalPages, page: Number(page) + 1 });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const getUserEvents = async (req, res) => {
    try {
        const { userId } = req;
        const { page, limit } = req.query;
        const user = await User.findById(userId);
        const skip = (Number(page) - 1) * limit;
        const totalEvents = await Event.countDocuments({ 'organizer.id': user._id }, { hint: "_id_" });
        const events = await Event.find({ 'organizer.id': user._id }).sort({ _id: -1 }).limit(limit).skip(skip);
        const totalPages = Math.ceil(totalEvents / limit);
        res.status(200).json({ events, totalPages, page: Number(page) + 1 });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        if(!ObjectId.isValid(id)) return res.status(404).json({ message: "Event not found" });
        const event = await Event.findById(id);
        if(!event) return res.status(404).json({ message: "Event not found" });
        res.status(200).json(event);

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const searchEvents = async (req, res) => {
    try {
        let events;
        let value;
        let totalEvents;
        const { userId } = req;
        const { tab, name, location, page, limit } = req.query;
        const skip = (Number(page) - 1) * limit;
        console.log(tab, name, location, page, limit);
        const user = await User.findById(userId);

        if(name) value = new RegExp(name, 'i');
        else if(location) value = new RegExp(location, 'i');

        if(tab === "trending") {
            if(name) {
                totalEvents = await Event.countDocuments({ name: value }, { hint: "_id_" });
                events = await Event.find({ name: value }).sort({ _id: -1 }).limit(limit).skip(skip);
            } else if(location) {
                totalEvents = await Event.countDocuments({ location: value }, { hint: "_id_" });
                events = await Event.find({ location: value }).sort({ _id: -1 }).limit(limit).skip(skip);
            }
        } else if(tab === "your-events") {
            if(name) {
                totalEvents = await Event.countDocuments({ 'organizer.id': user._id, name: value }, { hint: "_id_" });
                events = await Event.find({ 'organizer.id': user._id, name: value }).sort({ _id: -1 }).limit(limit).skip(skip);
            } else if(location) {
                totalEvents = await Event.countDocuments({ 'organizer.id': user._id, location: value }, { hint: "_id_" });
                events = await Event.find({ 'organizer.id': user._id, location: value }).sort({ _id: -1 }).limit(limit).skip(skip);
            }
        }

        const totalPages = Math.ceil(totalEvents / limit);
        res.status(200).json({ events, totalPages, page: Number(page) + 1 });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};