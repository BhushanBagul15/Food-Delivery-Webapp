import hotelModel from "../models/hotelModel.js";
import foodModel from "../models/foodModel.js";

// Fetch nearby hotels
const getNearbyHotels = async (req, res) => {
    try {
        const { lat, lng } = req.query;

        // If no coordinates provided, just return all hotels for now
        if (!lat || !lng) {
            const hotels = await hotelModel.find({});
            return res.json({ success: true, data: hotels });
        }

        // Geospatial query
        const hotels = await hotelModel.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(lng), parseFloat(lat)]
                    },
                    $maxDistance: 10000 // 10 km radius
                }
            }
        });

        res.json({ success: true, data: hotels });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error fetching nearby hotels" });
    }
};

// Fetch a specific hotel's menu
const getHotelMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const foods = await foodModel.find({ hotel: id });
        
        // Let's also fetch the hotel details to display at the top
        const hotel = await hotelModel.findById(id);

        res.json({ success: true, data: { hotel, menu: foods } });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error fetching hotel menu" });
    }
};

export { getNearbyHotels, getHotelMenu };
