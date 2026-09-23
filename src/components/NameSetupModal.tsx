'use client';

import React, { useState, useEffect } from 'react';
import { useAQStore } from '@/store/aqStore';
import { UserCircle } from 'lucide-react';

export default function NameSetupModal() {
  const { user, setUserDisplayName } = useAQStore();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [className, setClassName] = useState('');

  useEffect(() => {
    // Only show modal if the display_name is empty (not setup yet)
    if (user && !user.display_name) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    let finalName = name.trim();
    if (className.trim()) {
      finalName += ` (Lớp ${className.trim()})`;
    }

    setUserDisplayName(finalName);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-slate-100">
        <div className="bg-brand-600 p-6 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
            <UserCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-black text-white">
            Chào mừng bạn đến với Aqizzy!
          </h2>
          <p className="text-brand-100 mt-2 text-sm font-medium">
            Hãy cho chúng mình biết tên của bạn nhé để bắt đầu trải nghiệm tốt nhất.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-1">
            <label htmlFor="student-name" className="text-sm font-bold text-slate-700 block">
              Tên của bạn <span className="text-rose-500">*</span>
            </label>
            <input
              id="student-name"
              type="text"
              required
              placeholder="VD: Minh Anh, Tuấn Kiệt..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="student-class" className="text-sm font-bold text-slate-700 block">
              Lớp <span className="text-slate-400 font-normal">(không bắt buộc)</span>
            </label>
            <input
              id="student-class"
              type="text"
              placeholder="VD: 8A3, 9A1..."
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
            />
          </div>

          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-brand-500/20 mt-2"
          >
            Bắt đầu rèn luyện AQ ngay
          </button>
        </form>
      </div>
    </div>
  );
}
