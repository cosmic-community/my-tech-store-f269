# My Tech Store

![App Preview](https://imgix.cosmicjs.com/52a15d30-2c87-11f1-b10d-fdf5d265672d-autopilot-photo-1546435770-a3e426bf472b-1774909514360.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A modern, tech-focused e-commerce storefront built with **Next.js 16**, **Tailwind CSS**, and **[Cosmic](https://www.cosmicjs.com)** CMS. Browse products by category, view detailed product pages with image galleries, and read verified customer reviews — all powered by your Cosmic content.

## Features

- 🛍️ **Product Catalog** — Dynamic product grid with category filtering and search
- 📂 **Category Pages** — Browse products organized by category
- ⭐ **Customer Reviews** — Star ratings with verified purchase badges
- 💰 **Sale Pricing** — Visual price comparisons for discounted items
- 📦 **Inventory Status** — Color-coded stock level indicators
- 📱 **Fully Responsive** — Beautiful on mobile, tablet, and desktop
- 🎨 **Dark Tech Theme** — Modern dark UI with electric blue accents
- ⚡ **Server-Side Rendering** — Fast page loads with Next.js 16 App Router
- 🔍 **SEO Optimized** — Dynamic metadata for all pages

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=69caf7f19bc401b6793b256e&clone_repository=69caf9187a23e837e07f5e83)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for an online store with products (including images, pricing, description, and inventory status), product categories, and customer reviews. User instructions: An tech focused e-commerce store with products, categories, and reviews"

### Code Generation Prompt

> "Build a Next.js application for an online business called 'My Tech Store'. The content is managed in Cosmic CMS with the following object types: categories, products, reviews. Create a beautiful, modern, responsive design with a homepage and pages for each content type. User instructions: An tech focused e-commerce store with products, categories, and reviews"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [React 19](https://react.dev/) — UI library
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first styling
- [Cosmic](https://www.cosmicjs.com) — Headless CMS ([docs](https://www.cosmicjs.com/docs))
- [Inter Font](https://fonts.google.com/specimen/Inter) — Modern typography

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with the content models set up

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd my-tech-store

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Cosmic credentials

# Start the development server
bun dev
```

### Environment Variables

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## Cosmic SDK Examples

### Fetching Products

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: products } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Product by Slug

```typescript
const { object: product } = await cosmic.objects
  .findOne({ type: 'products', slug: 'my-product' })
  .props(['id', 'title', 'slug', 'metadata', 'content'])
  .depth(1)
```

## Cosmic CMS Integration

This app uses three content types:

| Type | Slug | Key Metafields |
|------|------|----------------|
| Products | `products` | description, price, sale_price, featured_image, gallery, category, inventory_status, sku |
| Categories | `categories` | name, description, image |
| Reviews | `reviews` | product, reviewer_name, rating, comment, verified_purchase |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Import the project in [Netlify](https://netlify.com)
3. Set the build command to `bun run build`
4. Add environment variables
5. Deploy!

<!-- README_END -->