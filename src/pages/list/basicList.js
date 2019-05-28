import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
    Card,
    Row,
    Col,
    Button,
    List,
    Avatar,
    Dropdown,
    Menu,
    Icon,
    Progress,
    Form,
    Input,
    Radio,
    Modal,
    DatePicker,
    Select
} from 'antd';
import moment from 'moment';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Result from '@/components/Result';

import styles from './basicList.less';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const SelectOption = Select.Option;
const { Search, TextArea } = Input;

@connect(({ list, loading }) => ({
    list,
    loading:  loading.models.list
}))
@Form.create()
class BasicList extends PureComponent {

    state = {
        visible: false,
        done: false
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'list/fetch',
            payload: {
                count: 5
            }
        })
    }

    // add modal
    showModal = () => {
        this.setState({
            visible: true,
            current: undefined
        })
    }

    // edit modal
    showEditModal = item => {
        this.setState({
            visible: true,
            current: item
        })
    }

    handleDone = () => {
        this.setState({
            visible: false,
        }, () => {
            this.setState({ done: false })
        });
    }

    handleCancel = () => {
        this.setState({
            visible: false
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const { form: { validateFields }, dispatch } = this.props;
        const { current } = this.state;
        const id = current ? current.id : '';

        validateFields((err, fieldsValue) => {
            if (err) return;
            dispatch({
                type: 'list/submit',
                payload: { id, ...fieldsValue }
            });

            this.setState({
                done: true
            })
        })

    }

    deleteItem = id => {
        const { dispatch } = this.props;
        dispatch({
            type: 'list/submit',
            payload: { id }
        })
    }

    render() {
        const {
            list: { list },
            form: { getFieldDecorator },
            loading
        } = this.props;
        const { visible, done, current={} } = this.state;

        const layoutForm = {
            labelCol: {
                span: 7
            },
            wrapperCol: {
                span: 13
            }
        }

        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize: 5,
            total: 50,
        };

        const ListContent = ({ data: { owner, createAt, percent, status } }) => (
            <div className={styles.listContent}>
                <div className={styles.listContentItem}>
                    <span>Owner</span>
                    <p>{owner}</p>
                </div>
                <div className={styles.listContentItem}>
                    <span>开始时间</span>
                    <p>{moment(createAt).format('YYYY-MM-DD HH:mm')}</p>
                </div>
                <div className={styles.listContentItem}>
                    <Progress percent={percent} status={status} strokeWidth={6} style={{ width: 180 }} />
                </div>
            </div>
        );

        const editAndDelete = (key, currentItem) => {
            if (key === 'edit') this.showEditModal(currentItem);
            else if (key === 'delete') {
                Modal.confirm({
                    title: '删除任务',
                    content: '确定删除该任务吗？',
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => this.deleteItem(currentItem.id),
                });
            }
        }

        const MoreBth = props => (
            <Dropdown
                overlay={
                    <Menu onClick={({ key }) => editAndDelete(key, props.current)}>
                        <Menu.Item key="edit">编辑</Menu.Item>
                        <Menu.Item key="delete">删除</Menu.Item>
                    </Menu>
                }
            >
                <a>
                    更多 <Icon type="down" />
                </a>
            </Dropdown>
        );

        const modalFooter = done ? { footer: null, onCancel: this.handleDone } : { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };

        const getModalContent = () => {
            if (done) {
                return (
                    <Result
                        type="success"
                        title="操作成功"
                        description="一系列的信息描述，很短同样也可以带标点。"
                        actions={
                            <Button type="primary" onClick={this.handleDone}>知道了</Button>
                        }
                        className={styles.formResult}
                    />
                )
            }
            return (
                <Form>
                    <FormItem {...layoutForm} label="任务名称">
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: '请输入任务名称' }],
                            initialValue: current.title
                        })(<Input placeholder="请输入" />)}
                    </FormItem>
                    <FormItem {...layoutForm} label="开始时间">
                        {getFieldDecorator('createAt', {
                            rules: [{ required: true, message: '请选择开始时间' }],
                            initialValue: current.createdAt ? moment(current.createAt) : null
                        })(
                            <DatePicker
                                showTime
                                placeholder="请输入"
                                format="YYYY-MM-DD HH:mm:ss"
                                style={{ width: '100%' }}
                            />
                        )}
                    </FormItem>
                    <FormItem {...layoutForm} label="任务负责人">
                        {getFieldDecorator('owner', {
                            rules: [{ required: true, message: '请选择任务负责人' }],
                            initialValue: current.owner
                        })(
                            <Select placeholder="请选择">
                                <SelectOption value="付晓晓">付晓晓</SelectOption>
                                <SelectOption value="周毛毛">周毛毛</SelectOption>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem {...layoutForm} label="产品描述">
                        {getFieldDecorator('subDescription', {
                            rules: [{ message: '请输入至少五个字符的产品描述！', min: 5 }],
                            initialValue: current.subDescription
                        })(<TextArea rows={4} placeholder="请输入至少五个字符" />)}
                    </FormItem>
                </Form>
            )
        }

        const Info = ({ title, value, bordered }) => (
            <div className={styles.handerInfo}>
                <span>{title}</span>
                <p>{value}</p>
                {bordered && <em />}
            </div>
        );

        const extraContent = (
            <div className={styles.extraContent}>
                <RadioGroup defaultValue="all">
                    <RadioButton value="all">全部</RadioButton>
                    <RadioButton value="progress" >进行中</RadioButton>
                    <RadioButton value="waiting" >等待中</RadioButton>
                </RadioGroup>
                <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={()=> ({})} />
            </div>
        );

        return (
            <PageHeaderWrapper
                hidePageTitle={true}
            >
                <div className={styles.basicList}>
                    <Card bordered={false}>
                        <Row>
                            <Col sm={8} xs={24}>
                                <Info title="我的待办" value="8个任务" bordered />
                            </Col>
                            <Col sm={8} xs={24}>
                                <Info title="本周任务平均处理时间" value="32分钟" bordered />
                            </Col>
                            <Col sm={8} xs={24}>
                                <Info title="本周完成任务数" value="24个任务" />
                            </Col>
                        </Row>
                    </Card>
                    <Card
                        bordered={false}
                        className={styles.listCard}
                        title="标准列表"
                        style={{ marginTop: 24 }}
                        bodyStyle={{ padding: '0 32px 40px 32px' }}
                        extra={extraContent}
                    >
                        <Button
                            type="dashed"
                            style={{ width: '100%', marginBottom: 8 }}
                            icon="plus"
                            onClick={this.showModal}
                        >添加</Button>

                        <List
                            loading={loading}
                            pagination={paginationProps}
                            size="large"
                            dataSource={list}
                            renderItem={item => (
                                <List.Item actions={[
                                        <a
                                            onClick={e => {
                                                e.preventDefault();
                                                this.showEditModal(item);
                                            }}
                                        >编辑</a>,
                                        <MoreBth current={item} />
                                    ]}>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar src={item.logo} size="large" />
                                        }
                                        title={<a href={item.href}>{item.title}</a>}
                                        description={item.subDescription}
                                    />
                                    <ListContent data={item} />
                                </List.Item>
                              )}
                        />
                    </Card>
                </div>
                <Modal
                    title={done ? null : `任务${current.id ? '编辑' : '添加'}`}
                    className={styles.BasicListForm}
                    width={640}
                    bodyStyle={done ? { padding: '72px 0' } : { padding: '28px 0 0' }}
                    visible={visible}
                    {...modalFooter}
                >
                    {getModalContent()}
                </Modal>
            </PageHeaderWrapper>
        )
    }
};

export default BasicList;
