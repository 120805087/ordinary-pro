import React, { memo } from 'react';
import { Row, Col, Icon, Tooltip } from 'antd';
import { ChartCard, Field, yuan, MiniArea, MiniBar, MiniProgress } from '@/components/charts';
import Trend from '@/components/Trend';
import numeral from 'numeral';

import styles from './index.less';

const colResponsiveProps = {
    xs: 24,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 6,
    style: { marginBottom: 24 },
}

const IntroduceRow = memo(({ loading, visitData }) => (
    <Row gutter={24}>
        <Col {...colResponsiveProps}>
            <ChartCard
                bordered={false}
                title="总销售额"
                action={
                    <Tooltip
                        title="总销售额排名"
                    >
                        <Icon type="info-circle-o" />
                    </Tooltip>
                }
                loading={loading}
                total={ yuan('123123') }
                footer={
                    <Field
                        label="日销售额"
                        value={`¥ ${numeral(123123).format('0,0')}`}
                    />
                }
                contentHeight={46}
            >
                <Trend flag="up" style={{ marginRight: 16 }}>
                    周同比
                    <span className={styles.trendText}>12%</span>
                </Trend>
                <Trend flag="down">
                    日同比
                    <span className={styles.trendText}>11%</span>
                </Trend>
            </ChartCard>
        </Col>
        <Col {...colResponsiveProps}>
            <ChartCard
                bordered={false}
                title="访问量"
                action={
                    <Tooltip
                        title="访问量"
                    >
                        <Icon type="info-circle-o" />
                    </Tooltip>
                }
                loading={loading}
                total={ numeral(8846).format('0,0') }
                footer={
                    <Field
                        label="访问量"
                        value={`¥ ${numeral(1234).format('0,0')}`}
                    />
                }
                contentHeight={46}
            >
                <MiniArea color="#975FE4" data={visitData} />
            </ChartCard>
        </Col>
        <Col {...colResponsiveProps}>
            <ChartCard
                bordered={false}
                title='支付笔数'
                action={
                    <Tooltip
                        title="支付笔数"
                    >
                        <Icon type="info-circle-o" />
                    </Tooltip>
                }
                loading={loading}
                total={ numeral(6560).format('0,0') }
                footer={
                    <Field
                        label="转化率"
                        value="60%"
                    />
                }
                contentHeight={46}
            >
                <MiniBar data={visitData} />
            </ChartCard>
        </Col>
        <Col {...colResponsiveProps}>
            <ChartCard
                bordered={false}
                title="运营活动效果"
                action={
                    <Tooltip
                        title="运营活动效果"
                    >
                        <Icon type="info-circle-o" />
                    </Tooltip>
                }
                loading={loading}
                total='78%'
                footer={
                    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                        <Trend flag="up" style={{ marginRight: 16 }}>
                            周同比
                            <span className={styles.trendText}>12%</span>
                        </Trend>
                        <Trend flag="down">
                            日同比
                            <span className={styles.trendText}>11%</span>
                        </Trend>
                    </div>
                }
                contentHeight={46}
            >
                <MiniProgress
                    precent={78}
                    strokeWidth={8}
                    target={80}
                    targetLabel='目标值：80%'
                    color="#13C2C2"
                />
            </ChartCard>
        </Col>
    </Row>
));

export default IntroduceRow;
