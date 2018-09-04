/*
 * @Author: aweleey.li@qunar.com 
 * @Date: 2018-09-03 11:22:35 
 * @Last Modified by: aweleey.li@qunar.com
 * @Last Modified time: 2018-09-04 11:00:26
 */

import React, {Component} from 'react';
import { Alert, Button } from "antd";
import {observer, inject} from 'mobx-react'
import testApi from '../../api/test'
import {uiStore} from '../../store'
import './TestApi.scss'

@observer
export default class TestApi extends Component {

    async testGet(){
        const result = await testApi.testGet()
        console.log('TestApi testGet result:', result)
    }

    async testPost(){
        const result = await testApi.testPost({})
        console.log('TestApi testGet result:', result)
    }

    async testDelete(){
        const result = await testApi.testDelete({})
        console.log('TestApi testGet result:', result)
    }

    render() {
        return <div className="container">
            <div>
                <p className="count">reqCount: {uiStore.reqCount}</p>
                <Button type="primary" onClick={() => this.testGet()}>testGet</Button>
                <Button onClick={() => this.testPost()}>testPost</Button>
                <Button onClick={() => this.testDelete()}>testDelete</Button>
            </div>
        </div>
    }
}