import Redis from "ioredis";

const redisConfig = {
  port: 6379,
  host: "127.0.0.1",
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
};

export const redisConnection = new Redis(redisConfig);
