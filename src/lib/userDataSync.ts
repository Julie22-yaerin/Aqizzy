import { auth, db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { syncAQProfile } from './supabase';
import { COREScore, User } from '@/types';

export interface CompletedScenarioRecord {
  scenarioId: string;
  completedAt: string;
  coreScoreDelta: COREScore;
}

export interface ProgressSyncPayload {
  user: User;
  scores: COREScore;
  totalAQ: number;
  completedScenarios: Record<string, CompletedScenarioRecord>;
}

export interface CloudUserProgress {
  scores?: COREScore;
  totalAQ?: number;
  completedScenarios?: Record<string, CompletedScenarioRecord>;
  displayName?: string;
  current_level?: string;
  avatar_url?: string;
}

/**
 * Save user progress to:
 * 1. Railway PostgreSQL backend (/api/user/progress)
 * 2. Firebase Firestore (if user is authenticated)
 * 3. Supabase fallback
 */
export async function syncProgressToCloud(payload: ProgressSyncPayload): Promise<void> {
  if (typeof window === 'undefined') return;

  const currentUid = auth.currentUser?.uid || payload.user.id || 'student-cap2-vietnam';

  // 1. Primary: Save to Railway PostgreSQL via API
  try {
    fetch('/api/user/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: currentUid,
        displayName: payload.user.display_name,
        currentLevel: payload.user.current_level,
        avatarUrl: payload.user.avatar_url,
        scores: payload.scores,
        completedScenarios: payload.completedScenarios,
        lastScenarioCompleted: Object.keys(payload.completedScenarios).pop() || null,
      }),
    }).catch((err) => {
      console.warn('[UserDataSync] Postgres API sync error:', err);
    });
  } catch (err) {
    console.warn('[UserDataSync] Error initiating Postgres sync:', err);
  }

  // 2. Secondary: If logged into Firebase, update Firestore
  try {
    if (auth.currentUser && db) {
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      setDoc(
        userDocRef,
        {
          uid: auth.currentUser.uid,
          displayName: payload.user.display_name,
          current_level: payload.user.current_level,
          scores: payload.scores,
          totalAQ: payload.totalAQ,
          completedScenarios: payload.completedScenarios,
          lastUpdated: new Date().toISOString(),
        },
        { merge: true }
      ).catch((err) => {
        console.warn('[UserDataSync] Firestore sync notice:', err);
      });
    }
  } catch (err) {
    console.warn('[UserDataSync] Firestore sync error:', err);
  }

  // 3. Background Supabase sync notice
  try {
    if (currentUid && currentUid !== 'student-cap2-vietnam') {
      syncAQProfile({
        user_id: currentUid,
        control_score: payload.scores.c,
        ownership_score: payload.scores.o,
        reach_score: payload.scores.r,
        endurance_score: payload.scores.e,
        last_scenario_completed: Object.keys(payload.completedScenarios).pop() || undefined,
      }).catch(() => {});
    }
  } catch {
    // Non-blocking
  }
}

/**
 * Load user progress with fallback hierarchy:
 * 1. Railway PostgreSQL API
 * 2. Firebase Firestore
 */
export async function loadUserProgress(uid: string): Promise<CloudUserProgress | null> {
  if (typeof window === 'undefined' || !uid) return null;

  // 1. Try Railway PostgreSQL
  try {
    const res = await fetch(`/api/user/progress?userId=${encodeURIComponent(uid)}`);
    if (res.ok) {
      const data = await res.json();
      if (data.found) {
        return {
          scores: data.scores,
          totalAQ: data.totalAQ,
          completedScenarios: data.completedScenarios || {},
          displayName: data.user?.display_name,
          current_level: data.user?.current_level,
          avatar_url: data.user?.avatar_url,
        };
      }
    }
  } catch (pgErr) {
    console.warn('[UserDataSync] Postgres load error, checking Firestore fallback:', pgErr);
  }

  // 2. Fallback to Firestore
  try {
    if (db) {
      const userDocRef = doc(db, 'users', uid);
      const snap = await getDoc(userDocRef);
      if (snap.exists()) {
        const data = snap.data();
        return {
          scores: data.scores,
          totalAQ: data.totalAQ,
          completedScenarios: data.completedScenarios || {},
          displayName: data.displayName || data.display_name,
          current_level: data.current_level,
          avatar_url: data.avatar_url || data.photoURL,
        };
      }
    }
  } catch (fsErr) {
    console.warn('[UserDataSync] Firestore load error:', fsErr);
  }

  return null;
}

// Keep backward compatibility export
export const loadUserProgressFromFirestore = loadUserProgress;
