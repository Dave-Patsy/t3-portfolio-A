/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import useSound from "use-sound";
import { useEffect, useState } from "react";

import type { Songs } from "@prisma/client";

import {
  Pause,
  Play,
  StepBack,
  StepForward,
  Volume1,
  VolumeX,
} from "lucide-react";
import MediaItem from "./MediaItem";

import { SliderSpotify } from "./Slider";
import useQueue from "@/hooks/beethive/useQueue";
import useVolume from "@/hooks/beethive/useVolume";
import LikeButton from "../ui/LikeButton";


interface PlayerContentProps {
  song: Songs | undefined;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song }) => {
  const player = useQueue();
  const volume = useVolume();

  const [isPlaying, setIsPlaying] = useState(false);

  const Icon = isPlaying ? Pause : Play
    
  const VolumeIcon = volume.volume === 1 ? VolumeX : Volume1;

  const onPlayNext = () => {
    if (player.songs.length === 0) {
      return;
    }

    const currentIndex = player.songs.findIndex(
      (song) => song.id === player.activeSong?.id,
    );
    const nextSong = player.songs[currentIndex + 1];

    if (!nextSong) {
      const temp = player.songs[0] as unknown as Songs;
      return player.setSong(temp);
    }

    player.setSong(nextSong);
  };

  const onPlayPrevious = () => {
    if (player.songs.length === 0) {
      return;
    }

    const currentIndex = player.songs.findIndex(
      (song) => song.id === player.activeSong?.id,
    );
    const previousSong = player.songs[currentIndex - 1];

    if (!previousSong) {
      const temp = player.songs.at(-1) as unknown as Songs;
      return player.setSong(temp);
    }

    player.setSong(previousSong);
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [play, { pause, sound }] = useSound(
    song?.song_path ? `https://utfs.io/f/${song?.song_path}` : "",
    {
      volume: 1 - volume.volume,
      onplay: () => setIsPlaying(true),
      onend: () => {
        setIsPlaying(false);
        onPlayNext();
      },
      onpause: () => setIsPlaying(false),
      format: ["mp3"],
    },
  );

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    sound?.play();

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    console.log("handle play music", isPlaying);
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const toggleMute = () => {
    if (volume.volume === 0) {
      volume.setVolume(1);
    } else {
      volume.setVolume(0);
    }
  };

  return player.activeSong ? (
    <div className="grid h-full grid-cols-2 md:grid-cols-3">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem />
          <LikeButton />
        </div>
      </div>

      <div
        className="
            col-auto 
            flex 
            w-full 
            items-center 
            justify-end 
            px-4
            md:hidden
          "
      >
        <div
          onClick={handlePlay}
          className="
              flex
              h-10
              w-10 
              cursor-pointer 
              items-center 
              justify-center 
              rounded-full 
              bg-white 
              p-1
            "
        >
          <Icon />
        </div>
      </div>

      <div
        className="
            mx-4
            hidden
            h-full 
            w-full 
            max-w-[722px] 
            items-center 
            justify-center 
            gap-x-6
            md:flex
          "
      >
        <StepBack
          onClick={onPlayPrevious}
          size={30}
          className="
              cursor-pointer 
              text-orange-400
              transition 
              hover:text-orange-400
            "
        />
        <div
          onClick={handlePlay}
          className="
              flex 
              h-10 
              w-10
              cursor-pointer
              items-center 
              justify-center 
              rounded-full 
              fill-white
              stro
              text-yellow-200
              bg-orange-500
              p-1
            "
        >
          <Icon />
        </div>
        <StepForward
          onClick={onPlayNext}
          size={30}
          className="
              cursor-pointer 
              text-orange-400
              transition 
              hover:text-orange-600
            "
        />
      </div>

      <div className="hidden w-full justify-end pr-2 md:flex">
        <div className="flex w-[120px] items-center gap-x-2">
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer"
            size={34}
          />
          <SliderSpotify />
        </div>
      </div>
    </div>
  ) : null;
};

export default PlayerContent;
