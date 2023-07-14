import mongoose, { Mongoose, Schema } from "mongoose";
import { Password } from "../services/password";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 1,
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
        ret.userType = ret.role == 0 ? "admin" : "user";
        delete ret.role;
      },
    },
  }
);

export const UserModel = mongoose.model("User", UserSchema);
