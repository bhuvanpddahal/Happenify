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
    organizer: {
        type: {
            id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            picture: { type: String, default: '' },
            fullName: { type: String, required: true }
        }
    },
    type: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
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