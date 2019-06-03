import request from '@/utils/request';

class User {

    async queryUser() {
        return request('/api/currentUser');
    }
}

export default User;
