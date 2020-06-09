module.exports = {
    devServer: {
        open:true, //自动开启浏览器
        port:8000, //随便改端口号
        proxy: {
            '/api': {      
                target: 'http://article.m.yiguo.com',
                changeOrigin:true,
                pathRewrite:{
                    "^/api":""
                }
            }
        }
   }
}