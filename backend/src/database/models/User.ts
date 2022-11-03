import mongoose from "../connection";

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: 'id is required'
  },
  firstName: {
    type: String,
    required: "firstName is required",
  },
  lastName: {
    type: String,
    required: "lastName is required",
  },
  email: {
    type: String,
    required: "email is required",
    unique: true,
  },
  password: {
    type: String,
    required: "password is required",
    select: false,
  },
  spoken_languages: {
    type: String,
    required: "spoken languages is required",
  },
  start_date: {
    type: String,
    required: 'Start Date is required',
  },
  about: {
    type: String,
    required: "About is required",
  },
  profile_url: {
    type: String,
    required: "profile_url is required",
  },
  field: {
    type: String,
    required: "Field is required",
  },
  speciality: {
    type: String,
    required: 'Speciality is required',
  },
  app_language: {
    type: String,
    required: "Field is required",
  },
  theme: {
    type: String,
    required: 'Theme is required',
  },
  user_type: {
    type: String,
    required: 'User Type is required',
  },
  isBanned: {
    type: Boolean,
    required: 'isBanned is required'
  },
  blocked_experts: [
    {
      type: String,
      ref: "Expert",
    }
  ],
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment'
    }
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    }
  ],
},
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;