import List from '@/services/list';
const list = new List();

export default {
    namespace: 'list',

    state: {
        list: []
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(list.queryFakeList, payload);
            yield put({
                type: 'queryList',
                payload: response
            });
        },
        *appendFetch({ payload }, { call, put }) {
            const response = yield call(list.queryFakeList, payload);
            yield put({
                type: 'appendList',
                payload: response
            })
        },
        *submit({ payload }, { call, put }) {
            let callback;
            if (payload.id) {
                callback = Object.keys(payload).length === 1 ? list.removeFakeList : list.updateFakeList;
            } else {
                callback = list.addFakeList;
            }
            const response = yield call(callback, payload);
            yield put({
                type: 'queryList',
                payload: response
            })
        }
    },

    reducers: {
        queryList(state, action) {
            return {
                ...state,
                list: action.payload
            }
        },
        appendList(state, action) {
            return {
                ...state,
                list: state.list.concat(action.payload)
            }
        }
    }
}
