import React, { Component } from 'react';
import { Layout, Modal } from 'antd';
import { connect } from 'dva';
import Media from 'react-media'; // 响应式组件
import DocumentTitle from 'react-document-title'; // 设置 page title
import { ContainerQuery } from 'react-container-query'; // 增加全局的响应class
import classnames from 'classnames';
import Context from './MenuContext';
import getPageTitle from '@/utils/getPageTitle';
import { navTheme } from '../defaultSetting';
import { getAuthority } from '@/utils/authority';
import logo from '@/assets/logo.svg';

import SiderMenu from '../components/siderMenu';
import GlobalHeader from '../components/globalHeader';
import UpdatePassword from './UpdatePassword';

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

    state = {
        visible: false
    }

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
            type: 'user/fetchCurrent'
        });
        dispatch({
            type: 'menu/getMenuData',
            payload: { routes }
        });
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

    getContext = () => {
        const { location, breadcrumbNameMap } = this.props;
        return {
            location,
            breadcrumbNameMap
        }
    }

    // 修改密码操作
    openPassModal = () => {
        this.setState({
            visible: true
        })
    }

    closePassModal = () => {
        this.setState({
            visible: false
        })
    }

    onSubmit = e => {
        e.preventDefault();
        const { form } = this.formRef.props;

        form.validateFields((err, values) => {
            if (err) return;
            console.log(values)
            this.setState({
                visible: false
            })
        })
    }

    saveFormRef = formRef => {
        this.formRef = formRef;
    }

    // 点击菜单
    onMenuClick = ({key}) => {
        const { dispatch } = this.props;
        if (key === 'checkPass') {
            this.openPassModal()
        }
        if (key === 'logout') {
            dispatch({
                type: 'login/logout'
            })
        }
    }

    render() {
        const { visible } = this.state;
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
                <UpdatePassword wrappedComponentRef={this.saveFormRef}  visible={visible} onCancel={this.closePassModal} onSubmit={this.onSubmit} />
            </Layout>
        )
        return (
            <DocumentTitle title={getPageTitle(pathname, breadcrumbNameMap)}>
                <ContainerQuery query={query}>
                    {params => (
                        <Context.Provider value={this.getContext()}>
                            <div className={classnames(params)}>{layout}</div>
                        </Context.Provider>
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
