import React, { PureComponent } from 'react';
import Link from 'umi/link';
import { Menu, Icon } from 'antd';
import { urlToList } from '../_utils/pathTools';
import { getMenuMatches } from './siderMenuUtils';

const SubMenu = Menu.SubMenu;

export default class BaseMenu extends PureComponent {

    //获取选中的keys
    getSelectedMenuKeys = (pathname) => {
        const { flatMenuKeys } = this.props;
        return urlToList(pathname).map(itemPath => getMenuMatches(flatMenuKeys, itemPath).pop());
    }

    // 获取子节点
    getNavMenuItems = (menuData) => {
        if(!menuData) {
            return null
        }

        return menuData
            .map(item => this.getSubMenuOrItem(item))
            .filter(item => item)
    }

    getSubMenuOrItem(item) {
        if(item.children && !item.hideChildrenInMenu && item.children.some(it => it.name)) {
            return (
                <SubMenu
                    title={
                        item.icon ? (
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.name}</span>
                            </span>
                        ) : (
                            item.name
                        )
                    }
                    key={item.path}
                >
                    {this.getNavMenuItems(item.children)}
                </SubMenu>
            )
        }
        return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>
    }

    // 判断是不是外链， 返回 Link 或者 a
    getMenuItemPath = (item) => {
        if(/^https?:\/\//.test(item.path)) {
            return (
                <a href={item.path} targte={item.target}>
                    {item.icon ? <Icon type={item.icon} /> : null}
                    <span>{item.name}</span>
                </a>
            )
        }
        const { location, isMobile, onCollapsed } = this.props;

        return (
            <Link
                to={item.path}
                replace={item.path === location.pathname}
                onClick={
                    isMobile ? () => {
                        onCollapsed(true)
                    } : undefined
                }
            >
                {item.icon ? <Icon type={item.icon} /> : null}
                <span>{item.name}</span>
            </Link>
        )
    }

    render() {
        const {
            openKeys,
            menuData,
            handleOpenChange,
            location: { pathname },
            collapsed,
            navTheme
        } = this.props;
        let selectedKeys = this.getSelectedMenuKeys(pathname);
        // selectkeys 不存在
        if(!selectedKeys.length && openKeys) {
            selectedKeys = [openKeys[openKeys.length - 1]]
        }

        // openkeys 不存在
        let props = {}
        if(openKeys && !collapsed) {
            props = {
                openKeys : openKeys.length === 0 ? [...selectedKeys] : openKeys
            }
        }

        return (
            <Menu
                theme={navTheme}
                mode="inline"
                selectedKeys={selectedKeys}
                onOpenChange={handleOpenChange}
                style={{ lineHeight: '64px', padding: '16px 0' }}
                {...props}
            >
                {this.getNavMenuItems(menuData)}
            </Menu>
        )
    }
}
