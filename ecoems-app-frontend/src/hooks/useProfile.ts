import { useState, useEffect } from 'react';
import { getUserMe, getUser } from '@/lib/api';

interface ActivePlan {
  plan_type: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
}

interface TargetSchool {
  name: string;
  institution_type: string;
  requires_exam: boolean;
  address: string;
}

export interface ProfileData {
  name: string;
  last_name: string;
  phone: string;
  gender: string;
  state: string;
  town: string;
  avatar_url: string;
  email: string;
  active_plan: ActivePlan | null;
  target_school: TargetSchool | null;
  plan_start: string;
  plan_end: string;
}

function formatPlanDate(dateStr: string | undefined): string {
  if (!dateStr) return '—';
  const [year, month] = dateStr.split('-');
  return `${month}/${year.slice(2)}`;
}

let profileCache: ProfileData | null = null;
const subscribers = new Set<(data: ProfileData) => void>();

export function updateProfileCache(updates: Partial<ProfileData>): void {
  if (!profileCache) return;
  profileCache = { ...profileCache, ...updates };
  subscribers.forEach(fn => fn(profileCache!));
}

export function clearProfileCache(): void {
  profileCache = null;
}

export function useProfile() {
  const [data, setData] = useState<ProfileData | null>(profileCache);
  const [isLoading, setIsLoading] = useState(profileCache === null);

  useEffect(() => {
    subscribers.add(setData);
    return () => { subscribers.delete(setData); };
  }, []);

  useEffect(() => {
    if (profileCache !== null) return;

    Promise.all([getUserMe(), getUser()])
      .then(([{ data: meData }, { data: authData }]) => {
        if (!meData) return;
        const profile: ProfileData = {
          name: meData.name ?? '',
          last_name: meData.last_name ?? '',
          phone: meData.phone ?? '',
          gender: meData.gender ?? '',
          state: meData.state ?? '',
          town: meData.town ?? '',
          avatar_url: meData.avatar_url ?? '',
          email: authData?.email ?? '',
          active_plan: meData.active_plan ?? null,
          target_school: meData.target_school ?? null,
          plan_start: formatPlanDate(meData.active_plan?.start_date),
          plan_end: formatPlanDate(meData.active_plan?.end_date),
        };
        profileCache = profile;
        setData(profile);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { data, isLoading };
}
