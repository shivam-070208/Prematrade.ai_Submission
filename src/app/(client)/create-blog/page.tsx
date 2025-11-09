"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ImagePlus, X } from "lucide-react";
import MediumEditor from "@/components/Editor";
import Preview from "@/components/Preview";

interface BlogForm {
  title: string;
  description: string;
  coverImage?: File;
}

export default function CreateBlog() {
  const router = useRouter();
  const [content, setContent] = useState("");
  // Used only for showing preview state (not actual publishing)
  const [isPublishing, setIsPublishing] = useState(false);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State to show/hide preview modal and store preview data
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState<{
    title: string;
    description: string;
    coverImage: string | null;
    content: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BlogForm>();

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setValue("coverImage", file, { shouldValidate: true });
      const reader = new FileReader();
      reader.onloadend = () => setCoverImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setCoverImagePreview(null);
      setValue("coverImage", undefined, { shouldValidate: true });
    }
  };

  // When clicking publish, show the preview modal with correct data, no api submit
  const handlePreview = handleSubmit((data) => {
    setIsPublishing(true);
    setPreviewData({
      title: data.title,
      description: data.description,
      coverImage: coverImagePreview,
      content,
    });
    setShowPreview(true);
    setIsPublishing(false);
  });

  // Watch for form values for error hints
  const watchTitle = watch("title", "");
  const watchDescription = watch("description", "");

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 relative">
      {/* Absolute Preview Modal */}
      {showPreview && previewData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative bg-background rounded-lg shadow-lg max-w-3xl w-full mx-2">
            {/* Close Button */}
            <button
              onClick={() => setShowPreview(false)}
              className="absolute right-4 cursor-pointer top-4 z-10 p-2 text-foreground bg-background rounded-full hover:bg-muted transition"
              aria-label="Close preview"
              type="button"
            >
              <X className="h-6 w-6" />
            </button>
            <Preview
              title={previewData.title}
              description={previewData.description}
              coverImage={previewData.coverImage}
              content={previewData.content}
              isPublishPage={true}
            />
          </div>
        </div>
      )}

      <form onSubmit={handlePreview} className="space-y-6">
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
          <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed p-4">
            {/* Hidden file input, controlled via ref */}
            <input
              type="file"
              accept="image/*"
              {...register("coverImage")}
              ref={(e) => {
                register("coverImage").ref(e);
                fileInputRef.current = e;
              }}
              className="hidden"
              id="coverImage"
              onChange={handleCoverImageChange}
            />
            {coverImagePreview ? (
              <div className="flex w-full flex-col items-center gap-2">
                <img
                  src={coverImagePreview}
                  alt="Cover preview"
                  className="max-h-48 w-auto rounded-md border object-contain"
                  style={{ marginBottom: "0.5rem", maxWidth: "100%" }}
                />
                <label
                  htmlFor="coverImage"
                  className="text-primary-foreground bg-primary hover:bg-primary/80 flex cursor-pointer items-center justify-center gap-2 rounded-md px-3 py-1.5 transition"
                >
                  <ImagePlus className="h-6 w-6" />
                  Change Image
                </label>
              </div>
            ) : (
              <label
                htmlFor="coverImage"
                className="flex cursor-pointer items-center justify-center gap-2"
              >
                <ImagePlus className="h-6 w-6" />
                Add Cover Image
              </label>
            )}
          </div>
        </div>

        <MediumEditor setContent={setContent} />

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
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}
