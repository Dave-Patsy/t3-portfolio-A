import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SkillsPortfolio = () => {
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
        "React-spring"
      ],
    },
    {
      category: "Testing & Monitoring",
      items: ["PostHog", "Sentry", "Jest", "Puppeteer"],
    },
  ];

  return (
    <section className="">
      <div className="mx-auto max-w-6xl pt-4">
        <h2 className="mb-2 text-left text-4xl font-light">Key Skills</h2>
        <div className="flex flex-wrap gap-2  justify-center ">
          {skills.map(({ category, items }) => (
            <Card key={category} className="flex-1 w-full bg-transparent backdrop-blur-sm transition-shadow hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  {category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="rounded  px-4 text-sm font-medium"
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

export default SkillsPortfolio;
