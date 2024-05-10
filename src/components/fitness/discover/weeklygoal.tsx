
"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import MuscleSVG from "./muscle";
import { Label } from "@/components/ui/label";
import MuscleSVGTest from "./test";

const colorPalet = [
  "bg-red-600",
  "bg-orange-600",
  "bg-yellow-600",
  "bg-green-600",
];

export default function WeeklyGoal() {
  return (
    <div>
      <div className="bg-test mx-auto flex w-full flex-col items-center justify-center gap-8 self-center">
        <div className="flex w-full flex-col justify-center bg-accent">
          <h1 className="text-center text-6xl ">Muscle Trained</h1>
          <div className="flex justify-center">
            <div className="h-fit w-96 overflow-hidden rounded-md">
              <AspectRatio ratio={16 / 9}>
                <MuscleSVG />
                {/* <MuscleSVGTest/> */}
              </AspectRatio>
            </div>
            <div className="flex flex-col gap-4">
              <Label>weekly muscle uses</Label>
              {colorPalet.map((ele, idx) => {
                return (
                  <div
                    className={`flex h-9 w-14 ${ele} items-center justify-center self-center text-center `}
                    key={idx}
                  >
                    {idx}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
