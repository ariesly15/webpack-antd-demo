/*
 * @Author: aweleey.li@qunar.com 
 * @Date: 2018-09-02 20:52:11 
 * @Last Modified by: aweleey.li@qunar.com
 * @Last Modified time: 2018-09-04 11:18:31
 */

const WebpackMerge = require("webpack-merge");
const CommonConfig = require('./webpack.common')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = WebpackMerge(CommonConfig, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", 'less-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
})