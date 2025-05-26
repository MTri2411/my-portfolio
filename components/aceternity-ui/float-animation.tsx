"use client";

import { motion } from "framer-motion";
import React from "react";
import { cn } from "@/lib/utils";

export const FloatAnimation = ({
  children,
  className,
  amplitude = 20,
  duration = 3,
  delay = 0,
  direction = "y",
}: {
  children: React.ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  delay?: number;
  direction?: "x" | "y" | "both";
}) => {
  let animationProps = {};
  
  if (direction === "y") {
    animationProps = {
      y: [`-${amplitude}px`, `${amplitude}px`]
    };
  } else if (direction === "x") {
    animationProps = {
      x: [`-${amplitude}px`, `${amplitude}px`]
    };
  } else {
    animationProps = {
      y: [`-${amplitude}px`, `${amplitude}px`],
      x: [`-${amplitude/2}px`, `${amplitude/2}px`]
    };
  }

  return (
    <motion.div
      className={cn("", className)}
      animate={animationProps}
      transition={{
        repeat: Infinity,
        repeatType: "reverse",
        duration,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}; 