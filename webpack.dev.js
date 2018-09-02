const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    output: {
        path: path.join(__dirname, "./dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/, // 正则匹配以 .js 结尾的文件来使用 babel 解析
                use: ["babel-loader?cacheDirectory=true"], // cacheDirectory是用来缓存编译结果，下次编译加速
                include: path.join(__dirname, "src") // 需要解析的目录
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
             }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'src/index.html')
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: true,
        //  指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问，写法如下
        host: '0.0.0.0',
        port: 9090
    }
};
