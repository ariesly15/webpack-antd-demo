/*
 * @Author: aweleey.li@qunar.com 
 * @Date: 2018-09-04 19:14:29 
 * @Last Modified by: aweleey.li@qunar.com
 * @Last Modified time: 2018-09-04 20:22:32
 */

import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'antd'
import {appStore} from '../../store'
import {observer} from 'mobx-react'
import './index.less'

@observer
export default class Nav extends Component {
    render(){
        return <div className="nav-container">
            <ul>
                <li><Link to="/">首页</Link></li>
                <li><Link to="/app">AppLayout</Link></li>
                <li><Link to="/login">login</Link></li>
                <li><Link to="/app/router">TestRouter</Link></li>
                <li><Link to="/app/antd">TestAntd</Link></li>
                <li><Link to="/app/testapi">TestApi</Link></li>
                <li><Link to="/app/i18n">i18n</Link></li>
            </ul>
            <Button onClick={() => appStore.updateHasLogin(!appStore.hasLogin)}>{`Login: ${appStore.hasLogin}`}</Button>
        </div>
    }
}