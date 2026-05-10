import NewsletterForm from "./components/NewsletterForm";
import { SectionNav } from "./components/SectionNav";

export default function Home() {
  const sections = [
    { label: "Profile", href: "#profile" },
    { label: "Education", href: "#education" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Articles", href: "#articles" },
    { label: "Contact", href: "#contact" },
  ];

  const articles = [
    {
      title: "Building Resilient Next.js Systems",
      date: "January 12, 2026",
      summary:
        "A practical guide to architecture decisions that keep large Next.js apps stable and maintainable.",
    },
    {
      title: "Modern Async Patterns in TypeScript",
      date: "December 18, 2025",
      summary:
        "From Promise orchestration to cancellation and retries, this article covers production-ready patterns.",
    },
    {
      title: "Designing Fast UI Systems",
      date: "November 3, 2025",
      summary:
        "How to create scalable component systems with predictable behavior and high accessibility standards.",
    },
    {
      title: "API Contracts That Age Well",
      date: "October 2, 2025",
      summary:
        "A playbook for API versioning, schema evolution, and cross-team consistency.",
    },
  ];

  const socialLinks = [
    {
      href: "https://github.com/tolarom",
      label: "GitHub",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
          <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.54 2.87 8.39 6.84 9.75.5.1.68-.22.68-.48v-1.72c-2.78.62-3.37-1.38-3.37-1.38-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.52 1.05 1.52 1.05.88 1.54 2.31 1.1 2.87.84.1-.66.35-1.1.63-1.35-2.22-.26-4.56-1.13-4.56-5.02 0-1.11.39-2.02 1.03-2.73-.1-.26-.45-1.31.1-2.72 0 0 .84-.27 2.75 1.04A9.38 9.38 0 0 1 12 6.8c.85 0 1.72.12 2.53.35 1.91-1.31 2.75-1.04 2.75-1.04.55 1.41.2 2.46.1 2.72.64.71 1.03 1.62 1.03 2.73 0 3.9-2.34 4.75-4.57 5.01.36.32.68.95.68 1.92v2.84c0 .26.18.59.69.48A10.1 10.1 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
        </svg>
      ),
    },
    {
      href: "https://www.linkedin.com/in/tola-rom-292151374/",
      label: "LinkedIn",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
          <path d="M4.98 3.5A2.48 2.48 0 1 1 4.98 8a2.48 2.48 0 0 1 0-4.5ZM3 9h4v12H3V9Zm7 0h3.84v1.64h.05c.54-.96 1.86-1.97 3.84-1.97 4.1 0 4.86 2.7 4.86 6.22V21h-4v-5.24c0-1.25-.03-2.87-1.75-2.87-1.76 0-2.03 1.38-2.03 2.79V21h-4V9Z" />
        </svg>
      ),
    },
    {
      href: "mailto:tola.rom16@gmail.com",
      label: "Email",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />
          <path d="m22 8-10 6L2 8" />
        </svg>
      ),
    },
    {
      href: "https://www.facebook.com/nachooloveu",
      label: "Facebook",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
          <path d="M13.5 22v-8.3h2.8l.4-3.2h-3.2V8.4c0-.9.3-1.6 1.7-1.6h1.7V3.9c-.3 0-1.4-.1-2.7-.1-2.7 0-4.5 1.6-4.5 4.6v2.6H7v3.2h2.7V22h3.8Z" />
        </svg>
      ),
    },
    {
      href: "https://www.instagram.com/cowardlynachoo?igsh=eGRwaXJtYW5mb2c4",
      label: "Instagram",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm5.5-.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
        </svg>
      ),
    },
    {
      href: "https://t.me/ilovesharkishark",
      label: "Telegram",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
          <path d="M22 4.6 18.8 20c-.2 1-1 1.2-1.8.8l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.4-5.1L19 7.2c.3-.2-.1-.4-.4-.2L6.4 14.8 1.5 13.3c-1-.3-1-.9.2-1.4L20.7 3.9c.9-.3 1.4.2 1.3.7Z" />
        </svg>
      ),
    },
  ];

  const education = [
    {
      school: "Royal University of Phnom Penh",
      degree: "B.Sc. in Computer Science",
      period: "2018 - 2022",
    },
    {
      school: "Online Specializations",
      degree: "Advanced Frontend and Cloud Courses",
      period: "2022 - 2024",
    },
  ];


  const skills = [
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "TailwindCSS", "Vite"] },
    { category: "Backend", items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "GraphQL"] },
    { category: "Tools", items: ["Git", "Docker", "AWS", "Vercel", "Figma"] },
  ];

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard.",
      tags: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
      link: "#",
    },
    {
      title: "Design System",
      description: "Comprehensive component library and design system documentation for enterprise applications.",
      tags: ["React", "Storybook", "TailwindCSS"],
      link: "#",
    },
    {
      title: "Analytics Dashboard",
      description: "Real-time analytics dashboard with data visualization, user authentication, and custom reports.",
      tags: ["Next.js", "D3.js", "TypeScript", "MongoDB"],
      link: "#",
    },
  ];

  return (
    <main className="relative flex flex-1 justify-center overflow-x-hidden bg-white px-4 py-10 text-zinc-800 dark:bg-black dark:text-zinc-100 sm:px-8">
      <div className="dot-background pointer-events-none absolute inset-0" />
      <div className="relative z-10 w-full max-w-7xl space-y-16 sm:space-y-20">
        <SectionNav sections={sections} />

        {/* Profile Section */}
        <section id="profile" className="mx-auto max-w-2xl lg:mx-0 scroll-mt-24">
          <div className="mb-8 inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
            👋 Welcome to my portfolio
          </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Software Engineer, Freelancer, and Open Source Enthusiast.
            </h1>
            <div className="mt-6 space-y-6 text-base text-zinc-600 dark:text-zinc-400">
              <p>
              I design and build polished digital products, from clean user
              interfaces to reliable backend systems.
            </p>
            <p>
              I care about maintainable architecture, thoughtful UX, and fast
              user experiences that scale.
            </p>
            <p>
              If you are building something ambitious, let&apos;s connect and
              ship it together.
            </p>
          </div>
          <div className="mt-6 flex gap-5">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                aria-label={link.label}
                className="group relative -m-1 p-1"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition group-hover:bg-zinc-200 group-hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-300 dark:group-hover:bg-zinc-700 dark:group-hover:text-zinc-100">
                  {link.icon}
                </span>
                <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 rounded bg-zinc-800 px-2 py-0.5 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100 dark:bg-zinc-100 dark:text-zinc-800">
                  {link.label}
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="mx-auto w-full max-w-6xl rounded-3xl border border-zinc-100 bg-white/90 px-5 py-8 shadow-sm dark:border-zinc-700/40 dark:bg-zinc-900/40 sm:px-7 scroll-mt-24">
          <div className="mb-6 flex items-end justify-between border-b border-zinc-200 pb-4 dark:border-zinc-700/50">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl">
              Education
            </h2>
            <span className="text-xs uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
              Academic Journey
            </span>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {education.map((item) => (
              <article
                key={item.school}
                className="group rounded-2xl border border-zinc-200 bg-zinc-50 p-5 transition hover:-translate-y-1 hover:shadow-md dark:border-zinc-700/60 dark:bg-zinc-800/40"
              >
                <div className="mb-4 h-1.5 w-14 rounded-full bg-teal-500/80" />
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{item.school}</h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{item.degree}</p>
                <p className="mt-4 inline-flex rounded-full border border-zinc-300 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-zinc-600 dark:border-zinc-600 dark:text-zinc-300">
                  {item.period}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-6 border-t border-zinc-200 pt-4 text-xs text-zinc-500 dark:border-zinc-700/50 dark:text-zinc-400">
            Continuous learning through courses, documentation, and practical projects.
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="mx-auto w-full max-w-6xl scroll-mt-24">
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl">
            Skills & Expertise
          </h2>
          <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">A concise overview of areas I work in — tools and frameworks I use regularly.</p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {skills.map((skill) => (
              <div key={skill.category} className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm transition hover:shadow-lg hover:-translate-y-1 dark:border-zinc-700/40 dark:bg-zinc-900/40">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{skill.category}</h3>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">{skill.items.length}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {skill.items.map((item) => (
                    <button
                      key={item}
                      type="button"
                      aria-label={`${item} skill`}
                      className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-sm font-medium text-zinc-700 transition hover:bg-teal-50 hover:border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-teal-900/30"
                    >
                      <span className="h-2.5 w-2.5 rounded-full bg-teal-500" />
                      <span>{item}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* Projects Section */}
        <section id="projects" className="mx-auto w-full max-w-6xl scroll-mt-24">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <a
                key={project.title}
                href={project.link}
                className="group relative rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm transition hover:shadow-lg hover:-translate-y-1 dark:border-zinc-700/40 dark:bg-zinc-900/40"
              >
                <div className="relative z-10">
                  <div className="mb-4 h-36 w-full overflow-hidden rounded-md bg-zinc-100 dark:bg-zinc-800" />
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-teal-50 px-2 py-1 text-xs font-medium text-teal-700 dark:bg-teal-900/20 dark:text-teal-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6">
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-teal-600 transition group-hover:text-teal-700">
                      View Project
                      <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 stroke-current">
                        <path d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Articles & Newsletter Section */}
        <section id="articles" className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-16 scroll-mt-24">
          <div className="space-y-6">
            {articles.map((article) => (
              <article
                key={article.title}
                className="group relative flex flex-col items-start"
              >
                <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 rounded-2xl bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6" />
                <time className="relative z-10 mb-3 flex items-center pl-3.5 text-sm text-zinc-500 dark:text-zinc-500">
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 flex items-center"
                  >
                    <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                  </span>
                  {article.date}
                </time>
                <h2 className="relative z-10 text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                  {article.title}
                </h2>
                <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {article.summary}
                </p>
                <div className="relative z-10 mt-4 text-sm font-medium text-teal-500">
                  Read article
                </div>
              </article>
            ))}
          </div>

          <div className="space-y-8 lg:pl-10">
            <section className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
              <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Stay up to date
              </h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Get notified when I publish something new, and unsubscribe at any
                time.
              </p>
              {/* Newsletter signup: replaced with client component */}
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <NewsletterForm />
            </section>

          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mx-auto w-full max-w-6xl scroll-mt-24">
          <div className="rounded-2xl border border-zinc-100 p-8 dark:border-zinc-700/40">
            <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Let&apos;s Work Together
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              I&apos;m always interested in hearing about new projects. Whether you have a question or just want to say hi, feel free to reach out!
            </p>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
              <a
               href="mailto:tola.rom16@gmail.com"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-zinc-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700 dark:bg-zinc-700 dark:hover:bg-zinc-600"
              >
                Send an Email
              </a>
              <a
                href="/CV_Rom_Tola.pdf"
                download
                className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-100 dark:hover:bg-zinc-800/50"
              >
                Download Resume
              </a>
              <a
                href="Tel:011759486"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-100 dark:hover:bg-zinc-800/50"
              >
                Schedule a Call
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <section className="border-t border-zinc-200 pt-6 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
          <p>© {new Date().getFullYear()} Rom Tola. Built with Next.js and TailwindCSS.</p>
        </section>
      </div>
    </main>
  );
}
