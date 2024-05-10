import { create } from "zustand";

interface VolumeStore {
  volume: number

  setVolume: (volume: number) => void;
  reset: () => void;
}

const useVolume = create<VolumeStore>((set) => ({
  volume:0,

  setVolume: (volume: number) => set({volume:volume}),
  reset: () => set({ volume:0 }),
}));


export default useVolume