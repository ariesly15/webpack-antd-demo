/*
 * @Author: aweleey.li@qunar.com 
 * @Date: 2018-09-02 17:13:09 
 * @Last Modified by:   aweleey.li@qunar.com 
 * @Last Modified time: 2018-09-02 17:13:09 
 */

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
            <div>
                <div>6kb</div>
                <img src={require('../../assets/images/antd6kb.png')} />
                <div>10kb</div>
                <img src={require('../../assets/images/antd10kb.png')} />
            </div>
        </div>
    }
}