
import React from 'react'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from'@/components/ui/card'

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
export default function Projects() {
  return (
    <div className="relative mx-auto flex h-full flex-grow flex-col justify-center gap-4 text-black dark:text-white">
      <div className="absolute w-full">
        <h1 className="my-5 w-full text-center text-4xl  font-semibold tracking-tighter">
          Projects
        </h1>
        <div className="flex w-[100%] justify-center">
          <Carousel
            className="w-[80%]"
            orientation="horizontal"
            opts={{ align: "start", loop: true }}
          >
            <CarouselContent>
              <CarouselItem>
                <Card className=" bg-card/0">
                  <CardHeader>
                    <CardTitle>WebForge</CardTitle>
                    <CardDescription>
                      Ai models tailord for client workflow
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="gap-3 space-y-3 ">
                      <div className=" flex w-[750px] justify-center">
                        <div className="w-[700px] hue-rotate-90">
                          <AspectRatio ratio={16 / 9} id="saas image ratio">
                            <Image
                              src={"/images/portfolio/sass-dash.png"}
                              fill={true}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              alt="Image"
                              className="opacity-75 hue-rotate-180 "
                            />
                          </AspectRatio>
                        </div>
                      </div>
                      <p className="leading-4">
                        This is an AI SAAS Product. it uses multiple LLM&rsquo;s
                        to create conversations, code generation, images, video,
                        and music. This is monitiesed with a subscription based
                        model. All users are given some free credits to
                        experiment, and implemented a stripe subscription
                        service to give users full access to the AI models. In
                        this project I used OpenAi and replicates api&apos;s,
                        with TRPC to create a rest backend
                      </p>
                      <Button variant="link" asChild>
                        <Link href={"/saas"}>View</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
              <CarouselItem className="group overflow-clip">
                {/* <Card className="bg-card/0">
                  <CardHeader>
                    <CardTitle>FitPulse</CardTitle>
                    <CardDescription>Fitness App</CardDescription>
                  </CardHeader>
                  <CardContent> */}
                {/* <div className="w-full space-y-3"> */}
                {/* <p className="leading-4">
                        This app is for people who want a fitness journey on and
                        off the rails, with pre planned programs and custom
                        routines. Track your personal records, and weekly
                        muscles exercised.
                      </p> */}

                <Link href={"/FitPulse"} className="group">
                  <div className="relative flex h-full items-center justify-center ">
                    <div className="relative w-full overflow-clip rounded-lg">
                      <AspectRatio
                        ratio={16 / 9}
                        className="absolute left-0 top-0 z-10  "
                      >
                        <Image
                          src={"/images/portfolio/dFitness.png"}
                          fill={true}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          alt="Image"
                          className=" opacity-75"
                        />
                      </AspectRatio>
                      <div className="invisible absolute left-1/2 top-1/2 z-30 col-span-1 row-span-1 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-black/40 opacity-0 transition-all duration-300 ease-in-out group-hover:visible  group-hover:opacity-100 ">
                        <div className="relative mx-auto flex h-full w-4/6 items-center justify-center">
                          <div className=" grid h-36  w-full grid-cols-6 items-center justify-center    justify-items-center gap-2 text-center">
                            <Badge
                              className="z-20 justify-center border-black text-center"
                              variant={"default"}
                            >
                              Nextjs
                            </Badge>
                            <Badge
                              className="z-20 border-black"
                              variant={"default"}
                            >
                              Prisma
                            </Badge>
                            <Badge
                              className="z-20 border-black"
                              variant={"default"}
                            >
                              Supabase
                            </Badge>
                            <Badge
                              className="z-20 border-black"
                              variant={"default"}
                            >
                              REST
                            </Badge>
                            <Badge
                              className="z-20 border-black"
                              variant={"default"}
                            >
                              TRPC
                            </Badge>
                            <Badge
                              className="z-20 border-black"
                              variant={"default"}
                            >
                              Oauth
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* </div> */}
                {/* </CardContent>
                </Card> */}
              </CarouselItem>
              <CarouselItem>
                <Card className=" bg-card/0 ">
                  <CardHeader>
                    <CardTitle>D Music</CardTitle>
                    <CardDescription>Spotify Clone</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Image
                        src={"/images/portfolio/D Music.png"}
                        width={222.22}
                        height={125}
                        alt="saas pic"
                        className="opacity-75"
                      />
                      <div className="flex flex-col">
                        <p>
                          This is an AI SAAS Product. it uses multiple
                          LLM`&rsquo;`s to create conversations, code
                          generation, images, video, and music. This is
                          monitiesed with a subscription based model. All users
                          are given some free credits to experiment, and
                          implemented a stripe subscription service to give
                          users full access to the AI models. In this project I
                          used OpenAi and replicates api&apos;s, with TRPC to
                          create a rest backend
                        </p>
                        <Button variant="link" asChild>
                          <Link href={"/beethive"}>View</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter></CardFooter>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="z-30" />
            <CarouselNext className="z-30" />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
