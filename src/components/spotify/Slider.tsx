"use client";

import { cn } from "@/lib/utils";

import useVolume from "@/hooks/beatHive/useVolume";
import { Slider } from "../ui/slider";




type SliderProps = React.ComponentProps<typeof Slider>

interface SpotifySliderProps extends SliderProps {
  className?: string;
}

export function SliderSpotify({ className, ...props }: SpotifySliderProps) {
  const volume = useVolume();
  const handleChange = (newValue: number[]) => {
    volume.setVolume(newValue[0]!);
    console.log(newValue[0]);
  };
  return (
    <Slider
      defaultValue={[0.5]}
      max={1}
      step={0.01}
      value={[volume.volume]}
      onValueChange={handleChange}
      orientation="horizontal"
      className={cn("w-[80%]", className)}
      inverted={true}
      dir="ltr"
      {...props}
    />
  );
}
