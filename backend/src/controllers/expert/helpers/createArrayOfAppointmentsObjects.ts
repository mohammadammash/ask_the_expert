const createArrayOfAppointmentsObjects = (
    meetings_time: Number,
    single_session_time: Number,
    currentUser_id: String,
) => {
    const number_of_sessions = Number(meetings_time) / Number(single_session_time);
    const appointments = [];
    let now = new Date();
    let currentTs = new Date(now.getTime() + 5 * 60000);
    for (let i = 0; i < number_of_sessions; i++) {
        const end_timestamp = new Date(currentTs.getTime() + Number(single_session_time) * 60000);
        const tempAppointment = {
            expert_id: currentUser_id,
            isReserved: false,
            start_timestamp: currentTs,
            end_timestamp,
            notes: '',
        };
        currentTs = end_timestamp;
        appointments.push(tempAppointment);
    }

    return appointments;
};

export default createArrayOfAppointmentsObjects;