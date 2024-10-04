const { createProxyMiddleware } = require("http-proxy-middleware");
const { Buffer } = require("buffer");
const { client, setValue, getValue } = require("../utils/redisClient");

// Middleware for proxying requests
const proxyMiddleware = (serviceUrl) => {
 
  return async (req, res, next) => {
    try {
      const cachedData = await getValue(req.originalUrl);
      if (cachedData) {
        res.send(cachedData);
      } else {
        // If not found in Redis, proceed with proxying the request to the target server
        createProxyMiddleware({
          target: serviceUrl,
          changeOrigin: true,
          selfHandleResponse: true,
          on: {
            proxyRes: async (proxyRes, req, res) => {
              let body = ""; 

              proxyRes.on("data", (chunk) => {
                body += chunk.toString("utf8"); 
              });

              proxyRes.on("end", () => {
                setValue(req.originalUrl, body, 60);
                console.log(`Full Response Body for ${req.originalUrl}:`, body);

                res.send(body);
              });
            },
            // Handle any proxy errors
            error: (err, req, res) => {
              console.error("Error in proxy:", err);
              res
                .status(500)
                .send("Something went wrong with the proxy server.");
            },
          },
        })(req, res, next);
      }
    } catch (error) {
      console.error("Error handling proxy middleware:", error);
      res.status(500).send("Internal Server Error");
    }
  };
};

module.exports = proxyMiddleware;
