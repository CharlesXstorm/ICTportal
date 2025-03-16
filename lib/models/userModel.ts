import mongoose, { Model } from "mongoose";
import { isEmail } from "validator";
import bcrypt from "bcryptjs";

// Define the User interface (for individual documents)
interface IUser extends Document {
  _id?: string;
  lastName?: string;
  firstName?: string;
  email: string;
  password: string;
  createdAt?: Date;
}

// Define the User model interface (to include custom static methods)
interface IUserModel extends Model<IUser> {
  login(email: string, password: string): Promise<IUser>;
}

const userSchema = new mongoose.Schema<IUser, IUserModel>({
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
  email: {
    type: String,
    trim: true,
    required: [true, "A user must have an email"],
    lowercase: true,
    unique: [true, "duplicate key: The email is already registered"],
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    trim: true,
    required: [true, "A user must have a password"],
    minlength: [6, "Minimum password length is 6 characters"],
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
userSchema.statics.login = async function (
  email: string,
  password: string
): Promise<IUser> {
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

export const userModel =
  (mongoose.models.user as unknown as IUserModel) ||
  mongoose.model<IUser, IUserModel>("user", userSchema);

// export default userModel;
