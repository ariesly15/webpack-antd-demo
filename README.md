# React框架入门

## 说明

> 项目托管于[GitHub](https://github.com/aweleey/webpack-antd-demo)

1.本教程基于mac环境

``` sh
node -v
# v6.9.5
npm -v
# 3.10.10
```

2.每个命令行块都是以根目录为基础的。例如下面命令行块，都是基于根目录的。

```  sh
cd src/pages
mkdir Home
```

3.所用的库的版本(2018年09月)是最新的
webpack-antd-demo
├── antd@3.8.4
├── react@16.4.2
├── react-dom@16.4.2
└── webpack@4.17.1

4.目录说明

```
webpack-antd-demo
├── README.md                   // 本教程
├── package.json
├── pages                       // 放置页面, 业务页面代码
├── src
│   ├── api                     // 请求的api
│   ├── assets                  // 资源文件夹
│   ├── bootstrap               // 项目入口之前执行
│   │   ├── http-interceptors.js    // 网络请求拦截器
│   │   └── index.js            // bootstrap入口文件
│   ├── common
│   │   ├── constants.js        // 用于存放静态变量
│   │   └── utils.js            // 放置公共方法
│   ├── component               // 自定义组件 , 例如 Loading 和 404
│   │   ├── Loading
│   │   │   └── index.js
│   │   └── NotFound
│   │       └── index.js
│   ├── index.html              // 模板, HtmlWebpackPlugin插件会把相关资源注入后放入dist文件夹
│   ├── index.js                // 项目入口
│   ├── pages                   // 业务页面代码
│   ├── router                  // 路由
│   │   └── index.js
│   └── store                   // 数据管理
│       ├── app.js              
│       ├── index.js            // 入口, 根据业务自行创建
│       └── ui.js
├── webpack.common.js           // webpack 公共配置
├── webpack.dev.js              // webpack 开发配置
└── webpack.prod.js             // webpack 线上配置
```

## 初始化项目

``` sh
mkdir webpack-antd-demo && cd webpack-antd-demo
npm init
# 按照提示填写基本信息或者用 npm init -y 一步创建完成
```

## webpack

1.安装webpack

``` sh
npm i webpack webpack-cli --save-dev
# --save        线上依赖
# --save-dev    开发依赖
```

2.根据[webpack](https://doc.webpack-china.org/guides/getting-started)文档编写最基础的配置文件

``` sh
touch webpack.dev.js
```

``` js
// webpack.dev.js 内容
const path = require('path');

module.exports = {
    /*入口 (webpacak@4可以不写, 默认读取./src/index.js)*/
    entry: path.join(__dirname, 'src/index.js'),
    
    /*输出到dist文件夹，输出文件名字为bundle.js*/
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    }
}
```

3.创建入口文件并写入内容

``` sh
mkdir src && touch  ./src/index.js
```

``` js
//  ./src/index.js 内容
document.getElementById('app').innerHTML = "webpack-antd-demo"
```

4.配置 NPM 脚本(NPM Scripts)

``` json
// 在package.json中的scrripts下添加
"dev": "webpack --config webpack.dev.js --mode development"

// 结果入下
{
  "name": "webpack-antd-demo",
  "version": "1.0.0",
  "description": "## 说明",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack --config webpack.dev.js --mode development"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^4.17.1",
    "webpack-cli": "^3.1.0"
  }
}
```

5.执行命令编译文件

``` sh
npm run dev
```

执行后查看`dist`目录是否用`bundle.js`文件

6.测试

``` sh
# 在dist目录创建html文件
touch ./dist/index.html
```

``` html
<!-- dist/index.html内容 -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>webpack-ant-demo</title>
</head>
<body>
    <div id="app"></div>
    <script type="text/javascript" src="./bundle.js"></script>
</body>
</html>
```

> 用浏览器打开`dist/index.html`, 可以看到`webpack-antd-demo`

-------

## babel

> Babel 把用最新标准编写的 JavaScript 代码向下编译成可以在今天随处可用的版本。 这一过程叫做“源码到源码”编译， 也被称为转换编译。
> 通俗的说，就是我们可以用ES6, ES7等来编写代码，Babel会把他们统统转为ES5。

1.安装

[babel-core](https://github.com/babel/babel/tree/master/packages/babel-core) 调用Babel的API进行转码
[babel-loader](https://github.com/babel/babel-loader) 使用Babel和webpack转换JavaScript文件 [webpack中babel-loader用法](https://webpack.docschina.org/loaders/babel-loader/)
[babel-preset-env](https://www.babeljs.cn/docs/plugins/preset-env/) [相关介绍](https://www.cnblogs.com/chyingp/p/understanding-babel-preset-env.html)

``` sh
# 安装
npm i --save-dev babel-loader@8 @babel/core @babel/preset-env
```

2.配置

创建`babel`的配置文件`.babelrc`

``` sh
touch .babelrc
```

``` json
// .babelrc 内容

{
    "presets": ["@babel/preset-env"],
    "plugins": []
}
```

``` js
// 修改webpack.dev.js，增加babel-loader！

module: {
    rules: [{
        test: /\.js$/,  // 正则匹配以 .js 结尾的文件来使用 babel 解析
        use: ['babel-loader?cacheDirectory=true'],  // cacheDirectory是用来缓存编译结果，下次编译加速
        include: path.join(__dirname, 'src')    // 需要解析的目录
    }]
}
```

``` js
// 修改 ./src/index.js 使用es6的箭头函数

const useBabel = text => document.getElementById('app').innerHTML = text
useBabel('正在使用babel')
```

> 执行打包命令 `npm run dev` 浏览器打开 `dist/index.html` 查看效果

-------

## React

安装react

``` sh
npm i --save react react-dom
```

修改`./src/index.js`文件, 内容如下

``` js
import React from 'react'
import {render} from 'react-dom'

render(
    <div>Hello React !!!</div>,
    document.getElementById('app')
)
```

为了能让webpack正确执行, 还需要安装 `@babel/preset-react` 来正确编译 React 代码, 并修改`.babelrc`文件

``` sh
npm i @babel/preset-react --save-dev
```

``` js
// 修改后的内容
{
    "presets": ["@babel/preset-env", "@babel/preset-react"],
    "plugins": []
}
```

> 执行打包命令 `npm run dev` 浏览器打开 `dist/index.html` 查看效果

-------

简单做下改进，把Hello React放到组件里面。体现组件化~

``` sh
cd src
mkdir component
cd component
mkdir Hello
cd Hello
touch index.js
```
按照React语法，写一个Hello组件

``` jsx
import React, {Component} from 'react';

export default class Hello extends Component {
    render() {
        return <div>
            我是独立的 Hello 组件
        </div>
    }
}
```
然后让我们修改src/index.js，引用Hello组件！

``` jsx
// 修改 ./src/index.js 为如下内容

import React from 'react'
import {render} from 'react-dom'
import Hello from './component/Hello'

render(
    <Hello/>,
    document.getElementById('app')
)
```

> 执行打包命令 `npm run dev` 浏览器打开 `dist/index.html` 查看效果

-------

## Antd

``` sh
# 安装antd
npm i antd --save
```

[配置Antd的按需加载](https://ant.design/docs/react/introduce-cn#%E7%A4%BA%E4%BE%8B)

使用 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)

``` sh
npm i babel-plugin-import --save-dev
```

``` js
// 修改 .babelrc 文件, 修改后的文件内容如下
{
    "presets": ["@babel/preset-env", "@babel/preset-react"],
    "plugins": [
        ["import",{
            "libraryName": "antd",
            "style": "css"
        }]
    ]
}
```

然后只需从 antd 引入模块即可，无需单独引入样式。等同于下面手动引入的方式。

``` js
// babel-plugin-import 会帮助你加载 JS 和 CSS
import { Alert } from 'antd';
```

之后安装编译css的插件

> css-loader使你能够使用类似@import 和 url(...)的方法实现 require()的功能；
> style-loader将所有的计算后的样式加入页面中； 二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中

``` sh
npm i css-loader style-loader --save-dev
```

``` js
// 修改 webpack.dev.js, 修改后内容如下
const path = require("path");

module.exports = {
    entry: path.join(__dirname, "src/index.js"),
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
    }
};
```

准备工作做好后接下来修改一下 `Hello` 组件来测试一下 Antd

``` js
// 修改后的 Hello/index.js 内容如下
import React, {Component} from 'react';
import { Alert } from "antd";

export default class Hello extends Component {
    render() {
        return <div>
            我是独立的 Hello 组件
            <Alert message="Success Text" type="success" />
            <Alert message="Info Text" type="info" />
            <Alert message="Warning Text" type="warning" />
            <Alert message="Error Text" type="error" />
        </div>
    }
}
```

> 执行打包命令 `npm run dev` 浏览器打开 `dist/index.html` 查看效果

-------

## HtmlWebpackPlugin

自动把js插入到你的模板index.html里面去 [GitHub](https://github.com/jantimon/html-webpack-plugin) [印记中文](https://webpack.docschina.org/plugins/html-webpack-plugin/)

``` sh
npm i html-webpack-plugin --save-dev
```

创建模板html

``` sh
cd src && touch index.html
```

``` html
<!-- ./src/index.html 内容如下 -->

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>webpack-antd-demo</title>
</head>
<body>
    <div id="app"></div>
</body>
</html>
```

修改 `webpack.dev.js` 文件, 修改后的内容如下

``` js
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
    ]
};
```

## react-router

[地址](https://reacttraining.com/react-router/) | [中文](https://react-router.docschina.org/)

``` sh
# 安装
npm i --save react-router-dom

# 新建router文件夹和组件
cd src
mkdir router && touch router/index.js
```

在 `src/commponent/Hello` 目录下创建 `TestAntd.js` 和 `TestRouter.js` 组件(此为测试路由创建, 正常情况下最好是每个文件夹是一个组件)

``` js
// TestAntd.js
import React, {Component} from 'react';
import { Alert } from "antd";

export default class TestAntd extends Component {
    render() {
        return <div>
            <Alert message="我是独立的 TestAntd 组件" type="success" />
        </div>
    }
}

// TestRouter.js
import React, {Component} from 'react';
import { Alert } from "antd";

export default class TestRouter extends Component {
    render() {
        return <div>
            <Alert message="我是独立的 TestRouter 组件" type="info" />
        </div>
    }
}
```

按照 react-router 文档添加一个基本的router

``` js
// router/index.js 内容
import React from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'

import Hello from '../component/Hello'
import TestAntd from '../component/Hello/TestAntd'
import TestRouter from '../component/Hello/TestRouter'

const getRouter = () => <Router>
    <div>
        <ul>
            <li><Link to="/">首页</Link></li>
            <li><Link to="/router">TBestRouter</Link></li>
            <li><Link to="/antd">TestAntd</Link></li>
        </ul>
        <Switch>
            <Route exact path="/" component={Hello} />
            <Route exact path="/antd" component={TestAntd}/>
            <Route exact path="/router" component={TestRouter}/>
        </Switch>
    </div>
</Router>

export default getRouter
```

> 执行打包命令 `npm run dev` 浏览器打开 `dist/index.html` 查看效果

> 那么问题来了~我们发现点击`首页``TestRouter``TestAntd`没有反应。不要惊慌，这是正常的。因为我们 `router/index.js` 中使用的是 `BrowserRouter`, `BrowserRouter` 需要一个简单的web服务器, 有如下两种方法实现
- Nginx, Apache, IIS等配置启动一个简单的的WEB服务器。
- 使用webpack-dev-server来配置启动WEB服务器。

> 或者我们先简单的修改一下 `router/index.js` 代码, 把 `BrowserRouter` 改为 `HashRouter` 即可立刻查看效果

``` js
// 把
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
// 修改为
import {HashRouter as Router, Route, Switch, Link} from 'react-router-dom'
```

-------

## webpack-dev-server

[GitHub](https://github.com/webpack/webpack-dev-server) | [中文文档](https://webpack.docschina.org/configuration/dev-server/)

``` sh
# 安装
npm i webpack-dev-server --save-dev
```

修改webpack.dev.js文件

``` js
module.exports = {
    //...
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 9090
    }
}
```

devServer中的配置根据自身需求自行参照[文档](https://webpack.docschina.org/configuration/dev-server/)添加

修改 `package.json` 文件, 在`scripts`中添加

``` js
{
    // ...
    "scripts": {
        // ...
        "server": "webpack-dev-server --config webpack.dev.js --mode development"
    },
    // ...
}
```

**`historyApiFallback` 任意的404响应都被替代为index.html。
有什么用呢？你现在运行`npm run server`，然后打开浏览器，访问http://localhost:9090 ,然后点击`TestRouter`到链接http://localhost:9090/router 然后刷新页面试试。是不是发现刷新后404了。为什么？dist文件夹里面并没有router.html,当然会404了，所以我们需要配置 `historyApiFallback` ，让所有的404定位到index.html**

建议把 `router/index.js` 中的 `HashRouter` 改为 `BrowserRouter`

> 执行 `npm run server` 后, 浏览器打开 http://localhost:9090 查看效果

------

## 编译图片

``` sh
npm i --save-dev url-loader file-loader
```

``` js
// 修改webpack.dev.js, 添加规则(放在rules下)

module.exports = {
    // ...
    module: {
        rules: [
            // ...
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        // olimit 8192意思是，小于等于8K的图片会被转成base64编码，直接插入HTML中，减少HTTP请求
                        limit: 8192
                    }
                }]
            }
        ]
    },
    // ...  
}
```

``` sh
# 创建图片目录
mkdir -p src/assets/images
```

``` js
// 修改 `Hello/index.js` 文件添加如下代码(图片文件在源码中获取)
<div>
    <div>6kb</div>
    <img src={require('../../assets/images/antd6kb.png')} />
    <div>10kb</div>
    <img src={require('../../assets/images/antd10kb.png')} />
</div>
```

> 重新执行 `npm run server` 后, 浏览器打开 http://localhost:9090 , 在 `开发者工具` 中查看
> ![](http://p395rsz0o.bkt.clouddn.com/elements.jpg)

## 按需加载 code-splitting

参考链接: [GitHub](https://github.com/jamiebuilds/react-loadable) | [React Loadable 简介](https://zhuanlan.zhihu.com/p/25874892) | [react-loadable原理浅析](https://juejin.im/post/5a795187f265da4e7e109aac)

``` sh
# 安装 react-loadable
npm i react-loadable --save
# 安装 babel-plugin-syntax-dynamic-import 来支持react-loadable的import方法
npm i babel-plugin-syntax-dynamic-import --save-dev
```

修改 `.babelrc`

``` js
{
    // ...
    "plugins": [
        // ...
        "syntax-dynamic-import"
    ]
}
```

先准备一个 `Loding` 组件, 根据实际情况自行改写

``` js
// Loading 组件路径 src/component/Loading/index.js
import React, { Component } from "react";

export default class Loading extends Component {
    render() {
        const { isLoading, error } = this.props;

        // Handle the loading state
        if (isLoading) {
            return <div>Loading...</div>
        }
        // Handle the error state
        else if (error) {
            return <div>
                Sorry, there was a problem loading the page.
                <div>{JSON.stringify(error, null, 4)}</div>
            </div>
        } else {
            return null
        }
    }
}
```

修改 `router/index.js` 文件

``` js
// ...
import Loadable from 'react-loadable'
import Loading from '../component/Loading'
// ...
/**
此处为删除项
import TestAntd from '../component/Hello/TestAntd'
import TestRouter from '../component/Hello/TestRouter'
 */
const TestAntd = Loadable({
    loader: () => import('../component/Hello/TestAntd'),
    loading: Loading
})
const TestRouter = Loadable({
    loader: () => import('../component/Hello/TestRouter'),
    loading: Loading
})
```

![](http://p395rsz0o.bkt.clouddn.com/code-spliting.jpg)

只有路由匹配的时候，组件才被import进来，达到了code splitting的效果，也就是我们常说的按需加载，代码分块，而不是一开始就将全部组件加载。
如上图所示, 点击不同的路由都会加载一个chunk.js, 代码中除了首页之外只写了两个按需加载的组件 `TestAntd` 和 `TestRouter`, 分别对应上图 `1.bundle.js` 和 `0.bundle.js` (对应关系根据实际开发打包而定, 不必关注)

> 重新执行 `npm run server` 后, 浏览器打开 http://localhost:9090 查看效果

------

## 让组件支持静态属性 (static)

``` sh
npm i @babel/plugin-proposal-class-properties --save-dev
```

修改 `.babelrc` 文件

``` js
{
    // ...
    "plugins": [
        // ...
        "@babel/plugin-proposal-class-properties"
    ]
}
```

修改 `Hello/TestAntd.js` 文件来测试是否配置正确

``` js
import React, {Component} from 'react';
import { Alert } from "antd";

export default class TestAntd extends Component {

    static defaultProps = {
        value: 'test static'
    }

    render() {
        const {value} = this.props

        return <div>
            <Alert message="我是独立的 TestAntd 组件" type="success" />
            <div>{value}</div>
        </div>
    }
}
```

> 重新执行 `npm run server` 后, 浏览器打开 http://localhost:9090 查看效果

------

## 抽取公共代码

![vendor.jpg](http://p395rsz0o.bkt.clouddn.com/vendor.jpg)

可以看到 `bundle.js` 文件有 `3MB`, 因为此时 `bundle.js` 中包含了 `React`, `React-dom`, `React-Router` 等公共库文件, 这些代码基本上不会改变的。但是，他们合并在bundle.js里面，每次项目发布，重新请求bundle.js的时候，相当于重新请求了react等这些公共库。浪费资源

修改 `webpack.dev.js`

``` js
module.exports = {
    // ...
    optimization: {
        runtimeChunk: 'single'
    }
}
```

> 重新执行 `npm run server` 后可以看到公共库已被抽取
![vendor-extract.jpg](http://p395rsz0o.bkt.clouddn.com/vendor-extract.jpg)

------

## 缓存

[文档地址](https://webpack.docschina.org/guides/caching)

想象一下这个场景

我们网站上线了，用户第一次访问首页，下载了 `bundle.js` ，第二次访问又下载了 `bundle.js` 
这肯定不行呀，所以我们一般都会做一个缓存，用户下载一次home.js后，第二次就不下载了。
有一天，我们更新了home.js，但是用户不知道呀，用户还是使用本地旧的 `bundle.js` 
怎么解决？每次代码更新后，打包生成的名字不一样。比如第一次叫`bundle.a.js` ，第二次叫 `bundle.b.js` 

修改 `webpack.dev.js`

``` js
module.exports = {
    output: {
        // ...
        filename: "[name].[chunkhash].js"
    },
    // ...
    plugins: [
        // ...
        new webpack.HashedModuleIdsPlugin()
    ],
    // ...
    optimization: {
        runtimeChunk: "single",
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        }
    }
}
```

配置之后的，不管再添加任何新的本地依赖，对于每次构建，`vendor hash` 都会保持一致 [文档](https://webpack.docschina.org/guides/caching/#%E6%A8%A1%E5%9D%97%E6%A0%87%E8%AF%86%E7%AC%A6-module-identifiers-)

------

## 生产坏境构建

[文档地址](https://webpack.docschina.org/guides/production)

> 开发环境(development)和生产环境(production)的构建目标差异很大。在开发环境中，我们需要具有强大的、具有实时重新加载(live reloading)或热模块替换(hot module replacement)能力的 source map 和 localhost server。而在生产环境中，我们的目标则转向于关注更小的 bundle，更轻量的 source map，以及更优化的资源，以改善加载时间。由于要遵循逻辑分离，我们通常建议为每个环境编写彼此独立的 webpack 配置。

``` sh
touch webpack.prd.js
```

``` js
// webpack.prod.js

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: 'production',
    output: {
        path: path.join(__dirname, "./dist"),
        filename: "[name].[chunkhash].js"
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
                use: ["style-loader", "css-loader"]
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
                    name: "vendors",
                    chunks: "all"
                }
            }
        }
    }
};
```

``` js
// 修改package.json, 添加scripts
{
  // ...
  "scripts": {
    // ...
    "prod": "webpack --config webpack.prod.js --color --progress"
  },
  // ...
}
```

## 优化webpack配置

`webpack.dev.js` 和 `webpack.prod.js` 中有很多相同的代码, 每次修改都要顾及到两个文件, 用 `webpack-merge` 优化一下

``` sh
# 创建公共配置
touch webpack.common.js

# 安装 webpack-merge
npm i webpack-merge --save-dev
```

``` js
// 修改 package.json文件, 修改后的 scripts 如下
{
  // ...
  "scripts": {
    "dev": "webpack-dev-server --config webpack.dev.js",
    // 由于目前webpack.prod.js和webpack.common.js只是相差了一个 mode, 所以修改为如下命令, 后续添加less是统一抽离
    "prod": "webpack --config webpack.common.js --mode production --color --progress"
  },
  // ...
}
```

``` js
// 抽取公共配置到 webpack.common.js 中
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    output: {
        path: path.join(__dirname, "./dist"),
        filename: "[name].[chunkhash].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["babel-loader?cacheDirectory=true"],
                include: path.join(__dirname, "src")
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
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
                    name: "vendors",
                    chunks: "all"
                }
            }
        }
    }
};

// webpack.dev.js 修改如下
const path = require("path");
const CommonConfig = require("./webpack.common");
const WebpackMerge = require("webpack-merge");

const DevConfig = {
    devtool: "inline-source-map",
    mode: "development",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        historyApiFallback: true,
        //  指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问，写法如下
        host: "0.0.0.0",
        port: 9090
    }
};

module.exports = WebpackMerge(CommonConfig, DevConfig);
```

------

## 打包优化

每次打包前自动清理下dist文件。

``` sh
npm i clean-webpack-plugin --save-dev
```

``` js
// webpack.common.js
const CleanWebpackPlugin = require('clean-webpack-plugin');

plugins: [
    new CleanWebpackPlugin(['dist'])
]
```
------

## 公共路径(public path)

[文档](https://webpack.docschina.org/guides/public-path)

## Store [mobx]

[文档](https://cn.mobx.js.org/)

``` sh
# 安装
npm i mobx mobx-react --save
# 使用mobx开发, 需要启用decorators装饰器
npm i @babel/plugin-proposal-decorators --save-dev
# 创建 store 目录
cd src && mkdir store && cd store
touch index.js app.js
```

``` js
// 修改 .balelrc 文件
{
    "presets": ["@babel/preset-env", "@babel/preset-react"],
    "plugins": [
        ["@babel/plugin-proposal-decorators", {"legacy": true}],
        ["import",{
            "libraryName": "antd",
            "style": "css"
        }],
        "syntax-dynamic-import",
        ["@babel/plugin-proposal-class-properties", {"loose" : true}]
    ]
}

```

``` jsx
// store/index.js
import AppStore from './app'

export const appStore = new AppStore()

// store/app.js
import {observable, action} from 'mobx'

export default class App {
    @observable
    count = 0

    @action
    updateCount(num){
        this.count = this.count + num
    }
}

// src/index.js
import React from 'react'
import {render} from 'react-dom'
import getRouter from './router'
import * as stores from './store'
import {Provider} from 'mobx-react'

render(<Provider {...stores}>
    {getRouter()}
</Provider>,document.getElementById('app'))
```

接下来测试一下, 修改 `TestAntd/index.js` 和 `TestRouter/index.js`

``` jsx
// TestAntd/index.js
import React, {Component} from 'react';
import { Alert } from "antd";
import {observer, inject} from 'mobx-react'

@inject('appStore')
@observer
export default class TestAntd extends Component {

    static defaultProps = {
        value: 'test static'
    }

    render() {
        const {value, appStore} = this.props

        return <div>
            <div>count: {appStore.count}</div>
            <button onClick={() => appStore.updateCount(1)}>++</button>
            <button onClick={() => appStore.updateCount(-1)}>--</button>

            <Alert message="我是独立的 TestAntd 组件" type="success" />
            <div>{value}</div>
        </div>
    }
}

// TestRouter/index.js
import React, {Component} from 'react';
import { Alert } from "antd";
import {observer, inject} from 'mobx-react'

@inject('appStore')
@observer
export default class TestRouter extends Component {
    render() {
        const {appStore} = this.props
        return <div>
            <div>count: {appStore.count}</div>
            <button onClick={() => appStore.updateCount(1)}>++</button>
            <button onClick={() => appStore.updateCount(-1)}>--</button>
            <Alert message="我是独立的 TestRouter 组件" type="info" />
        </div>
    }
}
```

跳转到 `/antd` 点击 `++` 或者 `--`, 后在跳转到 `/router`查看count是否和之前一样, 自行测试看效果

------

## 网络请求 (axios)

[GitHub](https://github.com/axios/axios) | [中文](https://www.kancloud.cn/yunye/axios/234845)

安装请求库并创建一些测试代码, 涉及到的代码有点多, 耐心看完

> 关于polyfill
> Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。
举例来说，ES6在Array对象上新增了Array.from方法。Babel就不会转码这个方法。如果想让这个方法运行，必须使用babel-polyfill，为当前环境提供一个垫片。

``` sh
npm i axios @babel/polyfill --save
cd src && mkdir bootstrap api common
touch bootstrap/index.js
touch bootstrap/http-interceptors.js
touch api/test.js
touch store/ui.js
```

``` js
// src/index.js 添加两行代码
import './bootstrap'
import "@babel/polyfill";
```

``` js
// api/test.js
/**
 * {loading: true} 用于监控全局请求个数, 处理过程在 http-interceptors.js 中
 */
import axios from 'axios'

export default {
    testGet(){
        return axios.get('/api/testGet', {loading: true})
    },
    testPost(params){
        return axios.post('/api/testPost', params, {loading: true})
    },
    testDelete(params){
        return axios.delete('/api/testDelete', {data: params})
    }
}
```

``` js
// bootstrap/index.js  render之前进行注入的一些代码, 例如请求拦截器
import './http-interceptors'
```

``` js
// bootstrap/http-interceptors.js 相关错误处理和业务逻辑自行补全
import axios from 'axios'
import {uiStore} from '../store'

axios.defaults.baseURL = "/"
// token 验证, 需要的话自行打开注释
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

// 添加请求拦截器
axios.interceptors.request.use(config => {
    console.log('%c request config', 'font-size:21pt;color:green', config)
    // 发送请求之前做的事情
    if(config.loading === true){
        uiStore.updateReqCount(+config.loading)
    }
    return config
}, error => {
    console.log('%c request error', 'font-size:21pt;color:red', error)
    // 对请求错误处理
    uiStore.updateReqCount(-1)
    return Promise.reject(error)
})

/**
 * 后端返回的数据格式
 * {
 *   code: 0,
 *   msg: '这是一条成功的消息, code为0, 其他code根据需求自定义',
 *   data: {...}
 * }
 */
// 添加响应拦截器
axios.interceptors.response.use(res => {
    console.log('%c response res', 'font-size:21pt;color:blue', res)
    // 对响应数据处理
    if(res && res.config && res.config.loading === true){
        uiStore.updateReqCount(-1)
    }
    const result = res.data
    if(result.hasOwnProperty('code') && result.code !== 0){
        // 根据需求自定义错误码, 统一处理
    }
    return result.data
}, error => {
    console.log('%c response error', 'font-size:21pt;color:red', error)
    // 对响应错误处理
    uiStore.updateReqCount(-1)
    return Promise.reject(error)
})

const handleError = (error) => {
    if(error instanceof Error){
        console.log('[ERROR]:', error)
    }
}
```

``` js
/**
  * store/ui.js
  * UI Store中常见存储的信息有：
  * Session 信息
  * 不会再后端存储的信息
  * 会全局影响UI的信息：
  *   Window尺寸
  *   提示消息
  *   当前语言
  *   当前主题
  * 更多可能存储的组件信息：
  *   当前选择
  *   工具条显示隐藏状态
  */

import {observable, action} from 'mobx'

export default class UiStore {
    // 表示在一时间段内请求的个数, 可用做全局 loading
    @observable reqCount = 0

    @action
    updateReqCount(num = 0){
        this.reqCount = this.reqCount + num
    }
}
```

Hello/testApi.js 创建测试请求的组件, 项目运行后, 分别点击 testGet, testPost, testDelete 查看 reqCount,变化

``` jsx
import React, {Component} from 'react';
import { Alert, Button } from "antd";
import {observer} from 'mobx-react'
import testApi from '../../api/test'
import {uiStore} from '../../store'
import './index.css'

@observer
export default class TestApi extends Component {

    async testGet(){
        const result = await testApi.testGet()
        console.log('TestApi testGet result:', result)
    }

    async testPost(){
        const result = await testApi.testPost({})
        console.log('TestApi testGet result:', result)
    }

    async testDelete(){
        const result = await testApi.testDelete({})
        console.log('TestApi testGet result:', result)
    }

    render() {
        return <div className="container">
            <div>
                <p>reqCount: {uiStore.reqCount}</p>
                <Button type="primary" onClick={() => this.testGet()}>testGet</Button>
                <Button onClick={() => this.testPost()}>testPost</Button>
                <Button onClick={() => this.testDelete()}>testDelete</Button>
            </div>
        </div>
    }
}
```

想要请求非本地的接口, 需要添加代理, 具体用法[点这里](https://webpack.docschina.org/configuration/dev-server/#devserver-proxy), 接下来修改 `webpack.dev.js`

``` js
// easy-mock.com 免费的造假数据的网站
const ProxyUrl = "https://easy-mock.com/mock/5b8c9f2fdcc57313cd5b6678"

module.exports = WebpackMerge(CommonConfig, {
    // ...
    devServer: {
        // ...
        proxy: {
            "/api/*": {
                target: ProxyUrl,
                changeOrigin: true,
                secure: false
            }
        }
    }
});
```

``` js
// store/index.js
import UiStore from './ui'
export const uiStore = new UiStore()
```

修改路由组件, 把刚才创建的 `testApi` 组件添加到路由里

``` jsx
// router/index.js
const TestApi = Loadable({
    loader: () => import('../component/Hello/TestApi'),
    loading: Loading
})

<li><Link to="/testapi">TestApi</Link></li>

<Route exact path="/testapi" component={TestApi}/>
```

------

## Page Not Found (404)

创建404页面

``` sh
mkdir src/component/NotFound
touch src/component/NotFound/index.js
```

``` jsx
// NotFount/index.js
import React, {PureComponent} from 'react'

export default class NotFound extends PureComponent {
    render(){
        return <div style={{color: 'red', fontSize: 88}}>404</div>
    }
}
```

修改路由组件, 把刚才创建的 `NotFount` 组件添加到路由最下方

``` jsx
// router/index.js
<Switch>
    // ...
    <Route component={NotFound}/>
</Switch>
```

------

## Less

``` sh
npm i mini-css-extract-plugin less less-loader --save-dev
```

[mini-css-extract-plugin](https://webpack.js.org/plugins/mini-css-extract-plugin/#minimizing-for-production) | [翻译](http://wangweilin.net/static/pages/npm_minicssextractplugin.html)

> mini-css-extract-plugin 插件用于将css提取到单独的文件。为每个包含css的JS文件创建一个css文件。支持css按需加载。

修改package中的scripts

``` json
{
  // ...
  "scripts": {
    "dev": "webpack-dev-server --config webpack.dev.js --color --progress",
    "build": "webpack --config webpack.prod.js --color --progress"
  }
  // ...
}
```

> 重新整理webpack配置文件

修改后的webpack.common.js
``` js
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

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
                    name: "vendors",
                    chunks: "all"
                }
            }
        }
    }
};
```

修改后的webpack.dev.js

``` js
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
```

修改后的webpack.prod.js

``` js
const WebpackMerge = require("webpack-merge");
const CommonConfig = require('./webpack.common');
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
```

------

## Scss

``` sh
# 因为sass-loader依赖于node-sass，所以需要先安装node-sass
npm i sass node-sass --save-dev
npm i sass-loader --save-dev
```

[sass-loader](https://github.com/webpack-contrib/sass-loader)

`webpack.dev.js` 中添加
``` js
{
    test: /\.s(a|c)ss$/,
    use: ["style-loader","css-loader","sass-loader"]
}
```
`webpack.prod.js` 中添加

``` js
{
    test: /\.s(a|c)ss$/,
    use: [MiniCssExtractPlugin.loader,"css-loader","sass-loader"]
}
```

## 整理项目目录

文章开头有详细的目录说明

``` sh
cd src
mkdir pages
cd common && touch utils.js contants.js
```

------

## i18n (react-intl) 推荐

[GitHub](https://github.com/yahoo/react-intl) | [语法指南](https://formatjs.io/guides/message-syntax/)

``` sh
npm i react-intl intl -save
// 创建相关文件
cd src && mkdir I18N && touch app.js
cd I18N && touch en_US.js zh_CN.js
```

> 为了兼容Safari各个版本，需要同时安装 intl，intl在大部分的『现代』浏览器中是默认自带的，但是Safari和IE11以下的版本就没有

``` js
//  src/app.js
import React, { Component } from "react";
import getRouter from "./router";
import { IntlProvider, addLocaleData } from "react-intl";
import { uiStore } from "./store";
import { observer } from "mobx-react";
import zh from 'react-intl/locale-data/zh'
import en from 'react-intl/locale-data/en'
addLocaleData([...en, ...zh])

@observer
export default class App extends Component {
    getLocale() {
        let result = {};
        switch (uiStore.language) {
            case "zh":
                result = require("./I18N/zh_CN");
                break;
            case "en":
                result = require("./I18N/en_US");
                break;
            default:
                result = require("./I18N/zh_CN");
        }
        return result.default || result;
    }

    render() {
        console.log('uiStore.language:', uiStore.language)
        const messages = this.getLocale()

        return (
            <IntlProvider locale={uiStore.language} messages={messages}>
                {getRouter()}
            </IntlProvider>
        );
    }
}
```

修改 `src/index.js`
![src-index.jpg](http://p395rsz0o.bkt.clouddn.com/src-index.jpg)

``` js
// src/I18N/zh_CN.js
export default {
    hello: '这是一段放在国际化文件中的中文.',
    withParams: '这是一段带有参数的国际化文案, { param }'
}

// src/I18N/en_US.js
export default {
    hello: 'This is a paragraph in English.',
    withParams: 'This is an international copy with parameters, {param}'
}
```

`store/ui.js` 中添加如下代码

``` js
@observable language = 'zh'

@action
updateLanguage(lang){
    this.language = lang
}
```

> 创建测试代码

``` js
// Hello/TestI18N.js 内容如下
import React, { Component } from "react";
import { FormattedMessage, FormattedDate, FormattedTime } from "react-intl";
import { uiStore } from "../../store";
import { Button } from "antd";

export default class TestI18N extends Component {
    render() {
        return (
            <div>
                <Button onClick={() => uiStore.updateLanguage('en')}>to en</Button>
                <Button onClick={() => uiStore.updateLanguage('zh')}>to zh</Button>
                <div>
                    <FormattedMessage id="hello" />
                </div>
                <div>
                    <FormattedMessage
                        id="withParams"
                        values={{ param: "[我是param]" }}
                    />
                </div>
                <div>
                    <FormattedDate value={Date.now()}/>
                </div>
                <div>
                    <FormattedTime value={Date.now()}/>
                </div>
            </div>
        );
    }
}
```

`router/index.js` 中添加如下代码

``` js
const TestI18N = Loadable({
    loader: () => import('../component/Hello/TestI18N'),
    loading: Loading
})

<li><Link to="/i18n">i18n</Link></li>

<Route exact path="/i18n" component={TestI18N}/>
```

进入页面自行查看效果

------

## i18n (i18n-js)

``` sh
npm i i18n-js lscache --save
// 创建相关文件
cd src && mkdir I18N
cd I18N && touch index.js en_US.js zh_CN.js
```

> lscache: localstorage封装的库, 用于本地存储, 使用文档[点这里](https://github.com/pamelafox/lscache)
> i18n-js: [GitHub]()

首先在 `common/instants.js` 中添加

``` js
export const LOCAL_LANGUAGE = 'local_language'
```

把 `I18N` 目录中的文件补全代码

``` js
// index.js
import lscache from 'lscache'
import {LOCAL_LANGUAGE} from '../common/constants'
import I18N from 'i18n-js'
import en_US from './en_US'
import zh_CN from './zh_CN'

I18N.fallbacks = true
I18N.translations = {
    en_US,
    zh_CN
}
I18N.defaultLocale = 'zh_CN'
/**
 * 存放在 localstorage 中, 默认 'zh_CN'
 * 设置是只需要 lscache.set(LOCAL_LANGUAGE, 'en_US'), 并刷新页面
 */
const local = lscache.get(LOCAL_LANGUAGE)
I18N.locale = local ? local : 'zh_CN'

export default I18N

// en_US.js
export default {
    hello: 'This is a paragraph in English.',
    withParams: 'This is an international copy with parameters, {{param}}'
}

// zh_CN.js
export default {
    hello: '这是一段放在国际化文件中的中文.',
    withParams: '这是一段带有参数的国际化文案, {{param}}'
}
```

注入 `I18N`, 在 `bootstrap/index.js` 中添加

``` js
import i18n from '../I18N'

window.i18n = global.i18n = i18n
```

改造 `Hello/index.js` 用于测试

``` js
import React, {Component} from 'react';
import { Alert, Button } from "antd";
import lscache from 'lscache'
import {LOCAL_LANGUAGE} from '../../common/constants'

export default class Hello extends Component {
    render() {
        return <div>
            我是独立的 Hello 组件
            <div>{i18n.t('hello')}</div>
            <Alert message={i18n.t('withParams', {param: '--这个是参数--'})} type="success" />
            <Button onClick={() => lscache.set(LOCAL_LANGUAGE, 'en_US')}>en_US</Button>
            <div>
                <div>6kb</div>
                <img src={require('../../assets/images/antd6kb.png')} />
                <div>10kb</div>
                <img src={require('../../assets/images/antd10kb.png')} />
            </div>
        </div>
    }
}
```

> 相关代码 branch: i18n-v1

------

<details>
<summary>what</summary>
performance: { hints: false }
</details>