"use client";

import { cn } from "@/utils/cn";
import React, { useEffect, useState } from "react";

export const ColourfulText = ({
  text,
  className,
  highlightClass = {},
}: {
  text: string;
  className?: string;
  highlightClass?: {
    keyword?: string;
    string?: string;
    comment?: string;
    number?: string;
    function?: string;
    property?: string;
    operator?: string;
    jsxTag?: string;
    jsxAttr?: string;
    variable?: string;
    plain?: string;
  };
}) => {
  const [processedTokens, setProcessedTokens] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) { // Chỉ xử lý khi component đã mount ở client
      setProcessedTokens(processCodeForHighlight(text));
    }
  }, [text, isClient]);

  const processCodeForHighlight = (codeToProcess: string) => {
    if (typeof codeToProcess !== "string") return [];

    // Không cần escape HTML vì nội dung sẽ được hiển thị trong <pre>
    // và không được render như HTML
    const lines = codeToProcess.split("\n");
    const result: any[] = [];

    lines.forEach((line) => {
      const patterns = [
        { type: "comment", regex: /(\/\/.*)/g },
        { type: "string", regex: /(['"`])([\s\S]*?)(['"`])/g },
        { type: "keyword", regex: /\b(const|let|var|function|return|if|else|async|await|try|catch|import|export|from|require|new|class|extends|interface|type|typeof|for|while|do|switch|case|break|continue|default|true|false|null|undefined)\b/g },
        { type: "number", regex: /\b(\d+\.?\d*|\.\d+)\b/g },
        // Cải thiện regex cho JSX
        { type: "jsxTag", regex: /(<\/?[\w\s="/.':;-]+>|<\w+\s*\/>)/g }, // Nhận diện thẻ mở, đóng, và tự đóng
        { type: "jsxAttr", regex: /\s([\w\-]+)=(['"]{0,1}[\w\s\-.:;]*['"]{0,1})/g }, // Nhận diện thuộc tính JSX
        { type: "function", regex: /(\b\w+)(?=\s*\()/g },
        { type: "property", regex: /\.(\w+)/g },
        { type: "variable", regex: /(\$\w+)/g },
        { type: "operator", regex: /([{}[\]()=+\-*\/:;,<>&])/g },
      ];

      let tokensForLine: { type: string; content: string }[] = [];

      // Xử lý comment trước
      const commentRegex = new RegExp(patterns.find((p) => p.type === "comment")!.regex);
      let lastCommentEnd = 0;
      let match;
      while ((match = commentRegex.exec(line)) !== null) {
        if (match.index > lastCommentEnd) {
          tokensForLine.push(
            ...tokenizePlainText(
              line.substring(lastCommentEnd, match.index),
              patterns.filter((p) => p.type !== "comment")
            )
          );
        }
        tokensForLine.push({ type: "comment", content: match[0] });
        lastCommentEnd = commentRegex.lastIndex;
      }
      if (lastCommentEnd < line.length) {
        tokensForLine.push(
          ...tokenizePlainText(
            line.substring(lastCommentEnd),
            patterns.filter((p) => p.type !== "comment")
          )
        );
      }

      result.push(tokensForLine);
    });

    return result;
  };

  const tokenizePlainText = (textToTokenize: string, patterns: { type: string, regex: RegExp }[]) => {
    let result: { type: string, content: string }[] = [{ type: "plain", content: textToTokenize }];

    patterns.forEach(pattern => {
      result = result.flatMap(token => {
        if (token.type !== "plain") {
          return [token];
        }

        const segments: { type: string, content: string }[] = [];
        let lastIndex = 0;
        let match;

        const regex = new RegExp(pattern.regex.source, pattern.regex.flags || "g");

        while ((match = regex.exec(token.content)) !== null) {
          if (match.index > lastIndex) {
            segments.push({ type: "plain", content: token.content.substring(lastIndex, match.index) });
          }
          segments.push({ type: pattern.type, content: match[0] });
          lastIndex = regex.lastIndex;
          if (match.index === lastIndex && regex.global) {
            if (match[0].length === 0) regex.lastIndex++;
          }
        }

        if (lastIndex < token.content.length) {
          segments.push({ type: "plain", content: token.content.substring(lastIndex) });
        }
        return segments.length > 0 ? segments : [token];
      });
    });
    return result;
  };

  const getTokenClass = (type: string) => {
    const defaultClasses = {
      keyword: "text-[#c792ea] font-semibold",
      string: "text-[#a5e844]",
      comment: "text-[#676e95] italic",
      number: "text-[#ff9d00]",
      function: "text-[#82aaff]",
      property: "text-[#4fc1ff]",
      operator: "text-[#89ddff]",
      jsxTag: "text-[#ff596f]",
      jsxAttr: "text-[#ffcb6b]",
      variable: "text-[#f78c6c]",
      plain: "text-[#d4d4d8]"
    };

    const customClass = highlightClass[type as keyof typeof highlightClass];
    return customClass || defaultClasses[type as keyof typeof defaultClasses] || defaultClasses.plain;
  };

  if (!isClient) {
    // Render plain text during SSR or if not client-side yet
    // Escape the text to prevent XSS if it's directly rendered as HTML elsewhere (though pre does this by default)
    const ssrText = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return <pre className={cn("font-mono text-sm whitespace-pre-wrap", className)}>{ssrText}</pre>;
  }

  return (
    <pre className={cn("font-mono text-sm whitespace-pre-wrap", className)}>
      {processedTokens.map((lineTokens, lineIndex) => (
        <React.Fragment key={`line-${lineIndex}`}>
          {lineIndex > 0 && "\n"}
          {Array.isArray(lineTokens) ? lineTokens.map((token: any, tokenIndex: number) => (
            <span
              key={`token-${lineIndex}-${tokenIndex}`}
              className={getTokenClass(token.type)}
            >
              {token.content}
            </span>
          )) : null}
        </React.Fragment>
      ))}
    </pre>
  );
}; 