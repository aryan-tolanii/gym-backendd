// offerModel.js
import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    buttonText: {
        type: String,
        required: true,
        trim: true,
    }
}, { timestamps: true });

const offerModel = mongoose.model('offer', offerSchema);

export default offerModel;
