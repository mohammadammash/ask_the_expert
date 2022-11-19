import axios from './base';

class Expert_Apis {
    goOnline_post(data: any) { return axios.post('/expert/go_online', data).then(data => data).catch(err => err) }

    goOffline_post() { return axios.post('/expert/go_offline').then(data => data).catch(err => err) }
}

export default new Expert_Apis();