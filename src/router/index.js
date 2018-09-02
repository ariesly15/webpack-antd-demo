/*
 * @Author: aweleey.li@qunar.com 
 * @Date: 2018-09-02 12:33:09 
 * @Last Modified by: aweleey.li@qunar.com
 * @Last Modified time: 2018-09-02 13:42:02
 */

import React from 'react'
import {HashRouter as Router, Route, Switch, Link} from 'react-router-dom'

import Hello from '../component/Hello'
import TestAntd from '../component/Hello/TestAntd'
import TestRouter from '../component/Hello/TestRouter'

const getRouter = () => <Router>
    <div>
        <ul>
            <li><Link to="/">首页</Link></li>
            <li><Link to="/router">TestRouter</Link></li>
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