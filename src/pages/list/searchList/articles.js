import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Form, Row, Col, Select, List, Icon, Button, Tag } from 'antd';

import SearchFormRow from '@/components/SearchFormRow';
import TagSelect from '@/components/TagSelect';
import ArticleListContent from '@/components/ArticleListContent';

import styles from './index.less';

const FormItem = Form.Item;
const { Option } = Select;

const owners = [
    {
      id: 'wzj',
      name: '我自己',
    },
    {
      id: 'wjh',
      name: '吴家豪',
    },
    {
      id: 'zxx',
      name: '周星星',
    },
    {
      id: 'zly',
      name: '赵丽颖',
    },
    {
      id: 'ym',
      name: '姚明',
    },
];

@connect(({ list, loading }) => ({
    list,
    loading: loading.models.list
}))
@Form.create({
    onValuesChange({ dispatch }, changedValues, allValues){
        console.log(changedValues)
        console.log(allValues)
        dispatch({
            type: 'list/fetch',
            payload: {
                count: 5
            }
        })
    }
})
class Articles extends Component {

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'list/fetch',
            payload: {
                count: 5
            }
        })
    }

    setOwner = () => {
        const { form } = this.props;
        form.setFieldsValue({
            owner: ['wzj']
        })
    }

    fetchMore = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'list/appendFetch',
            payload: {
                count: 5
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

        const IconText = ({type, text}) => (
            <span>
                <Icon type={type} style={{ marginRight: 8 }} />
                {text}
            </span>
        );

        const loadMore =
            list.length > 0 ? (
                <div style={{ textAlign: 'center', marginTop: 16 }}>
                    <Button onClick={this.fetchMore}>
                        {loading ? (
                            <span>
                                <Icon type="loading" /> 加载中...
                            </span>
                        ) : (
                            '加载更多'
                        )}
                    </Button>
                </div>
            ) : null;

        return (
            <Fragment>
                <Card bordered={false}>
                    <Form layout="inline">
                        <SearchFormRow title="所属类目" block style={{ paddingBottom: 12 }}>
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
                        <SearchFormRow title="owner" grid>
                            <Row>
                                <Col>
                                    <FormItem>
                                        {getFieldDecorator('owner', {
                                            initialValue: ['wjh', 'zxx'],
                                        })(
                                            <Select
                                                mode="multiple"
                                                style={{ maxWidth: 286, width: '100%' }}
                                                placeholder="选择 owner"
                                            >
                                                {owners.map(owner => (
                                                    <Option key={owner.id} value={owner.id}>
                                                        {owner.name}
                                                    </Option>
                                                ))}
                                            </Select>
                                        )}
                                        <a className={styles.selfTrigger} onClick={this.setOwner}>
                                            只看自己的
                                        </a>
                                    </FormItem>
                                </Col>
                            </Row>
                        </SearchFormRow>
                        <SearchFormRow title="其他选项" grid last>
                            <Row gutter={16}>
                                <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                                    <FormItem {...formItemLayout} label="活跃用户">
                                        {getFieldDecorator('user')(
                                            <Select placeholder="不限" style={{ maxWidth: 200, width: '100%' }}>
                                                <Option value="lisan">李三</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                                    <FormItem {...formItemLayout} label="好评度">
                                        {getFieldDecorator('rate')(
                                            <Select placeholder="不限" style={{ maxWidth: 200, width: '100%' }}>
                                                <Option value="good">优秀</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                        </SearchFormRow>
                    </Form>
                </Card>
                <Card bordered={false} style={{ marginTop: 26 }}>
                    <List
                        itemLayout="vertical"
                        size="large"
                        loading={loading}
                        loadMore={loadMore}
                        dataSource={list}
                        renderItem={item => (
                            <List.Item
                                key={item.id}
                                actions={[
                                    <IconText type="star-o" text={item.star} />,
                                    <IconText type="like-o" text={item.like} />,
                                    <IconText type="message" text={item.message} />,
                                ]}
                                extra={<div className={styles.listItemExtra} />}
                            >
                                <List.Item.Meta
                                    title={<a className={styles.listItemMetaTitle} href={item.href}>
                                            {item.title}
                                    </a>}
                                    description={
                                        <span>
                                            <Tag>Ant Design</Tag>
                                            <Tag>设计语言</Tag>
                                            <Tag>蚂蚁金服</Tag>
                                        </span>
                                    }
                                />
                                <ArticleListContent data={item} />
                            </List.Item>
                        )}
                    />
                </Card>
            </Fragment>
        )
    }
};

export default Articles;
