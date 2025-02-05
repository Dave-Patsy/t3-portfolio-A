"use client";
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

import { Label } from "@/components/ui/label";

const categories = [
  {
    label: "Frameworks",
    items: [
      {
        name: "Next.js",
        icon: <SiNextdotjs className="h-8 w-8 text-black dark:text-white" />,
        description:
          "A React framework for building server-rendered and static websites. Hosted on Vercel for seamless deployments.",
      },
      {
        name: "Express",
        icon: (
          <SiExpress className="h-8 w-8 text-gray-800 dark:text-gray-200" />
        ),
        description:
          "A minimal and flexible Node.js framework for building RESTful APIs and backend microservices.",
      },
      {
        name: "Django",
        icon: (
          <SiDjango className="h-8 w-8 text-green-700 dark:text-green-500" />
        ),
        description:
          "A Python framework for building scalable web applications with built-in ORM and an admin interface.",
      },
      {
        name: "Flask",
        icon: <SiFlask className="h-8 w-8 text-gray-600 dark:text-gray-400" />,
        description:
          "A lightweight Python framework for building microservices and REST APIs.",
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
          "A comprehensive platform for payment processing, invoicing, and subscription management.",
      },
      {
        name: "Shopify",
        icon: <SiShopify className="h-8 w-8 text-[#96BF48]" />,
        description:
          "An e-commerce solution for building online stores and managing transactions.",
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
          "A self-hosted analytics tool for tracking user behavior and product metrics.",
      },
      {
        name: "Sentry",
        icon: <SiSentry className="h-8 w-8 text-purple-600" />,
        description:
          "An error tracking tool to monitor application performance and resolve issues faster.",
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
          "A JavaScript testing framework for unit and integration tests.",
      },
      {
        name: "Puppeteer",
        icon: <SiPuppeteer className="h-8 w-8 text-green-500" />,
        description:
          "A Node.js library for automating browser testing and end-to-end workflows.",
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
          "A hosting platform for front-end frameworks with edge caching and scalability.",
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
          "A comprehensive cloud platform for hosting, data storage, and security solutions.",
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
          "A managed relational database service designed for high availability and scalability.",
      },
      {
        name: "Redis",
        icon: <DiRedis className="h-8 w-8 text-[#DC382D]" />,
        description:
          "An in-memory database used for caching and session management with high-speed performance.",
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
          "A containerization platform that streamlines application deployment and ensures environment consistency.",
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
  const [hovered, setHovered] = useState(false);

  return (
    <HoverCard open={hovered}>
      <HoverCardTrigger>
        <div
          className="flex flex-col items-center space-y-2 rounded-lg p-4 transition-shadow hover:shadow-md"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {icon}
          <span className="text-sm font-medium">{name}</span>
        </div>
      </HoverCardTrigger>
      {hovered &&
        createPortal(
          <HoverCardContent className="z-[9999] mx-2 w-64 rounded-lg p-4">
            <Label>{label}</Label>
            <p className="mt-1 text-sm">{description}</p>
          </HoverCardContent>,
          document.body,
        )}
    </HoverCard>
  );
}

export default function TestTechStack() {
  return (
    <section className="py-8">
      <h2 className="mb-4 text-2xl font-normal md:text-4xl">Tech Stack</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category) =>
          category.items.map((item, idx) => (
            <CategoryItem
              key={`${category.label}-${idx}`}
              name={item.name}
              icon={item.icon}
              description={item.description}
              label={category.label}
            />
          )),
        )}
      </div>
    </section>
  );
}
