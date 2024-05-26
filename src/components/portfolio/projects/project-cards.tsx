import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

type projectsType = {
  project: string;
  description: string;
  href: string;
  src: string;
  badges: string[];
}[];

const projects: projectsType = [
  {
    project: "WebForge",
    description:
      "WebForge is an AI-powered Software-as-a-Service (SaaS) application I designed specifically for coders. It leverages cutting-edge AI models to streamline the development process",
    href: "/WebForge",
    src: "/images/portfolio/webforge-styled.png",
    badges: ["Nextjs", "prisma", "SupaBase", "AI", "Auth", "Stripe"],
  },
  {
    project: "Beethive",
    description:
      "Beethive is a dynamic music streaming platform I developed, drawing inspiration from Spotify. It offers access to an extensive collection of music, podcasts, and various audio content. Tailoring to diverse user needs, I integrated a freemium model and leveraged Stripe for smooth subscription handling.",
    href: "/beethive",
    src: "/images/portfolio/beethive-styled.png",
    badges: ["Nextjs", "Prisma", "SupaBase", "Authjs", "Stripe", "UploadThing"],
  },
  {
    project: "FitPulse",
    description:
      "FitPulse is a mobile application I designed to cater to a wide range of fitness enthusiasts. It empowers users to embark on personalized fitness journeys, whether they prefer following pre-designed programs or creating custom routines.",
    href: "/FitPulse",
    src: "/images/portfolio/fitpulse-styled.png",
    badges: ["Nextjs", "prisma", "SupaBase", "Rest", "TRPC", "Auth"],
  },
  {
    project: "Versa Desk",
    description:
      "An agile Shopify E-commerce web application with a headless architecture. Seamlessly manages inventory, boosts sales, and streamlines fulfillment processes. Enhances performance and elevates SEO for maximum online visibility. - devmode password:stowyi",
    href: "https://nextjs-versa-test.vercel.app/",
    src: "/images/portfolio/versa-desk-styled.png",
    badges: ["Nextjs", "Shopify", "GraphQL", "CMS"],
  },
  {
    project: "Authjs",
    description:
      "Implementing Authjs with JWT strategy, this solution offers robust security features including OAuth2 and credentials authentication, role-based access control, two-factor authentication (2FA), and password reset capabilities. It seamlessly integrates client/server routing to provide a secure and efficient user experience, ideal for businesses seeking reliable and comprehensive authentication solutions.",
    href: "/settings",
    src: "/images/portfolio/test.png",
    badges: [
      "Nextjs",
      "Authjs",
      "JWT",
      "OAuth2",
      "TwoFactorAuthentication (2FA)",
      "SecureWebDevelopment",
    ],
  },
];

export default function ProjectCards() {
  return (
    <>
      {projects.map((ele) => (
        <Card
          key={ele.project}
          className="hover:scale-11 mx-auto w-[97vw]  bg-transparent duration-100 md:w-full"
        >
          <CardContent className="py-4 px-0">
            <div
              className="relative mx-auto flex   w-[95%] flex-col items-center justify-center"
              key={ele.project}
            >
              <div className="relative mb-8   aspect-video w-full items-center justify-center overflow-hidden rounded-md ">
                <Image
                  src={"/images/portfolio/bg.png"}
                  fill={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  alt="Image"
                  className="bg-[#9CE6FA]"
                />
                <div className="absolute bottom-0 w-full">
                  <AspectRatio
                    ratio={16 / 9}
                    className="absolute bottom-0 left-0 z-10 "
                  >
                    <Image
                      src={ele.src}
                      fill={true}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      alt="Image"
                      className=""
                    />
                  </AspectRatio>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <h1 className="line-clamp-1 text-xl font-bold md:text-xl lg:text-2xl">
                  {ele.project}
                </h1>
                <p className="line-clamp-2 text-sm font-light lg:text-xl lg:font-normal">
                  {ele.description}
                </p>
                <div className="flex w-full justify-between gap-2">
                  <div className="relative flex  w-full flex-wrap  gap-2 pt-2 w">
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
                  <div className="gap-2 flex justify-center items-end">
                    <Button asChild variant={"outline"}>
                      <Link href={"/"}>Blog</Link>
                    </Button>
                    <Button asChild variant={"outline"}>
                      <Link href={ele.href}>Demo</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
