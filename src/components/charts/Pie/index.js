import React, { Component } from 'react';
import { Chart, Tooltip, Geom, Coord, Guide} from 'bizcharts';
import { Divider } from 'antd';
import { DataView } from '@antv/data-set';
import classnames from 'classnames';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import ResizeObserver from 'resize-observer-polyfill';

import styles from './index.less';

const { Html } = Guide;

class Pie extends Component {
    state = {
        height: 0,
        legendData: [],
        legendBlock: false
    }

    componentDidMount() {
        window.addEventListener(
            'resize',
            () => {
                this.requestRef = requestAnimationFrame(() => this.resize());
            },
            { passive: true }
        );
        this.reiszeObserver();
    }

    componentWillUnmount() {
        window.cancelAnimationFrame(this.requestRef);
        window.removeEventListener('resize', this.resize);
    }

    reiszeObserver = () => {
        const ro = new ResizeObserver(entries => {
            const { height } = entries[0].contentRect;
            this.setState(preState => {
                if (preState.height !== height) {
                    return {
                        height
                    };
                }
                return null;
            })
        })
        if (this.chartDom) {
            ro.observe(this.chartDom);
        }
    }


    @Bind()
    @Debounce(300)
    resize() {
        console.log('size')
        const { hasLegend } = this.props;
        const { legendBlock } = this.state;
        if (!hasLegend || !this.root) {
            window.removeEventListener('resize', this.resize);
            return;
        }
        if (this.root.parentNode.clientWidth <= 380) {
            if (!legendBlock) {
                this.setState({
                    legendBlock: true
                })
            }
        } else if (legendBlock) {
            this.setState({
                legendBlock: false
            })
        }
    }

    handleRoot  = ref => {
        this.root = ref;
    }

    componentDidUpdate(preProps) {
        const { data } = this.props;
        if (data !== preProps.data) {
          this.getLegendData();
        }
    }

    getG2Instance = chart => {
        this.chart = chart;   // dataView transform 后的实例对象
        requestAnimationFrame(() => {
            this.getLegendData();
            this.resize();
        });
    }

    getLegendData  = () => {
        if(!this.chart) return;
        const geom = this.chart.getAllGeoms()[0]; // 获取所有的图形
        if(!geom) return;
        const items = geom.get('dataArray') || []; // 获取对应的图形

        const legendData = items.map(item => {
            const origin = item[0]._origin;
            origin.color = item[0].color;
            origin.checked = true;

            return origin;
        })

        this.setState({
            legendData
        })
    }

    handleLegendClick = (item, i) => {
        const newItem = item;
        newItem.checked = !newItem.checked;

        const { legendData } = this.state;
        legendData[i] = newItem;

        const filteredLegendData  = legendData.filter(l => l.checked).map(l => l.x);

        if (this.chart) {
            this.chart.filter('x', val => filteredLegendData.indexOf(val) > -1);
        }

        this.setState({
            legendData,
        });
    }

    render() {
        const {
            valueFormat,
            subTitle,
            total,
            hasLegend = false,
            className,
            style,
            height: propsHeight,
            percent,
            color,
            inner = 0.75,
            animate = true,
            colors,
            lineWidth = 1
        } = this.props;

        const { height, legendData, legendBlock } = this.state;
        const pieClassName = classnames(styles.pie, className, {
            [styles.hasLegend]: !!hasLegend,
            [styles.legendBlock]: legendBlock
        })

        const {
            data,
            selected: propsSelected = true,
            tooltip: propsTooltip = true,
        } = this.props;

        console.log(data)

        let selected = propsSelected;
        let tooltip = propsTooltip;

          const defaultColors = colors;
          selected = selected || true;
          tooltip = tooltip || true;
          let formatColor;

        const scale = {
            x: {
              type: 'cat',
              range: [0, 1],
            },
            y: {
              min: 0,
            },
        };

        if (percent || percent === 0) {
            selected = false;
            tooltip = false;
            formatColor = value => {
                if (value === '占比') {
                    return color || 'rgba(24, 144, 255, 0.85)';
                }
                return '#F0F2F5';
            };
        }

        const tooltipFormat = [
            'x*percent',
            (x, p) => ({
                name: x,
                value: `${(p * 100).toFixed(2)}%`,
            }),
        ];

        const padding = [12, 0, 12, 0];

        const dv = new DataView();
        dv.source(data).transform({
            type: 'percent',
            field: 'y',
            dimension: 'x',
            as: 'percent',
        });

        return (
            <div ref={this.handleRoot} className={pieClassName} style={style}>
                <div ref={ref => {
                    this.chartDom = ref
                }}>
                   <div className={styles.chart}>
                        <Chart
                            scale={scale}
                            height={propsHeight || height}
                            data={dv}
                            forceFit
                            padding={padding}
                            animate={animate}
                            onGetG2Instance={this.getG2Instance}
                        >
                            {!!tooltip && <Tooltip showTitle={false} />}
                            <Coord type="theta" innerRadius={inner} />
                            <Guide>
                                <Html
                                position={["50%", "50%"]}
                                html={`<div class=${styles.total}>
                                        <h4>${subTitle}</h4>
                                        <p>${typeof total === 'function' ? total() : total}</div></p>
                                    `}
                                alignX="middle"
                                alignY="middle"
                                />
                            </Guide>
                            <Geom
                                style={{ lineWidth, stroke: '#fff' }}
                                tooltip={tooltip && tooltipFormat}
                                type="intervalStack"
                                position="percent"
                                color={['x', percent || percent === 0 ? formatColor : defaultColors]}
                                selected={selected}
                            />
                        </Chart>
                    </div>

                </div>
                {
                    hasLegend && (
                        <ul className={styles.legend}>
                            {legendData.map((item, i) => (
                                <li key={item.x} onClick={() => this.handleLegendClick(item, i)}>
                                    <span className={styles.dot}
                                        style={{
                                            backgroundColor: !item.checked ? '#aaa': item.color
                                        }}
                                    />
                                    <span className={styles.legendTitle}>{item.x}</span>
                                    <Divider type="vertical" />
                                    <span className={styles.percent}>
                                        {`${(Number.isNaN(item.percent) ? 0 : item.percent * 100).toFixed(2)}%`}
                                    </span>
                                    <span className={styles.value}>{valueFormat ? valueFormat(item.y) : item.y}</span>
                                </li>
                            ))}
                        </ul>
                    )
                }
            </div>
        )
    }
}

export default Pie;
