import { Project, ProjectsCategory } from "payload-types";

const initProjectContent = `
  ## Demo

  Check out the live demo of the Payload Tailwind Blog Starter:

  👉 [View Demo](https://payload-tailwind-blog-starter.vercel.app/)

  A modern, performant, and customizable blog starter built with Payload CMS, Next.js, and Tailwind CSS.

  ## 🚀 One-Click Deploy

  Deploy your own copy of this blog starter to Vercel with one click.

  [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftuanphungcz%2Fpayload-tailwind-blog-starter&env=PAYLOAD_SECRET,ADMIN_PASSWORD&project-name=payload-tailwind-blog-starter&repository-name=payload-tailwind-blog-starter&demo-url=https%3A%2F%2Fpayload-tailwind-blog-starter.vercel.app%2F&demo-image=https%3A%2F%2Fpayload-tailwind-blog-starter.vercel.app%2Fog-image.jpg&stores=[{"type":"blob"},{"type":"postgres"}])

  You'll need to set up your \`PAYLOAD_SECRET\` and \`ADMIN_PASSWORD\` in the project settings.

  ## ⚠️ Beta Notice

  Please note that this project uses Payload CMS version 3.0.0-beta.108, which is still in beta. While it offers exciting new features and improvements, it may not be fully stable for production use.

  We recommend keeping an eye on the [Payload CMS GitHub repository](https://github.com/payloadcms/payload) for updates and the official release of version 3.0.0.

  ## ✨ Features

  - Built with Payload CMS for flexible content management
  - Next.js 15 (canary) for optimal performance and latest features
  - Analytics integration with Vercel Analytics
  - Optimized for SEO and social sharing

  ## 🛠 Built With

  - **CMS**: [Payload CMS](https://payloadcms.com/)
  - **Framework**: [Next.js](https://nextjs.org/)
  - **Language**: [TypeScript](https://www.typescriptlang.org/)
  - **Styling**: [Tailwind CSS](https://tailwindcss.com/)
  - **Database**: [PostgreSQL](https://www.postgresql.org/)
  - **Deployment**: [Vercel](https://vercel.com)

  ## 🏃‍♂️ Getting Started

  1. Clone the repository:

    \`\`\`bash
    git clone https://github.com/your-username/payload-tailwind-blog-starter.git
    cd payload-tailwind-blog-starter
    \`\`\`

  2. Install dependencies:

    \`\`\`bash
    pnpm install
    \`\`\`

  3. Set up your environment variables:
    Create a \`.env\` file in the root directory and add necessary variables.

  4. Run the development server:

    \`\`\`bash
    pnpm dev
    \`\`\`

  5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

  ## 📦 Scripts

  - \`pnpm dev\`: Start the development server
  - \`pnpm build\`: Build the production-ready application
  - \`pnpm start\`: Start the production server
  - \`pnpm lint\`: Run ESLint
  - \`pnpm payload\`: Run Payload CMS commands
  - \`pnpm generate:types\`: Generate Payload types
  - \`pnpm migrate:create\`: Create a new database migration

  ## 📝 License

  This project is open source and available under the [MIT License](LICENSE).
  `;

export const initProjectsData: Project[] = [
  {
    id: "1",
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    title: "Payload Tailwind Blog Starter",
    description:
      "A modern, performant, and customizable blog starter built with Payload CMS, Next.js, and Tailwind CSS.",
    content: initProjectContent,
    websiteUrl: "https://payload-tailwind-blog-starter.vercel.app/",
    githubUrl: "https://github.com/tuanphungcz/payload-tailwind-blog-starter",
    faviconUrl: "",
    categories: ["starters"],
    createdBy: "tuanphungcz",
  },
  {
    id: "2",
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    title: "Payload 3.0 & Next.js Starter",
    description:
      "This template has what you need: Auth, Stripe integration, and CMS, all supported by Payload 3.0 for unmatched scalability and control.",
    content: initProjectContent,
    websiteUrl: "https://payload-saas.livog.com/",
    githubUrl: "https://github.com/Livog/Payload.3.0.Boilerplate.Saas",
    faviconUrl: "https://payload-saas.livog.com/favicon.ico",
    categories: ["starters"],
    createdBy: "Livog",
  },
  {
    id: "3",
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    title: "Payload CMS plugin for Auth.js",
    description: "Payload plugin for authentication",
    content: initProjectContent,
    websiteUrl: "https://www.npmjs.com/package/payload-authjs",
    githubUrl: "https://github.com/CrawlerCode/payload-authjs",
    faviconUrl: "",
    categories: ["plugins"],
    createdBy: "CrawlerCode",
  },
];

export const initProjectsCategories: ProjectsCategory[] = [
  {
    id: "1",
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    name: "starters",
    label: "Starters",
  },
  {
    id: "2",
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    name: "plugins",
    label: "Plugins",
  },
  {
    id: "3",
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    name: "code-snippets",
    label: "Code Snippets",
  },
];
