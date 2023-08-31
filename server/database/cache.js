import dotenv from "dotenv";
import { createClient } from "redis";
dotenv.config();
const password = process.env.REDIS_PASSWORD;
const host = process.env.REDIS_HOST;
export const connectToRedis = async () => {
  const redisClient = createClient({
    password,
    socket: {
      host,
      port: 18575,
    },
  });

  await redisClient.connect();
  return redisClient;
};
