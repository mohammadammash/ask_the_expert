import axios from './base';

class Novice_Apis {
    async closeExperts_get(params: any) { return await axios.get(`/novice/${params.longitude}/${params.latitude}/${params.field}`) }

    async bookAppointment_post(data: any) { return await axios.post('/novice/book', data) }

    async addReview_post(data: any) {return await axios.post('/novice/review', data)}

    async removeReview_delete(data: any) {return await axios.delete('/novice/review', { data: { expert_id: data } })}
}

export default new Novice_Apis();