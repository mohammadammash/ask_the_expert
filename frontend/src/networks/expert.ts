import axios from './index';

class Expert_Apis {
    goOnline_post(data: any) { return axios.post('/expert/go_online', data).then(data => data).catch(err => err) }
}

export default new Expert_Apis();