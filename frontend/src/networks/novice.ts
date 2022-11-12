import axios from './index';

class Novice_Apis {
    closeExperts_get(params: any) { 
        return axios.get(`/novice/${params.longitude}/${params.latitude}/${params.field}`).then(data => data).catch(err => err) }
}

export default new Novice_Apis();