// app/routes/blog.$id.tsx
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { blogPosts } from "./blogPosts";
import type { BlogPost } from "../../types/types";

export async function loader({ params }: LoaderFunctionArgs) {
  const post = blogPosts.posts.find((p) => p.id === params.id);
  
  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ post });
}

export default function BlogDetailsPage() {
  const { post } = useLoaderData<{ post: BlogPost }>();

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <header className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
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
          <div className="w-full h-96 rounded-lg overflow-hidden mb-8">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </header>

        <div className="space-y-8">
          {post.content.map((section, index) => (
            <section key={index} className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                {section.heading}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                {section.text}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-12">
          <Link
            to="/blog"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            ← Back to Blog
          </Link>
        </div>
      </article>
    </div>
  );
}