import { routerRedux } from 'dva/router';
import Api from '@/services/api';
import { getPageQuery } from '@/utils/util';
import { setAuthority, clearAuthority } from '@/utils/authority';
import { stringify } from 'qs';

const api = new Api();

export default {
    namespace: 'login',

    state: {
        status: undefined
    },

    effects: {
        *login({ payload }, { call, put }) {
            const response = yield call(api.fakeAccountLogin, payload);
            yield put({
                type: 'changeLoginStatus',
                payload: response
            })

            if (response.status === 'ok') {
                setAuthority(response.currentAuthority);
                const urlParams = new URL(window.location.href);
                const params = getPageQuery();
                let { redirect } = params;
                if(redirect) {
                    const redirectUrlParams = new URL(redirect);
                    if (redirectUrlParams.origin === urlParams.origin) {
                        redirect = redirect.substr(urlParams.origin.length);
                    } else {
                        redirect = null;
                    }
                }
                yield put(routerRedux.replace(redirect || '/'));
            }
        },

        *getCaptcha({ payload }, { call }) {
            yield call(api.getFakeCaptcha, payload)
        },

        *logout(_, { put }) {
            yield put({
                type: 'changeLoginStatus',
                payload: {
                    status: false
                }
            })
            clearAuthority();
            const { redirect } = getPageQuery();
            if (window.location.pathname !== '/user/login' && !redirect) {
                yield put(
                    routerRedux.replace({
                        pathname: '/user/login',
                        search: stringify({
                            redirect: window.location.href
                        })
                    })
                )
            }
        }
    },

    reducers: {
        changeLoginStatus(state, { payload }) {
            return {
                ...state,
                status: payload.status,
                type: payload.type
            }
        }
    }
}
