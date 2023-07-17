import { Schema, model, Document, Types } from "mongoose";

export interface IVideo extends Document {
  title: string;
  url: string;
  isPreviewable: boolean;
  length: string;
  desc: string;
}

const videoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    isPreviewable: {
      type: Boolean,
      default: false,
    },
    length: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Video = model<IVideo>("Video", videoSchema);
