'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAQStore } from '@/store/aqStore';
import { loadUserProgress } from '@/lib/userDataSync';

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const { setUser, syncFromCloud, user } = useAQStore();
  const initializedUidRef = useRef<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        initializedUidRef.current = null;
        if (pathname !== '/login') {
          router.push('/login');
        } else {
          setLoading(false);
        }
        return;
      }

      // If user is logged in and already initialized, only ensure not on login page
      if (initializedUidRef.current === firebaseUser.uid) {
        if (pathname === '/login') {
          router.push('/');
        }
        setLoading(false);
        return;
      }

      try {
        const cloudProgress = await loadUserProgress(firebaseUser.uid);
        const resolvedDisplayName =
          cloudProgress?.displayName ||
          (user.display_name && user.display_name !== 'Minh Anh (Lớp 8A3)' ? user.display_name : null) ||
          firebaseUser.displayName ||
          firebaseUser.email?.split('@')[0] ||
          'Học sinh Cấp 2';

        if (cloudProgress) {
          syncFromCloud({
            ...cloudProgress,
            displayName: resolvedDisplayName,
          });
        }

        const safeAvatar = (user.avatar_url && !user.avatar_url.startsWith('http')) ? user.avatar_url : '🎓';
        setUser({
          id: firebaseUser.uid,
          display_name: resolvedDisplayName,
          avatar_url: safeAvatar,
        });

        initializedUidRef.current = firebaseUser.uid;
      } catch (e) {
        console.warn('[RequireAuth] Could not load cloud progress:', e);
        setUser({
          id: firebaseUser.uid,
          display_name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Học sinh Cấp 2',
          avatar_url: '🎓',
        });
        initializedUidRef.current = firebaseUser.uid;
      }

      if (pathname === '/login') {
        router.push('/');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router, pathname, setUser, syncFromCloud, user.avatar_url, user.display_name]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-3">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-semibold text-slate-600">Đang đồng bộ dữ liệu học tập...</p>
      </div>
    );
  }

  return <>{children}</>;
}
