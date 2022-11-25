import axios from './base';

class Expert_Apis {
    async goOnline_post(data: any) { return await axios.post('/expert/go_online', data) }

    async goOffline_post() { return await axios.post('/expert/go_offline') }
}

export default new Expert_Apis();