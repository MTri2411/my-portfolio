"use client";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useState } from "react";

export const TypingEffect = ({
  words,
  className,
  cursorClassName,
  delay = 1000,
}: {
  words: string | string[];
  className?: string;
  cursorClassName?: string;
  delay?: number;
}) => {
  // Convert to array if a single string
  const wordArray = Array.isArray(words) ? words : [words];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const typeText = () => {
      const currentWord = wordArray[currentWordIndex];
      const shouldDelete = isDeleting;

      if (shouldDelete) {
        // Deleting characters
        setCurrentText(currentWord.substring(0, currentText.length - 1));
        
        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % wordArray.length);
        }
      } else {
        // Typing characters
        setCurrentText(currentWord.substring(0, currentText.length + 1));
        
        if (currentText.length === currentWord.length) {
          // Finished typing current word
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, delay);
          return;
        }
      }
      
      // Calculate speed based on action
      const speed = isDeleting ? 80 : 150;
      timeout = setTimeout(typeText, speed);
    };
    
    timeout = setTimeout(typeText, 100);
    
    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, wordArray, delay]);

  return (
    <div className={cn("inline-block", className)}>
      <motion.span
        animate={controls}
        className="inline-block"
      >
        {currentText}
      </motion.span>
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className={cn("ml-1 inline-block h-4 w-[2px] bg-primary", cursorClassName)}
      />
    </div>
  );
}; 