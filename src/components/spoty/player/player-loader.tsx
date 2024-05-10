'use client'
import React from 'react'

import { cn } from '@/lib/utils'
import useQueue from '@/hooks/spoty/useQueue'
import Player from './player'



type PlayerProps = {
  className?: string
}
export default function PlayerContent({className}:PlayerProps) {
  const player = useQueue()
  return (
    <div className={cn(``, className)}>
      <Player key={player.activeSong?.id}  song={player.activeSong}    />
    </div>
  );
}
