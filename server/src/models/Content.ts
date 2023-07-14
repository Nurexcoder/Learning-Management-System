import mongoose, { Mongoose, Schema } from "mongoose";

const ContentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: Number, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    courseId: { type: Schema.Types.ObjectId, ref: "Course" },
    textContent: [
      {
        title: { type: String, required: true },
        paragraph: { type: String, required: true },
      },
    ],
    videoContent: {
      title: { type: String, required: true },
      url: { type: String, required: true },
      desc: { type: String, required: true },
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

export const ContentModel = mongoose.model("Content", ContentSchema);
