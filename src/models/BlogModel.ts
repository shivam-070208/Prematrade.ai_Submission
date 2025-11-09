import mongoose from "mongoose";
import { Schema } from "mongoose";
interface iBlog {
  title: string;
  description: string;
  coverImage: Buffer;
  content: string;
  author: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
}


const BlogSchema = new Schema<iBlog>({
  title: {
    type: String,
    required: true,
  },
  description:{
    type: String,
    required: true,
  },
  coverImage: {
    type: Buffer,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

export default Blog;