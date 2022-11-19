import axios from './base';

class Novice_Apis {
    closeExperts_get(params: any) { return axios.get(`/novice/${params.longitude}/${params.latitude}/${params.field}`).then(data => data).catch(err => err) }

    bookAppointment_post(data: any) { return axios.post('/novice/book', data).then(data => data).catch(err => err) }

    addReview_post(data: any) {
        return axios.post('/novice/review', data).then(data => data).catch(error => error)
    }

    removeReview_delete(data: any) {
        return axios.delete('/novice/review', { data: { expert_id: data } }).then(data => data).catch(error => error)
    }
}

export default new Novice_Apis();