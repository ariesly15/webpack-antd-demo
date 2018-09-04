/*
 * @Author: aweleey.li@qunar.com 
 * @Date: 2018-09-02 17:12:55 
 * @Last Modified by: aweleey.li@qunar.com
 * @Last Modified time: 2018-09-03 18:05:33
 */

import React, {Component} from 'react';
import { Alert } from "antd";
import {observer, inject} from 'mobx-react'
import './TestAntd.less'

@inject('appStore')
@observer
export default class TestAntd extends Component {

    static defaultProps = {
        value: 'test static'
    }

    render() {
        const {value, appStore} = this.props

        return <div className="container">
            <div className="count">count: {appStore.count}</div>
            <button onClick={() => appStore.updateCount(1)}>++</button>
            <button onClick={() => appStore.updateCount(-1)}>--</button>

            <Alert message="我是独立的 TestAntd 组件" type="success" />
            <div>{value}</div>
        </div>
    }
}