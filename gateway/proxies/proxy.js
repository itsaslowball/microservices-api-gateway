// proxies/proxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

const proxyMiddleware = (serviceUrl) => {
  return createProxyMiddleware({
    target: serviceUrl,
    changeOrigin: true,
    onError(err, req, res) {
      console.error(`Proxy error: ${err.message}`);
      res.status(502).send("Bad Gateway");
    },
    onProxyRes(proxyRes, req, res) {
      // Remove sensitive headers from the response
      delete proxyRes.headers["x-powered-by"];
      delete proxyRes.headers["server"];
      proxyRes.headers["x-gateway-response"] = "Processed by API Gateway"; // Add custom header
    },
    onProxyReq(proxyReq, req, res) {
      // Remove sensitive headers from the request
      proxyReq.removeHeader("x-powered-by");
      proxyReq.removeHeader("server");
    },
  });
};

module.exports = proxyMiddleware;
