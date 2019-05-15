import React from 'react';
import { Form, Tabs } from 'antd';
import LoginItem from './loginItem';
import LoginTab from './loginTab';
import LoginSubmit from './loginSubmit';
import LoginContext from './loginContext';

import styles from './index.less';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: props.defaultActiveKey,
            tabs: [],
            active: {}
        }
    }

    getContext = () => {
        const { tabs } = this.state;
        const { form } = this.props;
        return {
            tabUtil: {
                addTab: id => {
                    this.setState({
                        tabs: [...tabs, id]
                    });
                },
                removeTab: id => {
                    this.setState({
                        tabs: tabs.filter(currId => currId !== id)
                    });
                }
            },
            form,
            updateActive: activeItem => {
                const { type, active } = this.state;
                if (active[type]) {
                    active[type].push(activeItem);
                } else {
                    active[type] = [activeItem];
                }
                this.setState({
                    active
                })
            }
        }
    }

    //切换选项卡
    onSwitch = activeKey => {
        this.setState({
            type: activeKey
        })
        const { onChangeTab } = this.props;
        onChangeTab(activeKey)
    }

    // 表单提交
    handleSubmit = e => {
        e.preventDefault();
        const { form, onSubmit } = this.props;
        const { active, type } = this.state;
        const activeFileds = active[type];
        form.validateFields(activeFileds, { force: true }, (err, values) => {
            onSubmit(err, values)
        })
    }

    render() {
        const {
            children
        } = this.props;

        const { tabs } = this.state;

        const TabChildren = [];
        const otherChildren = [];
        React.Children.forEach(children, item => {
            if (!item) {
                return;
            }
            if (item.type.typeName === 'LoginTab') {
                TabChildren.push(item);
            } else {
                otherChildren.push(item);
            }
        })

        return (
            <LoginContext.Provider value={this.getContext()}>
                <div className={styles.login}>
                    <Form onSubmit={this.handleSubmit}>
                        {
                            tabs.length ? (
                                <React.Fragment>
                                    <Tabs
                                        animated={false}
                                        onChange={this.onSwitch}
                                    >
                                        {TabChildren}
                                    </Tabs>
                                    {otherChildren}
                                </React.Fragment>
                            ) : (
                                children
                            )
                        }
                    </Form>
                </div>
            </LoginContext.Provider>
        )
    }
}

Login.Tab = LoginTab;
Login.Submit = LoginSubmit;
Object.keys(LoginItem).forEach(item => {
    Login[item] = LoginItem[item];
});

export default Form.create()(Login);
