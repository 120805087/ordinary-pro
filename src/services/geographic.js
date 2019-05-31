import request from '../utils/request';

class Geographic {

    // 获取省
    queryProvince() {
        return request('/api/geographic/province')
    }

    // 获取市
    queryCity(params='') {
        return request(`/api/geographic/city/${params}`)
    }
}

export default Geographic;
