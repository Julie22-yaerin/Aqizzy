'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAQStore } from '@/store/aqStore';
import { Volume2, VolumeX, Shield, Award, RotateCcw, LogOut } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { scores, totalAQ, user, soundEnabled, toggleSound, resetProgress } = useAQStore();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <span className="font-black text-xl tracking-tighter">L</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-slate-900 tracking-tight group-hover:text-brand-600 transition-colors">
                Aqizzy
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
                AQ Cấp 2
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Rèn luyện Trí tuệ Nghịch cảnh qua Khung CORE
            </p>
          </div>
        </Link>

        {/* Navigation & CORE Scores Quick Bar */}
        <div className="flex items-center gap-4 sm:gap-6">
          
          {/* Quick CORE Status (C, O, R, E) */}
          <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-xl">
            <div className="flex items-center gap-1 text-xs font-semibold text-blue-600" title="Control (Kiểm soát)">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span>C: {scores.c}</span>
            </div>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-1 text-xs font-semibold text-purple-600" title="Ownership (Trách nhiệm)">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              <span>O: {scores.o}</span>
            </div>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-1 text-xs font-semibold text-amber-600" title="Reach (Khoanh vùng)">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span>R: {scores.r}</span>
            </div>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600" title="Endurance (Bền bỉ)">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>E: {scores.e}</span>
            </div>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-1 text-xs font-bold text-slate-800" title="Tổng chỉ số AQ">
              <Award className="w-3.5 h-3.5 text-brand-600" />
              <span>AQ: {totalAQ}</span>
            </div>
          </div>

          {/* Student Profile Link */}
          <Link
            href="/profile"
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              pathname === '/profile'
                ? 'bg-brand-50 text-brand-700 border border-brand-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span className="text-base">{user.avatar_url || '🎓'}</span>
            <span className="hidden lg:inline">{user.display_name}</span>
          </Link>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-brand-600" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {/* Reset Score for Testing */}
          <button
            onClick={() => {
              if (confirm('Bạn có muốn đặt lại toàn bộ chỉ số AQ để bắt đầu rèn luyện lại từ đầu?')) {
                resetProgress();
              }
            }}
            title="Làm mới tiến trình"
            className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            title="Đăng xuất"
            className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
