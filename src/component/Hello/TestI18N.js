/*
 * @Author: aweleey.li@qunar.com 
 * @Date: 2018-09-04 16:04:26 
 * @Last Modified by: aweleey.li@qunar.com
 * @Last Modified time: 2018-09-04 16:33:50
 */

import React, { Component } from "react";
import { FormattedMessage, FormattedDate, FormattedTime } from "react-intl";
import { uiStore } from "../../store";
import { Button } from "antd";

export default class TestI18N extends Component {
    render() {
        return (
            <div>
                <Button onClick={() => uiStore.updateLanguage('en')}>to en</Button>
                <Button onClick={() => uiStore.updateLanguage('zh')}>to zh</Button>
                <div>
                    <FormattedMessage id="hello" />
                </div>
                <div>
                    <FormattedMessage
                        id="withParams"
                        values={{ param: "[我是param]" }}
                    />
                </div>
                <div>
                    <FormattedDate value={Date.now()}/>
                </div>
                <div>
                    <FormattedTime value={Date.now()}/>
                </div>
            </div>
        );
    }
}
