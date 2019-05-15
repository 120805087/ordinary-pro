import React from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import { Checkbox, Icon, Alert, Modal } from 'antd';
import Login  from '@/components/login';

import styles from './index.less';

const { UserName, Password, Mobile, Captcha, Tab, Submit } = Login;

@connect(({ login, loading }) => ({
    login,
    submitting: loading.effects['login/login']
}))
export default class LoginPage extends React.Component {

    state = {
        type: 'account',
        autoLogin: true
    }

    onChangeTab = activeKey => {
        this.setState({
            type: activeKey
        })
    }

    // 获取验证码
    onGetCaptcha = () => {
        return new Promise((resolve, reject) => {
            this.loginForm.validateFields(['mobile'], {}, (err, value) => {
                if(err) {
                    reject(err);
                } else {
                    const { dispatch } = this.props;
                    dispatch({
                        type: 'login/getCaptcha',
                        payload: value.mobile
                    })
                    .then(resolve)
                    .catch(reject)

                    Modal.info({
                        title: '此项目为演示项目，并不会真的给您发送验证码。请切换到账户密码登录界面按提示登录。'
                    })
                }
            })
        })
    }

    handleSubmit = (err, values) => {
        const { type } = this.state;
        if(!err) {
            const { dispatch } = this.props;
            dispatch({
                type: 'login/login',
                payload: {
                    ...values,
                    type
                }
            })
        }
    }

    changeAutoLogin = e => {
        this.setState({
            autoLogin: e.target.checked
        })
    }

    renderMessage = (content) => (
        <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
    )

    render() {
        const { login, submitting } = this.props;
        const { type, autoLogin } = this.state;
        return (
            <div className={styles.main}>
                <Login
                    defaultActiveKey={type}
                    onSubmit={this.handleSubmit}
                    onChangeTab={this.onChangeTab}
                    ref={form => {
                        this.loginForm = form;
                    }}
                >
                    <Tab key="account" tab="账户密码登陆">
                        {login.status === 'error' && login.type === 'account' && !submitting && this.renderMessage('账户或者密码错误（admin/admin123）')}
                        <UserName
                            name="userName"
                            placeholder="用户名: amdin"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名'
                                }
                            ]}
                        />
                        <Password
                            name="password"
                            placeholder="密码: admin123"
                            autoComplete="off"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码'
                                }
                            ]}
                            onPressEnter={e => {
                                e.preventDefault();
                                this.loginForm.validateFields(this.handleSubmit);
                            }}
                        />
                    </Tab>
                    <Tab key="mobile" tab="手机号登陆">
                        {login.status === 'error' && login.type === 'mobile' && !submitting && this.renderMessage('验证码错误')}
                        <Mobile
                            name="mobile"
                            placeholder="手机号"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入手机号！'
                                },
                                {
                                    pattern: /^1\d{10}$/,
                                    message: '手机号格式错误！'
                                }
                            ]}
                        />
                        <Captcha
                            name="captcha"
                            placeholder="验证码"
                            countDown={120}
                            onGetCaptcha={this.onGetCaptcha}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入验证码！'
                                }
                            ]}
                        />
                    </Tab>
                    <div>
                        <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
                            自动登陆
                        </Checkbox>
                        <a href="" style={{ float: 'right' }}>
                            忘记密码
                        </a>
                    </div>
                    <Submit loading={submitting}>
                        登陆
                    </Submit>
                    <div className={styles.other}>
                        其他登陆方式：
                        <Icon type="github" className={styles.icon} />
                        <Link className={styles.register} to="/user/register">
                            注册账号
                        </Link>
                    </div>
                </Login>
            </div>
        )
    }
}
