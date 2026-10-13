import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts } from "~/components/blog/blogPosts";
import BlogPostView from "~/components/blog/BlogPostView";
import type { BlogPost } from "~/types/types";

const SITE_URL = "https://satyamsah.com";
const SITE_NAME = "Satyam Sah - Full Stack Developer";

type Params = { slug: string };

const findPost = (slug: string) => (blogPosts.posts as BlogPost[]).find((p) => p.slug === slug);

export function generateStaticParams(): Params[] {
  return blogPosts.posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) {
    return { title: "Blog Post Not Found", description: "The requested blog post could not be found." };
  }

  const postUrl = `${SITE_URL}/blog/${post.slug}`;
  const imageUrl = post.imageUrl.startsWith("http") ? post.imageUrl : `${SITE_URL}${post.imageUrl}`;
  const title = `${post.title} | Satyam Sah's Blog`;

  return {
    title,
    description: post.description,
    keywords: `${(post as { keywords?: string }).keywords || ""}, Satyam Sah, Full Stack Development, Web Development, Programming Tips`,
    authors: [{ name: "Satyam Sah" }],
    robots: { index: true, follow: true },
    alternates: { canonical: postUrl },
    openGraph: {
      type: "article",
      url: postUrl,
      title,
      description: post.description,
      images: [imageUrl],
      siteName: SITE_NAME,
      locale: "en_US",
      publishedTime: post.date,
      authors: [SITE_URL],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.description,
      images: [imageUrl],
      creator: "@satyamsah",
      site: "@satyamsah",
    },
  };
}

export default async function BlogPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) notFound();
  return <BlogPostView post={post} />;
}
