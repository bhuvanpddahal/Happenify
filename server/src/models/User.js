import mongoose, { trusted } from 'mongoose';

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        default: ''
    },
    following: {
        type: [{
            id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            fullName: { type: String, required: true },
            email: { type: String, required: true },
            picture: { type: String, default: '' }
        }],
        default: []
    },
    followers: {
        type: [{
            id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            fullName: { type: String, required: true },
            email: { type: String, required: true },
            picture: { type: String, default: '' }
        }],
        default: []
    },
    userEvents: {
        type: [{
            id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
            name: { type: String, required: true },
            image: { type: String, required: true }
        }],
        default: []
    },
    bookedEvents: {
        type: [{
            id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
            name: { type: String, required: true },
            image: { type: String, required: true }
        }],
        default: []
    },
    userPlaces: {
        type: [{
            id: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true },
            name: { type: String, required: true },
            image: { type: String, required: true }
        }],
        default: []
    },
    bookedPlaces: {
        type: [{
            id: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true },
            name: { type: String, required: true },
            image: { type: String, required: true }
        }],
        default: []
    },
    joinedAt: {
        type: Date,
        default: new Date()
    }
});

const User = mongoose.model('User', UserSchema);
export default User;