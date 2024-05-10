"use client";

import { Slider } from "@/components/ui/slider";
import useVolume from "@/hooks/spoty/useVolume";
import { cn } from "@/lib/utils";



type SliderProps = React.ComponentProps<typeof Slider> 

export function SliderSpotify({
  className,
  ...props
}: SliderProps) {
  const volume = useVolume()
  const handleChange = (newValue: number[]) => {
    volume.setVolume(newValue[0]! );
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
