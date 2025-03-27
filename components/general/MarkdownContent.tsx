import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkBreaks from "remark-breaks";
import { ComponentPropsWithoutRef } from "react";
import "highlight.js/styles/github.css";

interface MarkdownContentProps {
  content: string;
}

// Define proper types for each markdown element
type ParagraphProps = ComponentPropsWithoutRef<"p"> & { node?: unknown };
type PreProps = ComponentPropsWithoutRef<"pre"> & { node?: unknown };
type CodeProps = ComponentPropsWithoutRef<"code"> & {
  node?: unknown;
  inline?: boolean;
};

export function MarkdownContent({ content }: MarkdownContentProps) {
  const components = {
    p: ({ node: _node, ...props }: ParagraphProps) => (
      <p className="text-gray-700" {...props} />
    ),
    pre: ({ node: _node, ...props }: PreProps) => (
      <pre className="p-4 bg-gray-100 rounded-lg overflow-auto" {...props} />
    ),
    code: ({
      node: _node,
      className,
      children,
      inline,
      ...props
    }: CodeProps) => (
      <code
        className={`hljs ${className || ""} ${inline ? "inline" : "block"}`}
        {...props}
      >
        {children}
      </code>
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
