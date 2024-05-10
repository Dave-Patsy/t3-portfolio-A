import type { Songs } from "@prisma/client";
import { create } from "zustand";

interface QueueStore {
  songs: Songs[];
  activeSong?: Songs;
  setSong: (song: Songs) => void;
  addSong: (song: Songs) => void;

  setSongs: (songs: Songs[]) => void;
  reset: () => void;
}

const useQueue = create<QueueStore>((set) => ({
  songs: [],
  activeSong: undefined,
  setSong: (song: Songs) => set({ activeSong: song }),
  addSong: (song: Songs) =>
    set((state) => ({
      songs: [...state.songs, song]
    }) ),
  setSongs: (songs: Songs[]) => set({ songs }),
  reset: () => set({ songs: [], activeSong: undefined }),
}));


export default useQueue