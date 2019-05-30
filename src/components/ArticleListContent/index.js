import React from 'react';
import moment from 'moment';
import { Avatar } from 'antd';
import styles from './index.less';

const ArticleListContent = ({ data: { content, updateAt, avatar, owner, href } }) => (
    <div className={styles.listContent}>
        <div className={styles.desc}>{content}</div>
        <div className={styles.extra}>
            <Avatar src={avatar} size="small" />
            <span>发布在</span>
            <a href={href}>{href}</a>
            <em>{moment(updateAt).format('YYYY-MM-DD HH:mm')}</em>
        </div>
    </div>
);

export default ArticleListContent;
