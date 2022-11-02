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
  about: {
    type: String,
    required: "About is required",
  },
  profile_url: {
    type: String,
    required: "profile_url is required",
  },
  location: {
    type: String,
    required: "location is required",
  },
  speciality: {
    type: String,
    required: 'Speciality is required',
  },
  field: {
    type: String,
    required: "Field is required",
  },
  isBanned: {
    type: Boolean,
    required: 'isBanned is required'
  },
  start_date: {
    type: String,
    required: 'Start Date is required',
  },
  isAvailable: {
    type: Boolean,
    required: 'isAvailable is required'
  },
  score: {
    type: Number,
    required: 'Score is required'
  },
  app_language: {
    type: String,
    required: "App Language is required",
  },
  theme: {
    type: String,
    required: 'Theme is required',
  },
  blocked_novices: [
    {
      type: String,
      ref: "User",
    }
  ],
  appointments_groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AppointmentGroup'
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

const ExpertModel = mongoose.model("Expert", userSchema);

module.exports = ExpertModel;