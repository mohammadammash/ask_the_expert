import axios from './index';

class Auth_Apis {
    login_post(data: any) { return axios.post('/login', data).then(data => data).catch(err => err) }

    register_post(data: any) {
        return axios.post('/register', data).then(data => data).catch(error => error);
    }
}

export default new Auth_Apis();