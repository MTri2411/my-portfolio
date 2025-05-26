"use client";

import { cn } from "@/lib/utils";
import { motion, useAnimationFrame } from "framer-motion";
import React, { useRef } from "react";

export const TextGradientEffect = ({
  children,
  className,
  colors = ["#27272a", "#58b7ff", "#27272a"],
  duration = 2,
  height = 200,
  width = 200,
  containerClassName,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  colors?: string[];
  duration?: number;
  height?: number;
  width?: number;
  containerClassName?: string;
  [key: string]: any;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const MousePosition = {
    x: useRef(0),
    y: useRef(0),
  };

  useAnimationFrame(() => {
    if (!containerRef.current) return;
    const { x, y } = MousePosition;
    const gradientX = x.current / containerRef.current.offsetWidth;
    const gradientY = y.current / containerRef.current.offsetHeight;
    containerRef.current.style.setProperty("--gradient-x", `${gradientX.toFixed(2)}`);
    containerRef.current.style.setProperty("--gradient-y", `${gradientY.toFixed(2)}`);
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    MousePosition.x.current = x;
    MousePosition.y.current = y;
  };

  const color = colors.join(", ");

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "relative h-full w-full overflow-hidden rounded-md",
        containerClassName
      )}
      style={{
        backgroundColor: colors[0],
        "--color": color,
        "--width": `${width}px`,
        "--height": `${height}px`,
        "--duration": `${duration}s`,
      } as React.CSSProperties}
      {...props}
    >
      <div className="pointer-events-none absolute -inset-px rounded-md bg-[radial-gradient(var(--width)_var(--height)_at_calc(var(--gradient-x,0.5)*100%)_calc(var(--gradient-y,0.5)*100%),var(--color))] opacity-70 transition-opacity duration-300 group-hover:opacity-100"></div>
      <div className={cn("relative z-10", className)}>{children}</div>
    </motion.div>
  );
}; 