# My Portfolio

An elegant, fast, and developer-friendly portfolio built with React, TypeScript, Vite, and Tailwind CSS. It showcases projects, blog posts, skills, certificates, and an interactive "Leave a Trace" canvas. Optional backend endpoints (Supabase Edge Functions + Hono) are included for demonstrations.

## Live Demo

[Link to live demo](https://my-portfolio-psi-flame.vercel.app/)

## Figma Design

The design for this portfolio was inspired by Figma

## Features

* **Responsive Design:** Looks great on desktop and mobile.
* **Interactive UI:** Built with shadcn/ui and lucide-react icons.
* **Projects:** Filterable by technology; each project card links out.
* **Blog:** Articles, conference talks, and presentations with cover images.
* **Leave a Trace:** A playful canvas where visitors can draw.
* **Skills & Certificates:** Clear, categorized skills and certificate badges.
* **Contact Form:** Shows a localized success toast and clears fields.
* **i18n Toggle:** English by default; Turkish on demand (EN/TR toggle in UI).

Highlights: AI • Web • Mobile • Blockchain

---

## Content Management (No CMS)

This portfolio is data-driven from code for maximum control and simplicity.

- Projects, Blog, Skills, Certificates: `src/App.tsx`
  - Projects: `projects` array (title, subtitle, description, image, tech, link)
  - Blog: `blogPosts` array (type = `medium` | `conference` | `presentation`)
    - TR translations map: `blogTranslations` (used when TR is active)
  - Skills: `skills` object + `proficiency` map
  - Certificates: listed under the Certificates tab with EN/TR toggle and links
- Image reliability: Cards use `ImageWithFallback` for graceful failures.
- UI components: `src/components/*` (e.g., BlogCard, ProjectCard, Sidebar)

## Internationalization (EN/TR)

- The site defaults to English.
- Toggle to Turkish in the Blog and Certificates sections (language-sensitive labels, dates, and strings).
- You can extend translations following the existing `blogTranslations` pattern.

## Tech Stack

*   **Frontend:**
    *   React
    *   TypeScript
    *   Vite
    *   Tailwind CSS
    *   shadcn/ui
*   **Backend:**
    *   Supabase
    *   Hono
    *   Deno

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js
*   npm

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your_username/my-portfolio.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```
3.  Start the development server
    ```sh
    npm run dev
    ```

## Project Structure

```
my-portfolio/
├── public/
│   └── ...
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   └── ... (shadcn/ui components)
│   │   ├── BlogCard.tsx
│   │   ├── CodeBlock.tsx
│   │   ├── ExperienceCard.tsx
│   │   ├── LeaveTraceCard.tsx
│   │   ├── ProjectCard.tsx
│   │   └── Sidebar.tsx
│   ├── styles/
│   │   └── globals.css
│   ├── supabase/
│   │   └── functions/
│   │       └── server/
│   │           ├── blog-routes.tsx
│   │           ├── index.tsx
│   │           ├── kv_store.tsx
│   │           └── trace-routes.tsx
│   ├── utils/
│   │   └── supabase/
│   │       └── info.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── ...
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.ts
```

## API Endpoints

The backend is built with Hono and runs on Deno. It provides the following endpoints:

*   `GET /make-server-8dae514e/health`: Health check endpoint.
*   `GET /make-server-8dae514e/blog/posts`: Get all blog posts.
*   `GET /make-server-8dae514e/blog/posts/:id`: Get a single blog post.
*   `POST /make-server-8dae514e/blog/posts`: Create a new blog post.
*   `PUT /make-server-8dae514e/blog/posts/:id`: Update a blog post.
*   `DELETE /make-server-8dae514e/blog/posts/:id`: Delete a blog post.
*   `POST /make-server-8dae514e/traces`: Create a new trace drawing.
*   `GET /make-server-8dae514e/traces`: Get all traces.
*   `GET /make-server-8dae514e/traces/:id`: Get a specific trace.

## Deployment

The frontend is deployed on Vercel. The backend is deployed on Supabase Edge Functions.

## Attributions

This project uses components from [shadcn/ui](https://ui.shadcn.com/) and photos from [Unsplash](https://unsplash.com).