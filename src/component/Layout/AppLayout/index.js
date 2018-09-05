/*
 * @Author: aweleey.li@qunar.com 
 * @Date: 2018-09-04 19:28:43 
 * @Last Modified by: aweleey.li@qunar.com
 * @Last Modified time: 2018-09-04 19:52:47
 */

import React, {Component} from 'react'
import {Route, Switch, Link} from 'react-router-dom'
import Loadable from 'react-loadable'
import Loading from '../../Loading'
import Nav from '../../Nav'
import './index.less'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const TestAntd = Loadable({
    loader: () => import('../../Hello/TestAntd'),
    loading: Loading
})
const TestRouter = Loadable({
    loader: () => import('../../Hello/TestRouter'),
    loading: Loading
})
const TestApi = Loadable({
    loader: () => import('../../Hello/TestApi'),
    loading: Loading
})
const TestI18N = Loadable({
    loader: () => import('../../Hello/TestI18N'),
    loading: Loading
})

export default class AppLayout extends Component {
    render(){
        return <Layout>
        <Nav/>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
                <Menu.Item key="1">option1</Menu.Item>
                <Menu.Item key="2">option2</Menu.Item>
                <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              
        <Route exact path="/app/antd" component={TestAntd}/>
        <Route exact path="/app/router" component={TestRouter}/>
        <Route exact path="/app/testapi" component={TestApi}/>
        <Route exact path="/app/i18n" component={TestI18N}/>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    }
}