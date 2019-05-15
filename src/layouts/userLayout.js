import React from 'react';
import { connect } from 'dva';
import DocumentTitle from 'react-document-title';
import getPageTitle from '@/utils/getPageTitle';
import logo from '../assets/logo.svg';
import { title } from '../defaultSetting';

import styles from './userLayout.less';

@connect(({ menu }) => ({
    menuData: menu.menuData,
    breadcrumbNameMap: menu.breadcrumbNameMap
}))
export default class UserLayout extends React.Component {

    componentDidMount() {
        const { route: { routes }, dispatch } = this.props;
        dispatch({
            type: 'menu/getMenuData',
            payload: { routes }
        })
    }

    render() {
        const {
            menuData,
            breadcrumbNameMap,
            location: { pathname },
            children
        } = this.props;
        return (
            <DocumentTitle title={getPageTitle(pathname, breadcrumbNameMap)}>
                <div className={styles.container} style={{ backgroundImage: 'url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg)' }}>
                    <div className={styles.header}>
                        <div className={styles.logo}>
                            <img src={logo} alt="logo"/>
                            <h1>{ title }</h1>
                        </div>
                        <div className={styles.desc}>学习 Ant Design 设计</div>
                    </div>
                    { children }
                </div>
            </DocumentTitle>
        )
    }
}
