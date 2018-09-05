/*
 * @Author: aweleey.li@qunar.com 
 * @Date: 2018-09-04 20:12:35 
 * @Last Modified by: aweleey.li@qunar.com
 * @Last Modified time: 2018-09-04 20:21:35
 */

import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {observer} from 'mobx-react'
import {appStore} from '../../store'

@observer
export default class PrivateRoute extends Component {
    render(){
        const {component: Component, ...rest} = this.props
        return <Route
            {...rest}
            render={props =>
                appStore.hasLogin ? <Component {...props} /> : <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}
                />
            }
        />
    }
}