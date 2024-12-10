import { useState } from "react";
import { FaAws, FaNode, FaStripe, FaReact, FaGithub } from "react-icons/fa";
import {
  SiNextdotjs,
  SiPostgresql,
  SiExpress,
  SiJest,
  SiPuppeteer,
  SiPosthog,
  SiSentry,
  SiCloudflare,
  SiShopify,
} from "react-icons/si";
import { DiRedis } from "react-icons/di";

const categories = [
  {
    label: "Frameworks",
    items: [
      {
        name: "Next.js",
        icon: <SiNextdotjs className="h-8 w-8 text-black dark:text-white" />,
        description:
          "Use SSG and SSR for performance. Hosted on Vercel for optimized Next.js hosting.",
      },
      {
        name: "Express",
        icon: (
          <SiExpress className="h-8 w-8 text-gray-800 dark:text-gray-200" />
        ),
        description:
          "Separate microservices for user management, billing, and business logic using REST or GraphQL.",
      },
    ],
  },
  {
    label: "Billing",
    items: [
      {
        name: "Stripe",
        icon: <FaStripe className="h-8 w-8 text-blue-600" />,
        description:
          "Centralized service for invoicing, payment processing, and webhook handling.",
      },
      {
        name: "Shopify",
        icon: <SiShopify className="h-8 w-8 text-[#96BF48]" />,
        description:
          "Centralized service for invoicing, payment processing, and webhook handling.",
      },
    ],
  },
  {
    label: "Monitoring and Analytics",
    items: [
      {
        name: "PostHog",
        icon: <SiPosthog className="h-8 w-8 text-pink-600" />,
        description: "User analytics and behavior tracking.",
      },
      {
        name: "Sentry",
        icon: <SiSentry className="h-8 w-8 text-purple-600" />,
        description: "Error tracking and reporting.",
      },
    ],
  },
  {
    label: "Testing",
    items: [
      {
        name: "Jest",
        icon: <SiJest className="h-8 w-8 text-red-500" />,
        description: "Unit and integration testing.",
      },
      {
        name: "Puppeteer",
        icon: <SiPuppeteer className="h-8 w-8 text-green-500" />,
        description: "E2E testing for user flows.",
      },
    ],
  },
  {
    label: "Networking and Security",
    items: [
      {
        name: "Cloudflare",
        icon: <SiCloudflare className="h-8 w-8 text-orange-500" />,
        description: "Firewall, DDoS protection, and caching of static assets.",
      },
    ],
  },
  {
    label: "Database",
    items: [
      {
        name: "RDS (PostgreSQL)",
        icon: <SiPostgresql className="h-8 w-8 text-blue-600" />,
        description: "Primary relational database for application data.",
      },
      {
        name: "Redis",
        icon: <DiRedis className="h-8 w-8 text-[#DC382D]" />,
        description: "Schema-less database for session management.",
      },
    ],
  },
  {
    label: "CI/CD",
    items: [
      {
        name: "GitHub Actions",
        icon: <FaGithub className="h-8 w-8 text-gray-800 dark:text-gray-200" />,
        description: "Automate deployments to AWS services.",
      },
    ],
  },
];

type CategoryItemProps = {
  name: string;
  icon: JSX.Element;
  description: string;
};

function CategoryItem({ name, icon, description }: CategoryItemProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex cursor-pointer flex-col items-center justify-center space-y-2 rounded-md bg-black/10 px-4 py-2 shadow-sm transition-shadow hover:shadow-md dark:bg-gray-800 dark:hover:bg-gray-700"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {icon}
      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
        {name}
      </span>
      {hovered && (
        <div className="absolute top-full mt-2 w-64 rounded-md bg-white p-3 text-sm shadow-lg dark:bg-gray-900 dark:text-gray-200">
          {description}
        </div>
      )}
    </div>
  );
}

export default function TechStack() {
  return (
    <div className="rounded-lg border backdrop-blur-sm p-6 dark:border-gray-800 dark:bg-gray-900">
      <h2 className="pb-6 text-3xl font-semibold text-gray-800 dark:text-gray-100">
        Tech Stack
      </h2>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 ">
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col items-center">
            <h3 className=" text-lg font-semibold tracking-tight leading-6 text-gray-700 dark:text-gray-300">
              {category.label}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.items.map((item, idx) => (
                <CategoryItem
                  key={idx}
                  name={item.name}
                  icon={item.icon}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
