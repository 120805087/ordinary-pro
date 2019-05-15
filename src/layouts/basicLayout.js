import React, { Component } from 'react';
import { Layout } from 'antd';
import { connect } from 'dva';
import Media from 'react-media'; // 响应式组件
import DocumentTitle from 'react-document-title'; // 设置 page title
import { ContainerQuery } from 'react-container-query'; // 增加全局的响应class
import classnames from 'classnames';
import getPageTitle from '@/utils/getPageTitle';
import { navTheme } from '../defaultSetting';
import { getAuthority } from '@/utils/authority';
import logo from '@/assets/logo.svg';

import SiderMenu from '../components/siderMenu';
import GlobalHeader from '../components/globalHeader';

import styles from './basicLayout.less';

const { Content } = Layout;

const query = {
    'screen-xs': {
      maxWidth: 575,
    },
    'screen-sm': {
      minWidth: 576,
      maxWidth: 767,
    },
    'screen-md': {
      minWidth: 768,
      maxWidth: 991,
    },
    'screen-lg': {
      minWidth: 992,
      maxWidth: 1199,
    },
    'screen-xl': {
      minWidth: 1200,
      maxWidth: 1599,
    },
    'screen-xxl': {
      minWidth: 1600,
    },
};

class BasicLayout extends Component {

    componentDidMount() {
        const {
            dispatch,
            route: { routes }
        } = this.props;
        if (!getAuthority()) {
            dispatch({
                type: 'login/logout'
            })
        }
        dispatch({
            type: 'menu/getMenuData',
            payload: { routes }
        })
    }

    componentDidUpdate(preProps, preState) {
        const { isMobile, collapsed } = this.props;
        if(isMobile && !preProps.isMobile && collapsed) {
            this.handleCollapsed(false)
        }
    }

    getLayoutStyle = () => {
        const { isMobile, collapsed } = this.props;
        if(!isMobile) {
            return {
                paddingLeft: collapsed ? '80px' : '256px'
            }
        }
        return null
    }

    handleCollapsed = collapsed => {
        const { dispatch } = this.props;
        dispatch({
            type: 'global/changeLayoutCollapsed',
            payload: collapsed
        })
    }

    // 点击菜单
    onMenuClick = ({key}) => {
        const { dispatch } = this.props;
        if (key === 'checkPass') {
            console.log('修改密码')
        }
        if (key === 'logout') {
            dispatch({
                type: 'login/logout'
            })
        }
    }

    render() {
        const {
            collapsed,
            children,
            isMobile,
            menuData,
            breadcrumbNameMap,
            location: { pathname }
        } = this.props;
        const layout = (
            <Layout>
                <SiderMenu
                    collapsed={collapsed}
                    onCollapsed={this.handleCollapsed}
                    isMobile={isMobile}
                    navTheme={navTheme}
                    menuData={menuData}
                    logo={logo}
                    {...this.props}
                />
                <Layout style={{
                    minHeight: '100vh',
                    transition: 'padding .2s',
                    ...this.getLayoutStyle()
                }}>
                    <GlobalHeader
                        onMenuClick={this.onMenuClick}
                        collapsed={collapsed}
                        handleCollapsed={this.handleCollapsed}
                        isMobile={isMobile}
                    />
                    <Content className={styles.content}>
                        { children }
                    </Content>
                </Layout>
            </Layout>
        )
        return (
            <DocumentTitle title={getPageTitle(pathname, breadcrumbNameMap)}>
                <ContainerQuery query={query}>
                    {params => (
                        <div className={classnames(params)}>{layout}</div>
                    )}
                </ContainerQuery>
            </DocumentTitle>
        )
    }
}

export default connect(({ global, menu }) => ({
    collapsed: global.collapsed,
    menuData: menu.menuData,
    breadcrumbNameMap: menu.breadcrumbNameMap
}))(props => (
    <Media query="(max-width: 599px)">
        { isMobile => <BasicLayout {...props} isMobile={isMobile} /> }
    </Media>
))
