import React from 'react';
import { Icon } from 'antd';
import classnames from 'classnames';

import styles from './index.less';

const Trend = ({ colorful = true, reverseColor = false, flag, children, ...rest }) => {
    const claString = classnames(
        styles.trendItem,
        {
            [styles.trendItemGrey]: !colorful,
            [styles.reverseColor]: reverseColor && colorful,
        }
    );
    return (
        <div className={claString} {...rest}>
            <span>{children}</span>
            {flag && (
                <span className={styles[flag]}>
                    <Icon type={`caret-${flag}`} />
                </span>
            )}
        </div>
    )
};

export default Trend;
