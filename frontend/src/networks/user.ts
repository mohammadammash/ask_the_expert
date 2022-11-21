import axios from './base';

class User_Apis {
    async user_get() { return await axios.get('/user') }

    async leaderboard_get() { return await axios.get('/user/leaderboard') }

    async appointment_delete(data: any) { return await axios.delete('/user/appointment', { data: { appointment_id: data } }) }
}

export default new User_Apis();