import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';

type projectsType = (
  {
      project: string;
      description:string;
      href: string;
      src: string;
      badges: string[];
  }
)[];

const projects: projectsType = [
  {
    project: "WebForge",
    description:
      "WebForge is an AI-powered Software-as-a-Service (SaaS) application I designed specifically for coders. It leverages cutting-edge AI models to streamline the development process",
    href: "/WebForge",
    src: "/images/portfolio/webforge.png",
    badges: ["Nextjs", "prisma", "SupaBase", "AI", "Auth", "Stripe"],
  },
  {
    project: "Beethive",
    description:
      "Beethive is a dynamic music streaming platform I developed, drawing inspiration from Spotify. It offers access to an extensive collection of music, podcasts, and various audio content. Tailoring to diverse user needs, I integrated a freemium model and leveraged Stripe for smooth subscription handling.",
    href: "/beethive",
    src: "/images/portfolio/beethive.png",
    badges: ["Nextjs", "Prisma", "SupaBase", "Authjs", "Stripe", "UploadThing"],
  },
  {
    project: "FitPulse",
    description:
      "FitPulse is a mobile application I designed to cater to a wide range of fitness enthusiasts. It empowers users to embark on personalized fitness journeys, whether they prefer following pre-designed programs or creating custom routines.",
    href: "/FitPulse",
    src: "/images/portfolio/dFitness.png",
    badges: ["Nextjs", "prisma", "SupaBase", "Rest", "TRPC", "Auth"],
  },
  {
    project: "Versa Desk",
    description:
      "An agile Shopify E-commerce web application with a headless architecture. Seamlessly manages inventory, boosts sales, and streamlines fulfillment processes. Enhances performance and elevates SEO for maximum online visibility. - devmode password:stowyi",
    href: "https://nextjs-versa-test.vercel.app/",
    src: "/images/portfolio/Versa-Desk.png",
    badges: ["Nextjs", "Shopify", "GraphQL", "CMS"],
  },
];
export default function ProjectGrid() {
  return (
    <div className='pb-4'>
      <h1 className="py-8 text-center text-4xl font-semibold tracking-tighter">
        Projects
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((ele) => (
          <Link href={ele.href} className="group" key={ele.project}>
            <div className="relative flex h-full items-center justify-center ">
              <div className="relative w-full overflow-clip rounded-lg">
                <AspectRatio
                  ratio={16 / 9}
                  className="absolute left-0 top-0 z-10  "
                >
                  <Image
                    src={ele.src}
                    fill={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    alt="Image"
                    className=" opacity-75"
                  />
                </AspectRatio>
                <div className="invisible absolute left-1/2 top-1/2 z-30 col-span-1 row-span-1 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-black/60 opacity-0 transition-all duration-300 ease-in-out group-hover:visible  group-hover:opacity-100 ">
                  <div className="relative mx-auto flex h-full w-4/6 flex-col items-center justify-center space-y-2 ">
                    <h1 className="text-3xl font-semibold leading-9 tracking-tight text-white">
                      {ele.project}
                    </h1>
                    <p className="leading-5 text-white">{ele.description}</p>
                    <div className=" grid h-12  w-full grid-cols-4 items-center justify-center    justify-items-center gap-2 ">
                      {ele.badges.map((elej) => (
                        <Badge
                          className="z-20 justify-center border-black text-center"
                          variant={"default"}
                          key={elej}
                        >
                          {elej}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
