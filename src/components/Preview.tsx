import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface BlogPreviewProps {
  title: string;
  description: string;
  coverImage?: string | null;
  content: string;
  isPublishPage?: boolean;
}

const Preview: React.FC<BlogPreviewProps> = ({
  title,
  description,
  coverImage,
  content,
  isPublishPage = false,
}) => {
  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handlePublish = async () => {
    setIsPublishing(true);
    setError(null);
    try {
      let coverImageData: string | undefined | null = coverImage;
      if (coverImageData?.startsWith("data:image/")) {
        coverImageData = coverImageData.split(",")[1];
      }
      const res = await fetch("/api/blog/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title,
          description,
          coverImage: coverImageData,
          content,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message || "Failed to publish blog");
        setIsPublishing(false);
        return;
      }

      router.push("/");
    } catch (err) {
      setError("An error occurred while publishing the blog.");
      setIsPublishing(false);
    }
  };

  return (
    <div className="mx-auto max-h-dvh max-w-3xl overflow-y-auto px-4 py-8">
      <h1 className="mb-3 text-4xl font-bold">{title}</h1>
      {coverImage && (
        <Image
          src={coverImage}
          alt="Cover"
          width={100}
          height={100}
          className="mb-6 max-h-72 w-full rounded-md object-scale-down"
        />
      )}
      <div
        className="prose prose-zinc max-w-none text-base"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {isPublishPage && (
        <div className="mt-8 flex flex-col items-end">
          {error && (
            <div className="mb-4 text-red-500 font-medium">{error}</div>
          )}
          <button
            onClick={handlePublish}
            disabled={isPublishing}
            className="bg-primary text-primary-foreground cursor-pointer rounded-md px-6 py-2 font-semibold shadow-2xs transition-all hover:shadow-none disabled:opacity-50"
          >
            {isPublishing ? "Publishing..." : "Publish"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Preview;
