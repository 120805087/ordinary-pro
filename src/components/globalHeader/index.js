import React, { PureComponent } from 'react';
import { Layout, Icon, Spin, Dropdown, Avatar, Menu } from 'antd';
import classnames from 'classnames';
import { getFirstChart } from '@/utils/util';

import styles from './index.less';

const { Header } = Layout;

export default class GlobalHeader extends PureComponent {

    toggleClick = () => {
        const { collapsed, handleCollapsed } = this.props;
        handleCollapsed(!collapsed)
    }

    getWidth = () => {
        const { collapsed, isMobile }  = this.props;
        if(isMobile) {
            return { width: '100%' }
        }
        return {
            width: collapsed ? 'calc( 100% - 80px )' : 'calc( 100% - 256px )'
        }
    }

    render() {
        const name = 'admin';
        const menu = (
            <Menu className={styles.menu} onClick={this.props.onMenuClick}>
                <Menu.Item key="checkPass">
                    <Icon type="user" />
                    <span>修改密码</span>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="logout" >
                    <Icon type="logout" />
                    <span>退出登录</span>
                </Menu.Item>
            </Menu>
        )
        return (
            <div className={classnames(styles.header, styles.fixedHeader)}>
                <Header style={{...this.getWidth()}}>
                    <span className={styles.trigger} onClick={this.toggleClick}>
                        <Icon type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'} />
                    </span>
                    <div className={styles.right}>
                        {
                            name ? (
                                <Dropdown overlay={menu} placement="bottomRight">
                                    <span className={styles.action}>
                                        <Avatar className={styles.avatar}>
                                            <span>{getFirstChart(name)}</span>
                                        </Avatar>
                                        <span>{name}</span>
                                    </span>
                                </Dropdown>
                            ) : (
                                <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
                            )
                        }
                    </div>
                </Header>
            </div>
        )
    }
}
