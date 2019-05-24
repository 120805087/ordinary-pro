import request from '@/utils/request';

class List {
    // 获取 list 列表
    queryRule(params) {
        return request('/api/rule', {
            method: 'GET',
            params
        })
    }

    addRule(params) {
        return request('/api/rule', {
            method: 'POST',
            data: {
                ...params,
                method: 'post'
            }
        })
    }

    removeRule(params) {
        return request('/api/rule', {
            method: 'POST',
            data: {
                ...params,
                method: 'delete'
            }
        })
    }
};

export default List;
