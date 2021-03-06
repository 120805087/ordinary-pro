import React from 'react';
import { Chart, Axis, Tooltip, Geom } from 'bizcharts';
import autoHeight from '../autoHeight';

import styles from '../index.less';

@autoHeight()
class MiniArea extends React.PureComponent {
    render() {
        const {
            height,
            data = [],
            forceFit = true,
            color = 'rgba(24, 144, 255, 0.2)',
            borderColor = '#1089ff',
            scale = {},
            borderWidth = 2,
            line,
            xAxis,
            yAxis,
            animate = true
        } = this.props;

        const padding = [36, 5, 30, 5];
        const chartHeight = height + 54;

        const tooltip = [
            'x*y',
            (x, y) => ({
                name: x,
                value: y
            })
        ];

        return (
            <div className={styles.miniChart} style={{ height }}>
                <div className={styles.chartContent}>
                    {height > 0 && (
                        <Chart
                            animate={animate}
                            height={chartHeight}
                            forceFit={forceFit}
                            data={data}
                            padding={padding}
                        >
                            <Axis
                                name="x"
                                label={false}
                                line={false}
                                tickLine={false}
                                grid={false}
                                {...xAxis}
                            />
                            <Axis
                                name="y"
                                label={false}
                                line={false}
                                tickLine={false}
                                grid={false}
                                {...yAxis}
                            />
                            <Tooltip showTitle={false} crosshairs={false} />
                            <Geom
                                type="area"
                                position="x*y"
                                color={color}
                                tooltip={tooltip}
                                shape="smooth"
                                style={{
                                    fillOpacity: 1,
                                }}
                            />
                            {line ? (
                                <Geom
                                type="line"
                                position="x*y"
                                shape="smooth"
                                color={borderColor}
                                size={borderWidth}
                                tooltip={false}
                                />
                            ) : null }
                        </Chart>
                    )}
                </div>
            </div>
        )
    }
};

export default MiniArea;
