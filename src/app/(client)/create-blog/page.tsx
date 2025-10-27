"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ImagePlus } from "lucide-react";
import MediumEditor from "@/components/Editor";




interface BlogForm {
  title: string;
  description: string;
  coverImage?: File;
}

export default function CreateBlog() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BlogForm>();

  const onSubmit = async (data: BlogForm) => {
    try {
      setIsPublishing(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("content", content);
      if (data.coverImage) {
        formData.append("coverImage", data.coverImage);
      }

      const response = await fetch("/api/blogs/create", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Failed to publish blog:", error);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Blog Title"
            {...register("title", { required: true })}
            className="placeholder:text-muted-foreground/50 w-full border-none bg-transparent text-4xl font-bold outline-none"
          />
          <textarea
            placeholder="Short description"
            {...register("description", { required: true })}
            className="placeholder:text-muted-foreground/50 w-full resize-none border-none bg-transparent text-lg outline-none"
            rows={2}
          />
          <div className="rounded-lg border border-dashed p-4">
            <input
              type="file"
              accept="image/*"
              {...register("coverImage")}
              className="hidden"
              id="coverImage"
            />
            <label
              htmlFor="coverImage"
              className="flex cursor-pointer items-center justify-center gap-2"
            >
              <ImagePlus className="h-6 w-6" />
              Add Cover Image
            </label>
          </div>
        </div>

      <MediumEditor />

        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="rounded-md border px-4 py-2"
            onClick={() => router.back()}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPublishing}
            className="bg-primary text-primary-foreground rounded-md px-4 py-2 disabled:opacity-50"
          >
            {isPublishing ? "Publishing..." : "Publish"}
          </button>
        </div>
      </form>
    </div>
  );
}
