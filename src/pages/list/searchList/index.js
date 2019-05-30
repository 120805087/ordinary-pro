import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { Input } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

class SearchList extends Component {

    handleTabChange = key => {
        const { match } = this.props;
        switch(key) {
            case 'articles':
                router.push(`${match.url}/articles`);
                break;
            case 'projects':
                router.push(`${match.url}/projects`);
                break;
            case 'applications':
                router.push(`${match.url}/applications`);
                break;
            default:
                break;
        }
    }

    render() {

        const tabList = [
            {
              key: 'articles',
              tab: '文章',
            },
            {
              key: 'projects',
              tab: '项目',
            },
            {
              key: 'applications',
              tab: '应用',
            },
        ];

        const { children, match, location } = this.props;

        const mainSearch = (
            <div style={{ textAlign: 'center' }}>
                <Input.Search
                    placeholder="请输入"
                    enterButton="搜索"
                    size="large"
                    onSearch={this.handleFormSubmit}
                    style={{ maxWidth: 522 }}
                />
            </div>
        )

        return (
            <PageHeaderWrapper
                title="搜索列表"
                content={mainSearch}
                tabList={tabList}
                tabActiveKey={`${location.pathname.replace(`${match.url}/`, '')}`}
                onTabChange={this.handleTabChange}
            >
                {children}
            </PageHeaderWrapper>
        )
    }
};

export default SearchList;
