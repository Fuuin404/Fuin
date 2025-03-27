"use client";

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeHighlight]}
      components={{
        p: ({ ...props }) => <p className="text-gray-700" {...props} />, // Remove `node`
        pre: ({ ...props }) => <pre className="markdown-content" {...props} />, // Remove `node`
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
