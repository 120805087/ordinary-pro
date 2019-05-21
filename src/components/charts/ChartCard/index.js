import React from 'react';
import { Card } from 'antd';
import classnames from 'classnames';

import styles from './index.less';

const renderTotal = total => {
    let totalDom;
    switch (typeof total) {
        case 'undefined':
            totalDom = null;
            break;
        case 'function':
            totalDom = <div className={styles.total}>{total()}</div>;
        default:
            totalDom = <div className={styles.total}>{total}</div>
    }

    return totalDom;
}

class ChartCard extends React.PureComponent {
    renderContent = () => {
        const { contentHeight, title, avatar, action, total, footer, children, loading } = this.props;
        if (loading) {
            return false;
        }
        return (
            <div className={styles.chartCard}>
                <div className={classnames(styles.chartTop)}>
                    {avatar && <div className={styles.avatar}>{avatar}</div>}
                    <div className={styles.metaWrap}>
                        <div className={styles.meta}>
                            <span className={styles.title}>{title}</span>
                            <span className={styles.action}>{action}</span>
                        </div>
                        {renderTotal(total)}
                    </div>
                    {children && (
                        <div className={styles.content} style={{ height: contentHeight || 'auto' }}>
                            <div className={contentHeight && styles.contentFixed}>{children}</div>
                        </div>
                    )}
                    {footer && (
                        <div className={classnames(styles.footer, {
                            [styles.footerMargin] : !children
                        })}>
                                {footer}
                        </div>
                    )}
                </div>
            </div>
        )
    }

    render() {
        const {
            loading = false,
            contentHeight,
            title,
            avatar,
            action,
            total,
            footer,
            children,
            ...rest
        } = this.props;
        return (
            <Card loading={loading} bodyStyle={{ padding: '20px 24px 8px 24px' }} {...rest}>
                {this.renderContent()}
            </Card>
        )
    }
};

export default ChartCard;
