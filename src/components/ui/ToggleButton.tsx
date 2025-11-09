import { cn } from "@/lib/utils";
import React from "react";
type props = {
  isActive?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
};
export const ToggleButton: React.FC<props> = ({
  isActive,
  onClick,
  children,
  className,
}) => {
  return (
    <span
      onClick={onClick}
      className={cn(
        isActive && "bg-muted-foreground/30",
        !isActive && "text-muted-foreground",
        "cursor-pointer px-2 py-2 inline-block",
        className,
      )}
    >
      {children}
    </span>
  );
};
