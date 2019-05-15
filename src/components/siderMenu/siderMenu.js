import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import Link from 'umi/link';
import classnames from 'classnames';
import { getDefaultCollapsedSubMenus } from './siderMenuUtils';
import BaseMenu from './baseMenu';

import styles from './index.less';

const { Sider } = Layout;

export default class SiderMenu extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            openKeys: getDefaultCollapsedSubMenus(props)
        }
    }

    static getDerivedStateFromProps(props, state) {
        const { location: { pathname }, flatMenuKeys } = props;
        if(pathname !== state.pathname || flatMenuKeys.length !== state.flatMenuKeysLen) {
            return {
                pathname: pathname,
                flatMenuKeysLen: flatMenuKeys.length,
                openKeys: getDefaultCollapsedSubMenus(props)
            }
        }
        return null;
    }

    isMainMenu  = key => {
        const { menuData } = this.props;
        return menuData.some(item => {
            if(key) {
                return item.path === key;
            }
            return false;
        })
    }

    handleOpenChange = openKeys => {
        const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
        this.setState({
            openKeys: moreThanOne ? [openKeys.pop()] : [...openKeys]
        })
    }

    render() {
        const { isMobile, collapsed, onCollapsed, logo, navTheme } = this.props;
        const { openKeys } = this.state;
        const defaultProps = collapsed ? {} : { openKeys }; // collapsed 为 true 时， 菜单隐藏，不传， 减少 openkeys 的计算
        return (
            <Sider
                theme={navTheme}
                trigger={null}
                collapsible
                collapsed={collapsed}
                breakpoint="lg"
                onCollapse={onCollapsed}
                width="256px"
                className={classnames(styles.sider, { [styles.clearShadow] : isMobile })}
            >
                <div className={styles.logo}>
                    <Link to="/">
                        <img src={logo} alt="ordinary pro"/>
                        <h1>Ordinary Pro</h1>
                    </Link>
                </div>
                <BaseMenu
                    handleOpenChange={this.handleOpenChange}
                    {...this.props}
                    {...defaultProps}
                />
            </Sider>
        )
    }
}
