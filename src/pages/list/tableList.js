import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
    Card,
    Button,
    Badge,
    Divider,
    Dropdown,
    Menu,
    Icon,
    Form,
    Row,
    Col,
    Select,
    Input,
    InputNumber,
    DatePicker,
    Modal,
    message,
    Steps,
    Radio
} from 'antd';
import moment from 'moment';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './tableList.less';

const { Option } = Select;
const { RangePicker } = DatePicker;
const Step = Steps.Step;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

const getValue = obj =>
    Object.keys(obj)
        .map(key => obj[key])
        .join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];

const CreateForm = Form.create()(props => {
    const { modalVisible, form, handleAdd, handleModalVisible } = props;
    const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            form.resetFields();
            handleAdd(fieldsValue);
        });
    };
    return (
        <Modal
            destroyOnClose
            title="新建规则"
            visible={modalVisible}
            onOk={okHandle}
            onCancel={() => handleModalVisible()}
        >
            <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
                {form.getFieldDecorator('desc', {
                    rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }]
                })(<Input placeholder="请输入" />)}
            </Form.Item>
        </Modal>
    )
});

@Form.create()
class UpdateForm extends PureComponent {
    static defaultProps = {
        handleUpdate: () => {},
        handleUpdateModalVisible: () => {},
        values: {}
    }

    constructor(props) {
        super(props);
        this.state = {
            formVals: {
                name: props.values.name,
                desc: props.values.desc,
                key: props.values.key,
                target: '0',
                template: '0',
                type: '1',
                frequency: 'month'
            },
            currentStep: 0
        }
    }

    formLayout = {
        labelCol: {
            span: 7
        },
        wrapperCol: {
            span: 13
        }
    }

    backward = () => {
        const { currentStep } = this.state;
        this.setState({
            currentStep: currentStep - 1
        })
    }

    forward = () => {
        const { currentStep } = this.state;
        this.setState({
            currentStep: currentStep + 1
        })
    }

    handleNext = currentStep => {
        const { form, handleUpdate } = this.props;
        const { formVals: oldValues } = this.state;

        form.validateFields((err, fieldsValue) => {
            if(err) return;
            const formVals  = { ...oldValues, ...fieldsValue };
            this.setState({
                formVals
            }, () => {
                if (currentStep < 2) {
                    this.forward();
                } else {
                    handleUpdate(formVals);
                }
            })
        })
    }

    renderFooter = (currentStep) => {
        const { handleUpdateModalVisible, values } = this.props;
        if (currentStep === 1) {
            return [
                <Button key="back" style={{ float: 'left' }}  onClick={this.backward}>
                    上一步
                </Button>,
                <Button key="cancel" onClick={() => handleUpdateModalVisible(false, values)}>
                    取消
                </Button>,
                <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
                    下一步
                </Button>,
            ];
        }
        if (currentStep === 2) {
            return [
                <Button key="back" style={{ float: 'left' }} onClick={this.backward}>
                    上一步
                </Button>,
                <Button key="cancel" onClick={() => handleUpdateModalVisible(false, values)}>
                    取消
                </Button>,
                <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
                    完成
                </Button>
            ];
        }

        return [
            <Button key="cancel" onClick={() => handleUpdateModalVisible(false, values)}>
                取消
            </Button>,
            <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
                下一步
            </Button>,
        ]
    }

    renderContent  = (currentStep, formVals) => {
        const { form: { getFieldDecorator } } = this.props;
        if (currentStep === 1) {
            return [
                <Form.Item key="target" {...this.formLayout} label="监控对象">
                    {getFieldDecorator('target', {
                        initialValue: formVals.target
                    })(<Select style={{ width: '100%' }}>
                        <Option value="0">表一</Option>
                        <Option value="1" >表二</Option>
                    </Select>)}
                </Form.Item>,
                <Form.Item key="template" {...this.formLayout} label="规则模板">
                    {getFieldDecorator('template', {
                        initialValue: formVals.template
                    })(<Select style={{ width: '100%' }}>
                        <Option value="0">规则模板一</Option>
                        <Option value="1" >规则模板二</Option>
                    </Select>)}
                </Form.Item>,
                <Form.Item key="type" {...this.formLayout} label="规则类型">
                    {getFieldDecorator('type', {
                        initialValue: formVals.type
                    })(<RadioGroup>
                        <Radio value="0">强</Radio>
                        <Radio value="1">弱</Radio>
                    </RadioGroup>)}
                </Form.Item>
            ];
        }
        if (currentStep === 2) {
            return [
                <Form.Item key="time" {...this.formLayout} label="开始时间">
                    {getFieldDecorator('time', {
                        rules: [{ required: true, message: '请选择开始时间！' }],
                        initialValue: formVals.time
                    })(
                        <DatePicker
                            style={{ width: '100%' }}
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            placeholder="选择开始时间"
                         />
                    )}
                </Form.Item>,
                <Form.Item key="frequency" {...this.formLayout} label="调度周期">
                    {getFieldDecorator('frequency', {
                        initialValue: formVals.frequency
                    })(<Select style={{ width: '100%' }}>
                        <Option value="month">月</Option>
                        <Option value="week" >周</Option>
                    </Select>)}
                </Form.Item>
            ]
        }
        return [
            <Form.Item key="name" {...this.formLayout} label="规则名称">
                {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入规则名称！' }],
                    initialValue: formVals.name
                })(<Input placeholder="请输入" />)}
            </Form.Item>,
            <Form.Item key="desc" {...this.formLayout} label="规则描述">
                {getFieldDecorator('desc', {
                    rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
                    initialValue: formVals.desc
                })(<TextArea rows={4} placeholder="请输入至少五个字符" />)}
            </Form.Item>
        ]
    }

    render() {
        const { updateModalVisible, handleUpdateModalVisible, values } = this.props;
        const { currentStep, formVals } = this.state;

        return (
            <Modal
                width={640}
                bodyStyle={{ padding: '32px 40px 48px' }}
                destroyOnClose
                title="规则配置"
                visible={updateModalVisible}
                footer={this.renderFooter(currentStep)}
                onCancel={() => handleUpdateModalVisible(false, values)}
                afterClose={() => handleUpdateModalVisible()}
            >
                 <Steps style={{ marginBottom: 28 }} size="small" current={currentStep}>
                    <Step title="基本信息" />
                    <Step title="配置规则属性" />
                    <Step title="设定调度周期" />
                </Steps>
                {this.renderContent(currentStep, formVals)}
            </Modal>
        )
    }
}


@connect(({ rule, loading }) => ({
    rule,
    loading: loading.models.rule
}))
@Form.create()
export default class TableList extends PureComponent {
    state = {
        selectedRows: [],
        expandForm: false,
        formValues: {},
        modalVisible: false,
        updateModalVisible: false,
        stepFormValues: {}
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'rule/fetch'
        });
    }

    // 表格列
    columns = [
        {
            title: '规则名称',
            dataIndex: 'name',
            render: text => <a onClick={() => this.previewItem(text)}>{text}</a>
        },
        {
            title: '描述',
            dataIndex: 'desc'
        },
        {
            title: '服务调用次数',
            dataIndex: 'callNo',
            sorter: true,
            render: val => `${val} 万`,
            needTotal: true
        },
        {
            title: '状态',
            dataIndex: 'status',
            filters: [
                {
                    text: status[0],
                    value: 0,
                },
                {
                    text: status[1],
                    value: 1,
                },
                {
                    text: status[2],
                    value: 2,
                },
                {
                    text: status[3],
                    value: 3,
                },
            ],
            render(val) {
                return <Badge status={statusMap[val]} text={status[val]} />
            }
        },
        {
            title: '上次调度时间',
            dataIndex: 'updatedAt',
            sorter: true,
            render: text => <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>
        },
        {
            title: '操作',
            render: (text, record) => (
                <Fragment>
                    <a onClick={() => this.handleUpdateModalVisible(true, record)}>配置</a>
                    <Divider type="vertical" />
                    <a href="">订阅警报</a>
                </Fragment>
            )
        }
    ];

    // 表格选中
    handleSelectRows = rows => {
        this.setState({
            selectedRows: rows
        })
    };

    // 表格 触发事件
    handleStandardTableChange = (pagination, filtersArg, sorter) => {
        const { dispatch } = this.props;
        // const { formValue } = this.state;

        const filters = Object.keys(filtersArg).reduce((obj, key) => {
            const newObj = {...obj};
            newObj[key] = getValue(filtersArg[key]);
            return newObj;
        }, {});

        const params = {
            currentPage: pagination.current,
            pageSize: pagination.pageSize,
            // ...formValues,
            ...filters
        };

        if (sorter.field) {
            params.sorter = `${sorter.field}_${sorter.order}`;
        }

        dispatch({
            type: 'rule/fetch',
            payload: params
        });
    };

    // 多操做按钮事件
    handleMenuClick = e => {
        const { selectedRows } = this.state;
        const { dispatch } = this.props;
        if (selectedRows.lenght === 0) return;
        switch (e.key) {
            case 'remove':
                dispatch({
                    type: 'rule/remove',
                    payload: {
                        key: selectedRows.map(row => row.key)
                    }
                })
                    .then(res => {
                        this.setState({
                            selectedRows: []
                        })
                    })
                break;
            case 'approval':
                console.log('approval');
                break;
            default:
                break;
        }
    }

    toggleForm = () => {
        const { expandForm } = this.state;
        this.setState({
            expandForm: !expandForm
        })
    }

    // 提交表单
    handleSearch = e => {
        e.preventDefault();
        const { form, dispatch } = this.props;

        form.validateFields((err, fieldsValue) => {
            if (err) return;

            const values = {
                ...fieldsValue,
                date: fieldsValue.date && fieldsValue.date.format('YYYY-MM-DD')  // valueOf moment转时间戳  format('') moment 时间 格式话
            };

            this.setState({
                formValues: values
            });

            dispatch({
                type: 'rule/fetch',
                payload: values
            });
        })
    }

    // 重置表单
    handleFormReset = () => {
        const { form, dispatch } = this.props;
        form.resetFields();
        this.setState({
            formValue: {}
        });
        dispatch({
            type: 'rule/fetch'
        });
    }

    // 简易表单
    renderSimpleForm = () => {
        const {
            form: { getFieldDecorator }
        } = this.props;
        return (
            <Form onSubmit={this.handleSearch} layout="inline" >
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                        <Form.Item label="规则名称">
                            {getFieldDecorator('name')(
                                <Input placeholder="请输入" />
                            )}
                        </Form.Item>
                    </Col>
                    <Col md={8} sm={24}>
                        <Form.Item label="使用状态">
                            {getFieldDecorator('status')(
                                <Select placeholder="请选择" style={{ width: '100%' }}>
                                    <Option value="0">关闭</Option>
                                    <Option value="1">运行中</Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col md={8} sm={24}>
                        <span className={styles.submitButtons}>
                            <Button type="primary" htmlType="submit">查询</Button>
                            <Button style={{ margin: '0 8px' }} onClick={this.handleFormReset}>重置</Button>
                            <a onClick={this.toggleForm}>展开 <Icon type="down" /></a>
                        </span>
                    </Col>
                </Row>
            </Form>
        )
    }

    // 扩展表单
    renderAdvanceForm = () => {
        const {
            form: { getFieldDecorator }
        } = this.props;
        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                        <Form.Item label="规则名称">
                            {getFieldDecorator('name')(
                                <Input placeholder="请输入" />
                            )}
                        </Form.Item>
                    </Col>
                    <Col md={8} sm={24}>
                        <Form.Item label="使用状态">
                            {getFieldDecorator('status')(
                                <Select placeholder="请选择" style={{ width: '100%' }}>
                                    <Option value="0">关闭</Option>
                                    <Option value="1">运行中</Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col md={8} sm={24}>
                        <Form.Item label="调用次数">
                            {getFieldDecorator('number')(
                                <InputNumber style={{ width: '100%' }} />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                        <Form.Item label="更新日期">
                            {getFieldDecorator('date')(
                                <DatePicker style={{ width: '100%' }} plcaeholder="请输入更新日期" />
                            )}
                        </Form.Item>
                    </Col>
                    <Col md={8} sm={24}>
                        <Form.Item label="操作日期">
                            {getFieldDecorator('rangeDate')(
                                <RangePicker  style={{ width: '100%' }} plcaeholder="请输入更新日期" />
                            )}
                        </Form.Item>
                    </Col>
                    <Col md={8} sm={24}>
                        <span className={styles.submitButtons}>
                            <Button type="primary" htmlType="submit">查询</Button>
                            <Button style={{ margin: '0 8px' }} onClick={this.handleFormReset}>重置</Button>
                            <a onClick={this.toggleForm}>收起 <Icon type="up" /></a>
                        </span>
                    </Col>
                </Row>
            </Form>
        )
    }

    // 查询表单
    renderForm = () => {
        const { expandForm } = this.state;
        return expandForm ? this.renderAdvanceForm() : this.renderSimpleForm();
    }

    // 添加操作
    handleAdd = fields => {
        const { dispatch } = this.props;
        dispatch({
            type: 'rule/add',
            payload: {
                desc: fields.desc
            }
        })
            .then(res => {
                message.success('添加成功');
                this.handleModalVisible();
            })
    }

    handleModalVisible = flag => {
        this.setState({
            modalVisible: !!flag
        })
    }

    // （配置）更新操作
    handleUpdateModalVisible = (flag, record) => {
        this.setState({
            updateModalVisible: !!flag,
            stepFormValues: record || {}
        })
    }

    handleUpdate = fields => {
        const { dispatch } = this.props;
        const { formValues } = this.state;

        dispatch({
            type: 'rule/update',
            payload: {
                query: formValues,
                body: {
                    name: fields.name,
                    desc: fields.desc,
                    key: fields.key
                }
            }
        });

        message.success('配置成功');
        this.handleUpdateModalVisible();
    }

    render() {
        const { selectedRows, modalVisible, stepFormValues, updateModalVisible } = this.state;
        const {
            rule: { data },
            loading
        } = this.props;

        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="remove">删除</Menu.Item>
                <Menu.Item key="approval">批量审批</Menu.Item>
            </Menu>
        );

        const parentMethods = {
            handleAdd: this.handleAdd,
            handleModalVisible: this.handleModalVisible
        };

        const updateMethods = {
            handleUpdate: this.handleUpdate,
            handleUpdateModalVisible: this.handleUpdateModalVisible,
        }

        return (
            <PageHeaderWrapper title="查询表格">
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListForm}>{this.renderForm()}</div>
                        <div className={styles.tableListOperator}>
                            <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>新建</Button>
                            {selectedRows.length > 0 && (
                                <Fragment>
                                    <Button>批量操作</Button>
                                    <Dropdown overlay={menu}>
                                        <Button>
                                            更多操作 <Icon type="down" />
                                        </Button>
                                    </Dropdown>
                                </Fragment>
                            )}
                        </div>
                        <StandardTable
                            selectedRows={selectedRows}
                            loading={loading}
                            data={data}
                            columns={this.columns}
                            onSelectRow={this.handleSelectRows}
                            handleChange={this.handleStandardTableChange}
                            // bordered={true}
                            // size='small'
                        />
                        <CreateForm {...parentMethods} modalVisible={modalVisible} />
                        {stepFormValues && Object.keys(stepFormValues).length ? (
                            <UpdateForm
                                {...updateMethods}
                                updateModalVisible={updateModalVisible}
                                values={stepFormValues}
                            />
                        ) : null}
                    </div>
                </Card>
            </PageHeaderWrapper>
        )
    }
};
