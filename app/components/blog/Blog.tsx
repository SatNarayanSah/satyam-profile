import BlogCard from "./BlogCard";
import { BlogPost } from "../../types/types";
import { blogPosts } from "./blogPosts";
import Section from "../ui/Section";

export default function Blog() {
  const posts = blogPosts.posts as BlogPost[];
  return (
    <Section id="blog" index="06" title="Latest articles" subtitle="Notes and guides on web development.">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </Section>
  );
}
