import { create } from 'zustand';

interface NavigationState {
  isNavigating: boolean;
  startNavigation: () => void;
  stopNavigation: () => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  isNavigating: false,
  startNavigation: () => set({ isNavigating: true }),
  stopNavigation: () => set({ isNavigating: false }),
}));
