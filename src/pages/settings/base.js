import React from 'react';
import { Form, Input, Upload, Select, Button } from 'antd';
import GeographicView from './component/GeographicView';
import PhoneView from './component/PhoneView';
import styles from './base.less';

const FormItem = Form.Item;
const { Option } = Select;

@Form.create()
class Base extends React.Component {
    render() {
        const { form: { getFieldDecorator } } = this.props;

        const validatorGeographic = (rule, value, callback) => {
            console.log(value)
            const { province, city } = value;
            if(!province) {
                callback('请选择省份!')
            }
            if(!city.key) {
                callback('请选择地区!')
            }
            callback();
        }

        return (
            <div className={styles.baseView}>
                <div className={styles.left}>
                    <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>
                        <FormItem label="邮箱">
                            {getFieldDecorator('email', {
                                rules: [
                                    { required: true, message: '请输入您的邮箱!' }
                                ]
                            })(<Input />)}
                        </FormItem>
                        <FormItem label="昵称">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '请输入您的昵称!' }]
                            })(<Input />)}
                        </FormItem>
                        <FormItem label="个人简介">
                            {getFieldDecorator('profile', {
                                relus: [{ required: true, message: '请输入个人简介!' }]
                            })(
                                <Input.TextArea
                                    placeholder="个人简介" rows={4}
                                />
                            )}
                        </FormItem>
                        <FormItem label="国家/地区">
                            {getFieldDecorator('country', {
                                rules: [{ required: true, message: '请选择国家/地区' }]
                            })(
                                <Select style={{ maxWidth: 220 }}>
                                    <Option value="china">中国</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label="所在省市">
                            {getFieldDecorator('geographic', {
                                rules: [
                                    { validator: validatorGeographic }
                                ]
                            })(<GeographicView />)}
                        </FormItem>
                        <FormItem label="街道地址">
                            {getFieldDecorator('address', {
                                rules: [
                                    { required: true, message: '请输入街道地址' }
                                ]
                            })(<Input />)}
                        </FormItem>
                        {/* <FormItem label="联系电话">
                            {getFieldDecorator('phone', {
                                rules: [
                                    { required: true, message: '' },
                                    { validator: validatorPhone }
                                ]
                            })(<PhoneView />)}
                        </FormItem> */}
                        <Button type="primary">
                            更新基本信息
                        </Button>
                    </Form>
                </div>
                <div className={styles.right}></div>
            </div>
        )
    }
};

export default Base;
