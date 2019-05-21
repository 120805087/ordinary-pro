import React, { memo } from 'react';
import { Card, Row, Col, Tooltip, Icon, Table } from 'antd';
import numeral from 'numeral';
import NumberInfo from '@/components/NumberInfo';
import { MiniArea } from '@/components/charts';
import Trend from '@/components/Trend';

const columns = [
    {
        title: '排名',
        dataIndex: 'index',
        key: 'index'
    },
    {
        title: '搜索关键词',
        dataIndex: 'keyword',
        key: 'keyword',
        render: text => <a href="javascript:;">{text}</a>
    },
    {
        title: '用户数',
        dataIndex: 'count',
        key: 'count',
        sorter: (a, b) => a.count - b.count,
        align: 'right'
    },
    {
        title: '周涨幅',
        dataIndex: 'range',
        key: 'range',
        sorter: (a, b) => a.range - b.range,
        render: (text, record) => (
            <Trend flag={record.status === 1 ? 'down' : 'up'} >
                <span style={{ marginRight: 4 }}>{text}%</span>
            </Trend>
        ),
        align: 'right'
    }
]

const TopSearch = memo(({
    loading,
    visitData2,
    searchData,
    dropdownGroup
}) => (
    <Card
        loading={loading}
        title="线上热门搜索"
        extra={dropdownGroup}
        style={{ marginTop: 24 }}
        bordered={false}
    >
        <Row gutter={68}>
            <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
                <NumberInfo
                    subTitle={
                        <span>
                            搜索用户数
                            <Tooltip title="搜索用户数">
                                <Icon style={{ marginLeft: 8 }} type="info-circle-o" />
                            </Tooltip>
                        </span>
                    }
                    gap={8}
                    total={numeral(12345).format('0,0')}
                    status="up"
                    subTotal={17.1}
                />
                <MiniArea line height={45} data={visitData2} />
            </Col>
            <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
                <NumberInfo
                    subTitle={
                        <span>
                            人均搜索次数
                            <Tooltip title="人均搜索次数">
                                <Icon style={{ marginLeft: 8 }} type="info-circle-o" />
                            </Tooltip>
                        </span>
                    }
                    gap={8}
                    total={2.7}
                    status="down"
                    subTotal={26.2}
                />
                <MiniArea line height={45} data={visitData2} />
            </Col>
        </Row>
        <Table
            rowKey={record => record.index}
            size="small"
            columns={columns}
            dataSource={searchData}
            pagination={{
                style: { marginBottom: 0 },
                pageSize: 5
            }}
        />
    </Card>
));

export default TopSearch;
