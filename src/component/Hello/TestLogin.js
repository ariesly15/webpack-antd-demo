/*
 * @Author: aweleey.li@qunar.com 
 * @Date: 2018-09-05 14:36:00 
 * @Last Modified by: aweleey.li@qunar.com
 * @Last Modified time: 2018-09-05 14:42:01
 */

import React, { Component } from "react";
import { appStore } from "../../store";
import { observer } from "mobx-react";
import { Link } from 'react-router-dom'
import { Divider } from 'antd'

@observer
export default class TestLogin extends Component {
    render() {
        return (
            <div style={{ textAlign: "center", background: "#fff" }}>
                <a onClick={() => appStore.updateHasLogin(!appStore.hasLogin)}>
                    {`更改登录状态(hasLogin: ${appStore.hasLogin})`}
                </a>
                <Divider type="vertical" />
                <Link to="/app/i18n">/app/i18n</Link>
                <Divider type="vertical" />
                <Link to="/app/antd">/app/antd</Link>
            </div>
        );
    }
}
