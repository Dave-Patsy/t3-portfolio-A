import { createPortal } from "react-dom";
import { useState } from "react";
import { FaAws, FaStripe, FaGithub } from "react-icons/fa";
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
  SiDjango,
  SiFlask,
  SiVercel,
  SiDocker,
} from "react-icons/si";
import { DiRedis } from "react-icons/di";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const categories = [
  {
    label: "Frameworks",
    items: [
      {
        name: "Next.js",
        icon: <SiNextdotjs className="h-8 w-8 text-black dark:text-white" />,
        description:
          "A React framework for building server-rendered and static web applications. Hosted on Vercel for seamless deployments.",
      },
      {
        name: "Express",
        icon: (
          <SiExpress className="h-8 w-8 text-gray-800 dark:text-gray-200" />
        ),
        description:
          "Minimal and flexible Node.js framework for building RESTful APIs and backend microservices.",
      },
      {
        name: "Django",
        icon: (
          <SiDjango className="h-8 w-8 text-green-700 dark:text-green-500" />
        ),
        description:
          "A Python framework for building scalable web applications with built-in ORM and admin interface.",
      },
      {
        name: "Flask",
        icon: <SiFlask className="h-8 w-8 text-gray-600 dark:text-gray-400" />,
        description:
          "Lightweight Python framework for building microservices and REST APIs.",
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
          "Comprehensive platform for payment processing, invoicing, and subscription management.",
      },
      {
        name: "Shopify",
        icon: <SiShopify className="h-8 w-8 text-[#96BF48]" />,
        description:
          "E-commerce solution for building online stores and managing transactions.",
      },
    ],
  },
  {
    label: "Monitoring and Analytics",
    items: [
      {
        name: "PostHog",
        icon: <SiPosthog className="h-8 w-8 text-pink-600" />,
        description:
          "Self-hosted analytics tool for tracking user behavior and product metrics.",
      },
      {
        name: "Sentry",
        icon: <SiSentry className="h-8 w-8 text-purple-600" />,
        description:
          "Error tracking tool to monitor application performance and resolve issues faster.",
      },
    ],
  },
  {
    label: "Testing",
    items: [
      {
        name: "Jest",
        icon: <SiJest className="h-8 w-8 text-red-500" />,
        description:
          "JavaScript testing framework for unit and integration testing.",
      },
      {
        name: "Puppeteer",
        icon: <SiPuppeteer className="h-8 w-8 text-green-500" />,
        description:
          "Node.js library for automating browser testing and end-to-end workflows.",
      },
    ],
  },
  {
    label: "Hosting and Security",
    items: [
      {
        name: "Vercel",
        icon: <SiVercel className="h-8 w-8 text-black dark:text-white" />,
        description:
          "Hosting platform for front-end frameworks with edge caching and scalability.",
      },
      {
        name: "Cloudflare",
        icon: <SiCloudflare className="h-8 w-8 text-orange-500" />,
        description:
          "Provides DDoS protection, CDN services, and DNS management for enhanced security.",
      },
      {
        name: "AWS",
        icon: <FaAws className="h-8 w-8 text-orange-400" />,
        description:
          "Comprehensive cloud platform for hosting, data storage, and security solutions.",
      },
    ],
  },
  {
    label: "Database",
    items: [
      {
        name: "RDS (PostgreSQL)",
        icon: <SiPostgresql className="h-8 w-8 text-blue-600" />,
        description:
          "Managed relational database service designed for high availability and scalability.",
      },
      {
        name: "Redis",
        icon: <DiRedis className="h-8 w-8 text-[#DC382D]" />,
        description:
          "In-memory database for caching and session management with high-speed performance.",
      },
    ],
  },
  {
    label: "CI/CD",
    items: [
      {
        name: "GitHub Actions",
        icon: <FaGithub className="h-8 w-8 text-gray-800 dark:text-gray-200" />,
        description:
          "Automates workflows for CI/CD pipelines with deep GitHub integration.",
      },
      {
        name: "Docker",
        icon: <SiDocker className="h-8 w-8 text-blue-500 dark:text-blue-300" />,
        description:
          "Containerization platform to streamline application deployment and environment consistency.",
      },
    ],
  },
];


type CategoryItemProps = {
  name: string;
  icon: JSX.Element;
  description: string;
  label: string;
};

function CategoryItem({ name, icon, description, label }: CategoryItemProps) {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <HoverCard open={hovered}>
      <HoverCardTrigger>
        <div
          className="relative flex flex-col items-center space-y-2 rounded-lg p-4 shadow-sm transition-all hover:shadow-md"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {icon}
          <span className="text-sm font-medium">{name}</span>
        </div>
      </HoverCardTrigger>
      {hovered &&
        createPortal(
          <HoverCardContent
            className="flex flex-col z-[9999] w-64 rounded-lg mx-2"
          >
            <Label>{label}</Label>
            {description}
          </HoverCardContent>,
          document.body, // Render outside the card container
        )}
    </HoverCard>
  );
}

export default function TechStack4() {
  return (
    <div className="relative bg-transparent">
      <h2 className="my-2 text-left text-2xl font-normal leading-6 tracking-tighter md:text-4xl">
        Tech Stack
      </h2>
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category, index) => {
          return (
            <>

              {category.items.map((item, idx) => (
                <CategoryItem
                  key={idx}
                  name={item.name}
                  icon={item.icon}
                  description={item.description}
                  label={category.label}
                />
              ))}
            </>
          )
        })}
      </div>
    </div>
  );
}
