import React from 'react';
import { Tooltip } from 'antd';
import styles  from './index.less';

const MiniProgress = ({targetLabel, precent, strokeWidth, target, color}) => (
    <div className={styles.miniProgress}>
        <Tooltip title={targetLabel}>
            <div className={styles.target} style={{ left: `${target}%` || null }}>
                <span style={{ backgroundColor: color || null }}></span>
                <span style={{ backgroundColor: color || null }}></span>
            </div>
        </Tooltip>
        <div className={styles.progressWrap}>
            <div className={styles.progress}
                style={{
                    width: `${precent}%` || null,
                    height: strokeWidth || null,
                    backgroundColor: color || null
                }}
            ></div>
        </div>
    </div>
);

export default MiniProgress;
