const UserModel = require('../../../database/models/User');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (email: String, password: String, _id: String) => {
    const user = await UserModel.findOne({ _id, email }).select("+password").populate('reviews.novice_id appointments appointments_groups.appointments blocked_users').lean();
    if (!user) return false;

    const matchingPassword = await bcrypt.compareSync(password, user.password);
    if (!matchingPassword) return 'unmatched';

    //check if user logging in is banned:
    if (user.isBanned) return 'banned';

    user.password = undefined; //remove pass from result
    const token = jwt.sign({ email, _id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "24h",
    });

    return { ...user, token };
};


export default loginUser;