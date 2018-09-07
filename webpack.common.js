/*
 * @Author: aweleey.li@qunar.com 
 * @Date: 2018-09-02 20:52:11 
 * @Last Modified by: aweleey.li@qunar.com
 * @Last Modified time: 2018-09-07 15:57:38
 */

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const pkg = require('./package.json')

// 如果预先定义过环境变量，就将其赋值给`ASSET_PATH`变量，否则赋值为根目录
const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = {
    output: {
        path: path.join(__dirname, "./dist"),
        filename: "[name].[chunkhash].js",
        publicPath: ASSET_PATH
    },
    module: {
        rules: [
            {
                test: /\.js$/, // 正则匹配以 .js 结尾的文件来使用 babel 解析
                use: ["babel-loader?cacheDirectory=true"], // cacheDirectory是用来缓存编译结果，下次编译加速
                include: path.join(__dirname, "src") // 需要解析的目录
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            // olimit 8192意思是，小于等于8K的图片会被转成base64编码，直接插入HTML中，减少HTTP请求
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.join(__dirname, "src/index.html")
        }),
        new webpack.HashedModuleIdsPlugin()
    ],
    optimization: {
        runtimeChunk: "single",
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "initial",
                    name: "vendors"
                }
            }
        }
    }
};
