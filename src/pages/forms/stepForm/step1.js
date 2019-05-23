import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Form, Select, Button, Divider, Input } from 'antd';

import styles from './index.less';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ form }) => ({
    data: form.step
}))
@Form.create()
export default class Step1 extends PureComponent {
    render() {
        const {
            form: { getFieldDecorator, validateFields },
            dispatch,
            data
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
                        type: 'form/saveStepFormData',
                        payload: value
                    });
                    router.push('/form/step-form/confirm');
                }
            })
        }

        return (
            <Fragment>
                <Form className={styles.stepForm} hideRequiredMark>
                    <FormItem {...formItemLayout} label="付款账户">
                        {getFieldDecorator('payAccount', {
                            initialValue: data.payAccount,
                            rules: [{ required: true, message: '请选择付款账户' }]
                        })(
                            <Select placeholder="ant-design@alipay.com">
                                <Option value="ant-design@alipay.com">ant-design@alipay.com</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="收款账户">
                        <Input.Group compact>
                            <Select defaultValue="alipy" style={{ width: 100 }}>
                                <Option value="alipay">支付宝</Option>
                                <Option value="bank">银行账户</Option>
                            </Select>
                            {getFieldDecorator('receiverAccount', {
                                initialValue: data.receiverAccount,
                                rules: [
                                    { required: true, message: '请输入收款人账户' },
                                    { type: 'email', message: '账户名应为邮箱格式' }
                                ]
                            })(<Input style={{ width: 'calc(100% - 100px)' }} placeholder="test@example.com" />)}
                        </Input.Group>
                    </FormItem>
                    <FormItem {...formItemLayout} label="收款人姓名">
                        {getFieldDecorator('receiverName', {
                            initialValue: data.receiverName,
                            rules: [{ required: true, message: '请输入收款人姓名' }]
                        })(<Input placeholder="请输入收款人姓名" />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="转账金额">
                        {getFieldDecorator('amount', {
                            initialValue: data.amount,
                            rules: [
                                { required: true, message: '请输入转账金额' },
                                {
                                    pattern: /^(\d+)((?:\.\d+)?)$/,
                                    message: '请输入合法金额数字'
                                }
                            ]
                        })(<Input prefix="￥" placeholder="请输入金额" />)}
                    </FormItem>
                    <FormItem wrapperCol={{
                        xs: { span: 24, offset: 0 },
                        sm: {
                            span: 19,
                            offset: 5
                        }
                    }}>
                        <Button type="primary" onClick={onValidateForm}>
                            下一步
                        </Button>
                    </FormItem>
                </Form>
                <Divider style={{ margin: '40px 0 24px' }} />
                <div className={styles.desc}>
                    <h3>说明</h3>
                    <h4>转账到支付宝账户</h4>
                    <p>
                        如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
                    </p>
                    <h4>转账到银行卡</h4>
                    <p>
                        如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
                    </p>
                </div>
            </Fragment>
        )
    }
}
