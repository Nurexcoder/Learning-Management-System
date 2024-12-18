import mongoose, { Mongoose, Schema } from "mongoose";

export interface IReview extends Document {
  courseId: string;
  givenBy: string;
  rating: number;
  desc: string;
}

const ReviewSchema = new mongoose.Schema(
  {
    courseId: { type: Schema.Types.ObjectId, ref: "Course" },
    givenBy: { type: Schema.Types.ObjectId, ref: "User" },
    rating: { type: Number, required: true },
    desc: { type: String, required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

export const ReviewModel = mongoose.model("Review", ReviewSchema);
