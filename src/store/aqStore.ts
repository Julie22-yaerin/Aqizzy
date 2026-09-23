import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { COREScore, User } from '@/types';
import { syncAQProfile } from '@/lib/supabase';

interface CompletedScenarioRecord {
  scenarioId: string;
  completedAt: string;
  coreScoreDelta: COREScore;
}

interface AQState {
  user: User;
  scores: COREScore;
  totalAQ: number;
  completedScenarios: Record<string, CompletedScenarioRecord>;
  soundEnabled: boolean;

  setUserDisplayName: (name: string) => void;
  applyScoreDelta: (delta: Partial<COREScore>, scenarioId?: string) => void;
  markScenarioCompleted: (scenarioId: string, delta: COREScore) => void;
  toggleSound: () => void;
  resetProgress: () => void;
  getStudentTitle: () => string;
}

const DEFAULT_SCORES: COREScore = {
  c: 50,
  o: 50,
  r: 50,
  e: 50,
};

const DEFAULT_USER: User = {
  id: 'student-cap2-vietnam',
  display_name: 'Minh Anh (Lớp 8A3)',
  current_level: 'Học sinh Cấp 2 Tập sự',
  avatar_url: '🎓',
};

const clamp = (val: number, min = 0, max = 100) => Math.min(Math.max(val, min), max);

export const useAQStore = create<AQState>()(
  persist(
    (set, get) => ({
      user: DEFAULT_USER,
      scores: DEFAULT_SCORES,
      totalAQ: 200,
      completedScenarios: {},
      soundEnabled: true,

      setUserDisplayName: (name: string) =>
        set((state) => ({
          user: { ...state.user, display_name: name },
        })),

      applyScoreDelta: () => {
        set(() => ({
          scores: DEFAULT_SCORES,
          totalAQ: 200,
          user: { ...DEFAULT_USER },
        }));
      },

      markScenarioCompleted: () => {
        set(() => ({
          completedScenarios: {},
        }));
      },

      toggleSound: () =>
        set((state) => ({ soundEnabled: !state.soundEnabled })),

      resetProgress: () =>
        set(() => ({
          scores: DEFAULT_SCORES,
          totalAQ: 200,
          completedScenarios: {},
          user: { ...DEFAULT_USER },
        })),

      getStudentTitle: () => {
        return 'Tập sự Khởi đầu (Explorer AQ)';
      },
    }),
    {
      name: 'aqizzy-aq-store',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined'
          ? localStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
      ),
    }
  )
);
