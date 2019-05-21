import React from 'react';
import { Debounce, Bind } from 'lodash-decorators';
import {
    Chart,
    Geom,
    Axis,
    Tooltip
} from 'bizcharts';

import styles from '../index.less';

class Bar extends React.Component {

    state = {
        lableXaxisHide: true
    }

    componentDidMount() {
        window.addEventListener('resize', this.resize, { passive: true })
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    handleRoot = n => {
        this.node = n;
    }

    @Bind()
    @Debounce(400)
    resize() {
        if (!this.node) {
            return;
        }
        const canvasWidth = this.node.clientWidth;
        const originDataWidth = this.props.data.length * 30;
        const { lableXaxisHide } = this.state;

        if (canvasWidth <= originDataWidth) {
            if(lableXaxisHide) {
                this.setState({
                    lableXaxisHide: false
                })
            }
        } else if (!lableXaxisHide) {
            this.setState({
                lableXaxisHide: true
            })
        }
    }

    render() {
        const { lableXaxisHide } = this.state;
        const {
            height,
            title,
            forceFit = true,
            color = 'rgba(24, 144, 255, 0.85)',
            padding,
            data = []
        } = this.props;

        const scale = {
            x: {
                type: 'cat',
            },
            y: {
                min: 0,
            },
        };

        const tooltip = [
            'x*y',
            (x, y) => ({
                name: x,
                value: y,
            }),
        ];

        return (
            <div style={{ height }} ref={this.handleRoot} >
                <div>
                    <h4 className={styles.title} style={{ marginBottom: 25 }}>{title}</h4>
                    <Chart
                        height={title ? height - 41 : height}
                        data={data}
                        scale={scale}
                        forceFit={forceFit}
                        padding={padding || 'auto'}
                    >
                        <Axis name="x" label={ lableXaxisHide ? {} : null } />
                        <Axis name="y" />
                        <Tooltip showTitle={false} crosshairs={false} />
                        <Geom type="interval" position="x*y" color={color} tooltip={tooltip} />
                    </Chart>
                </div>
            </div>
        )
    }
}

export default Bar;
