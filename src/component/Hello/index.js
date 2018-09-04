/*
 * @Author: aweleey.li@qunar.com 
 * @Date: 2018-09-02 17:13:09 
 * @Last Modified by: aweleey.li@qunar.com
 * @Last Modified time: 2018-09-04 14:48:45
 */

import React, {Component} from 'react';
import { Alert, Button } from "antd";
import lscache from 'lscache'
import {LOCAL_LANGUAGE} from '../../common/constants'

export default class Hello extends Component {
    render() {
        return <div>
            我是独立的 Hello 组件
            <div>{i18n.t('hello')}</div>
            <Alert message={i18n.t('withParams', {param: '--这个是参数--'})} type="success" />
            <Button onClick={() => lscache.set(LOCAL_LANGUAGE, 'en_US')}>en_US</Button>
            <div>
                <div>6kb</div>
                <img src={require('../../assets/images/antd6kb.png')} />
                <div>10kb</div>
                <img src={require('../../assets/images/antd10kb.png')} />
            </div>
        </div>
    }
}