import React from 'react';
import { Menu } from 'antd';
import router from 'umi/router';

import styles from './index.less';

const { Item } = Menu;

class Settings extends React.Component {

    constructor(props) {
        super(props);
        const { match, location } = this.props;
        const menuMap = {
            base: '基本设置',
            security: '安全设置'
        };
        const key = location.pathname.replace(`${match.path}/`, '');
        this.state = {
            mode: 'inline',
            menuMap,
            selectKey: menuMap[key] ? key : 'base'
        }
    }

    getMenu = () => {
        const { menuMap } = this.state;
        return Object.keys(menuMap).map(item => <Item key={item}>{menuMap[item]}</Item>)
    }

    getRightTitle = () => {
        const { selectKey, menuMap } = this.state;
        return menuMap[selectKey];
    }

    selectKey = ({ key }) => {
        router.push(`/settings/${key}`);
        this.setState({
            selectKey: key
        })
    }

    render() {
        const { children } = this.props;
        const { mode, selectKey } = this.state;
        return (
            <div className={styles.main}>
                <div className={styles.leftMenu}>
                    <Menu mode={mode} selectedKeys={[selectKey]} onClick={this.selectKey}>
                        {this.getMenu()}
                    </Menu>
                </div>
                <div className={styles.right}>
                    <div className={styles.title}>{this.getRightTitle()}</div>
                    {children}
                </div>
            </div>
        )
    }
};

export default Settings;
