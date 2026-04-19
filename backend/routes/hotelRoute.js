import express from "express";
import { getNearbyHotels, getHotelMenu } from "../controllers/hotelController.js";

const hotelRouter = express.Router();

hotelRouter.get("/nearby", getNearbyHotels);
hotelRouter.get("/:id/menu", getHotelMenu);

export default hotelRouter;
