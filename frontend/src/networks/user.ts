import axios from './index';

class User_Apis {
    user_get() { return axios.get('/user').then(data => data).catch(err => err) }

    leaderboard_get() { return axios.get('/user/leaderboard').then(data => data).catch(err => err) }

    appointment_delete(data: any) { return axios.delete('/user/appointment', { data: { appointment_id: data } }).then(data => data).catch(err => err) }
}

export default new User_Apis();