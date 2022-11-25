import axios from './base';

class Auth_Apis {
    async login_post(data: any) { return await axios.post('/login', data) }

    async register_post(data: any) { return await axios.post('/register', data)}
}

export default new Auth_Apis();