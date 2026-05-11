import { create } from 'zustand';

interface UserData {
  name: string | null;
  avatar_url: string | null;
  onboarding_completed: boolean | null;
  plan_type: 'freemium' | 'premium' | null;
}

interface UserState extends UserData {
  isLoaded: boolean;
  setUser: (user: Partial<UserData & { isLoaded: boolean }>) => void;
  clear: () => void;
}

const initialData: UserData & { isLoaded: boolean } = {
  name: null,
  avatar_url: null,
  onboarding_completed: null,
  plan_type: null,
  isLoaded: false,
};

export const useUserStore = create<UserState>((set) => ({
  ...initialData,
  setUser: (user) => set((state) => ({ ...state, ...user })),
  clear: () => set(initialData),
}));
