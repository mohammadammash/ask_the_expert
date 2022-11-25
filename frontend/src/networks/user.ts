import axios from './base';

class User_Apis {
    async user_get() { return await axios.get('/user') }

    async user_update(data:any){return await axios.put('/user', data)}

    async leaderboard_get() { return await axios.get('/user/leaderboard') }

    async appointment_delete(data: any) { return await axios.delete('/user/appointment', { data: { appointment_id: data } }) }
}

export default new User_Apis();