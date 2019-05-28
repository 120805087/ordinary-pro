import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, List, Typography  } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './cardList.less';

const { Paragraph  } = Typography;

@connect(({ list, loading }) => (
    {
        list,
        loading: loading.models.list
    }
))
class CardList extends PureComponent {

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'list/fetch',
            payload: {
                count: 8
            }
        });
    }

    render() {
        const {
            list: { list },
            loading
        } = this.props;

        const content = (
            <div className={styles.pageHeaderContent}>
              <p>
                段落示意：蚂蚁金服务设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，
                提供跨越设计与开发的体验解决方案。
              </p>
              <div className={styles.contentLink}>
                <a>
                  <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" />{' '}
                  快速开始
                </a>
                <a>
                  <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" />{' '}
                  产品简介
                </a>
                <a>
                  <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" />{' '}
                  产品文档
                </a>
              </div>
            </div>
          );

        return (
            <PageHeaderWrapper
                title="卡片列表"
                content={content}
            >
                <div className={styles.cardList}>
                    <List
                        loading={loading}
                        grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
                        dataSource={['', ...list]}
                        renderItem={item => item ? (
                            <List.Item>
                                <Card
                                    hoverable
                                    className={styles.card}
                                    actions={[
                                        <a>操作一</a>,
                                        <a>操作二</a>
                                    ]}
                                >
                                    <Card.Meta
                                        avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                                        title={<a>{item.title}</a>}
                                        description={
                                            <Paragraph className={styles.desc} ellipsis={{ rows: 3 }}>
                                                {item.description}
                                            </Paragraph>
                                        }
                                    />
                                </Card>
                            </List.Item>
                        ) : (
                            <List.Item>
                                <Button type="dashed" className={styles.newButton}>
                                    <Icon type="plus" /> 新建产品
                                </Button>
                            </List.Item>
                        )}
                    />
                </div>
            </PageHeaderWrapper>
        )
    }
};

export default CardList;
