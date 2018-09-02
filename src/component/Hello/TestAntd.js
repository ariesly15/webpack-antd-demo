import React, {Component} from 'react';
import { Alert } from "antd";

export default class TestAntd extends Component {
    render() {
        return <div>
            <Alert message="我是独立的 TestAntd 组件" type="success" />
        </div>
    }
}