import mongoose from 'mongoose';

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
            id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            fullName: { type: String, required: true },
            email: { type: String, required: true },
            picture: { type: String, required: true }
        }],
        default: []
    },
    followers: {
        type: [{
            id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            fullName: { type: String, required: true },
            email: { type: String, required: true },
            picture: { type: String, required: true }
        }],
        default: []
    },
    events: {
        type: [{
            id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
            image: { type: String, required: true },
            name: { type: String, required: true }
        }],
        default: []
    },
    places: {
        type: [{
            id: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' },
            image: { type: String, required: true },
            name: { type: String, required: true }
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