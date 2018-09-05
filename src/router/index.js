/*
 * @Author: aweleey.li@qunar.com 
 * @Date: 2018-09-02 12:33:09 
 * @Last Modified by: aweleey.li@qunar.com
 * @Last Modified time: 2018-09-04 20:17:45
 */

import React from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'

import Loadable from 'react-loadable'
import Loading from '../component/Loading'
import AppLayout from '../component/Layout/AppLayout'
import Home from '../pages/Home'
import Hello from '../component/Hello'
import NotFound from '../component/NotFound'
import PrivateRoute from '../component/PrivateRoute'
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
const TestI18N = Loadable({
    loader: () => import('../component/Hello/TestI18N'),
    loading: Loading
})
const Login = Loadable({
    loader: () => import('../pages/Login'),
    loading: Loading
})

const getRouter = () => <Router>
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login}/>
        <PrivateRoute path="/app" component={AppLayout}/>
        
        <Route exact path="/antd" component={TestAntd}/>
        <Route exact path="/router" component={TestRouter}/>
        <Route exact path="/testapi" component={TestApi}/>
        <Route exact path="/i18n" component={TestI18N}/>
        <Route component={NotFound}/>
    </Switch>
</Router>

export default getRouter