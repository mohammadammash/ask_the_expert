import getLastSixMonthsNamesHelper from "../../Helpers/getLastSixMonthsNamesHelper";
import generateSortedIndicesHelper from "../../Helpers/GeneratedSortedLast6MonthsIndicesHelper";

type chats_count_type = {
    [key: number]: number
}
type appointments_count_type = {
    _id: number, count: number
}

const CalculateChatsAndAppointmentsStatsHelper = (chats_count: chats_count_type, appointments_count: [appointments_count_type]) => {

    const x_axis_labels = getLastSixMonthsNamesHelper();
    const appointments_result = [];
    const chats_result = [];
    const indices = generateSortedIndicesHelper();
    let appointments_total = 0;
    let chats_total = 0;

    for (let result of appointments_count) {
        const key = parseInt(result._id);
        const index = indices[key];
        appointments_total += result.count;
        appointments_result[index] = { value: result.count, dataPointText: result.count };

        chats_total += chats_count[key - 1];
        chats_result[index] = { value: chats_count[key - 1], dataPointText: chats_count[key - 1] };
    };

    return [x_axis_labels, appointments_result, appointments_total, chats_result, chats_total];
}

export default CalculateChatsAndAppointmentsStatsHelper;