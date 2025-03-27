"use client";

import ReactMarkdown, { Components } from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkBreaks from "remark-breaks";
import { Element } from "hast"; // Import Element type from hast
import "highlight.js/styles/github.css";

// Define the type for the props passed to each component
interface MarkdownNodeProps {
  node?: Element; // Use Element type, make it optional
  [key: string]: unknown; // Use unknown instead of any
}

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  // Define the components with proper typing
  const components: Components = {
    p: ({ node: _node, ...props }: MarkdownNodeProps) => (
      <p className="text-gray-700" {...props} />
    ),
    pre: ({ node: _node, ...props }: MarkdownNodeProps) => (
      <pre className="markdown-content" {...props} />
    ),
  };

  return (
    <ReactMarkdown
      rehypePlugins={[rehypeHighlight]}
      remarkPlugins={[remarkBreaks]}
      components={components}
    >
      {content}
    </ReactMarkdown>
  );
}
