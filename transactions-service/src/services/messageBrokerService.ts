import amqplib, { Channel, Connection } from "amqplib";
import { Transaction } from "../models/transactionModel";

// rabbitmq to be global variables
let channel: Channel;
let connection: Connection;

export const connect = async (uri: string) => {
  try {
    // Establish connection to RabbitMQ server
    connection = await amqplib.connect(uri);
    channel = await connection.createChannel();

    await channel.assertQueue("transactions");
    console.log("Connected to RabbitMQ server");
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
    throw error;
  }
};

export const sendTransaction = async (transaction: Transaction) => {
  try {
    // Send message to queue
    const serializedMessage = JSON.stringify(transaction);
    channel.sendToQueue("transactions", Buffer.from(serializedMessage));
    console.log("Message sent to RabbitMQ:", serializedMessage);
  } catch (error) {
    console.error("Error sending message to RabbitMQ:", error);
  }
};

export const closeConnection = async () => {
  // Close connection to RabbitMQ server
  await channel.close();
  await connection.close();
  console.log("Connection to RabbitMQ server closed");
};
