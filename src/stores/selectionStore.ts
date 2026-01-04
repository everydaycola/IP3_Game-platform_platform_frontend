import { create } from "zustand";

interface SelectionState {
    selectedGameId: string | null;
}

interface SelectionActions {
    setSelectedGameId: (gameId: string | null) => void;
}

export const useSelectionStore = create<SelectionState & SelectionActions>((set) => ({
    // State
    selectedGameId: null,

    // Actions
    setSelectedGameId: (gameId: string|null) => set({ selectedGameId: gameId }),
}));
