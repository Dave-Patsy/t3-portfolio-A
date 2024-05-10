'use client'
import React from 'react'

import { cn } from '@/lib/utils'
import PlayerContent from './playerContent'
import useQueue from '@/hooks/beatHive/useQueue'

type PlayerProps = {
  className: string
}
export default function Player({className}:PlayerProps) {
  const player = useQueue()
  return (
    <div className={cn(``, className)}>
      <PlayerContent key={player.activeSong?.id} song={player.activeSong} />
    </div>
  );
}
