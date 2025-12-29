import { create } from "zustand";

interface SelectionState {
    selectedGameId: string | null;
}

interface SelectionActions {
    setSelectedGameId: (gameId: string) => void;
}

export const useSelectionStore = create<SelectionState & SelectionActions>((set) => ({
    // State
    selectedGameId: null,

    // Actions
    setSelectedGameId: (gameId: string) => set({ selectedGameId: gameId }),
}));
