import React from 'react';
import { Chart, Geom, Tooltip } from 'bizcharts';
import autoHeight from '../autoHeight';

import styles from '../index.less';

@autoHeight()
class MiniBar extends React.Component {
    render() {
        const {
            height,
            data = [],
            color = '#1890FF',
            forceFit = true
        } = this.props;

        const scale = {
            x: {
                type: 'cat'
            },
            y: {
                min: 0
            }
        }

        const padding = [36, 5, 30, 5];

        const tooltip = [
            'x*y',
            (x, y) => ({
                name: x,
                value: y
            })
        ];

        const chartHeight = height + 54;

        return (
            <div className={styles.miniChart} style={{ height }}>
                <div className={styles.chartContent}>
                    {height > 0 && (
                        <Chart
                            height={chartHeight}
                            scale={scale}
                            data={data}
                            forceFit={forceFit}
                            padding={padding}
                        >
                            <Tooltip showTitle={false} crosshairs={false} />
                            <Geom
                                type="interval"
                                position="x*y"
                                color={color}
                                tooltip={tooltip}
                            />
                        </Chart>
                    )}
                </div>
            </div>
        )
    }
};

export default MiniBar;
