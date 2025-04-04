import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { blogPosts } from "../components/blog/blogPosts";
import type { BlogPost } from "../types/types";
import { useState } from "react";

// Site configuration
const SITE_URL = "https://satnarayan.com.np";
const SITE_NAME = "Sat Narayan Sah (Satyam Sah)";

export async function loader({ params }: LoaderFunctionArgs) {
  const post = blogPosts.posts.find((p) => p.slug === params.slug);
  
  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }

  return new Response(JSON.stringify({ post }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.post) {
    return [
      { title: "Blog Post Not Found" },
      { name: "description", content: "The requested blog post could not be found." },
    ];
  }

  const { post } = data;
  const postUrl = `${SITE_URL}/blog/${post.slug}`;
  const imageUrl = post.imageUrl.startsWith('http') ? post.imageUrl : `${SITE_URL}${post.imageUrl}`;

  return [
    { title: post.title },
    { name: "description", content: post.description },
    
    // Open Graph (Facebook)
    { property: "og:type", content: "article" },
    { property: "og:url", content: postUrl },
    { property: "og:title", content: post.title },
    { property: "og:description", content: post.description },
    { property: "og:image", content: imageUrl },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: "en_US" },
    { property: "article:published_time", content: post.date },
    
    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: post.title },
    { name: "twitter:description", content: post.description },
    { name: "twitter:image", content: imageUrl },
    { name: "twitter:site", content: "@yourtwitterhandle" },
  ];
};

export default function BlogDetailsPage() {
  const { post } = useLoaderData<{ post: BlogPost }>();
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const postUrl = `${SITE_URL}/blog/${post.slug}`;

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`,
      '_blank',
      'width=550,height=420'
    );
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`,
      '_blank',
      'width=580,height=296'
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(post.title)}&summary=${encodeURIComponent(post.description)}&source=${encodeURIComponent(SITE_NAME)}`,
      '_blank',
      'width=550,height=420'
    );
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL: ', err);
    }
  };

  return (
    <div className="max-w-4xl h-[80vh] bg-gray-900 lg:mt-16 overflow-y-auto rounded-3xl mx-auto px-4 py-8 [&::-webkit-scrollbar]:hidden relative">
      {/* Share Button */}
      <div className="fixed top-16 z-50 lg:right-16 right-4">
        <div className="relative">
          <button
            onClick={() => setIsShareOpen(!isShareOpen)}
            className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg"
            aria-label="Share options"
            aria-expanded={isShareOpen}
          >
            <img 
              src="/icons/share.svg" 
              alt="" 
              className="h-5 w-5"
              aria-hidden="true"
            />
          </button>

          {isShareOpen && (
            <div 
              className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-xl z-10 border border-gray-700"
              onMouseLeave={() => setIsShareOpen(false)}
            >
              <div className="p-2">
                <h3 className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Share this post
                </h3>
                <div className="space-y-1">
                  <button
                    onClick={shareOnTwitter}
                    className="flex items-center px-3 py-2 w-full text-left rounded-md hover:bg-gray-700 transition-colors"
                  >
                    <img 
                      src="/icons/twitter.svg" 
                      alt="" 
                      className="h-5 w-5 mr-3"
                      aria-hidden="true"
                    />
                    <span className="text-gray-200">Twitter</span>
                  </button>
                  <button
                    onClick={shareOnFacebook}
                    className="flex items-center px-3 py-2 w-full text-left rounded-md hover:bg-gray-700 transition-colors"
                  >
                    <img 
                      src="/icons/facebook.svg" 
                      alt="" 
                      className="h-5 w-5 mr-3"
                      aria-hidden="true"
                    />
                    <span className="text-gray-200">Facebook</span>
                  </button>
                  <button
                    onClick={shareOnLinkedIn}
                    className="flex items-center px-3 py-2 w-full text-left rounded-md hover:bg-gray-700 transition-colors"
                  >
                    <img 
                      src="/icons/linkedin.svg" 
                      alt="" 
                      className="h-5 w-5 mr-3"
                      aria-hidden="true"
                    />
                    <span className="text-gray-200">LinkedIn</span>
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center px-3 py-2 w-full text-left rounded-md hover:bg-gray-700 transition-colors"
                  >
                    <img 
                      src="/icons/copy-link.svg" 
                      alt="" 
                      className="h-5 w-5 mr-3"
                      aria-hidden="true"
                    />
                    <span className="text-gray-200">
                      {isCopied ? 'Link copied!' : 'Copy link'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Blog Content */}
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <header className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
              {post.category}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {formattedDate} • {post.readTime}
            </span>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {post.description}
          </p>
          
          <div className="w-full h-96 rounded-xl overflow-hidden mb-8 border border-gray-700">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </header>

        <div className="space-y-10">
          {post.content.map((section, index) => (
            <section key={index} className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                {section.heading}
              </h2>
              <div className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                {section.text.split('\n').map((paragraph, i) => (
                  <p key={i} className="mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-12 pt-8 border-t border-gray-800">
          <Link
            to="/blog"
            className="inline-flex items-center px-4 py-3 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-500 transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 mr-2" 
              viewBox="0 0 20 20" 
              fill="currentColor"
              aria-hidden="true"
            >
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to all posts
          </Link>
        </footer>
      </article>
    </div>
  );
}