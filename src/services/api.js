import request from '@/utils/request';

class Api {

    // 登陆
    async fakeAccountLogin(params) {
        return request('/api/login/account', {
            method: 'POST',
            data: params
        })
    }

    // 获取验证码
    async getFakeCaptcha(captcha) {
        return request(`/api/captcha?mobile=${captcha}`);
    }

    // 注册
    async fakeRegister(params) {
        return request('/api/register', {
            method: 'POST',
            data: params
        })
    }

    // 获取图表数据
    async fakeChratData() {
        return request('/api/fake_chart_data')
    }

    // 获取 sales 数据
    async fakeSalesData(params) {
        return request('/api/fake_sales_data', {
            method: 'GET',
            params
        })
    }

    // 提交基础表单
    async fakeSubmitForm(params) {
        console.log(params)
        return request('/api/forms', {
            method: 'POST',
            data: params
        })
    }
}

export default Api;
