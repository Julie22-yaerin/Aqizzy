import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { COREScore, User } from '@/types';
import { syncProgressToCloud, CompletedScenarioRecord } from '@/lib/userDataSync';

export type { CompletedScenarioRecord };

interface AQState {
  user: User;
  scores: COREScore;
  totalAQ: number;
  completedScenarios: Record<string, CompletedScenarioRecord>;
  soundEnabled: boolean;

  setUserDisplayName: (name: string) => void;
  setUser: (userData: Partial<User>) => void;
  applyScoreDelta: (delta: Partial<COREScore>, scenarioId?: string) => void;
  markScenarioCompleted: (scenarioId: string, delta: COREScore) => void;
  syncFromCloud: (cloudData: {
    scores?: COREScore;
    completedScenarios?: Record<string, CompletedScenarioRecord>;
    displayName?: string;
    current_level?: string;
  }) => void;
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

export function computeCurrentLevel(total: number): string {
  if (total >= 340) return 'Bậc thầy AQ Vượt nghịch cảnh';
  if (total >= 280) return 'Chiến binh Thép Cấp 2';
  if (total >= 230) return 'Cán bộ Lớp Tiên phong';
  if (total >= 170) return 'Học sinh Cấp 2 Tập sự';
  return 'Cần rèn luyện Bền bỉ';
}

export function computeStudentTitle(total: number): string {
  if (total >= 340) return 'Bậc thầy AQ (Master of CORE)';
  if (total >= 280) return 'Bản lĩnh Vượt Sóng Gió (High AQ)';
  if (total >= 220) return 'Đang tiến bộ vững chắc (Growing AQ)';
  return 'Tập sự Khởi đầu (Explorer AQ)';
}

export const useAQStore = create<AQState>()(
  persist(
    (set, get) => ({
      user: DEFAULT_USER,
      scores: DEFAULT_SCORES,
      totalAQ: 200,
      completedScenarios: {},
      soundEnabled: true,

      setUserDisplayName: (name: string) => {
        set((state) => ({
          user: { ...state.user, display_name: name },
        }));
        syncProgressToCloud(get());
      },

      setUser: (userData: Partial<User>) => {
        set((state) => ({
          user: { ...state.user, ...userData },
        }));
        syncProgressToCloud(get());
      },

      applyScoreDelta: (delta: Partial<COREScore>) => {
        const current = get().scores;
        const newScores: COREScore = {
          c: clamp(current.c + (delta.c || 0)),
          o: clamp(current.o + (delta.o || 0)),
          r: clamp(current.r + (delta.r || 0)),
          e: clamp(current.e + (delta.e || 0)),
        };
        const total = newScores.c + newScores.o + newScores.r + newScores.e;
        const level = computeCurrentLevel(total);

        set((state) => ({
          scores: newScores,
          totalAQ: total,
          user: { ...state.user, current_level: level },
        }));

        syncProgressToCloud(get());
      },

      markScenarioCompleted: (scenarioId: string, delta: COREScore) => {
        const now = new Date().toISOString();
        set((state) => ({
          completedScenarios: {
            ...state.completedScenarios,
            [scenarioId]: {
              scenarioId,
              completedAt: now,
              coreScoreDelta: delta,
            },
          },
        }));

        syncProgressToCloud(get());
      },

      syncFromCloud: (cloudData) => {
        set((state) => {
          const mergedCompleted = {
            ...(cloudData.completedScenarios || {}),
            ...state.completedScenarios,
          };

          const cloudCount = Object.keys(cloudData.completedScenarios || {}).length;
          const localCount = Object.keys(state.completedScenarios).length;

          // If cloud has scores and has at least as much progress as local, use cloud scores
          const chosenScores = (cloudCount >= localCount && cloudData.scores) ? cloudData.scores : state.scores;
          const total = chosenScores.c + chosenScores.o + chosenScores.r + chosenScores.e;
          const level = cloudData.current_level || computeCurrentLevel(total);
          const displayName = cloudData.displayName || state.user.display_name;

          return {
            scores: chosenScores,
            totalAQ: total,
            completedScenarios: mergedCompleted,
            user: {
              ...state.user,
              display_name: displayName,
              current_level: level,
            },
          };
        });
      },

      toggleSound: () =>
        set((state) => ({ soundEnabled: !state.soundEnabled })),

      resetProgress: () => {
        const resetState = {
          scores: DEFAULT_SCORES,
          totalAQ: 200,
          completedScenarios: {},
          user: { ...DEFAULT_USER },
        };
        set(() => resetState);
        syncProgressToCloud(get());
      },

      getStudentTitle: () => {
        return computeStudentTitle(get().totalAQ);
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
