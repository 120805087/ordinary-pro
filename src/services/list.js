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

    queryFakeList(params={}) {
        return request('/api/fake_list', {
            method: 'GET',
            params
        })
    }

    addFakeList(params={}) {
        const { count = 5, ...restParams } = params;
        return request(`/api/fake_list?count=${count}`, {
            method: 'POST',
            data: {
                ...restParams,
                method: 'post',
            },
        });
    }
    removeFakeList(params={}) {
        const { count = 5, ...restParams } = params;
        return request(`/api/fake_list?count=${count}`, {
            method: 'POST',
            data: {
                ...restParams,
                method: 'delete',
            },
        });
    }
    updateFakeList(params={}) {
        const { count = 5, ...restParams } = params;
        return request(`/api/fake_list?count=${count}`, {
            method: 'POST',
            data: {
                ...restParams,
                method: 'update',
            },
        });
    }
};

export default List;
