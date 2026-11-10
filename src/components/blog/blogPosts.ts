import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { BlogPost, BlogPosts } from "~/types/types";

const blogDirectory = path.join(process.cwd(), "content", "blog");
const metadataFields = ["title", "description", "imageUrl", "date", "readTime", "category"] as const;

function getMetadataString(
  metadata: Record<string, unknown>,
  field: (typeof metadataFields)[number],
  filename: string,
) {
  const value = metadata[field];
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Missing or invalid "${field}" in ${filename}`);
  }
  return value;
}

function loadBlogPosts(): BlogPost[] {
  return readdirSync(blogDirectory)
    .filter((filename) => filename.endsWith(".md") && filename.toLowerCase() !== "readme.md")
    .map((filename) => {
      const source = readFileSync(path.join(blogDirectory, filename), "utf8");
      const { content, data } = matter(source);
      const slug = path.basename(filename, ".md");

      return {
        slug,
        title: getMetadataString(data, "title", filename),
        description: getMetadataString(data, "description", filename),
        imageUrl: getMetadataString(data, "imageUrl", filename),
        date: getMetadataString(data, "date", filename),
        readTime: getMetadataString(data, "readTime", filename),
        category: getMetadataString(data, "category", filename),
        markdown: content.trim(),
      };
    })
    .sort((first, second) => second.date.localeCompare(first.date));
}

export const blogPosts: BlogPosts = { posts: loadBlogPosts() };
