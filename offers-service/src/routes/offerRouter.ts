import bodyParser from "body-parser";
import express from "express";
import {
  createOffer,
  deleteOffer,
  getOffer,
  getOffers,
  updateOffer,
} from "../controllers/offerController";

const router = express.Router();
const jsonParser = bodyParser.json();

router.get("/offers", getOffers);

router.get("/offers/:offerId", getOffer);

router.post("/offers", jsonParser, createOffer);

router.put("/offers/:offerId", jsonParser, updateOffer);

router.delete("/offers/:offerId", deleteOffer);

export default router;
