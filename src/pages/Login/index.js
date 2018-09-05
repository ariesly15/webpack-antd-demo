/**
 * Created by aweleey on 2018/2/8.
 */

import React, {Component} from 'react';
import {Button, Checkbox, Form, Icon, Input, Divider} from 'antd';
import {observer} from 'mobx-react';
import { appStore } from "../../store";
import {Link} from 'react-router-dom';
import './index.less';
import TestLogin from '../../component/Hello/TestLogin'

const FormItem = Form.Item

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
            <TestLogin/>
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
                                    rules: [{required: true, message: 'login.accountNotNullMsg'}],
                                })(<Input placeholder="Account"/>)}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator(
                                    'password',
                                    {rules: [{required: true, message: 'login.passwordNotNullMsg'}]})(
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