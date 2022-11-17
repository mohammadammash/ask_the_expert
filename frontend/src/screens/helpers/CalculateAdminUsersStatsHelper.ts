import { USERTYPES } from "../../constants";
import { userType } from "../../hooks/UserContext";

const pieData = [
    { value: 0, color: "#009FFF", gradientCenterColor: "#006DFF", focused: true },
    { value: 0, color: "#BDB2FA", gradientCenterColor: "#8F80F3", focused: false },
];

const CalculateStats = (users: userType[]): [any, number, number] => {
    let [experts_total, novices_total] = [0, 0];
    for (let i = 0; i < users.length; i++) {
        const { user_type } = users[i];
        if (user_type === USERTYPES.EXPERT) experts_total++;
        else if (user_type === USERTYPES.NOVICE) novices_total++;
    }
    [pieData[0].value, pieData[1].value] = experts_total > novices_total ? [experts_total, novices_total] : [novices_total, experts_total];
    return [pieData, experts_total, novices_total];
};


export default CalculateStats;