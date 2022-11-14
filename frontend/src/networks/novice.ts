import axios from './index';

class Novice_Apis {
    closeExperts_get(params: any) { return axios.get(`/novice/${params.longitude}/${params.latitude}/${params.field}`).then(data => data).catch(err => err) }

    bookAppointment_post(data: any) { return axios.post('/novice/book', data).then(data => data).catch(err => err) }
}

export default new Novice_Apis();