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
        p: ({ node, ...props }) => <p className="text-gray-700" {...props} />,
        pre: ({ node, ...props }) => (
          <pre className="markdown-content" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
