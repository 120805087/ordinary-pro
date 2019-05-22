import React from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

export default class BasicForm extends React.Component {
    render() {
        return (
            <PageHeaderWrapper
                title='基础表单'
                content='表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。'
            >
                <div>bisicForm</div>
            </PageHeaderWrapper>
        )
    }
}
