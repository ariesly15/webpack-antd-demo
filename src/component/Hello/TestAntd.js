/*
 * @Author: aweleey.li@qunar.com 
 * @Date: 2018-09-02 17:12:55 
 * @Last Modified by:   aweleey.li@qunar.com 
 * @Last Modified time: 2018-09-02 17:12:55 
 */

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