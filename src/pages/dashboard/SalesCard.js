import React, { memo } from 'react';
import { Card, Tabs, DatePicker, Row, Col } from 'antd';
import { Bar } from '@/components/charts';
import numeral from 'numeral';
import classnames from 'classnames';

import styles from './index.less';

const TabPane = Tabs.TabPane;
const { RangePicker } = DatePicker;

const salesRankData = [];
for (let i = 0; i < 7; i ++) {
    salesRankData.push({
        rankItemNumber: i + 1,
        rankItemTitle: `公专路${i}号店`,
        rankItemTotal: numeral(323234).format('0,0')
    })
}

const SalesCard = memo(({
    rangePickerValue,
    salesData,
    isActive,
    handleRangePickerChange,
    loading,
    selectDate
}) => (
    <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
        <div className={styles.salesCard}>
            <Tabs
                tabBarExtraContent={
                    <div className={styles.salesExtraWrap}>
                        <div className={styles.salesExtra}>
                            <a className={isActive('today')} onClick={() => selectDate('today')}>今日</a>
                            <a className={isActive('week')} onClick={() => selectDate('week')}>本周</a>
                            <a className={isActive('month')} onClick={() => selectDate('month')}>本月</a>
                            <a className={isActive('year')} onClick={() => selectDate('year')}>全年</a>
                        </div>
                        <RangePicker
                            value={rangePickerValue}
                            onChange={handleRangePickerChange}
                            style={{ width: 256 }}
                        />
                    </div>
                }
                size="large"
                tabBarStyle={{ marginBottom: 24 }}
            >
                <TabPane tab="销售额" key="sales">
                    <Row>
                        <Col xl={16} lg={12} md={12} sm={24} xs={24} >
                            <div className={styles.salesBar}>
                                <Bar
                                    height={295}
                                    title='销售趋势'
                                    data={salesData}
                                />
                            </div>
                        </Col>
                        <Col xl={8} lg={12} md={12} sm={24} xs={24} >
                            <div className={styles.salesRank}>
                                <h4 className={styles.salesRankTitle}>
                                    门店销售额排名
                                </h4>
                                <ul className={styles.salesRankContent}>
                                    {salesRankData && salesRankData.map((item, i) => (
                                        <li key={item.rankItemNumber}>
                                            <span className={`${styles.rankItemNumber} ${i < 3 ? styles.active : '' }`}>{item.rankItemNumber}</span>
                                            <span className={styles.rankItemTitle}>{item.rankItemTitle}</span>
                                            <span className={styles.rankItemTotal}>{item.rankItemTotal}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tab="访问量" key="visit">
                    <Row>
                        <Col xl={16} lg={12} md={12} sm={24} xs={24} >
                            <div className={styles.salesBar}>
                                <Bar
                                    height={295}
                                    title='访问量趋势'
                                    data={salesData}
                                />
                            </div>
                        </Col>
                        <Col xl={8} lg={12} md={12} sm={24} xs={24} >
                            <div className={styles.salesRank}>
                                <h4 className={styles.salesRankTitle}>
                                    门店访问量排名
                                </h4>
                                <ul className={styles.salesRankContent}>
                                    {salesRankData && salesRankData.map((item, i) => (
                                        <li key={item.rankItemNumber}>
                                            <span className={`${styles.rankItemNumber} ${i < 3 ? styles.active : '' }`}>{item.rankItemNumber}</span>
                                            <span className={styles.rankItemTitle}>{item.rankItemTitle}</span>
                                            <span className={styles.rankItemTotal}>{item.rankItemTotal}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </TabPane>
            </Tabs>
        </div>
    </Card>
))

export default SalesCard;
