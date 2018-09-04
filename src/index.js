/*
 * @Author: aweleey.li@qunar.com 
 * @Date: 2018-09-02 17:27:08 
 * @Last Modified by: aweleey.li@qunar.com
 * @Last Modified time: 2018-09-04 15:36:29
 */

import React from 'react'
import {render} from 'react-dom'
import * as stores from './store'
import {Provider} from 'mobx-react'
import './bootstrap'
import "@babel/polyfill";
import App from './app'

render(<Provider {...stores}>
    <App/>
</Provider>,document.getElementById('app'))