# 搭建React框架教程

## 说明

1.本教程基于mac环境

2.每个命令行块都是以根目录为基础的。例如下面命令行块，都是基于根目录的。

```  sh
cd src/pages
mkdir Home
```

3.所用的库的版本(目前2018-09)是最新的
webpack-antd-demo
├── antd@3.8.4
├── react@16.4.2
├── react-dom@16.4.2
└── webpack@4.17.1

4.目录说明
webpack-antd-demo
├── src
│   ├── bootstrap
│   │   └── index.js
│   ├── common
│   │   ├── constants.js
│   │   └── utils.js
│   ├── component   # 组件库, 如自定义的Header和Footer
│   │   ├── Header
│   │   └── Footer
│   ├── page
│   └── stores
├── webpack.config.js

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

[地址](https://reacttraining.com/react-router/) - [中文](https://react-router.docschina.org/)

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

[GitHub](https://github.com/webpack/webpack-dev-server) - [中文文档](https://webpack.docschina.org/configuration/dev-server/)

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
