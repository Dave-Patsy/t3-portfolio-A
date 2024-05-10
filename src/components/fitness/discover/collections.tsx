
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
  return (
    <>
      <div className="text-center text-6xl font-extrabold">Collections</div>
      <div className="mx-auto grid w-11/12 grid-cols-1 md:grid-cols-2 lg:grid-cols-5 items-center justify-items-center gap-2">
        {workout_routines.map((ele, idx) => {
          return (
            <div className="relative w-full" key={idx}>
              <AspectRatio ratio={1} className="w-full">
                <div className="h-full w-full">
                  <div className="absolute flex h-full w-full items-center justify-center bg-black/40 text-center z-10">
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
    </>
  );
}
