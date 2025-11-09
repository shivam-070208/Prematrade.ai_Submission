import React from "react";
import { BiLinkExternal, BiUpArrowAlt } from "react-icons/bi";
import { cn } from "@/lib/utils";

export default function Heroic() {
  return (
    <div className="text-foreground flex w-full flex-col items-center justify-center px-6 py-16 text-center font-sans">
      {/* Label */}
      <span
        className={cn(
          "bg-secondary text-secondary-foreground",
          "cursor-pointer px-3 py-2",
          "transition-all duration-75 ease-in-out",
          "shadow-xs hover:shadow-none",
        )}
      >
        Share and Solve <BiUpArrowAlt size={20} className="inline-block" />
      </span>

      {/* Heading */}
      <h1 className="text-foreground/90 mt-6 text-4xl leading-tight font-bold tracking-tight sm:text-5xl">
        Share Your Bugs, let Others to solve!
      </h1>
      {/* Subheading */}
      <p className="text-muted-foreground mt-4 max-w-xl text-sm sm:text-sm">
        Got a Bug, or Doubt Just share and let other to solve, test them out
        collaborate with others .
      </p>

      {/* Optional CTA Button */}
      <button className="btn-brutual mt-8 px-6! py-3!">
        Publish Your First Blog
        <BiLinkExternal className="ml-1 inline" />
      </button>
    </div>
  );
}
