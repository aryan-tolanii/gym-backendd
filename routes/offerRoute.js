import { getAllOffers, addOffer, updateOffer, deleteOffer } from "../controllers/offerController.js";
import express from "express";

const offerRouter = express.Router();

offerRouter.get("/get", getAllOffers);
offerRouter.post("/add", addOffer);
offerRouter.put("/update/:id", updateOffer);
offerRouter.delete("/delete/:id", deleteOffer);

export default offerRouter;