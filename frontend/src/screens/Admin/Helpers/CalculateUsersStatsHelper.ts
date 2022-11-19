import { USERTYPES } from "../../../constants";
import { userType } from "../../../hooks/UserContext";
import generateSortedIndices from "../../Helpers/GeneratedSortedLast6MonthsIndicesHelper";
import getLastSixMonthsNamesHelper from "../../Helpers/getLastSixMonthsNamesHelper";
import pieChart1Data from "./PieChart1Data";
import barChart2Data from "./BarChart2Data";

//START OF CHART 2 NEW USERS HELPERS
const indices = generateSortedIndices();
const incrementBarArrayDataOnSpecificIndex = (user_type: string, createdAt: Date) => {
    if (user_type === USERTYPES.EXPERT) {
        const month = createdAt.getMonth() + 1;
        const index = indices[month];
        let bar_array_index;
        if (index === 0) bar_array_index = 1;
        else bar_array_index = (index * 2) + 1;
        barChart2Data[bar_array_index].value++;
    }
    else { //Novice
        const month = createdAt.getMonth() + 1;
        const index = indices[month];
        let bar_array_index;
        if (index === 0) bar_array_index = 0;
        else bar_array_index = (index * 2);
        barChart2Data[bar_array_index].value++;
    }
}
//END OF CHART 2 NEW USERS HELPERS

//---------------------
//MAIN
const CalculateStats = (users: userType[]): [any, number, number, any, number, number] => {

    let [experts_total, novices_total, new_experts_total, new_novices_total] = [0, 0, 0, 0];
    //make sure bar data values are 0s
    for (let i = 0; i < barChart2Data.length; i++) barChart2Data[i].value = 0;
    const current_date = new Date();
    let [five, four, three, two, one] = [new Date(), new Date(), new Date(), new Date(), new Date()];
    five.setMonth(current_date.getMonth() - 5)
    four.setMonth(current_date.getMonth() - 4)
    three.setMonth(current_date.getMonth() - 3)
    two.setMonth(current_date.getMonth() - 2)
    one.setMonth(current_date.getMonth() - 1)

    for (let i = 0; i < users.length; i++) {
        let { user_type, createdAt } = users[i];
        createdAt = new Date(createdAt);
        //Calculate totals
        if (user_type === USERTYPES.EXPERT) {
            experts_total++;
            //Chart2 new users chart data calculate:
            if (createdAt < five) continue;
            incrementBarArrayDataOnSpecificIndex(user_type, createdAt);
            new_experts_total++;
        }
        else if (user_type === USERTYPES.NOVICE) {
            novices_total++;
            //Chart2  new users chart data calculate:
            if (createdAt < five) continue;
            incrementBarArrayDataOnSpecificIndex(user_type, createdAt);
            new_novices_total++;
        }
    }

    //Chart4: loop over barChart2Data and fill it with latest 6 months names 
    const month_labels = getLastSixMonthsNamesHelper();
    for (let i = 0; i < barChart2Data.length; i += 2) barChart2Data[i].label = month_labels[(i / 2) + 1];

    [pieChart1Data[0].value, pieChart1Data[1].value] = experts_total > novices_total ? [experts_total, novices_total] : [novices_total, experts_total];
    return [pieChart1Data, experts_total, novices_total, barChart2Data, new_experts_total, new_novices_total];
};


export default CalculateStats;