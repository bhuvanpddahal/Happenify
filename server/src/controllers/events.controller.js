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
    session.startTransaction();
    
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
        const events = await Event.find().sort({ _id: -1 }).limit(limit).skip(skip);
        const totalPages = Math.ceil(totalEvents / limit);
        res.status(200).json({ events, totalPages, page: Number(page) + 1 });

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

export const searchTrendingEvents = async (req, res) => {
    try {
        let value, totalEvents, events;
        const { name, location, page, limit } = req.query;
        const skip = (Number(page) - 1) * limit;
        if(name) value = new RegExp(name, 'i');
        else if(location) value = new RegExp(location, 'i');

        if(name) {
            totalEvents = await Event.countDocuments({ name: value }, { hint: "_id_" });
            events = await Event.find({ name: value }).sort({ _id: -1 }).limit(limit).skip(skip);
        } else if(location) {
            totalEvents = await Event.countDocuments({ location: value }, { hint: "_id_" });
            events = await Event.find({ location: value }).sort({ _id: -1 }).limit(limit).skip(skip);
        }

        const totalPages = Math.ceil(totalEvents / limit);
        res.status(200).json({ events, totalPages, page: Number(page) + 1 });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const searchUserEvents = async (req, res) => {
    try {
        let value, totalEvents, events;
        const { userId } = req;
        const { name, location, page, limit } = req.query;
        const skip = (Number(page) - 1) * limit;
        const user = await User.findById(userId);
        if(name) value = new RegExp(name, 'i');
        else if(location) value = new RegExp(location, 'i');

        if(name) {
            totalEvents = await Event.countDocuments({ 'organizer.id': user._id, name: value }, { hint: "_id_" });
            events = await Event.find({ 'organizer.id': user._id, name: value }).sort({ _id: -1 }).limit(limit).skip(skip);
        } else if(location) {
            totalEvents = await Event.countDocuments({ 'organizer.id': user._id, location: value }, { hint: "_id_" });
            events = await Event.find({ 'organizer.id': user._id, location: value }).sort({ _id: -1 }).limit(limit).skip(skip);
        }

        const totalPages = Math.ceil(totalEvents / limit);
        res.status(200).json({ events, totalPages, page: Number(page) + 1 });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const updateEvent = async (req, res) => {
    let networkError = true;
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { userId } = req;
        const { id: eventId } = req.params;
        if(!ObjectId.isValid(eventId)) return res.status(404).json({ message: "Event not found" });
        const { name, dateAndTime, location, description, ticketPrice, type, image, facebook, twitter, contact } = req.body;
        const user = await User.findById(userId);
        const event = await Event.findById(eventId);
        if(userId !== event.organizer.id.toString()) return res.status(403).json({ message: "Not allowed" });
        const imageUrl = (await cloudinary.uploader.upload(image)).secure_url;
        networkError = false;

        const updateEvent = {
            name,
            dateAndTime,
            location,
            description,
            ticketPrice,
            type,
            image: imageUrl,
            socialMedia: {
                facebook,
                twitter
            },
            contact
        };
        const updatedEvent = await Event.findByIdAndUpdate(eventId, updateEvent, { new: true });
        user.events = user.events.map((event) => event.id.toString() === eventId ? {
            id: event.id,
            name,
            image: imageUrl
        } : event);

        await user.save();
        session.commitTransaction();
        session.endSession();
        res.status(200).json(updatedEvent);
        
    } catch (error) {
        session.abortTransaction();
        session.endSession();
        if(networkError) return res.status(400).json({ message: "Network error" });
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const deleteEvent = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { userId } = req;
        const { id: eventId } = req.params;
        const user = await User.findById(userId);
        const event = await Event.findById(eventId);
        if(event.organizer.id.toString() !== userId) return res.status(403).json({ message: "Not allowed" });
        await Event.findByIdAndDelete(eventId);
        user.events = user.events.filter((event) => event.id.toString() !== eventId);
        await user.save();
        session.commitTransaction();
        session.endSession();
        res.status(200).json({ message: "Event deleted successfully" });

    } catch (error) {
        session.abortTransaction();
        session.endSession()
        res.status(500).json({ message: "Something went wrong" });
    }
};