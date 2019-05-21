import React, { memo } from 'react';
import { Card, Radio } from 'antd';
import { yuan, Pie } from '../../components/charts';

import styles from './index.less';

const ProportionSales = memo(({
    dropdownGroup,
    salesType,
    loading,
    salesPieData,
    handleChangeSalesType
}) => (
    <Card
        loading={loading}
        className={styles.salesCard}
        bordered={false}
        title="销售额类别占比"
        bodyStyle={{ padding: 24 }}
        extra={
            <div className={styles.salesCardExtra}>
                {dropdownGroup}
                <div className={styles.salesTypeRadio} >
                    <Radio.Group
                        value={salesType}
                        buttonStyle="outline"
                        onChange={handleChangeSalesType}
                    >
                        <Radio.Button value="all">全部渠道</Radio.Button>
                        <Radio.Button value="online">线上</Radio.Button>
                        <Radio.Button value="stores">门店</Radio.Button>
                    </Radio.Group>
                </div>
            </div>
        }
        style={{ marginTop: 24 }}
    >
        <h4 style={{ marginTop: 10, marginBottom: 32 }}>
            销售额
        </h4>
        <Pie
            hasLegend
            subTitle='销售额'
            total={yuan(salesPieData.reduce((pre, now) => now.y + pre, 0))}
            data={salesPieData}
            valueFormat={value => yuan(value)}
            height={270}
            lineWidth={4}
            style={{ padding: '8px 0' }}
        />
    </Card>
));

export default ProportionSales;
