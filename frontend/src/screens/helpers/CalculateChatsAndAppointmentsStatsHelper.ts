import getLastSixMonthsNamesHelper from "./getLastSixMonthsNamesHelper";
import ConvertMonthNumbertoThreeLetterNameHelper from "./getLastSixMonthsNamesHelper";

type chats_count_type = {
    [key: number]: number
}
type appointments_count_type = {
    _id: number, count: number
}

const CalculateChatsAndAppointmentsStatsHelper = (chats_count: chats_count_type, appointments_count: [appointments_count_type]) => {
    const generateSortedIndices = () => {
        const current_date = new Date();
        let sixmonths_ago = new Date();
        sixmonths_ago.setMonth(current_date.getMonth() - 5)
        const end_month = current_date.getMonth() + 1;
        let start_month = sixmonths_ago.getMonth() + 1;

        //generate indices
        const indices = <any>{};
        let i = 0;
        while (start_month <= end_month) {
            indices[start_month] = i;
            start_month++;
            i++;
            if (start_month === 13) start_month = 1;
        }

        return indices;
    }

    const x_axis_labels = getLastSixMonthsNamesHelper();
    const appointments_result = [];
    const chats_result = [];
    const indices = generateSortedIndices();
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

    console.log('------------------');
    console.log(appointments_result);
    console.log(chats_result);
    console.log('------------------');
    return [x_axis_labels, appointments_result, appointments_total, chats_result, chats_total];
}

export default CalculateChatsAndAppointmentsStatsHelper;