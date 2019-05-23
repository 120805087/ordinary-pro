import { message } from 'antd';
import { routerRedux } from 'dva/router';
import Api from '@/services/api';
const api = new Api();

export default {
    namespace: 'form',

    state: {
        step: {
            payAccount: 'ant-design@alipay.com',
            receiverAccount: 'test@example.com',
            receiverName: 'Alex',
            amount: '500',
        }
    },

    effects: {
        *submitRegularForm({ payload }, { call }) {
            yield call(api.fakeSubmitForm, payload);
            message.success('提交成功');
        },
        *submitStepForm({ payload }, { call, put }) {
            yield call(api.fakeSubmitForm, payload);
            yield put({
                type: 'saveStepFormData',
                payload
            });
            yield put(routerRedux.push('/form/step-form/result'));
        }
    },

    reducers: {
        saveStepFormData(state, { payload }) {
            return {
                ...state,
                step: {
                    ...state.step,
                    ...payload
                }
            }
        }
    }
};
