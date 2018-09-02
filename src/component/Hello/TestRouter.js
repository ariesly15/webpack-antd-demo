import React, {Component} from 'react';
import { Alert } from "antd";

export default class TestRouter extends Component {
    render() {
        return <div>
            <Alert message="我是独立的 TestRouter 组件" type="info" />
        </div>
    }
}