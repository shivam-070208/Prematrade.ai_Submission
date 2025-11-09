import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Blog from "@/models/BlogModel";
import { checkSession } from "@/utils/Session";

export async function POST(request: NextRequest) {
  try {
    const { description, coverImage, content, title } = await request.json();
    if (
      !description ||
      !coverImage ||
      !content ||
      !title ||
      description.trim() === "" ||
      coverImage.trim() === "" ||
      content.trim() === "" ||
      title.trim() === ""
    ) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 });
    }
    const user = await checkSession();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const blog = new Blog({
      description,
      coverImage: Buffer.from(coverImage, "base64"),
      content,
      title,
      author: user._id
    });
    await blog.save();
    return NextResponse.json({ message: "Blog created successfully", blog }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Server Side Error" }, { status: 500 });
  } 
}
