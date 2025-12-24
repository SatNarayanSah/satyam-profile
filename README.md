# Welcome to Remix!

- 📖 [Remix docs](https://remix.run/docs)

## Development

Run the dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.

## SEO updates

This project includes basic SEO improvements added to help search engines understand the site and Satyam's professional profile:

- Meta tags and Open Graph/Twitter cards added in `app/root.tsx` for title, description, keywords, and social images.
- JSON-LD structured data (Person schema) added to `app/root.tsx` highlighting MERN and MEAN skills.
- `public/sitemap.xml` and `public/robots.txt` added to help crawlers index the site.

Recommended next steps to improve search ranking:

- Register and verify the site in Google Search Console and submit the sitemap (`/sitemap.xml`).
- Ensure the domain `https://satyamsah.com` is the canonical site and is reachable.
- Publish rich content, blog posts, and project case studies that include your name and target keywords ("Full Stack Developer MERN", "MEAN Stack").
- Build quality backlinks (GitHub, LinkedIn, guest posts) and keep social profiles linked.
