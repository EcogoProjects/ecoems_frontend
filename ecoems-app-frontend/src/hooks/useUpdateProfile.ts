import { useState } from 'react';
import { patchUserMe } from '@/lib/api';
import { useUserStore } from '@/store/userStore';
import { updateProfileCache } from '@/hooks/useProfile';

interface ProfilePayload {
  name: string;
  last_name: string;
  phone: string;
  gender: string;
  state: string;
  town: string;
}

interface PatchResult {
  error: string | null;
}

export function useUpdateProfile(): {
  isProfileLoading: boolean;
  patchProfile: (payload: ProfilePayload) => Promise<PatchResult>;
} {
  const [isProfileLoading, setIsProfileLoading] = useState<boolean>(false);

  const patchProfile = async (payload: ProfilePayload): Promise<PatchResult> => {
    setIsProfileLoading(true);
    const { data: updated, error } = await patchUserMe(payload);
    setIsProfileLoading(false);

    if (error || !updated) return { error: error ?? 'Error al actualizar el perfil' };

    updateProfileCache({
      name: updated.name,
      last_name: updated.last_name,
      phone: updated.phone,
      gender: updated.gender,
      state: updated.state,
      town: updated.town,
    });
    useUserStore.getState().setUser({ name: updated.name });

    return { error: null };
  };

  return { isProfileLoading, patchProfile };
}
