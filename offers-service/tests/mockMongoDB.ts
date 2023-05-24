import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient } from "mongodb";

let mongoServer: MongoMemoryServer;
let mongoClient: MongoClient;

export async function startMockMongoDB() {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  mongoClient = new MongoClient(mongoUri);

  await mongoClient.connect();
}

export async function stopMockMongoDB() {
  await mongoClient.close();
  await mongoServer.stop();
}

export function getMockMongoDBUri() {
  return mongoServer.getUri();
}

export function getMockMongoDBClient() {
  return mongoClient;
}
