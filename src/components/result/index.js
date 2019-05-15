import React from 'react';
import { Icon } from 'antd';
import classnames from 'classnames';

import styles from './index.less';

export default function Result({
    className,
    type,
    title,
    description,
    extra,
    actions,
    ...restProps
}) {
    const iconMap = {
        success: <Icon className={styles.success} type="check-circle" theme="filled" />,
        error: <Icon className={styles.error} type="close-circle" theme="filled" />,
    };
    const claString = classnames(styles.result, className);
    return (
        <div className={claString} {...restProps}>
            <div className={styles.icon}>{iconMap[type]}</div>
            <div className={styles.title}>{title}</div>
            {description && <div className={styles.description}>{description}</div>}
            {extra && <div className={styles.extra}>{extra}</div>}
            {actions && <div className={styles.actions}>{actions}</div>}
        </div>
    )
}
