import { Schema, model, Document } from "mongoose";

export enum subType {
  Main,
  Secondary,
  Tartiary,
}

export interface article {
  subTitle: string;
  subType: subType;
  desc: string;
}

export interface IArticle extends Document {
  title: string;
  articles: Array<article>;
  createdBy: string;
}

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    articles: [
      {
        subTitle: { type: String, required: true },
        subType: {
          type: String,
          enum: ["Main", "Secondary", "Tartiary"],
          required: true,
        },
        desc: {
          type: String,
          required: true,
        },
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },

  {
    timestamps: true,
  }
);

export const Article = model<IArticle>("Article", articleSchema);
