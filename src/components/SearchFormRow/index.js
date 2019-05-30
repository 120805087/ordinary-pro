import React from 'react';
import classnames from 'classnames';
import styles from './index.less';

const SearchFormRow = ({ title, children, last, block, grid, ...rest }) => {

    const cls = classnames(styles.searchFormRow, {
        [styles.searchFormblock]: block,
        [styles.searchFormLast]: last,
        [styles.searchFormGrid]: grid
    });

    return (
        <div className={cls} {...rest}>
            {title && (
                <div className={styles.label}>
                    <span>{title}</span>
                </div>
            )}
            <div className={styles.content}>{children}</div>
        </div>
    )
};

export default SearchFormRow;
