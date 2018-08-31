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
        </div>
    }
}