/*
 * @Author: aweleey.li@qunar.com 
 * @Date: 2018-09-02 12:33:09 
 * @Last Modified by: aweleey.li@qunar.com
 * @Last Modified time: 2018-09-05 14:48:15
 */

import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Loadable from 'react-loadable'
import PrivateRoute from '../component/PrivateRoute'
import AppLayout from '../component/Layout/AppLayout'
import Home from '../pages/Home'
import NotFound from '../component/NotFound'
import Loading from '../component/Loading'
const Login = Loadable({
    loader: () => import('../pages/Login'),
    loading: Loading
})

const getRouter = () => <Router>
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login}/>
        <PrivateRoute path="/app" component={AppLayout}/>
        <Route component={NotFound}/>
    </Switch>
</Router>

export default getRouter