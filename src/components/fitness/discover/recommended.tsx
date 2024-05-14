"use client"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"


const exerciseRoutineNames = [
  "Total Body Blast",
  "Core Crusher",
  "Cardio Inferno",
  "Strength Fusion",
  "HIIT Revolution",
  "Flexibility Flow",
  "Power Plyometrics",
  "Sweat and Sculpt",
  "Endurance Challenge",
  "Balance and Burn",
  "Functional Fitness Fiesta",
  "Athletic Agility",
  "Dynamic Duo (Partner Workout)",
  "Mindful Movement",
  "Strong and Stretched",
]

export default function Recommended() {
  const [x, setX] = useState<string[]>()

  useEffect(() => {
    const shuffledArray = exerciseRoutineNames.sort(
      () => 0.5 - Math.random()
    )
    setX(() => shuffledArray.slice(0, Math.min(5, shuffledArray.length / 2)))
  }, [])

  return (
    <div className="w-11/12 mx-auto">
      <div className="flex justify-between items-baseline">
        <div className="text-6xl font-extrabold py-2">Collections</div>
        <Link href={'/FitPulse'} className="text-2xl font-light py-2 text-slate-600 hover:text-slate-700">Find more...</Link>

      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 justify-items-center gap-2 items-center mx-auto">
        {x?.map((ele, idx) => {
          return (
            <div
              className="relative w-full cursor-pointer duration-100 hover:scale-105 rounded-md overflow-clip"
              key={idx}
            >
              <AspectRatio ratio={1} className="w-full">
                <div className="h-full w-full">
                  <div className="absolute z-20 flex h-full w-full items-center justify-center bg-black/40 text-center">
                    <h1 className="text-4xl font-extrabold text-white">
                      {ele}
                    </h1>
                  </div>

                  <Image
                    className="h-full w-full object-cover"
                    src="https://source.unsplash.com/random/?fitness&1"
                    alt="workout cover"
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
  )
}