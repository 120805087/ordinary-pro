import React, { createElement } from 'react';
import classnames from 'classnames';
import { Button } from 'antd';

import styles from './index.less';

export default class Exception extends React.PureComponent {
    static defaultProps = {
        backText: '回到首页',
        redirect: '/'
    }

    render() {
        const {
            type,
            desc,
            linkElement,
            redirect,
            backText
        } = this.props;
        return (
            <div className={styles.exception}>
                <div className={styles.imgBlock}>
                    <div className={styles.image} style={{ backgroundImage: 'url(https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg)' }}></div>
                </div>
                <div className={styles.content}>
                    <h1 className={styles.title}>{type}</h1>
                    <div className={styles.desc}>{desc}</div>
                    <div className={styles.actions}>
                        {
                            createElement(
                                linkElement,
                                {
                                    to: redirect
                                },
                                <Button type="primary">{backText}</Button>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}
