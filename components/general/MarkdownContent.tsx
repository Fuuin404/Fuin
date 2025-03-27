"use client";

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkBreaks from "remark-breaks";
import "highlight.js/styles/github.css";

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeHighlight]}
      remarkPlugins={[remarkBreaks]}
      components={{
        p: ({ node, ...props }) => <p className="text-gray-700" {...props} />, // Exclude node
        pre: ({ node, ...props }) => (
          <pre className="markdown-content" {...props} />
        ), // Exclude node
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
