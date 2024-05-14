import Link from "next/link"
import { BarChart3, CalendarDays, Dumbbell, Home } from "lucide-react"

import { Separator } from "@/components/ui/separator"
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";

export default function Navigation() {
  return (
    <>
      <div className="flex content-center items-center justify-center gap-8 pt-16">
        <div className="w-20">
          <AspectRatio ratio={1}>
            <Image
              src={"/images/fitpulse/fitpulse.jpg"}
              fill={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="Image"
            />
          </AspectRatio>
        </div>
        <div>
          <Link
            className="flex flex-col items-center justify-center text-center"
            href="/FitPulse"
            as={"/FitPulse"}
            prefetch={false}
          >
            <Home />
            <h1>Home</h1>
          </Link>
        </div>
        <div>
          <Link
            className="flex flex-col items-center justify-center text-center"
            href="/FitPulse/planner"
            as={"/FitPulse/planner"}
            prefetch={false}
          >
            <CalendarDays /> planner
          </Link>
        </div>
        <div>
          <Link
            className="flex flex-col items-center justify-center text-center"
            href="/FitPulse/tracker"
            as={"/FitPulse/tracker"}
            prefetch={false}
          >
            <BarChart3 /> tracker
          </Link>
        </div>
        <div>
          <Link
            className="flex flex-col items-center justify-center text-center"
            href="/FitPulse/exercises"
            as={"/FitPulse/exercises"}
            prefetch={false}
          >
            <Dumbbell />
            Exercises
          </Link>
        </div>
      </div>
      <Separator />
    </>
  );
}
