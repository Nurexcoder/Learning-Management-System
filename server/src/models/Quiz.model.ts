import { Schema, model, Document } from "mongoose";

type inputTypes = "radio" | "checkbox";

export interface Questions {
  qid: number;
  label: string;
  type: inputTypes;
  options?: string[];
  answer?: string;
}

export interface IQuiz extends Document {
  title: string;
  questions: Array<Questions>;
}

const quizSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    questions: [
      {
        qid: { type: Number, required: true },
        label: { type: Number, required: true },
        type: {
          type: String,
          enum: ["radio", "checkbox"],
        },
        options: { type: [String], required: true },
        correctOption: {
          type: Number,
          select: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Quiz = model<IQuiz>("Quiz", quizSchema);
