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
}

export default Api;
