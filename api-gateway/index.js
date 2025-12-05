const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const config = require("./gateway.config");

const app = express();

// Logging middleware
app.use((req, res, next) => {
  console.log(`[Gateway] ${req.method} ${req.url}`);
  next();
});

// Proxy routes
app.use("/posts", createProxyMiddleware({
  target: config.posts,
  changeOrigin: true
}));

app.use("/users", createProxyMiddleware({
  target: config.users,
  changeOrigin: true
}));

app.use("/comments", createProxyMiddleware({
  target: config.comments,
  changeOrigin: true
}));

app.listen(3000, () => {
  console.log("API Gateway running on port 3000");
});
