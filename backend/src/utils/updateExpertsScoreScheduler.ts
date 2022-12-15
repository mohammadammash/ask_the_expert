const nodeCron = require('node-cron');
const UserModel = require('../database/models/User');
const AppointmentModel = require('../database/models/Appointment');

//Update expert scores, function to run auto 12am by node scheduler
//node scheduler //run every night at 12 am
module.exports = () => {
    nodeCron.schedule("00 00 00 * * *", async () => {
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
        const data = await AppointmentModel.aggregate([
            {
                $match: { createdAt: { $gte: yesterday, $lte: today }, isReserved: true },
            },
        ]);

        if (!data) return;
        //calculate total number of appointments per experts
        const experts: any = {};
        for (let app of data) {
            const key: string = app.expert_id;
            experts[key] ? experts[key]++ : experts[key] = 1;
        }

        //update each expert score
        for (let expert_id of Object.keys(experts)) {
            const val = experts[expert_id] * 5;
            await UserModel.findByIdAndUpdate(expert_id, { $inc: { score: val } })
        }
    })
}