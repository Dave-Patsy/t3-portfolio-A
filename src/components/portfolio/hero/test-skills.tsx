"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TestSkillsPortfolio = () => {
  const skills = [
    {
      category: "Frontend Development",
      items: ["React", "Next.js", "Tailwind CSS", "Radix UI"],
    },
    {
      category: "Backend Development",
      items: ["PostgreSQL", "Prisma", "NextAuth", "TRPC", "Zod"],
    },
    {
      category: "State Management",
      items: ["Zustand", "React Query (@tanstack/react-query)"],
    },
    {
      category: "Tooling & Languages",
      items: ["TypeScript", "Git", "Prettier", "ESLint"],
    },
    {
      category: "Data and APIs",
      items: [
        "Sanity CMS",
        "Stripe",
        "Shopify",
        "OpenAI",
        "Replicate",
        "UploadThing",
      ],
    },
    {
      category: "Visual and Interactive Enhancements",
      items: [
        "Three.js & @react-three/fiber",
        "D3.js",
        "GSAP",
        "Framer Motion",
        "React-spring",
      ],
    },
    {
      category: "Testing & Monitoring",
      items: ["PostHog", "Sentry", "Jest", "Puppeteer"],
    },
  ];

  return (
    <section className="py-8">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-6 text-left text-2xl font-bold md:text-4xl">
          Skills
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map(({ category, items }) => (
            <Card
              key={category}
              className="rounded-lg border border-slate-900 
                bg-transparent shadow-lg backdrop-blur-sm transition-transform 
                hover:scale-105 hover:shadow-xl"
            >
              <CardHeader
                className="rounded-t-lg bg-gradient-to-r 
                  from-indigo-500/20 via-purple-500/20 to-pink-500/20 p-4"
              >
                <CardTitle className="text-lg font-semibold uppercase tracking-tight text-white">
                  {category}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <ul className="space-y-1">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="text-sm font-medium hover:text-indigo-500"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestSkillsPortfolio;
