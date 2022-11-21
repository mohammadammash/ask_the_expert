import axios from './base';

class Admin_Apis {
    async all_users_with_statistics_get() { return await axios.get('/admin') }

    async ban_or_unban_user_post(data: any) {return await axios.post('/admin/ban', data)}
}

export default new Admin_Apis();