
import mongoose from "mongoose";
import { isEmail } from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
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
  password: {
    type: String,
    trim: true,
    required: [true, "A user must have a password"],
    minlength: [6, "Minimum password length is 6 characters"],
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
    type: Array,
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
    type: Array,
    choice: {
      type: String,
      trim: true,
      required: [true, "A user must have a program choice"],
      lowercase: true,
    },
  },

  progDruration: {
    type: Array,
    startDate: {
      type: String,
      trim: true,
      required: [true, "A user must have a start date"],
      lowercase: true,
    },
    endDate: {
      type: String,
      trim: true,
      required: [true, "A user must have an end date"],
      lowercase: true,
    },
  },

  eduBackground: {
    type: Array,
    background1: {
      type: String,
      trim: true,
      required: [true, "A user must have a first edu background"],
      lowercase: true,
    },
    background2: {
      type: String,
      trim: true,
      required: [true, "A user must have a second edu background"],
      lowercase: true,
    },
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

//encrypt password before save
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//create a custom login method on the model to decrypt the password
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });

  if (user) {
    const auth = await bcrypt.compare(password, user.password);

    if (auth) {
      return user;
    } else {
      throw Error("incorrect password");
    }
  } else {
    throw Error("This account does not exist");
  }
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
