// utils/redisClient.js
const redis = require("redis");
const { promisify } = require("util");

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

redisClient.on("connect", () => {
  console.log("Connected to Redis successfully.");
});

redisClient.on("ready", () => {
  console.log("Redis client is ready to use.");
});

// Promisify Redis methods for async/await usage
const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);

module.exports = { getAsync, setAsync, redisClient };
