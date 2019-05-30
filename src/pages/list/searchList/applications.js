import React, { Fragment } from 'react';
import { connect } from 'dva';
import numeral from 'numeral';
import { Form, Select, Icon, Card, List, Row, Col, Tooltip, Menu, Dropdown, Avatar } from 'antd';
import SearchFormRow from '@/components/SearchFormRow';
import TagSelect from '@/components/TagSelect';
import { formatWan } from '@/utils/util';

import styles from './index.less';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ list, loading }) => ({
    list,
    loading: loading.models.list,
}))
@Form.create({
    onValuesChange({ dispatch }, changedValues, allValues) {
        console.log(changedValues)
        console.log(allValues)

        dispatch({
            type: 'list/fetch',
            payload: {
                count: 8
            }
        })
    }
})
class Applications extends React.Component {

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'list/fetch',
            payload: {
                count: 8
            }
        })
    }

    render() {
        const {
            form: { getFieldDecorator },
            list: { list },
            loading
        } = this.props;

        const actionsTextMap = {
            expandText: '展开',
            collapseText: '收起',
            selectAllText: '全部'
        };

        const formItemLayout = {
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 24 },
                md: { span: 12 },
            }
        };

        const CardInfo = ({ activeUser, newUser }) => (
            <div className={styles.cardInfo}>
                <div>
                    <p>活跃用户</p>
                    <p>{activeUser}</p>
                </div>
                <div>
                    <p>新增用户</p>
                    <p>{newUser}</p>
                </div>
            </div>
        );

        const itemMenu = (
            <Menu>
              <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.alipay.com/">
                  1st menu item
                </a>
              </Menu.Item>
              <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.taobao.com/">
                  2nd menu item
                </a>
              </Menu.Item>
              <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.tmall.com/">
                  3d menu item
                </a>
              </Menu.Item>
            </Menu>
        );

        return (
            <Fragment>
                <Card bordered={false}>
                    <Form layout="inline">
                        <SearchFormRow title="所属分类" block>
                            <FormItem>
                                {getFieldDecorator('category')(
                                    <TagSelect expandable actionsText={actionsTextMap}>
                                        <TagSelect.Option value="cat1">类目一</TagSelect.Option>
                                        <TagSelect.Option value="cat2">类目二</TagSelect.Option>
                                        <TagSelect.Option value="cat3">类目三</TagSelect.Option>
                                        <TagSelect.Option value="cat4">类目四</TagSelect.Option>
                                        <TagSelect.Option value="cat5">类目五</TagSelect.Option>
                                        <TagSelect.Option value="cat6">类目六</TagSelect.Option>
                                        <TagSelect.Option value="cat7">类目七</TagSelect.Option>
                                        <TagSelect.Option value="cat8">类目八</TagSelect.Option>
                                    </TagSelect>
                                )}
                            </FormItem>
                        </SearchFormRow>
                        <SearchFormRow title="其他选项" grid last>
                            <Row gutter={16}>
                                <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                                    <FormItem {...formItemLayout} label="作者">
                                        {getFieldDecorator('author')(
                                            <Select placeholder="请选择" style={{ maxWidth: 200, width: '100%' }}>
                                                <Option value="wzj">王昭君</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                                    <FormItem {...formItemLayout} label="好评度">
                                        {getFieldDecorator('rate')(
                                            <Select placeholder="请选择" style={{ maxWidth: 200, width: '100%s' }}>
                                                <Option value="good">优秀</Option>
                                                <Option value="normal">普通</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                        </SearchFormRow>
                    </Form>
                </Card>
                <div className={styles.appliList}>
                    {list && (
                        <List
                            loading={loading}
                            grid={{ gutter: 16, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
                            dataSource={list}
                            renderItem={item => (
                                <List.Item>
                                    <Card
                                        hoverable
                                        bodyStyle={{ paddingBottom: 20 }}
                                        actions={[
                                            <Tooltip title="下载">
                                                <Icon type="download" />
                                            </Tooltip>,
                                            <Tooltip title="编辑">
                                                <Icon type="edit" />
                                            </Tooltip>,
                                            <Tooltip title="分享">
                                                <Icon type="share-alt" />
                                            </Tooltip>,
                                            <Dropdown overlay={itemMenu}>
                                                <Icon type="ellipsis" />
                                            </Dropdown>,
                                        ]}
                                    >
                                        <Card.Meta avatar={<Avatar size="small" src={item.avatar} />} title={item.title} />
                                        <div className={styles.cardItemContent}>
                                            <CardInfo
                                                activeUser={formatWan(item.activeUser)}
                                                newUser={numeral(item.newUser).format('0,0')}
                                            />
                                        </div>
                                    </Card>
                                </List.Item>
                            )}
                        />
                    )}
                </div>
            </Fragment>
        )
    }
};

export default Applications;
