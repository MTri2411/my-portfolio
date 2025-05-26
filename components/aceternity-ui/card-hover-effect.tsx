"use client";

import { cn } from "@/lib/utils";
import React, { createContext, useState, useContext, useRef, useEffect } from "react";

const MouseEnterContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

export const CardHoverEffect = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const [isMouseEntered, setIsMouseEntered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    containerRef.current.style.setProperty("--mouse-x", `${x}`);
    containerRef.current.style.setProperty("--mouse-y", `${y}`);
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        ref={containerRef}
        className={cn(
          "bg-transparent group/card relative",
          containerClassName
        )}
        onMouseEnter={() => setIsMouseEntered(true)}
        onMouseLeave={() => setIsMouseEntered(false)}
        onMouseMove={handleMouseMove}
      >
        <div className={cn("relative z-10", className)}>{children}</div>
        <div
          className={cn(
            "absolute inset-0 opacity-0 group-hover/card:opacity-100 transition duration-300",
            "bg-[radial-gradient(800px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,255,255,0.06),transparent_40%)]"
          )}
        />
      </div>
    </MouseEnterContext.Provider>
  );
};

export const CardItem = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const context = useContext(MouseEnterContext);
  const [isMouseEntered] = context || [false, () => {}];

  return (
    <div
      className={cn(
        "group/item relative rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden transition-all duration-300",
        isMouseEntered && "bg-zinc-50 dark:bg-zinc-800/70",
        containerClassName
      )}
    >
      <div
        className={cn(
          "absolute inset-0 opacity-0 group-hover/item:opacity-100",
          "bg-[radial-gradient(600px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(167,139,250,0.1),transparent_40%)]"
        )}
      />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
}; 