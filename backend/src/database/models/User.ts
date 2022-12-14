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
    type: Date,
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
  },
  theme: {
    type: String,
  },
  user_type: {
    type: String,
    required: 'User Type is required',
  },
  isBanned: {
    type: Boolean,
    required: 'isBanned is required'
  },
  device_token: String,
  blocked_users: [
    {
      _id: {
        type: String,
        ref: "User",
      }
    }
  ],
  reviews: [
    {
      novice_id: {
        type: String,
        ref: 'User',
        required: 'novice id is req'
      },
      rating: {
        type: Number,
        required: 'rating is req'
      },
      content: {
        type: String,
      },
      createdAt: Date,
    },
  ],

  //START OF ONLY NOVICE:
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment'
    }
  ],
  //START OF ONLY NOVICE:

  //START OF ONLY EXPERT:
  appointments_groups: [
    {
      start_timestamp: {
        type: Date,
        required: 'start_timestamp is required'
      },
      end_timestamp: {
        type: Date,
        required: 'end_timestamp is required'
      },
      isActive: {
        type: Boolean,
      },
      appointments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Appointment'
        }
      ],
    },
  ],
  score: {
    type: Number,
  },
  isAvailable: {
    type: Boolean,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
},
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;