const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/_payment',
    createProxyMiddleware({
      target: 'https://test.payu.in',
      changeOrigin: true,
      pathRewrite: {
        '^/_payment': '', 
      },
    })
  );
};