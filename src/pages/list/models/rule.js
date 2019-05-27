import List from '@/services/list';
const list = new List();

export default {
    namespace: 'rule',

    state: {
        data: {
            list: [],
            pagination: {}

        }
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(list.queryRule, payload);
            yield put({
                type: 'save',
                payload: response
            })
        },
        *add({ payload }, { call, put }) {
            const response = yield call(list.addRule, payload);
            yield put({
                type: 'save',
                payload: response
            })
        },
        *remove({ payload }, { call, put }) {
            const response = yield call(list.removeRule, payload);
            yield put({
                type: 'save',
                payload: response
            })
        },
        *update({ payload }, { call, put }) {
            const response = yield call(list.updateRule, payload);
            yield put({
                type: 'save',
                payload: response
            });
        }
    },

    reducers: {
        save(state, action) {
            return {
                ...state,
                data: action.payload
            }
        }
    }
}
