import React from 'react';

import styles from './index.less';

const Field = ({ label, value, ...rest }) => (
    <div className={styles.field} {...rest}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}</span>
    </div>
);

export default Field;
