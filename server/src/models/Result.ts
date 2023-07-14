import mongoose, { Mongoose, Schema } from "mongoose";

const ResultSchema = new mongoose.Schema(
  {
    courseId: { type: Schema.Types.ObjectId, ref: "Course" },
    examId: { type: Schema.Types.ObjectId, ref: "Content" },
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
        title: { type: String, required: true },
        questionType: { type: Number, required: true },
        question: { type: String, required: true },
        marks: {
          type: Number,
          required: true,
        },
        options: [
          {
            label: { type: String, required: true },
            value: { type: Number, required: true },
            isCorrect: { type: Boolean, select: false },
          },
        ],
        answer: {
          type: Number || String,
          required: true,
        },
        isCorrectOption: {
          type: Boolean,
        },
        marksObtained: {
          type: Number,
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
