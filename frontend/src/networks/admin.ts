import axios from './base';

class Admin_Apis {
    all_users_with_statistics_get() { return axios.get('/admin').then(data => data).catch(err => err) }
}

export default new Admin_Apis();