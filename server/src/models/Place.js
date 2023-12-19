import mongoose from 'mongoose';

const PlaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    facilities: {
        type: [String],
        required: true
    },
    ratings: {
        type: [{
            star: { type: Number, required: true, min: 1, max: 5 },
            review: { type: String, required: true, minlength: 20 }
        }],
        default: []
    },
    pricePerHour: {
        type: Number,
        required: true
    },
    termsAndConditions: {
        type: [String],
        required: true
    },
    socialMedia: {
        facebook: { type: String, required: true },
        twitter: { type: String, required: true }
    }
});

const Place = mongoose.model('Place', PlaceSchema);
export default Place;