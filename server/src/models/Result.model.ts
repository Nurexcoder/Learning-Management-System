import mongoose, { Mongoose, Schema } from "mongoose";

const ResultSchema = new mongoose.Schema(
  {
    courseId: { type: Schema.Types.ObjectId, ref: "Course" },
    examId: { type: Schema.Types.ObjectId, ref: "Quiz" },
    givenBy: { type: Schema.Types.ObjectId, ref: "User" },
    fullMarks: {
      type: Number,
      required: false,
    },
    obtainedMarks: {
      type: Number,
    },
    quizContent: [
      {
        qid: { type: Number, required: true },
        answer: {
          type: String,
        },
      },
    ],
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

export const ResultModel = mongoose.model("Result", ResultSchema);
