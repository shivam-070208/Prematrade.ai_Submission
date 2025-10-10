import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcryptjs";

// User interface definition
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Add static login method to the type definition
export interface IUserModel extends Model<IUser> {
  login(email: string, password: string): Promise<IUser | null>;
}

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [30, "Username can be at most 30 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    firstName: {
      type: String,
      maxlength: [50, "First name can be at most 50 characters long"],
      required: true,
    },
    lastName: {
      type: String,
      maxlength: [50, "Last name can be at most 50 characters long"],
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.pre<IUser>("save", async function (next) {
  if (this.isModified("password")) {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  }
  next();
});

UserSchema.statics.login = async function (email: string, password: string) {
  const user = await this.findOne({ email });
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  return user;
};

// Create the User model from the schema
const User =
  (mongoose.models.User ||
    mongoose.model<IUser, IUserModel>("User", UserSchema)) as IUserModel;

export default User;
