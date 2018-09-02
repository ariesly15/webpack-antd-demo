/*
 * @Author: aweleey.li@qunar.com 
 * @Date: 2018-09-02 17:13:18 
 * @Last Modified by: aweleey.li@qunar.com
 * @Last Modified time: 2018-09-03 00:08:38
 */

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