import React, { Component, Suspense } from 'react';
import { connect } from 'dva';
import { Row, Col, Dropdown, Button, Icon, Menu } from 'antd';
import { getTimeDistance } from '@/utils/util';
import PageLoading from '@/components/pageLoading';
import moment from 'moment';
import styles from './index.less';

const IntroduceRow = React.lazy(() => import('./introduceRow'));
const SalesCard = React.lazy(() => import('./SalesCard'));
const TopSearch = React.lazy(() => import('./TopSearch'));
const ProportionSales = React.lazy(() => import('./ProportionSales'));

@connect(({ chart, loading }) => ({
    chart,
    loading: loading.effects['chart/fetch']
}))
export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            rangePickerValue: getTimeDistance('year'),
            salesType: 'all'
        }
    }

    componentDidMount() {
        const { dispatch } = this.props;
        this.reqRef = requestAnimationFrame(() => {
            dispatch({
                type: 'chart/fetch'
            })
        });
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 1000)
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'chart/clear'
        });
        cancelAnimationFrame(this.reqRef);
    }

    // sales 事件

    handleRangePickerChange = (rangePickerValue, date) => {
        this.setState({
            rangePickerValue
        });
        const { dispatch } = this.props;

        dispatch({
            type: 'chart/fetchSalesData',
            payload: {
                date
            }
        })
    }

    isActive = type => {
        const { rangePickerValue } = this.state;
        const value = getTimeDistance(type);
        if (!rangePickerValue[0] || !rangePickerValue[1]) {
            return '';
        }
        // moment isSame 比较是否相同
        if (rangePickerValue[0].isSame(value[0], 'day') && rangePickerValue[1].isSame(value[1], 'day')) {
            return styles.currentDate;
        }
        return '';
    }

    selectDate = type => {
        const { dispatch } = this.props;
        this.setState({
            rangePickerValue: getTimeDistance(type)
        });

        const date = []
        getTimeDistance(type).forEach(item => {
            date.push(item.format('YYYY-MM-DD'))
        })

        dispatch({
            type: 'chart/fetchSalesData',
            payload: {
                date
            }
        })
    }

    // ProportionSales radio事件
    handleChangeSalesType = e => {
        this.setState({
          salesType: e.target.value,
        });
    };

    render() {
        const { loading, rangePickerValue, salesType } = this.state;
        const { chart } = this.props;
        const {
            visitData,
            salesData,
            visitData2,
            searchData,
            salesTypeData,
            salesTypeDataOnline,
            salesTypeDataOffline
        } = chart;

        let salesPieData;
        salesType === 'all'
            ? salesPieData = salesTypeData
            : salesType === 'online'
            ? salesPieData = salesTypeDataOnline
            : salesPieData = salesTypeDataOffline

        const menu = (
            <Menu>
                <Menu.Item>操作一</Menu.Item>
                <Menu.Item>操作二</Menu.Item>
            </Menu>
        )

        const dropdownGroup = (
            <Dropdown overlay={menu} placement="bottomRight">
                <Icon style={{ cursor: 'pointer' }} type="ellipsis" />
            </Dropdown>
        )

        return (
            <React.Fragment>
                <Suspense fallback={<PageLoading />}>
                    <IntroduceRow loading={loading} visitData={visitData} />
                </Suspense>
                <Suspense fallback={null}>
                    <SalesCard
                        rangePickerValue={rangePickerValue}
                        salesData={salesData}
                        isActive={this.isActive}
                        handleRangePickerChange={this.handleRangePickerChange}
                        loading={loading}
                        selectDate={this.selectDate}
                    />
                </Suspense>
                <div className={styles.twoColLayout}>
                    <Row gutter={24} type="flex">
                        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                            <Suspense fallback={null}>
                                <TopSearch
                                    loading={loading}
                                    visitData2={visitData2}
                                    searchData={searchData}
                                    dropdownGroup={dropdownGroup}
                                />
                            </Suspense>
                        </Col>
                        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                            <Suspense fallback={null}>
                                <ProportionSales
                                    loading={loading}
                                    salesPieData={salesPieData}
                                    dropdownGroup={dropdownGroup}
                                    salesType={salesType}
                                    handleChangeSalesType={this.handleChangeSalesType}
                                />
                            </Suspense>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}
