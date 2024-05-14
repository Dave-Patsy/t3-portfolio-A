'use client'
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useEffect, useState } from "react";
import Link from "next/link";

const workout_routines = [
  "Power Blast",
  "Iron Core",
  "TurboFit",
  "Shred Zone",
  "Extreme Ignition",
  "Beast Mode",
  "Killer Cardio",
  "Ripped Revolution",
  "Body Blitz",
  "Flex Fusion",
  "Sweat Storm",
  "High Voltage",
  "Lean Machine",
  "Agility Assault",
  "Muscle Meltdown",
  "Torch & Tone",
  "Mega Pump",
  "Stamina Surge",
  "Ultimate Burn",
  "Fitness Fury",
];

export default function Collections() {
  const [x, setX] = useState<typeof workout_routines>();

  useEffect(() => {
    const shuffledArray = workout_routines.sort(() => 0.5 - Math.random());
    setX(() => shuffledArray.slice(0, Math.min(5, shuffledArray.length / 2)));
  }, []);
  if (!x) return null;
  return (
    <div className="w-11/12 mx-auto">
      <div className="flex justify-between items-baseline">
        <div className="text-6xl font-extrabold py-2">Collections</div>
        <Link href={'/FitPulse'} className="text-2xl font-light py-2 text-slate-600 hover:text-slate-700">Find more...</Link>

      </div>
      <div className="mx-auto grid  grid-cols-1 items-center justify-items-center gap-2 md:grid-cols-2 lg:grid-cols-5">
        {x.map((ele, idx) => {
          return (
            <div
              className="relative w-full cursor-pointer overflow-clip rounded-md duration-100 hover:scale-105"
              key={idx}
            >
              <AspectRatio ratio={1} className="w-full">
                <div className="h-full w-full">
                  <div className="absolute z-10 flex h-full w-full items-center justify-center bg-black/40 text-center">
                    <h1 className="text-4xl font-extrabold text-white">
                      {ele}
                    </h1>
                  </div>

                  <Image
                    className="h-full w-full object-cover"
                    src="https://source.unsplash.com/random/?fitness&1"
                    alt="asdasd"
                    fill={true}
                    sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                  />
                </div>
              </AspectRatio>
            </div>
          );
        })}
      </div>
    </div>
  );
}
