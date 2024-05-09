const { createProxyMiddleware } = require('http-proxy-middleware');

// Naming the function `setupProxy`
module.exports = function setupProxy(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://spring-app:8080',
      changeOrigin: true,
    }),
  );
};
