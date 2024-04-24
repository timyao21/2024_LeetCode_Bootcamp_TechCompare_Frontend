const {createProxyMiddleware } = require('http-proxy-middleware')
 
module.exports = function(app) {
 app.use(createProxyMiddleware('/techCompare', { 
     //设定目标服务器的 host
     target: 'http://localhost:3030',
     //将客户端请求路径转化为目标服务器地址
     pathRewrite: {
       '^/EF': '',
     },
     //是否将主机标头的来源更改为目标URL
     changeOrigin: true,
     //是否验证ssl证书
     secure: false
   }));
}