import axios from './index';

class User_Apis {
    user_get() { return axios.get('/user').then(data => data).catch(err => err) }

    leaderboard_get() { return axios.get('/user/leaderboard').then(data => data).catch(err => err) }
}

export default new User_Apis();