import { useState } from 'react';
import { patchUserMe } from '@/lib/api';
import { useUserStore } from '@/store/userStore';
import { updateProfileCache } from '@/hooks/useProfile';

interface PatchResult {
  error: string | null;
}

export function useUpdateAvatar(): {
  isAvatarLoading: boolean;
  patchAvatar: (avatarUrl: string) => Promise<PatchResult>;
} {
  const [isAvatarLoading, setIsAvatarLoading] = useState<boolean>(false);

  const patchAvatar = async (avatarUrl: string): Promise<PatchResult> => {
    setIsAvatarLoading(true);
    const { data: updated, error } = await patchUserMe({ avatar_url: avatarUrl });
    setIsAvatarLoading(false);

    if (error || !updated) return { error: error ?? 'Error al actualizar el avatar' };

    const newAvatarUrl: string = updated.avatar_url;
    updateProfileCache({ avatar_url: newAvatarUrl });
    useUserStore.getState().setUser({ avatar_url: newAvatarUrl });

    return { error: null };
  };

  return { isAvatarLoading, patchAvatar };
}
