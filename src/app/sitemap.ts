import type { MetadataRoute } from "next";
import { blogPosts } from "~/components/blog/blogPosts";

const SITE_URL = "https://satyamsah.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
    },
    ...blogPosts.posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt ?? post.date),
      images: [new URL(post.imageUrl, SITE_URL).toString()],
    })),
  ];
}
