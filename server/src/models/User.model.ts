import mongoose, { Mongoose, Schema } from "mongoose";
import { Password } from "../services/password";

export enum roles {
  admin,
  user,
}

export interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  role?: roles;
  coursesEnrolled: Array<Schema.Types.ObjectId>;
  reviews: Array<Schema.Types.ObjectId>;
}

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    coursesEnrolled: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
        ret.userType = ret.role == "admin" ? "admin" : "user";
        delete ret.role;
      },
    },
  }
);

export const UserModel = mongoose.model("User", UserSchema);
