import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dateAndTime: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ticketPrice: {
        type: Number,
        required: true
    },
    capacity: {
        type: Number,
        required: true,
        min: 1
    },
    organizer: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        picture: { type: String, default: '' },
        fullName: { type: String, required: true }
    },
    type: {
        value: { type: String, required: true },
        name: { type: String, required: true }
    },
    image: {
        type: String,
        required: true
    },
    bookings: {
        bookers: {
            type: [{
                id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
                fullName: { type: String, required: true },
                picture: { type: String, default: '' },
                phoneNum: { type: Number, required: true },
                numOfTickets: { type: Number, required: true, min: 1 }
            }],
            default: []
        },
        total: { type: Number, default: 0 }
    },
    socialMedia: {
        facebook: { type: String, default: '' },
        twitter: { type: String, default: '' }
    },
    contact: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Event = mongoose.model('Event', EventSchema);
export default Event;