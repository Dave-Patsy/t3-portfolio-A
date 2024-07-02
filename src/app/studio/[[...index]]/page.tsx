'use client'

import { NextStudio } from "next-sanity/studio"
import config  from "../../../../sanity.config"
export default function StudioPage(){
  return (
    <div className="absolute h-full w-full bg-red-400">

      <div className="relative flex flex-col overflow-clip h-screen bg-black ">

        <div className="relative w-full h-16 ">

        </div>
        <div className="relative flex-grow">
          <div className="absolute w-full h-full">
            <div className="relative h-full overflow-clip">

              <NextStudio config={config}  />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}