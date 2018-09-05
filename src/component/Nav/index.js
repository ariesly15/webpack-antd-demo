/*
 * @Author: aweleey.li@qunar.com 
 * @Date: 2018-09-04 19:14:29 
 * @Last Modified by: aweleey.li@qunar.com
 * @Last Modified time: 2018-09-05 10:51:52
 */

import React, {Component} from 'react'
import {Link, NavLink} from 'react-router-dom'
import {Button, Icon, Menu} from 'antd'
import {NAVIGATOR_DATA} from '../../common/constants'
import {appStore} from '../../store'
import {observer} from 'mobx-react'
import './index.less'

const SubMenu = Menu.SubMenu

const submenu = (item, index) => {
    if (item.hasOwnProperty('children')) {
        const subMenuKey = `${item.key}-${index}`
        return <SubMenu
            key={subMenuKey}
            title={<span>{item.icon && <Icon type={item.icon}/>}<span>{item.name}</span></span>}
        >
            {item.children.map(item => {
                if (item.hasOwnProperty('children') && Array.isArray(item.children)) {
                    return submenu(item)
                } else {
                    return <Menu.Item key={item.link}>
                        <NavLink to={item.link} activeClassName="active">{item.icon &&
                        <Icon type={item.icon}/>}{item.name}</NavLink>
                    </Menu.Item>
                }
            })}
        </SubMenu>
    } else {
        return <Menu.Item key={item.link}>
            <NavLink to={item.link} activeClassName="active">
                {item.icon && <Icon type={item.icon}/>}
                {item.name}
            </NavLink>
        </Menu.Item>
    }
}

@observer
export default class Nav extends Component {
    static defaultProps = {
        mode: 'horizontal'
    }

    render() {
        const {mode, style, location, ...rest} = this.props

        return <Menu
            {...rest}
            mode={mode}
            style={style}
            // subMenuCloseDelay={300}
            // defaultSelectedKeys={[location.pathname || '/']}
        >
            {NAVIGATOR_DATA.map(submenu)}
        </Menu>
    }
}