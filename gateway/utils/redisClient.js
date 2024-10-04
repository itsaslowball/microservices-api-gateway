const Redis = require("ioredis");

const client = new Redis();

const setValue = async (key, value, expiryInSeconds) => {
  try {
    await client.set(key, value, "EX", expiryInSeconds);
    console.log(`Data set in Redis for ${key}`);
  } catch (error) {
    console.error("Error setting data in Redis:", error);
  }
};

const getValue = async (key) => {
  try {
    const data = await client.get(key);
    if (data) {
      console.log(`Data found in Redis cache for ${key}`);
      return data;
    }
  } catch (error) {
    console.error("Error retrieving data from Redis:", error);
  }
};

client.on("connect", () => {
  console.log("Redis client connected");
});

client.on("ready", () => {
  console.log("Redis client ready to use");
});

client.on("error", (error) => {
  console.error("Redis client error:", error);
});

client.on("end", () => {
  console.log("Redis client disconnected");
});

module.exports = { client, setValue, getValue };
