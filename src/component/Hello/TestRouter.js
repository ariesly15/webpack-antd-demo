/*
 * @Author: aweleey.li@qunar.com 
 * @Date: 2018-09-02 17:13:18 
 * @Last Modified by:   aweleey.li@qunar.com 
 * @Last Modified time: 2018-09-02 17:13:18 
 */

import React, {Component} from 'react';
import { Alert } from "antd";

export default class TestRouter extends Component {
    render() {
        return <div>
            <Alert message="我是独立的 TestRouter 组件" type="info" />
        </div>
    }
}