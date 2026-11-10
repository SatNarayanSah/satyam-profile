import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts } from "~/components/blog/blogPosts";
import BlogPostView from "~/components/blog/BlogPostView";

const SITE_URL = "https://satyamsah.com";
const SITE_NAME = "Satyam Sah - Full Stack Developer";

type Params = { slug: string };

const findPost = (slug: string) => blogPosts.posts.find((post) => post.slug === slug);

export function generateStaticParams(): Params[] {
  return blogPosts.posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) {
    return { title: "Blog Post Not Found", description: "The requested blog post could not be found." };
  }

  const postUrl = `/blog/${post.slug}`;
  const imageUrl = post.imageUrl.startsWith("http") ? post.imageUrl : new URL(post.imageUrl, SITE_URL).toString();
  const title = `${post.title} | Satyam Sah`;

  return {
    title,
    description: post.description,
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
      modifiedTime: post.updatedAt ?? post.date,
      section: post.category,
      authors: ["Satyam Sah"],
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

  const postUrl = new URL(`/blog/${post.slug}`, SITE_URL).toString();
  const imageUrl = post.imageUrl.startsWith("http") ? post.imageUrl : new URL(post.imageUrl, SITE_URL).toString();
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: [imageUrl],
    datePublished: post.date,
    dateModified: post.updatedAt ?? post.date,
    author: {
      "@type": "Person",
      name: "Satyam Sah",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Satyam Sah",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    articleSection: post.category,
    inLanguage: "en",
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: post.title, item: postUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd).replace(/</g, "\\u003c") }}
      />
      <BlogPostView post={post} markdown={post.markdown} />
    </>
  );
}
