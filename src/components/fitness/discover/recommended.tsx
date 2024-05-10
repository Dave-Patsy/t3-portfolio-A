"use client"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { useEffect, useState } from "react"
import Image from "next/image"


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
    <>
      <div className="text-6xl font-extrabold text-center pb-4">Recomended</div>
      <div className="grid grid-cols-1 lg:grid-cols-5 justify-items-center gap-2 items-center w-11/12 mx-auto">
        {x?.map((ele, idx) => {
          return (
            <div className="relative w-full" key={idx}>
              <AspectRatio ratio={1} className="w-full">
                <div className="h-full w-full">
                  <div className="absolute flex h-full w-full items-center justify-center bg-black/40 text-center z-20">
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
    </>
  )
}