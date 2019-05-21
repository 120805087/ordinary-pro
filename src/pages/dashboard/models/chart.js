import Api from '@/services/api';
const api =  new Api();

export default {
    namespace: 'chart',

    state: {
        visitData: [],
        visitData2: [],
        salesData: [],
        searchData: [],
        offlineData: [],
        offlineChartData: [],
        salesTypeData: [],
        salesTypeDataOnline: [],
        salesTypeDataOffline: [],
        radarData: [],
        loading: false,
    },

    effects: {
        *fetch(_, { call, put }) {
            const response = yield call(api.fakeChratData);
            yield put({
                type: 'save',
                payload: response
            })
        },
        *fetchSalesData( { payload }, { call, put }) {
            const response = yield call(api.fakeSalesData, payload);
            yield put({
                type: 'save',
                payload: response.salesData
            })
        }
    },

    reducers: {
        save(state, { payload }) {
            return {
                ...state,
                ...payload
            }
        },
        clear() {
            return {
                visitData: [],
                visitData2: [],
                salesData: [],
                searchData: [],
                offlineData: [],
                offlineChartData: [],
                salesTypeData: [],
                salesTypeDataOnline: [],
                salesTypeDataOffline: [],
                radarData: []
            }
        }
    }
}
