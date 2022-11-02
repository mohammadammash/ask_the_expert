import mongoose from "../connection";

const reviewSchema = new mongoose.Schema({
    novice_id: {
        type: String,
        ref: 'User',
    },
    expert_id: {
        type: String,
        ref: 'Expert',
    },
    rating: {
        type: Number,
        required: 'Rating Number is Required',
    },
    content: {
        type: String,
        required: 'Rating Content is Required',
    },
},
    { timestamps: true }
);

const ReviewModal = mongoose.model("Review", reviewSchema);

module.exports = ReviewModal;