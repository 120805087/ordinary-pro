import Geographic from '@/services/geographic';

const geographic = new Geographic();

export default {
    namespace: 'geographic',

    state: {
        province: [],
        city: [],
        isLoading: false
    },

    effects: {
        *fetchProvince(_, { call, put }) {
            yield put({
                type: 'changeLoading',
                payload: true
            });
            const response = yield call(geographic.queryProvince);
            yield put({
                type: 'setProvince',
                payload: response
            });
            yield put({
                type: 'changeLoading',
                payload: false
            })
        },
        *fetchCity({ payload }, { call, put }) {
            yield put({
                type: 'changeLoading',
                payload: true
            });
            const response = yield call(geographic.queryCity, payload);
            yield put({
                type: 'setCity',
                payload: response
            });
            yield put({
                type: 'changeLoading',
                payload: false
            });
        }
    },

    reducers: {
        setProvince(state, action) {
            return {
                ...state,
                province: action.payload
            }
        },
        setCity(state, action) {
            return {
                ...state,
                city: action.payload
            }
        },
        changeLoading(state, action) {
            return {
                ...state,
                isLoading: action.payload
            }
        }
    }
}
