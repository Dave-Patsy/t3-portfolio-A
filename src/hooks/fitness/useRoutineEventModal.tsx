import { create } from "zustand";

interface CreateRoutineEventModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCreateRoutineEventModal = create<CreateRoutineEventModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useCreateRoutineEventModal;
