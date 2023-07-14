import mongoose, { Mongoose, Schema } from "mongoose";
import { Password } from "../services/password";

const CourseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    chapters: [
      {
        chapterName: { type: String, require: true },
        contents: [
          {
            name: { type: String, required: true },
            type: { type: Number, required: true },
            contentId: { type: Schema.Types.ObjectId, ref: "Content" },
          },
        ],
      },
    ],
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    enrolledUser: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.enrolledUser;
        delete ret.__v;
      },
    },
  }
);

export const CourseModel = mongoose.model("Course", CourseSchema);
