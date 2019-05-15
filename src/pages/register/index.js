import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
import { Form, Input, Select, Row, Col, Button, Modal, Popover, Progress } from 'antd';

import styles from './index.less';

const { Option } = Select;

const passwordStatusMap = {
    ok: (
        <div className={styles.success}>强度：强</div>
    ),
    pass: (
        <div className={styles.warning}>强度：中</div>
    ),
    poor: (
        <div className={styles.error}>强度：太短</div>
    )
};

const passwordProgressMap = {
    ok: 'success',
    pass: 'normal',
    poor: 'exception',
};

@connect(({ register, loading }) => ({
    register,
    submitting: loading.effects['register/submit']
}))
@Form.create()
export default class Register extends Component {

    state = {
        count: 0,
        help: '',
        visible: false,
        confirmDirty: false
    }

    componentDidUpdate() {
        const { form, register } = this.props;
        if(register.status === 'ok') {
            const email = form.getFieldValue('email');
            router.push({
                pathname: '/user/register-result',
                state: {
                    email
                }
            })
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    // 倒计时
    onGetCaptcha = () => {
        let count = 59;
        this.setState({ count });
        this.interval = setInterval(() => {
            count -= 1;
            this.setState({ count });
            if(count === 0) {
                clearInterval(this.interval);
            }
        }, 1000)

        Modal.info({
            title: '此项目为演示项目，并不会真的给您发送验证码。请切换到账户密码登录界面按提示登录。'
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        const { form: { validateFields }, dispatch } = this.props;
        validateFields((err, values) => {
            if(!err) {
                dispatch({
                    type: 'register/submit',
                    payload: {
                        ...values
                    }
                })
            }
        })
    }

    getPasswordStatus = () => {
        const { form } = this.props;
        const value = form.getFieldValue('password');
        if (value && value.length > 9) {
            return 'ok';
        }
        if (value && value.length > 5) {
            return 'pass';
        }
        return 'poor';
    }

    renderPasswordProgress = () => {
        const { form } = this.props;
        const value = form.getFieldValue('password');
        const passwordStatus = this.getPasswordStatus();
        return value && value.length ? (
            <div className={styles[`progress-${passwordStatus}`]}>
                <Progress
                    status={passwordProgressMap[passwordStatus]}
                    className={styles.progress}
                    strokeWidth={6}
                    percent={value.length * 10 > 100 ? 100 : value.length * 10}
                    showInfo={false}
                />
            </div>
        ) : null;
    }

    checkConfirm = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入的密码不匹配！')
        } else {
            callback();
        }
    }

    checkPassword = (rule, value, callback) => {
        const { visible, confirmDirty } = this.state;
        if (!value) {
            this.setState({
                help: '请输入密码',
                visible: !!value
            })
            callback('error')
        } else {
            this.setState({
                help: ''
            });
            if (!visible) {
                this.setState({
                    visible: !!value
                })
            }
            if (value.length < 6) {
                callback('error')
            } else {
                const { form: { validateFields } } = this.props;
                if (value && confirmDirty) {
                    validateFields(['confirm'], { force: true })
                }
            }
            callback();
        }
    }

    render() {
        const { count, help, visible } = this.state;
        const {
            form: { getFieldDecorator },
            submitting
        } = this.props;

        const prefixSelector = getFieldDecorator('prefix', {
                initialValue: '86',
            })(
            <Select style={{ width: 70 }}>
              <Option value="86">+86</Option>
              <Option value="87">+87</Option>
            </Select>,
        );

        return (
            <div className={styles.main}>
                <h3>注册</h3>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item>
                        {getFieldDecorator('email', {
                            rules: [
                            {
                                type: 'email',
                                message: '请输入正确的邮箱格式',
                            },
                            {
                                required: true,
                                message: '请输入邮箱！',
                            },
                            ],
                        })(<Input placeholder="邮箱" size="large" />)}
                    </Form.Item>
                    <Form.Item help={help}>
                        <Popover
                            getPopupContainer={node => node.parentNode}
                            content={
                                <div style={{ padding: '4px 0' }}>
                                    {passwordStatusMap[this.getPasswordStatus()]}
                                    {this.renderPasswordProgress()}
                                    <div style={{ marginTop: 10 }}>
                                        请至少输入 6 个字符。请不要使用容易被猜到的密码。
                                    </div>
                                </div>
                            }
                            placement="right"
                            overlayStyle={{width: 240}}
                            visible={visible}
                        >
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        validator: this.checkPassword,
                                    },
                                ],
                            })(<Input.Password size="large" autoComplete="off" placeholder="至少6位密码，区分大小写" />)}
                        </Popover>
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('confirm', {
                            rules: [
                                {
                                    required: true,
                                    message: '请再次输入密码！',
                                },
                                {
                                    validator: this.checkConfirm,
                                },
                            ],
                        })(<Input.Password size="large" autoComplete="off" placeholder="确认密码" />)}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, message: '请输入手机号！' }],
                        })(<Input size="large" addonBefore={prefixSelector} style={{ width: '100%' }} placeholder="手机号" />)}
                    </Form.Item>
                    <Form.Item>
                        <Row gutter={8}>
                            <Col span={16}>
                                {getFieldDecorator('captcha', {
                                    rules: [{ required: true, message: '请输入验证码！' }],
                                })(<Input size="large" placeholder="验证码" />)}
                            </Col>
                            <Col span={8}>
                                <Button
                                    className={styles.captcha}
                                    size="large"
                                    disabled={count}
                                    onClick={this.onGetCaptcha}
                                >
                                    {count ? `${count} 秒`: '获取验证码'}
                                </Button>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item className={styles.register}>
                        <Button loading={submitting} size="large" type="primary" htmlType="submit">
                            注册
                        </Button>
                        <Link to="/user/login">
                            使用以有账户登陆
                        </Link>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
