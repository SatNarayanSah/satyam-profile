import BlogCard from "./BlogCard";
import { motion } from "framer-motion";
import { BlogPost } from "../../types/types";
// import BlogPosts from "../../../data/blogPosts.json"
import { blogPosts } from "./blogPosts";


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export default function Blog() {
  const posts = blogPosts.posts as BlogPost[]; // Cast to BlogPost[]
  return (
    <div id="blog" className=" bg-gray-50 dark:bg-gray-900 mt-5 overflow-hidden rounded-3xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="inline-flex items-center gap-4 px-4 py-2 text-xs tracking-wide text-white border lg:px-5 border-dashed rounded-full shadow-orange-300 uppercase">
          <img src="/icons/blog.svg" className="w-4 h-4" alt="icons" />
          Blogs
        </div>
        <h1 className="text-3xl font-bold mt-5 mb-5 text-gray-900 dark:text-white">
          My Latest Blog Posts</h1>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}