const UserModel = require('../../../database/models/User');

const autoTurnUserToOfflineAtEnd = (
    meetings_time: Number,
    single_session_time: Number,
    currentUser_id: String,
) => {
    const milliseconds_to_turn_user_to_unAvailable = (Number(meetings_time) - Number(single_session_time)) * 60000;
    setTimeout(async () => {
        console.log("🚀 ~ file: index.ts ~ line 17 ~ setTimeout ~", "hey timerr i am here");
        await UserModel.findByIdAndUpdate({ _id: currentUser_id }, { isAvailable: false });
    }, milliseconds_to_turn_user_to_unAvailable)
};

export default autoTurnUserToOfflineAtEnd;