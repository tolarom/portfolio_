import NewsletterForm from "./components/NewsletterForm";
import { SectionNav } from "./components/SectionNav";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const sections = [
    { label: "Profile", href: "#profile" },
    { label: "Education", href: "#education" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    {
      href: "https://github.com/tolarom",
      label: "GitHub",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className="h-5 w-5"
        >
          <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.54 2.87 8.39 6.84 9.75.5.1.68-.22.68-.48v-1.72c-2.78.62-3.37-1.38-3.37-1.38-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.52 1.05 1.52 1.05.88 1.54 2.31 1.1 2.87.84.1-.66.35-1.1.63-1.35-2.22-.26-4.56-1.13-4.56-5.02 0-1.11.39-2.02 1.03-2.73-.1-.26-.45-1.31.1-2.72 0 0 .84-.27 2.75 1.04A9.38 9.38 0 0 1 12 6.8c.85 0 1.72.12 2.53.35 1.91-1.31 2.75-1.04 2.75-1.04.55 1.41.2 2.46.1 2.72.64.71 1.03 1.62 1.03 2.73 0 3.9-2.34 4.75-4.57 5.01.36.32.68.95.68 1.92v2.84c0 .26.18.59.69.48A10.1 10.1 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
        </svg>
      ),
    },
    {
      href: "https://www.linkedin.com/in/tola-rom-292151374/",
      label: "LinkedIn",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className="h-5 w-5"
        >
          <path d="M4.98 3.5A2.48 2.48 0 1 1 4.98 8a2.48 2.48 0 0 1 0-4.5ZM3 9h4v12H3V9Zm7 0h3.84v1.64h.05c.54-.96 1.86-1.97 3.84-1.97 4.1 0 4.86 2.7 4.86 6.22V21h-4v-5.24c0-1.25-.03-2.87-1.75-2.87-1.76 0-2.03 1.38-2.03 2.79V21h-4V9Z" />
        </svg>
      ),
    },
    {
      href: "mailto:tola.rom16@gmail.com",
      label: "Email",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="h-5 w-5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />
          <path d="m22 8-10 6L2 8" />
        </svg>
      ),
    },
    {
      href: "https://www.facebook.com/nachooloveu",
      label: "Facebook",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className="h-5 w-5"
        >
          <path d="M13.5 22v-8.3h2.8l.4-3.2h-3.2V8.4c0-.9.3-1.6 1.7-1.6h1.7V3.9c-.3 0-1.4-.1-2.7-.1-2.7 0-4.5 1.6-4.5 4.6v2.6H7v3.2h2.7V22h3.8Z" />
        </svg>
      ),
    },
    {
      href: "https://www.instagram.com/cowardlynachoo?igsh=eGRwaXJtYW5mb2c4",
      label: "Instagram",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className="h-5 w-5"
        >
          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm5.5-.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
        </svg>
      ),
    },
    {
      href: "https://t.me/ilovesharkishark",
      label: "Telegram",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className="h-5 w-5"
        >
          <path d="M22 4.6 18.8 20c-.2 1-1 1.2-1.8.8l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.4-5.1L19 7.2c.3-.2-.1-.4-.4-.2L6.4 14.8 1.5 13.3c-1-.3-1-.9.2-1.4L20.7 3.9c.9-.3 1.4.2 1.3.7Z" />
        </svg>
      ),
    },
  ];

  const education = [
    {
      school: "Institute of Technology of Cambodia",
      degree: "Information and Communication Engineering",
      period: "2022 - Present",
      status: "Expected Graduation: 2027",
    },
    {
      school: "PUC-Institute of Foreign Languages",
      degree: "English Language Diploma",
      period: "2024 - 2025",
    },
    {
      school: "O-Ambel High School",
      degree: "National Baccalaureate Degree (BACII)",
      period: "2021 - 2022",
    },
  ];

  const skills = [
    {
      category: "Operating Systems",
      items: ["Windows 10/11", "Linux Ubuntu Server", "Windows Server (Basic)"],
    },
    {
      category: "Networking",
      items: ["TCP/IP", "SSH", "DNS/DHCP", "Firewall Configuration", "VLANs"],
    },
    {
      category: "DevOps & Infrastructure",
      items: ["Jenkins", "Ansible", "Docker", "Git/GitHub", "CI/CD pipelines"],
    },
    {
      category: "Databases & Programming",
      items: [
        "PostgreSQL",
        "MySQL",
        "Bash Scripting",
        "Java / Spring Boot (Basics)",
        "Python (Basics)",
      ],
    },
    {
      category: "Virtualization",
      items: ["VirtualBox", "VMware"],
    },
  ];

  const projects = [
    {
      title: "Jenkins + Ansible Deployment Pipeline",
      description:
        "Configured a CI/CD pipeline using Jenkins and Ansible to automatically deploy a Spring Boot application to a remote Linux server via SSH.",
      tags: ["Jenkins", "Ansible", "Linux", "Spring Boot"],
      link: "#",
    },
    {
      title: "PostgreSQL Database Configuration",
      description:
        "Installed and configured PostgreSQL locally for Spring Boot application development, managing users and authentication.",
      tags: ["PostgreSQL", "Database Admin", "Spring Boot"],
      link: "#",
    },
    {
      title: "Linux Server Administration Lab",
      description:
        "Created and managed Linux server environments for testing. Handled users, permissions, SSH configuration, and UFW firewall setup.",
      tags: ["Ubuntu Server", "SSH", "Linux Admin", "Firewall"],
      link: "#",
    },
    {
      title: "Spring Boot Deployment Project",
      description:
        "Built and deployed a Spring Boot REST API integrated with PostgreSQL using Maven build processes and Linux deployment.",
      tags: ["Spring Boot", "REST API", "Maven", "Deployment"],
      link: "#",
    },
  ];

  return (
    <main className="relative flex flex-1 justify-center overflow-x-hidden bg-white px-4 py-8 text-zinc-800 dark:bg-black dark:text-zinc-100 sm:px-6 sm:py-12 lg:px-8">
      <div className="dot-background pointer-events-none absolute inset-0" />
      <div className="relative z-10 w-full max-w-7xl space-y-16 sm:space-y-24 lg:space-y-32 mt-4 sm:mt-8">
        <SectionNav sections={sections} />

        {/* Profile Section */}
        <section
          id="profile"
          className="scroll-mt-24 flex flex-col items-center justify-center gap-8 lg:flex-row lg:justify-between text-center lg:text-left"
        >
          <div className="flex-1 max-w-2xl flex flex-col items-center lg:items-start">
            <div className="mb-8 inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
              👋 Welcome to my portfolio
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              IT Support • System Administration
            </h1>
            <div className="mt-5 space-y-5 text-sm text-zinc-600 dark:text-zinc-400 sm:mt-6 sm:space-y-6 sm:text-base">
              <p>
                I am an IT student focused on infrastructure, server management,
                automation, and troubleshooting. I enjoy working with Linux
                servers, CI/CD pipelines, networking, and deployment systems.
              </p>
              <p>
                I have hands-on experience configuring Jenkins agents,
                automating deployments with Ansible, managing PostgreSQL
                databases, and deploying Spring Boot applications.
              </p>
              <p>
                My goal is to work in IT Support, System Administration,
                Infrastructure Support, or as a Junior DevOps Engineer.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-5">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
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
          </div>

          {/* Photo */}
          <div className="relative mx-auto h-64 w-64 shrink-0 sm:h-80 sm:w-80 lg:mx-0 lg:h-96 lg:w-96">
            <Image
              src="/profile.gif" // Change to .png or .gif as needed
              alt="Tola Rom"
              fill
              className="object-contain"
              priority
              unoptimized={true} // Important for animated GIFs to work in Next.js
            />
          </div>
        </section>

        {/* Education Section */}
        <section
          id="education"
          className="mx-auto w-full max-w-6xl scroll-mt-24"
        >
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl">
            Education
          </h2>
          <div className="flex flex-col gap-8 sm:gap-10 border-l-2 border-zinc-100 dark:border-zinc-800 ml-3 pl-6 sm:ml-[140px] sm:pl-8">
            {education.map((item) => (
              <article key={item.school} className="relative group pt-1 sm:pt-0">
                {/* Timeline Dot */}
                <div className="absolute -left-[33px] sm:-left-[41px] top-1 sm:top-1.5 h-4 w-4 rounded-full border-2 border-white bg-teal-500 shadow-sm dark:border-zinc-900" />
                
                {/* Desktop Year Label (Left side) */}
                <div className="hidden sm:block absolute -left-[180px] top-0.5 w-[120px] text-right">
                  <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    {item.period}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {item.school}
                  </h3>
                  {/* Mobile Year Pill (Hidden on desktop) */}
                  <span className="sm:hidden inline-flex w-fit rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                    {item.period}
                  </span>
                </div>

                <p className="text-base font-medium text-teal-600 dark:text-teal-400 mb-3">
                  {item.degree}
                </p>

                {item.status && (
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 flex items-center gap-2">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-teal-500/80 animate-pulse" />
                    {item.status}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="mx-auto w-full max-w-6xl scroll-mt-24">
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl">
            Skills & Expertise
          </h2>
          <p className="mb-6 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400 sm:text-base">
            A concise overview of areas I work in — tools and frameworks I use
            regularly.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 sm:gap-6">
            {skills.map((skill) => (
              <div
                key={skill.category}
                className="rounded-2xl border border-zinc-100 bg-white p-4 shadow-sm transition hover:shadow-lg hover:-translate-y-1 dark:border-zinc-700/40 dark:bg-zinc-900/40 sm:p-6"
              >
                <div className="mb-4 flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {skill.category}
                  </h3>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    {skill.items.length}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2.5 sm:gap-3">
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
        <section
          id="projects"
          className="mx-auto w-full max-w-6xl scroll-mt-24"
        >
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 sm:gap-6">
            {projects.map((project) => (
              <a
                key={project.title}
                href={project.link}
                className="group relative rounded-2xl border border-zinc-100 bg-white p-4 shadow-sm transition hover:shadow-lg hover:-translate-y-1 dark:border-zinc-700/40 dark:bg-zinc-900/40 sm:p-6"
              >
                <div className="relative z-10">
                  <div className="mb-4 h-28 w-full overflow-hidden rounded-md bg-zinc-100 dark:bg-zinc-800 sm:h-36" />
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 sm:text-lg">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 sm:text-sm">
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
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        className="h-4 w-4 stroke-current"
                      >
                        <path
                          d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mx-auto w-full max-w-6xl scroll-mt-24 mt-8">
          <div className="rounded-3xl bg-zinc-100 px-6 py-12 dark:bg-zinc-800/80 sm:p-16 flex flex-col lg:flex-row gap-12 lg:gap-16 items-center justify-between text-zinc-900 dark:text-zinc-100 overflow-hidden relative">

            <div className="flex-1 w-full relative z-10">
              <div className="contact-status-badge mb-6 inline-flex rounded-full border px-4 py-1.5 text-sm font-medium">
                Available for internships & entry-level IT roles
              </div>
              <h2 className="mb-6 text-3xl font-extrabold sm:text-4xl lg:text-5xl tracking-tight text-zinc-900 dark:text-zinc-100">
                Let&apos;s get in touch.
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-xl mb-8">
                I am actively seeking opportunities in IT Support, System Administration, Infrastructure Support, and Junior DevOps roles.
              </p>
              
              <a
                href="/CV_Rom_Tola.pdf"
                download
                className="newsletter-join-button cv-download-button inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-black/5 dark:shadow-black/20"
              >
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  className="h-5 w-5 stroke-current"
                  strokeWidth="2"
                >
                  <path
                    d="M8 12.25V2.75M4.75 9l3.25 3.25L11.25 9m-8.5 4.75h10.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Download Resume (PDF)
              </a>
            </div>

            <div className="w-full lg:w-[450px] relative z-10 shrink-0">
              <div className="contact-info-card rounded-2xl border p-6 shadow-xl backdrop-blur-sm space-y-6 sm:p-8">
                <a 
                  href="https://maps.app.goo.gl/tJTcr6E55V6uJkZWA" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-item group flex items-start gap-5 rounded-xl p-3 transition"
                >
                  <span className="contact-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </span>
                  <div>
                    <h3 className="contact-item-title mb-1 font-semibold">Location</h3>
                    <p className="contact-item-value text-sm leading-relaxed">279C, St 590, Sangkat Toul Songkae, Khan Russey Keo, Phnom Penh</p>
                  </div>
                </a>

                <a 
                  href="mailto:tola.rom16@gmail.com" 
                  className="contact-item group flex items-center gap-5 rounded-xl p-3 transition"
                >
                  <span className="contact-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                  </span>
                  <div>
                    <h3 className="contact-item-title mb-1 font-semibold">Email</h3>
                    <p className="contact-item-value text-sm">tola.rom16@gmail.com</p>
                  </div>
                </a>

                <a 
                  href="tel:+85511759486" 
                  className="contact-item group flex items-center gap-5 rounded-xl p-3 transition"
                >
                  <span className="contact-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                      <rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect>
                      <path d="M12 18h.01"></path>
                    </svg>
                  </span>
                  <div>
                    <h3 className="contact-item-title mb-1 font-semibold">Phone</h3>
                    <p className="contact-item-value text-sm">+855 11 759 486</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="mx-auto mt-20 max-w-4xl text-center mb-16 rounded-3xl bg-zinc-50 dark:bg-zinc-900 py-12 px-6 sm:px-12 border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl">
            Stay up to date
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-zinc-600 dark:text-zinc-400 mb-8">
            Get notified when I publish something new, and unsubscribe at any time.
          </p>
          <div className="flex justify-center max-w-lg mx-auto w-full">
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <NewsletterForm />
          </div>
        </section>

        {/* Footer */}
        <section className="border-t border-zinc-200 mt-16 pt-8 pb-12 dark:border-zinc-800">
          <div className="flex flex-col items-center justify-center gap-6 text-center">
            <div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Tola Rom
              </h3>
              <p className="mt-1 text-sm font-medium text-teal-600 dark:text-teal-400">
                IT Support • System Administration • Junior DevOps
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
              <a
                href="#profile"
                className="hover:text-teal-500 transition-colors"
              >
                About
              </a>
              <a
                href="#education"
                className="hover:text-teal-500 transition-colors"
              >
                Education
              </a>
              <a
                href="#skills"
                className="hover:text-teal-500 transition-colors"
              >
                Skills
              </a>
              <a
                href="#projects"
                className="hover:text-teal-500 transition-colors"
              >
                Projects
              </a>
              <a
                href="#contact"
                className="hover:text-teal-500 transition-colors"
              >
                Contact
              </a>
            </div>

            <div className="flex gap-4 text-sm font-medium text-zinc-500 dark:text-zinc-500">
              <a
                href="https://github.com/tolarom"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/tola-rom-292151374/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
              >
                LinkedIn
              </a>
            </div>

            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
              © {new Date().getFullYear()} Tola Rom. All rights reserved.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
