import { nanoid } from "nanoid";
import { CreateOfferData, Offer } from "../models/offerModel";
import offersDataAccess from "../dataAccess/offersDataAccess";
import { isEmpty, isNil } from "ramda";

const offersArray: Offer[] = [
  {
    _id: "ewLnVu8FS50p8MBm8fxP0",
    createdAt: 1680893515413,
    title: "Meh",
    description: "desc",
    price: 1,
    author: "Me",
    closed: false,
  },
];

const isNilOrEmpty = (value: any): value is null | undefined | [] | {} | "" =>
  isNil(value) || isEmpty(value);

const offersService = () => {
  const getOffers = async (): Promise<Offer[]> => {
    const offers = await offersDataAccess().getOffers();
    return offers;
  };

  const getOffer = async (offerId: string): Promise<Offer | null> => {
    const offer = await offersDataAccess().getOffer(offerId);

    if (offer === null) {
      return null;
    }

    return offer;
  };

  const createOffer = async (data: CreateOfferData): Promise<Offer | null> => {
    if (
      isNilOrEmpty(data.author) ||
      isNilOrEmpty(data.title) ||
      isNilOrEmpty(data.description) ||
      isNilOrEmpty(data.price)
    ) {
      throw Error("Data is missing!");
    }

    const offerObject: Offer = {
      _id: nanoid(),
      createdAt: Date.now(),
      closed: false,
      ...data,
    };

    const offer = await offersDataAccess().createOffer(offerObject);

    return offer;
  };

  const updateOffer = async (
    offerId: string,
    updatedOffer: Partial<Offer>
  ): Promise<Offer | null> => {
    const data = await getOffer(offerId);

    if (!data) {
      return null;
    }

    const updated: Offer = {
      ...data,
      ...updatedOffer,
    };

    const offer = await offersDataAccess().updateOffer(offerId, updated);

    return offer;
  };

  const deleteOffer = async (offerId: string): Promise<boolean> => {
    const data = await getOffer(offerId);

    if (!data) {
      return false;
    }

    const result = await offersDataAccess().deleteOffer(offerId);

    return result;
  };

  return {
    getOffers,
    getOffer,
    createOffer,
    updateOffer,
    deleteOffer,
  };
};

export default offersService;
