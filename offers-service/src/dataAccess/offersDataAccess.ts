import { Collection, Db, MongoClient, WithoutId } from "mongodb";
import { Offer } from "../models/offerModel";

let database: Db;
let collection: Collection<Offer>;

export const run = async (
  client: MongoClient,
  databaseName: string,
  collectionName: string
) => {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });

    database = client.db(databaseName);
    collection = database.collection<Offer>(collectionName);

    console.log("connection opened");
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    // Ensures that the client will close when there is an error
    console.log(error, "connection closed");
    await client.close();
  }
};

const offersDataAccess = () => {
  const getOffers = async (): Promise<Offer[]> => {
    const documents = await collection.find({}).toArray();
    return documents;
  };

  const getOffer = async (offerId: string): Promise<Offer | null> => {
    const offer = await collection.findOne({ _id: offerId });

    if (offer === null) {
      return null;
    }

    return offer;
  };

  const createOffer = (data: Offer): Promise<Offer | null> => {
    const promiseResult = collection
      .insertOne(data)
      .then((result) => result.insertedId);

    const offer = promiseResult.then((objectId) => {
      if (objectId) {
        return getOffer(objectId.toString());
      } else {
        return null;
      }
    });

    return offer;
  };

  const updateOffer = async (
    offerId: string,
    updatedOffer: WithoutId<Offer>
  ): Promise<Offer | null> => {
    const updatedOfferId = await collection.replaceOne(
      { _id: offerId },
      updatedOffer
    );

    if (
      updatedOfferId.matchedCount <= 0 ||
      updatedOfferId.acknowledged === false
    ) {
      return null;
    }

    return await getOffer(offerId);
  };

  const deleteOffer = async (offerId: string): Promise<boolean> => {
    const result = await collection.deleteOne({ _id: offerId });

    if (!result.deletedCount || result.deletedCount === 0) {
      return false;
    }

    return true;
  };

  return {
    run,
    getOffers,
    getOffer,
    createOffer,
    updateOffer,
    deleteOffer,
  };
};

export default offersDataAccess;
