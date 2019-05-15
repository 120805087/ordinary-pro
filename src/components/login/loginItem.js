import React, { Component } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import omit from 'lodash/omit';
import ItemMap from './map';
import LoginContext from './loginContext';

import styles from './index.less';

const FormItem = Form.Item;

class WrapFormItem extends Component {

    static defaultProps = {
        getCaptchaButtonText: '获取验证码',
        getCaptchaSecondText: '秒'
    }

    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    componentDidMount() {
        const { updateActive, name } = this.props;
        if (updateActive) {
            updateActive(name)
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onGetCaptcha = () => {
        const { onGetCaptcha } = this.props;
        const result = onGetCaptcha ? onGetCaptcha() : null;
        if (!result) {
            return;
        }
        if (result instanceof Promise) {
            result.then(this.runGetCaptchaCountDown);
        } else {
            this.runGetCaptchaCountDown();
        }
    }

    // 倒计时
    runGetCaptchaCountDown = () => {
        const { countDown } = this.props;
        let count = countDown || 59;
        this.setState({ count });
        this.interval = setInterval(() => {
            count -= 1;
            this.setState({ count });
            if (count === 0) {
                clearInterval(this.interval);
            }
        }, 1000)
    }

    render() {
        const { count } = this.state;
        const {
            name,
            rules,
            customprops,
            type,
            getCaptchaButtonText,
            getCaptchaSecondText,
            form: { getFieldDecorator },
            updateActive,  // 取出 updateActive方法， 不传入 input
            ...resetProps
        } = this.props;

        const otherProps = resetProps || {};

        if(type === 'Captcha') {
            const inputProps = omit(otherProps, ['onGetCaptcha', 'countDown']);
            return (
                <FormItem>
                    <Row gutter={8}>
                        <Col span={16}>
                            {getFieldDecorator(name, { rules })(<Input {...customprops} {...inputProps} />)}
                        </Col>
                        <Col span={8}>
                            <Button
                                disabled={count}
                                className={styles.getCaptcha}
                                size="large"
                                onClick={this.onGetCaptcha}
                            >
                                {count ? `${count} ${getCaptchaSecondText}`: getCaptchaButtonText}
                            </Button>
                        </Col>
                    </Row>
                </FormItem>
            )
        }

        return (
            <FormItem>
                { getFieldDecorator(name, { rules })(<Input {...customprops} {...otherProps} />) }
            </FormItem>
        )
    }
}

const LoginItem = {};
Object.keys(ItemMap).forEach(key => {
    const item = ItemMap[key];
    LoginItem[key] = props => (
        <LoginContext.Consumer>
            {context => (
                <WrapFormItem
                    customprops={item.props}
                    rules={item.rules}
                    type={key}
                    {...props}
                    form={context.form}
                    updateActive={context.updateActive}
                />
            )}
        </LoginContext.Consumer>
    )
})

export default LoginItem;
