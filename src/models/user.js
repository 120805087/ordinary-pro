import User from '@/services/user';
const user = new User();

export default {
    namespace: 'user',

    state: {
        currentUser: {}
    },

    effects: {
        *fetchCurrent(_, { call, put }) {
            const response = yield call(user.queryUser);
            yield put({
                type: 'saveCurrentUser',
                payload: response
            })
        }
    },

    reducers: {
        saveCurrentUser(state, action) {
            return {
                ...state,
                currentUser: action.payload || {}
            }
        }
    }
}
