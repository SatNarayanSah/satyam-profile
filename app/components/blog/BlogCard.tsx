import { motion } from "framer-motion";
import { BlogPost } from "../../types/types";
import { Link } from "@remix-run/react";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const hoverVariants = {
  hover: {
    y: -5,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
  }
};

export default function BlogCard({ post }: { post: BlogPost }) {
  // Format the date to be more readable
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <motion.div
      className="max-w-sm border  rounded-lg shadow-sm bg-gray-800 border-gray-700 overflow-hidden"
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
    >
      <motion.div variants={hoverVariants}>
        <Link to={`/blog/${post.slug}`} className="block overflow-hidden">
          <motion.img 
            className="w-full h-48 object-fit rounded-t-lg transition-transform duration-500 hover:scale-105"
            src={post.imageUrl}
            alt={post.title}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </Link>
      </motion.div>
      
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-orange-600 bg-gray-700 p-2 rounded-3xl dark:text-orange-400">
            {post.category}
          </span>
          <span className="text-xs text-gray-200">
            {formattedDate} • {post.readTime}
          </span>
        </div>
        
        <Link to={`/blog/${post.slug}`}>
          <motion.h3 
            className="mb-3 text-xl font-bold tracking-tight text-white"
            whileHover={{ color: "orange" }}
            transition={{ duration: 0.2 }}
          >
            {post.title}
          </motion.h3>
        </Link>
        
        <p className="mb-4 font-normal text-gray-300 line-clamp-3">
          {post.description}
        </p>
        
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            to={`/blog/${post.slug}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
          >
            Read more
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}