// app/data/blogPosts.ts
import type { BlogPosts } from "~/types/types";

export const blogPosts: BlogPosts = {
    posts: [
        {
            "id": "1",
            "title": "How to Learn Web Development: A Complete Guide",
            "description": "A step-by-step guide on how to start learning web development from scratch, covering the best resources, skills, and tools.",
            "imageUrl": "/images/blogPost-1.png",
            "date": "2025-04-04",
            "readTime": "7 min read",
            "category": "Web Development",
            "content": [
                {
                    "heading": "1. Understanding Web Development",
                    "text": "Web development involves building websites and web applications. It consists of frontend development (user interface), backend development (server-side logic), and full-stack development (both frontend and backend)."
                },
                {
                    "heading": "2. Learn HTML, CSS, and JavaScript",
                    "text": "These are the foundational languages for web development:\n- **HTML (HyperText Markup Language):** The structure of a webpage.\n- **CSS (Cascading Style Sheets):** Styles and layouts for web pages.\n- **JavaScript:** Adds interactivity and functionality."
                },
                {
                    "heading": "3. Explore Frontend Frameworks",
                    "text": "Learn popular frontend frameworks and libraries like React, Vue.js, or Angular to build dynamic and responsive websites."
                },
                {
                    "heading": "4. Learn Backend Development",
                    "text": "Backend development involves handling databases, authentication, and server logic. Popular backend languages and frameworks include:\n- **Node.js with Express.js** (JavaScript)\n- **Django or Flask** (Python)\n- **Ruby on Rails** (Ruby)\n- **PHP with Laravel**"
                },
                {
                    "heading": "5. Work with Databases",
                    "text": "Learn about relational (MySQL, PostgreSQL) and non-relational databases (MongoDB, Firebase) for storing and managing data."
                },
                {
                    "heading": "6. Version Control with Git",
                    "text": "Git and GitHub are essential tools for managing code, collaborating with others, and tracking project versions."
                },
                {
                    "heading": "7. Practice by Building Projects",
                    "text": "Start small by creating static websites, then progress to dynamic projects like to-do apps, e-commerce platforms, or blogs. Open-source contributions and personal projects improve your skills."
                },
                {
                    "heading": "8. Learn Deployment and Hosting",
                    "text": "Host your projects on platforms like Vercel, Netlify, or Heroku. Learn about domain names, web hosting, and cloud services like AWS."
                },
                {
                    "heading": "9. Keep Learning and Stay Updated",
                    "text": "Web technologies evolve rapidly. Follow blogs, join developer communities, and practice regularly to stay ahead."
                },
                {
                    "heading": "10. Best Resources to Learn",
                    "text": "Some excellent learning platforms:\n- **freeCodeCamp** (freeCodeCamp.org)\n- **MDN Web Docs** (developer.mozilla.org)\n- **The Odin Project** (theodinproject.com)\n- **W3Schools** (w3schools.com)\n- **YouTube Tutorials**"
                }
            ]
        }
       
    ]
};