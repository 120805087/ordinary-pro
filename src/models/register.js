import Api from '@/services/api';
const api = new Api();
export default {
    namespace: 'register',

    state: {
        status: undefined,
    },

    effects: {
        *submit({ payload }, { call, put }) {
            const response = yield call(api.fakeRegister, payload);
            yield put({
                type: 'registerHandle',
                payload: response
            })
        }
    },

    reducers: {
        registerHandle(state, { payload }) {
            return {
                ...state,
                status: payload.status
            }
        }
    }
}
