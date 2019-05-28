import React from 'react';
import Link from 'umi/link';
import { PageHeader, Typography  } from 'antd';
import classnames from 'classnames';
import MenuContext from '@/layouts/MenuContext';
import { conversionBreadcrumbList } from './breadcrumb';
import styles from './index.less';

const { Title } = Typography;

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
                        footer={null}
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
