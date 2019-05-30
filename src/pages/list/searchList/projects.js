import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Card, Form, Row, Col, Select, List, Typography } from 'antd';
import moment from 'moment';
import SearchFormRow from '@/components/SearchFormRow';
import TagSelect from '@/components/TagSelect';
import AvatarList from '@/components/AvatarList';

import styles from './index.less';

const FormItem = Form.Item;
const { Option } = Select;
const { Paragraph } = Typography;

@connect(({ list, loading }) => ({
    list,
    loading: loading.models.list
}))
@Form.create({
    onValuesChange({ dispatch }, changedValues, allValues) {
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
class Projects extends React.Component {

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
        const { form: { getFieldDecorator }, list: { list }, loading  } = this.props;

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

        return (
            <Fragment>
                <Card bordered={false}>
                    <Form layout="inline">
                        <SearchFormRow
                            title="所属项目"
                            block
                        >
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
                        </SearchFormRow>
                        <SearchFormRow
                            title="其他选项"
                            grid
                            last
                        >
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
                                        {getFieldDecorator('reta')(
                                            <Select placeholder="请选择" style={{ maxWidth: 200, width: '100%' }}>
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
                <div className={styles.cardList}>
                    {list && (
                        <List
                            loading={loading}
                            grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, ms: 1 }}
                            dataSource={list}
                            renderItem={item => (
                                <List.Item>
                                    <Card className={styles.card}
                                        hoverable
                                        cover={<img alt={item.title} src={item.cover} />}
                                    >
                                        <Card.Meta
                                            title={<a>{item.title}</a>}
                                            description={
                                                <Paragraph ellipsis={{ rows: 3 }}>
                                                    {item.description}
                                                </Paragraph>
                                            }
                                        />
                                        <div className={styles.cardItemContent}>
                                            <span>{moment(item.updateAt).fromNow()}</span>
                                            <div className={styles.avatarList}>
                                                <AvatarList maxLength={6} size="mini">
                                                    {item.members.map((member, i) => (
                                                        <AvatarList.Item
                                                            key={i}
                                                            src={member.avatar}
                                                            tips={member.name}
                                                        />
                                                    ))}
                                                </AvatarList>
                                            </div>
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

export default Projects;
