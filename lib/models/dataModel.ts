import mongoose from "mongoose";
import { isEmail } from "validator";

const dataSchema = new mongoose.Schema({
  user: {
    type: Array,
    default: {
      email: String,
      password: String,
    },
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "A user must have a last name"],
    lowercase: true,
  },
  firstName: {
    type: String,
    trim: true,
    required: [true, "A user must have a first name"],
    lowercase: true,
  },
  otherName: {
    type: String,
    trim: true,
    lowercase: true,
  },
  photo: {
    type: String,
    trim: true,
    required: [true, "A user must have a photo"],
    lowercase: true,
  },
  gender: {
    type: String,
    trim: true,
    required: [true, "A user must have a gender"],
    lowercase: true,
  },
  dateOfBirth: {
    type: String,
    trim: true,
    required: [true, "A user must have a DOB"],
    lowercase: true,
  },
  mobileNumber: {
    type: String,
    trim: true,
    required: [true, "A user must have a mobile number"],
    lowercase: true,
  },
  nationality: {
    type: String,
    trim: true,
    required: [true, "A user must have a nationality"],
    lowercase: true,
  },
  stateOfOrigin: {
    type: String,
    trim: true,
    required: [true, "A user must have a state of origin"],
    lowercase: true,
  },
  localGovArea: {
    type: String,
    trim: true,
    required: [true, "A user must have a local government area"],
    lowercase: true,
  },
  town: {
    type: String,
    trim: true,
    required: [true, "A user must have a town"],
    lowercase: true,
  },

  otherInfo: {
    email: {
      type: String,
      trim: true,
      required: [true, "A user must have an email"],
      lowercase: true,
      unique: [true, "The email is already registered"],
      validate: [isEmail, "Please enter a valid email"],
    },
    resAddress: {
      type: String,
      trim: true,
      required: [true, "A user must have a residence"],
      lowercase: true,
    },
    maritalStatus: {
      type: String,
      trim: true,
      required: [true, "A user must have a marital status"],
      lowercase: true,
    },
  },

  progInfo: {
    type: String,
    trim: true,
    required: [true, "A user must have a program choice"],
    lowercase: true,
  },

  qualification: {
    type: String,
    trim: true,
    required: [true, "A user must have a qualification"],
    lowercase: true,
  },

  referees: {
    name1: {
      type: String,
      trim: true,
      required: [true, "A user must have a first referee name"],
      lowercase: true,
    },
    phoneNumber1: {
      type: String,
      trim: true,
      required: [true, "A user must have a first referee phone number"],
      lowercase: true,
    },
    relationship1: {
      type: String,
      trim: true,
      required: [true, "A user must have a first referee relationship"],
      lowercase: true,
    },
    name2: {
      type: String,
      trim: true,
      required: [true, "A user must have a second referee name"],
      lowercase: true,
    },
    phoneNumber2: {
      type: String,
      trim: true,
      required: [true, "A user must have a second referee phone number"],
      lowercase: true,
    },
    relationship2: {
      type: String,
      trim: true,
      required: [true, "A user must have a second referee relationship"],
      lowercase: true,
    },
  },

  createdAt: {
    type: Date,
    default: () => new Date(new Date().getTime() + 60 * 60 * 1000),
    select: false,
  },
});

export const dataModel =
  mongoose.models.data || mongoose.model("data", dataSchema);
