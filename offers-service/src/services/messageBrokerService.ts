import amqplib, { Channel, Connection } from "amqplib";
import offerService from "./offerService";

// rabbitmq to be global variables
let channel: Channel;
let connection: Connection;

export const connect = async () => {
  try {
    // Establish connection to RabbitMQ server
    connection = await amqplib.connect("amqp://rabbit:5672");
    channel = await connection.createChannel();

    await channel.assertQueue("transactions");
    console.log("Connected to RabbitMQ server");

    receiveTransaction();
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
    throw error;
  }
};

export const receiveTransaction = async () => {
  try {
    channel.consume(
      "transactions",
      (message) => {
        if (message) {
          const parsed: any = JSON.parse(message.content.toString());
          console.log("Message received from RabbitMQ:", parsed);

          if (parsed.success) {
            offerService.updateOffer(parsed.offerId, {
              closed: parsed.success,
            });

            channel.ack(message);
            console.log("Message processed!");
          }
        }
      },
      {
        noAck: false,
      }
    );
  } catch (error) {
    console.error("Error receiving message from RabbitMQ:", error);
  }
};

export const closeConnection = async () => {
  // Close connection to RabbitMQ server
  await channel.close();
  await connection.close();
  console.log("Connection to RabbitMQ server closed");
};
