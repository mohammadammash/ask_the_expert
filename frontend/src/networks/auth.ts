import axios from 'axios';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = 'http://192.168.1.3:8000';

class Auth_Apis {
    async login_post(data: any) { return axios.post('/login', data).then(data => data).catch(err => err) }

    async register_post(data: any) { return axios.post('/register', data).then(data => data).catch(err => console.log(err)) }
}

export default new Auth_Apis();