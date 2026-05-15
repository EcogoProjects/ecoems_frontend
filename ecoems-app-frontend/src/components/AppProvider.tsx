'use client'

import { useEffect } from 'react';
import { useUserStore } from '@/store/userStore';
import { getUserBasicInfo } from '@/lib/api';

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const isLoaded = useUserStore((s) => s.isLoaded);
  const setUser = useUserStore((s) => s.setUser);

  useEffect(() => {
    if (isLoaded) return;
    getUserBasicInfo().then(({ data }) => {
      setUser({ ...(data ?? {}), isLoaded: true });
    });
  }, [isLoaded, setUser]);

  return <>{children}</>;
}
