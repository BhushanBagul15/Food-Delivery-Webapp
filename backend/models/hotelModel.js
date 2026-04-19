import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, default: 4.0 },
    address: { type: String, required: true },
    location: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], required: true } // [longitude, latitude]
    }
});

hotelSchema.index({ location: "2dsphere" });

const hotelModel = mongoose.models.hotel || mongoose.model("hotel", hotelSchema);

export default hotelModel;
