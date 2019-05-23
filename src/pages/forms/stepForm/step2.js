import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Alert, Divider } from 'antd';
import router from 'umi/router';
import { digitUppercase } from '@/utils/util';

import styles from './index.less';

@connect(({ form, loading }) => ({
    data: form.step,
    submitting: loading.effects['form/submitStepForm']
}))
@Form.create()
export default class Step2 extends PureComponent {
    render() {

        const {
            data,
            dispatch,
            submitting,
            form: { getFieldDecorator, validateFields }
        } = this.props;

        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
        };

        const onValidateForm = () => {
            validateFields((err, value) => {
                if (!err) {
                    dispatch({
                        type: 'form/submitStepForm',
                        payload: value
                    })
                }
            })
        };

        const onPrev = () => {
            router.push('/form/step-form/info');
        };

        return (
            <Form className={styles.stepForm} hideRequiredMark>
                <Alert
                    closable
                    showIcon
                    message="确认转账后，资金将直接打入对方账户，无法退回。"
                    style={{ marginBottom: 24 }}
                />
                <Form.Item {...formItemLayout} className={styles.stepFormText} label="付款账户">
                    {data.payAccount}
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.stepFormText} label="收款账户">
                    {data.receiverAccount}
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.stepFormText} label="收款人姓名">
                    {data.receiverName}
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.stepFormText} label="转账金额">
                    <span className={styles.money}>{data.amount}</span>
                    <span className={styles.uppercase}>（{digitUppercase(data.amount)}）</span>
                </Form.Item>
                <Divider style={{ margin: '24px 0' }} />
                <Form.Item {...formItemLayout} label="支付密码">
                    {getFieldDecorator('password', {
                        initialValue: '123456',
                        rules: [
                            { required: true, message: '需要支付密码才能进行支付' }
                        ]
                    })(<Input type="password" autoComplete="off" style={{ width: '80%' }} />)}
                </Form.Item>
                <Form.Item
                    style={{ marginBottom: 8 }}
                    wrapperCol={{
                        xs: { span: 24, offset: 0 },
                        sm: {
                            span: 19,
                            offset: 5
                        }
                    }}
                >
                    <Button type="primary" onClick={onValidateForm} loading={submitting}>
                        提交
                    </Button>
                    <Button onClick={onPrev} style={{ marginLeft: 8 }}>
                        上一步
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}
