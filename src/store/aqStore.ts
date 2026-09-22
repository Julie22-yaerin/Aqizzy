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
  
  // Actions
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

const clamp = (val: number, min = 0, max = 100) => Math.min(Math.max(val, min), max);

export const useAQStore = create<AQState>()(
  persist(
    (set, get) => ({
      user: {
        id: 'student-cap2-vietnam',
        display_name: 'Minh Anh (Lớp 8A3)',
        current_level: 'Học sinh Cấp 2 Tập sự',
        avatar_url: '🎓',
      },
      scores: DEFAULT_SCORES,
      totalAQ: 200,
      completedScenarios: {},
      soundEnabled: true,

      setUserDisplayName: (name: string) =>
        set((state) => ({
          user: { ...state.user, display_name: name },
        })),

      applyScoreDelta: (delta, scenarioId) => {
        const current = get().scores;
        const newScores: COREScore = {
          c: clamp(current.c + (delta.c || 0)),
          o: clamp(current.o + (delta.o || 0)),
          r: clamp(current.r + (delta.r || 0)),
          e: clamp(current.e + (delta.e || 0)),
        };
        const total = newScores.c + newScores.o + newScores.r + newScores.e;

        // Level title calculation based on total AQ
        let level = 'Học sinh Cấp 2 Tập sự';
        if (total >= 340) level = 'Bậc thầy AQ Vượt nghịch cảnh';
        else if (total >= 280) level = 'Chiến binh Thép Cấp 2';
        else if (total >= 230) level = 'Cán bộ Lớp Tiên phong';
        else if (total < 170) level = 'Cần rèn luyện Bền bỉ';

        set((state) => ({
          scores: newScores,
          totalAQ: total,
          user: { ...state.user, current_level: level },
        }));

        // Sync to Supabase in background
        syncAQProfile({
          user_id: get().user.id,
          control_score: newScores.c,
          ownership_score: newScores.o,
          reach_score: newScores.r,
          endurance_score: newScores.e,
          last_scenario_completed: scenarioId,
        });
      },

      markScenarioCompleted: (scenarioId, delta) => {
        set((state) => ({
          completedScenarios: {
            ...state.completedScenarios,
            [scenarioId]: {
              scenarioId,
              completedAt: new Date().toISOString(),
              coreScoreDelta: delta,
            },
          },
        }));
      },

      toggleSound: () =>
        set((state) => ({ soundEnabled: !state.soundEnabled })),

      resetProgress: () =>
        set(() => ({
          scores: DEFAULT_SCORES,
          totalAQ: 200,
          completedScenarios: {},
          user: {
            id: 'student-cap2-vietnam',
            display_name: 'Minh Anh (Lớp 8A3)',
            current_level: 'Học sinh Cấp 2 Tập sự',
            avatar_url: '🎓',
          },
        })),

      getStudentTitle: () => {
        const total = get().totalAQ;
        if (total >= 340) return 'Bậc thầy AQ (Master of CORE)';
        if (total >= 280) return 'Bản lĩnh Vượt Sóng Gió (High AQ)';
        if (total >= 220) return 'Đang tiến bộ vững chắc (Growing AQ)';
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
