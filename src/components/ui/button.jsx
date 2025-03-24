import React from "react";
import { cn } from "@/lib/utils";

export const Button = (
  ({ className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border-white border-2",
          className
        )}
        {...props}
      />
    );
  }
);
