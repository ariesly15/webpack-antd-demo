/*
 * @Author: aweleey.li@qunar.com 
 * @Date: 2018-09-02 20:49:25 
 * @Last Modified by: aweleey.li@qunar.com
 * @Last Modified time: 2018-09-04 11:19:05
 */

const path = require("path");
const WebpackMerge = require("webpack-merge");
const CommonConfig = require("./webpack.common");

const ProxyUrl = "https://easy-mock.com/mock/5b8c9f2fdcc57313cd5b6678";

module.exports = WebpackMerge(CommonConfig, {
    devtool: "inline-source-map",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"]
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        historyApiFallback: true,
        //  指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问，写法如下
        host: "0.0.0.0",
        port: 9090,
        proxy: {
            "/api/*": {
                target: ProxyUrl,
                changeOrigin: true,
                secure: false
            }
        }
    }
});
