/*
 * @Author: aweleey.li@qunar.com 
 * @Date: 2018-09-02 12:33:09 
 * @Last Modified by: aweleey.li@qunar.com
 * @Last Modified time: 2018-09-03 11:39:51
 */

import React from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'

import Loadable from 'react-loadable'
import Loading from '../component/Loading'
import Hello from '../component/Hello'
const TestAntd = Loadable({
    loader: () => import('../component/Hello/TestAntd'),
    loading: Loading
})
const TestRouter = Loadable({
    loader: () => import('../component/Hello/TestRouter'),
    loading: Loading
})
const TestApi = Loadable({
    loader: () => import('../component/Hello/TestApi'),
    loading: Loading
})

const getRouter = () => <Router>
    <div>
        <ul>
            <li><Link to="/">首页</Link></li>
            <li><Link to="/router">TestRouter</Link></li>
            <li><Link to="/antd">TestAntd</Link></li>
            <li><Link to="/testapi">TestApi</Link></li>
        </ul>
        <Switch>
            <Route exact path="/" component={Hello} />
            <Route exact path="/antd" component={TestAntd}/>
            <Route exact path="/router" component={TestRouter}/>
            <Route exact path="/testapi" component={TestApi}/>
        </Switch>
    </div>
</Router>

export default getRouter