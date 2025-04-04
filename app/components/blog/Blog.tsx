import BlogCard from "./BlogCard";
import { motion } from "framer-motion";
import { BlogPost } from "../../types/types";
import BlogPosts from "../../../data/blogPosts.json"


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
const posts = BlogPosts as BlogPost[];
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Latest Blog Posts</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">Discover our latest articles and insights</p>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}