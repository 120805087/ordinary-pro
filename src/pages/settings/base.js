import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Upload, Select, Button } from 'antd';
import GeographicView from './component/GeographicView';
import PhoneView from './component/PhoneView';
import styles from './base.less';

const FormItem = Form.Item;
const { Option } = Select;

const AvatarView = ({ avatar }) => (
    <Fragment>
        <div className={styles.avatar_title}>
            头像
        </div>
        <div className={styles.avatar}>
            <img src={avatar} alt="avatar"/>
        </div>
        <Upload fileList={[]}>
            <div className={styles.button_view}>
                <Button icon="upload">
                    更换头像
                </Button>
            </div>
        </Upload>
    </Fragment>
)

@connect(({ user }) => ({
    currentUser: user.currentUser
}))
@Form.create()
class Base extends React.Component {

    componentDidMount() {
        this.setBaseInfo();
    }

    setBaseInfo = () => {
        const { currentUser, form } = this.props;
        Object.keys(form.getFieldsValue()).forEach(key => {
            const obj = {};
            obj[key] = currentUser[key] || null;
            form.setFieldsValue(obj);
        })
    }

    getAvatarURL = () => {
        const { currentUser } = this.props;
        if (currentUser.avatar) {
            return currentUser.avatar;
        }
        const url = 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png';
        return url;
    }

    handleSubmit = e => {
        e.preventDefault();
        const { form: { validateFields } } = this.props;
        validateFields((err, fields) => {
            console.log(err)
            if (!err) {
                console.log(fields)
            }
        })
    }

    render() {
        const { form: { getFieldDecorator } } = this.props;

        const validatorGeographic = (rule, value, callback) => {
            const { province, city } = value;
            if(!province.key) {
                callback('请选择省份!')
            }
            if(!city.key) {
                callback('请选择地区!')
            }
            callback();
        }

        const validatorPhone = (rule, value, callback) => {
            const values = value.split('-');
            if (!values[0]) {
                callback('请输入地区代码！')
            }
            if (!values[1]) {
                callback('请输入手机号码！')
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
                                    <Option value="China">中国</Option>
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
                        <FormItem label="联系电话">
                            {getFieldDecorator('phone', {
                                rules: [
                                    { validator: validatorPhone }
                                ]
                            })(<PhoneView />)}
                        </FormItem>
                        <Button type="primary" htmlType="submit">
                            更新基本信息
                        </Button>
                    </Form>
                </div>
                <div className={styles.right}>
                    <AvatarView avatar={this.getAvatarURL()} />
                </div>
            </div>
        )
    }
};

export default Base;
