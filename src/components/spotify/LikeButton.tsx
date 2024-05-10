'use client'

import useQueue from '@/hooks/beatHive/useQueue';
import { Heart } from 'lucide-react';
import React from 'react'

import { api } from '@/trpc/react';


export default function LikeButton() {
  const queue = useQueue();

  const utils = api.useUtils()
  const likeAPI = api.BeatHive.songsRouter.getLikedSongs.useQuery();

  const addLike = api.BeatHive.songsRouter.updateLikedSongs.useMutation({
    onMutate: async () => {
      await utils.BeatHive.songsRouter.getLikedSongs.cancel();
      const prevFavorite = utils.BeatHive.songsRouter.getLikedSongs.getData();

      utils.BeatHive.songsRouter.getLikedSongs.setData(
        undefined,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        (old) => [...old, queue.activeSong],
      );
      return { prevFavorite };
    },
    onError(err, newPost, ctx) {
      // If the mutation fails, use the context-value from onMutate
      utils.BeatHive.songsRouter.getLikedSongs.setData(
        undefined,
        ctx!.prevFavorite,
      );
    },
    async onSettled() {
      await utils.BeatHive.songsRouter.getLikedSongs.invalidate();
    },
  });
  const subLike = api.BeatHive.songsRouter.deleteLikedSongs.useMutation({
    onMutate: async () => {
      await utils.BeatHive.songsRouter.getLikedSongs.cancel();
      const prevFavorite = utils.BeatHive.songsRouter.getLikedSongs.getData();

      utils.BeatHive.songsRouter.getLikedSongs.setData(undefined, (old) =>
        old?.filter((favorite) => favorite.id !== queue.activeSong?.id),
      );
      return { prevFavorite };
    },
    onError(err, newPost, ctx) {
      // If the mutation fails, use the context-value from onMutate
      utils.BeatHive.songsRouter.getLikedSongs.setData(
        undefined,
        ctx!.prevFavorite,
      );
    },
    async onSettled() {
      await utils.BeatHive.songsRouter.getLikedSongs.invalidate();
    },
  });
  const handleLike = () => {
    if (!liked) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      addLike.mutate({ songId: queue.activeSong?.id! });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      subLike.mutate({ songId: queue.activeSong?.id! });
    }
  };
  
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  const liked = likeAPI.data?.reduce((acc, cur) => {
    return cur.id == queue.activeSong?.id ? true : acc;
  }, false)!;

  return (
    <button
      className="
    cursor-pointer 
    transition 
    hover:opacity-75
    "
      disabled={likeAPI.isLoading}
      onClick={handleLike}
    >
      <Heart
        className="text-white data-[liked=true]:fill-emerald-500  data-[liked=true]:text-emerald-500"
        data-liked={liked}
      />
    </button>
  );
}
