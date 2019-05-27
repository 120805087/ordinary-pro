import request from '@/utils/request';
import { stringify } from 'qs';

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

    updateRule(params={}) {
        return request(`/api/rule?${stringify(params.query)}`, {
            method: 'POST',
            data: {
                ...params.body,
                method: 'update'
            }
        })
    }
};

export default List;
