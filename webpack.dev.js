/*
 * @Author: aweleey.li@qunar.com 
 * @Date: 2018-09-02 20:49:25 
 * @Last Modified by: aweleey.li@qunar.com
 * @Last Modified time: 2018-09-02 21:27:59
 */

const path = require("path");
const WebpackMerge = require("webpack-merge");
const CommonConfig = require("./webpack.common");

module.exports = WebpackMerge(CommonConfig, {
    devtool: "inline-source-map",
    mode: "development",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        historyApiFallback: true,
        //  指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问，写法如下
        host: "0.0.0.0",
        port: 9090
    }
});
