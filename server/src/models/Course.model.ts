import mongoose, { Mongoose, Schema } from "mongoose";
import { Password } from "../services/password";

export const contentTypes = {
  Article: "Article",
  Quiz: "Quiz",
  Video: "Video",
} as const;

export interface content {
  contentId: Schema.Types.ObjectId;
  ctype: string;
  contentName: string;
}

export interface chapter {
  title: string;
  contents: Array<content>;
}

export interface ICourse extends Document {
  title: string;
  chapters: Array<chapter>;
  createdBy: string;
}

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    chapters: [
      {
        chapterName: { type: String, require: true },
        chapterId: { type: Number, required: true },
        contents: [
          {
            contentName: { type: String, required: true },
            ctype: {
              type: String,
              enum: ["Article", "Quiz", "Video"],
            },
            contentId: {
              type: Schema.Types.ObjectId,
              ref: "Article" || "Quiz" || "Video",
            },
          },
        ],
      },
    ],
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    // enrolledUser: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  },
  {
    timestamps: true,
  }
);

export const CourseModel = mongoose.model<ICourse>("Course", CourseSchema);

const course = async () =>
  await CourseModel.findById("we123x12e1").populate("chapters.contents");
