import React from 'react';
import Link from 'umi/link';
import { PageHeader, Typography, Tabs } from 'antd';
import classnames from 'classnames';
import MenuContext from '@/layouts/MenuContext';
import { conversionBreadcrumbList } from './breadcrumb';
import styles from './index.less';

const { Title } = Typography;

const renderFooter = ({ tabList, tabActiveKey, onTabChange }) => {
    return tabList && tabList.length ? (
        <Tabs
            className={styles.tabs}
            activeKey={tabActiveKey}
            onChange={key => {
                if (onTabChange) {
                    onTabChange(key);
                }
            }}
        >
            {tabList.map(item => (
                <Tabs.TabPane tab={item.tab} key={item.key} />
            ))}
        </Tabs>
    ) : null;
};

const PageHeaderWrapper = ({
    children,
    hidePageTitle,
    title,
    content,
    hiddenBreadcrumb,
    ...restProps
}) => {
    return (
        <div style={{ margin: '-24px -24px 0' }} className={classnames(hidePageTitle ? styles.hidePageTitle : '', styles.main)}>
            <MenuContext.Consumer>
                {value => (
                    <PageHeader
                        title={
                            title && <Title level={4}>{title}</Title>
                        }
                        key="pageheader"
                        {...restProps}
                        breadcrumb={
                            !hiddenBreadcrumb && conversionBreadcrumbList({
                                ...value,
                                ...restProps,
                                home: '首页'
                            })
                        }
                        className={styles.pageHeader}
                        linkElement={Link}
                        footer={renderFooter(restProps)}
                    >
                        {content && <div className={styles.content}>{content}</div>}
                    </PageHeader>
                )}
            </MenuContext.Consumer>
            {children ? (
                <div className={styles['children-content']}>
                    {children}
                </div>
            ) : null}
        </div>
    )
};

export default PageHeaderWrapper;
