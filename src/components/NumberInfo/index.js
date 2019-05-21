import React from 'react';
import { Icon } from 'antd';
import styles from './index.less';

const NumberInfo = ({
    subTitle,
    gap,
    total,
    status,
    subTotal
}) => (
    <div className={styles.numberInfo}>
        <div className={styles.numberInfoTitle}>{subTitle}</div>
        <div className={styles.numberInfoValue} style={ gap ? { marginTop: gap } : '' }>
            <span>
                {total}
            </span>
            {(status || subTotal) && (
                <span className={styles.subTotal}>
                    {subTotal}
                    {status && <Icon type={`caret-${status}`} />}
                </span>
            )}
        </div>
    </div>
);

export default NumberInfo;
