import { nanoid } from "nanoid";
import { CreateOfferData, Offer } from "../models/offerModel";
import { readFileSync, writeFileSync } from "fs";

const offers: Offer[] = [
  {
    id: "ewLnVu8FS50p8MBm8fxP0",
    createdAt: 1680893515413,
    title: "Meh",
    description: "desc",
    price: 1,
    author: "Me",
    closed: false,
  },
];

const getOffers = (): Offer[] => {
  return offers;
};

const getOffer = (offerId: string): Offer | null => {
  const data = offers.find((offer) => offer.id === offerId);
  return data || null;
};

const createOffer = (data: CreateOfferData): Offer => {
  const offer: Offer = {
    id: nanoid(),
    createdAt: Date.now(),
    closed: false,
    ...data,
  };

  offers.push(offer);

  return offer;
};

const updateOffer = (
  offerId: string,
  updatedOffer: Partial<Offer>
): Offer | null => {
  const data = offers.find((offer) => offer.id === offerId);

  if (!data) {
    return null;
  }

  const newOffer: Offer = {
    ...data,
    ...updatedOffer,
  };

  const index = offers.indexOf(data);
  offers[index] = newOffer;

  return newOffer;
};

const deleteOffer = (offerId: string): boolean => {
  const data = offers.find((offer) => offer.id === offerId);

  if (!data) {
    return false;
  }

  const index = offers.indexOf(data);
  offers.splice(index, 1);

  return true;
};

export default { getOffers, getOffer, deleteOffer, updateOffer, createOffer };
