import React, { PureComponent } from 'react';
import { Form, Input, Button, Modal } from 'antd';

@Form.create()
class UpdatePassword extends PureComponent {

    state = {
        confirmDirty: false
    }

    render() {
        const {
            visible,
            onCancel,
            onSubmit,
            form: { getFieldDecorator }
        } = this.props;

        const formItemLayout = {
            labelCol: {
                sm: { span: 6 }
            },
            wrapperCol: {
                sm: { span: 14 }
            }
        }
        const handleConfirmBlur = e => {
            const value = e.target.value;
            this.setState({ confirmDirty: this.state.confirmDirty || !!value });
        };

        const checkConfirm = (rule, value, callback) => {
            const { form } = this.props;
            if (value && value !== form.getFieldValue('new_pass')) {
                callback('两次输入的密码不一样');
            } else {
                callback();
            }
        }

        const checkPassword = (rule, value, callback) => {
            const { form } = this.props;
            if (value && this.state.confirmDirty) {
                form.validateFields(['as_new_pass'], { force: true });
            }
            callback();
        }

        return (
            <Modal
                visible={visible}
                title='修改密码'
                okText="修改"
                calcelText="关闭"
                onCancel={onCancel}
                onOk={onSubmit}
                destroyOnClose={true}

            >
                <Form hideRequiredMark>
                    <Form.Item {...formItemLayout} label="旧密码" >
                        {getFieldDecorator('old_pass', {
                            rules: [{ required: true, message: '请输入旧密码' }]
                        })(<Input.Password autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="新密码" >
                        {getFieldDecorator('new_pass', {
                            rules: [
                                { required: true, message: '请输入新密码' },
                                { validator: checkPassword }
                            ]
                        })(<Input.Password autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="新密码" >
                        {getFieldDecorator('as_new_pass', {
                            rules: [
                                { required: true, message: '请再次输入新密码' },
                                { validator: checkConfirm }
                            ]
                        })(<Input.Password onBlur={e => handleConfirmBlur(e)}  autoComplete="off" />)}
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
};


export default UpdatePassword;

