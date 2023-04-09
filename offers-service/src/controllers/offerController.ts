import { RequestHandler } from "express";
import offerService from "../services/offerService";

export const getOffers: RequestHandler = (req, res) => {
  const offers = offerService.getOffers();

  res.status(200).json({ data: offers });
};

export const getOffer: RequestHandler = (req, res) => {
  const offerId = req.params.offerId;

  const offer = offerService.getOffer(offerId);

  res.status(200).json({ data: offer });
};

export const createOffer: RequestHandler = (req, res) => {
  const data = req.body.offer;

  const offer = offerService.createOffer(data);

  res.status(201).json({ data: offer });
};

export const updateOffer: RequestHandler = (req, res) => {
  const offerId = req.params.offerId;
  const data = req.body.offer;

  const updatedOffer = offerService.updateOffer(offerId, data);

  if (!updatedOffer) {
    res
      .status(404)
      .send("The offer that you are trying to update does not exist!");
  } else {
    res.status(200).json({ data: updatedOffer });
  }
};

export const deleteOffer: RequestHandler = (req, res) => {
  const offerId = req.params.offerId;

  const result = offerService.deleteOffer(offerId);

  if (!result) {
    res
      .status(404)
      .send("The offer that you are trying to delete does not exist!");
  } else {
    res.status(200).send("The offer has been successfully deleted");
  }
};
