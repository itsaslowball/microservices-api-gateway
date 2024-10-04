// middlewares/cache.js
const { getAsync, setAsync, redisClient } = require("../utils/redisClient");

const cacheMiddleware = async (req, res, next) => {
  if (!redisClient.isOpen) {
    console.warn("Redis client is not open. Skipping cache middleware.");
    return next();
  }

  try {
    const key = req.originalUrl;
    const cachedResponse = await getAsync(key);
    if (cachedResponse) {
      console.log(`Cache hit for ${key}`);
      res.setHeader("x-cache-status", "HIT");
      return res.send(JSON.parse(cachedResponse));
    }
    res.sendResponse = res.send;
    res.send = async (body) => {
      res.setHeader("x-cache-status", "MISS");
      await setAsync(key, JSON.stringify(body), "EX", 60); // Cache for 60 seconds
      res.sendResponse(body);
    };
  } catch (error) {
    console.error("Error accessing Redis:", error.message);
  }
  next();
};

module.exports = cacheMiddleware;
