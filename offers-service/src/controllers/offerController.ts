import { RequestHandler } from "express";
import offerService from "../services/offerService";

export const getOffers: RequestHandler = async (req, res) => {
  try {
    const offers = await offerService().getOffers();
    res.status(200).json({ data: offers });
  } catch (err: any) {
    res
      .status(500)
      .send({ error: `The offers cannot be retrieved! ${err.message ?? ""}` });
  }
};

export const getOffer: RequestHandler = async (req, res) => {
  const offerId = req.params.offerId;

  try {
    const offer = await offerService().getOffer(offerId);
    if (!offer) {
      res
        .status(404)
        .send("The offer that you are trying to get does not exist!");
    } else {
      res.status(200).json({ data: offer });
    }
  } catch (err: any) {
    res.status(500).send({
      error: `The offer with id ${offerId} cannot be retrieved! ${
        err.message ?? ""
      }`,
    });
  }
};

export const createOffer: RequestHandler = async (req, res) => {
  const data = req.body.offer;

  try {
    const offer = await offerService().createOffer(data);

    res.status(201).json({ data: offer });
  } catch (err: any) {
    res.status(500).send({
      error: `The offer cannot be created! ${err.message ?? ""}`,
    });
  }
};

export const updateOffer: RequestHandler = async (req, res) => {
  const offerId = req.params.offerId;
  const data = req.body.offer;

  try {
    const updatedOffer = await offerService().updateOffer(offerId, data);

    if (!updatedOffer) {
      res
        .status(404)
        .send("The offer that you are trying to update does not exist!");
    } else {
      res.status(200).json({ data: updatedOffer });
    }
  } catch (err: any) {
    res.status(500).send({
      error: `The offer cannot be updated! ${err.message ?? ""}`,
    });
  }
};

export const deleteOffer: RequestHandler = async (req, res) => {
  const offerId = req.params.offerId;

  const result = await offerService().deleteOffer(offerId);

  try {
    if (!result) {
      res
        .status(404)
        .send("The offer that you are trying to delete does not exist!");
    } else {
      res.status(200).send("The offer has been successfully deleted");
    }
  } catch (err: any) {
    res.status(500).send({
      error: `The offer cannot be deleted! ${err.message ?? ""}`,
    });
  }
};
