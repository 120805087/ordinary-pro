import React, { PureComponent } from 'react';
import { Select, Spin } from 'antd';
import { connect } from 'dva';
import styles from './GeographicView.less';

const { Option } = Select;

const nullSelectItem = {
    label: '',
    key: ''
}

@connect(({ geographic }) => {
    const { province, isLoading, city } = geographic;
    return {
        province,
        city,
        isLoading,
    };
})
class GeographicView extends PureComponent {

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'geographic/fetchProvince'
        });
    }

    componentDidUpdate(props) {
        const { dispatch, value } = this.props;

        if (!props.value && !!value && !!value.province) {
            dispatch({
                type: 'geographic/fetchCity',
                payload: value.province.key
            })
        }
    }

    selectProvinceItem = item => {
        const { dispatch, onChange } = this.props;
        dispatch({
            type: 'geographic/fetchCity',
            payload: item.key
        });
        onChange({
            province: item,
            city: nullSelectItem
        })
    }

    selectCityItem = item => {
        const { value, onChange } = this.props;
        onChange({
            province: value.province,
            city: item
        })
    }

    coversionObject = () => {
        const { value } = this.props;
        if (!value) {
            return {
                province: nullSelectItem,
                city: nullSelectItem
            }
        }
        const { province, city } = value;
        return {
            province: province || nullSelectItem,
            city: city || nullSelectItem
        }
    }

    getProvinceOption = () => {
        const { province } = this.props;
        return this.getOption(province);
    }

    getCityOption = () => {
        const { city } = this.props;
        return this.getOption(city);
    };

    getOption = list => {
        console.log(list)
        if (!list || list.length < 1) {
            return (
                <Option key={0} value={0}>没有找到选项</Option>
            );
        }
        return list.map(item => (
            <Option key={item.id} value={item.id}>{item.name}</Option>
        ));
    }

    render() {
        const { province, city } = this.coversionObject();
        const { isLoading } = this.props;
        return (
            <Spin spinning={isLoading} wrapperClassName={styles.row}>
                <Select
                    className={styles.item}
                    value={province}
                    labelInValue
                    showSearch
                    onSelect={this.selectProvinceItem}
                >
                    {this.getProvinceOption()}
                </Select>
                <Select
                    className={styles.item}
                    value={city}
                    labelInValue
                    showSearch
                    onSelect={this.selectCityItem}
                >
                    {this.getCityOption()}
                </Select>
            </Spin>
        )
    }
};

export default GeographicView;
