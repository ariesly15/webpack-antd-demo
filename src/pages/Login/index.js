/**
 * Created by aweleey on 2018/2/8.
 */

import React, {Component} from 'react';
import {Button, Checkbox, Form, Icon, Input} from 'antd';
import {observer} from 'mobx-react';
import {Link} from 'react-router-dom';
import {appStore} from '../../store'
import './index.less';

const FormItem = Form.Item
const i18n = {
    t: value => value
}

@observer
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }

        this._submit = this._submit.bind(this)
    }

    componentDidMount() {
    }

    _submit(e) {
        e.preventDefault();
        this.props.form.validateFields({force: true}, (err, values) => {
                if (!err) {
                    console.log("values:", values)
                }
            }
        )
    }

    render() {
        const {form, location, history, ...rest} = this.props
        const {getFieldDecorator} = form;
        const pathToGo = location.state ? location.state.from.pathname : '/app'
        
        return <div className='login-container'>
            <Button onClick={() => {
                appStore.updateHasLogin(true)
                history.push(pathToGo)
            }}>{`登录(hasLogin:${appStore.hasLogin})`}}</Button>
            <div className="login-main">
                <div className="login-bg">
                    <div className='login-content'>
                        <div className="content-header">
                            <div className="header-left">
                                <div className="title">Title</div>
                                <div className="desc">Description</div>
                            </div>
                            <div className="header-right">
                                <div className="link">
                                    <Link to="/">
                                        <span className="homeText">Back</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <Form onSubmit={this._submit} className="content-form">
                            <FormItem>
                                {getFieldDecorator('account', {
                                    rules: [{required: true, message: i18n.t('login.accountNotNullMsg')}],
                                })(<Input placeholder="Account"/>)}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator(
                                    'password',
                                    {rules: [{required: true, message: i18n.t('login.passwordNotNullMsg')}]})(
                                    <Input placeholder="Password" type="password"/>
                                )}
                            </FormItem>
                            <FormItem>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Login
                                </Button>
                            </FormItem>
                        </Form>
                    </div>
                </div>
            </div>

            <div className="login-footer">
                abc
            </div>
        </div>
    }
}

const LoginForm = Form.create()(Login)

export default LoginForm