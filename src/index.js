/*
 * @Author: aweleey.li@qunar.com 
 * @Date: 2018-09-02 17:27:08 
 * @Last Modified by: aweleey.li@qunar.com
 * @Last Modified time: 2018-09-02 23:56:56
 */

import React from 'react'
import {render} from 'react-dom'
import getRouter from './router'
import * as stores from './store'
import {Provider} from 'mobx-react'

render(<Provider {...stores}>
    {getRouter()}
</Provider>,document.getElementById('app'))