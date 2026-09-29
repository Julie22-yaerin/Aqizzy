'use client';

import React, { useState } from 'react';
import { useAQStore } from '@/store/aqStore';
import { sound } from '@/lib/sound';
import confetti from 'canvas-confetti';
import { Trash2, BookOpen, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import Link from 'next/link';
import DebriefRoomModal from '@/components/scenarios/DebriefRoomModal';

interface ThoughtItem {
  id: string;
  text: string;
  target_bin: 'trash' | 'desk';
  reason: string;
}

interface Props {
  items: ThoughtItem[];
}

export default function TrashBinScenario({ items }: Props) {
  const { applyScoreDelta, markScenarioCompleted, soundEnabled } = useAQStore();
  const [sortedItems, setSortedItems] = useState<Record<string, 'trash' | 'desk'>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastFeedback, setLastFeedback] = useState<{ isCorrect: boolean; reason: string } | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showDebrief, setShowDebrief] = useState(false);
  const [totalReachDelta, setTotalReachDelta] = useState(0);

  const currentItem = items[currentIndex];

  const handleSort = (bin: 'trash' | 'desk') => {
    if (!currentItem || isCompleted) return;

    const isCorrect = currentItem.target_bin === bin;
    const delta = isCorrect ? 10 : -5;

    setSortedItems((prev) => ({ ...prev, [currentItem.id]: bin }));
    setTotalReachDelta((prev) => prev + delta);
    applyScoreDelta({ r: delta }, 'reach-bestie-feud');

    if (soundEnabled) {
      if (isCorrect) sound.playSwipe(true);
      else sound.playWarning();
    }

    setLastFeedback({
      isCorrect,
      reason: currentItem.reason,
    });

    if (currentIndex + 1 < items.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      markScenarioCompleted('reach-bestie-feud', { c: 0, o: 0, r: totalReachDelta + delta, e: 0 });
      if (soundEnabled) sound.playVictory();
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      setTimeout(() => setShowDebrief(true), 1200);
    }
  };

  const handleRestart = () => {
    setSortedItems({});
    setCurrentIndex(0);
    setLastFeedback(null);
    setIsCompleted(false);
    setTotalReachDelta(0);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white rounded-3xl p-6 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
                CORE: Reach (Khoanh Vùng Xung Đột)
              </span>
              <span className="text-amber-100 text-xs font-medium">Lớp 8 - 9</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              The Bestie Feud (Chiến Tranh Lạnh Với Bạn Thân)
            </h1>
            <p className="text-amber-100 text-xs sm:text-sm mt-1 max-w-2xl">
              Cãi nhau với bạn thân chiều thứ Năm, sáng thứ Sáu thi Học kì 2. Phân tách suy nghĩ: Gác lại giải quyết sau hay Tập trung ôn tập ngay?
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
            <span className="text-xs font-semibold">Điểm Reach:</span>
            <span className={`text-base font-black ${totalReachDelta >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
              +{totalReachDelta} R
            </span>
          </div>
        </div>
      </div>

      {/* Main Sorting Game Board */}
      {!isCompleted && currentItem && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b pb-3 border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Suy nghĩ hiện tại ({currentIndex + 1} / {items.length})
            </span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              Chọn nơi gửi suy nghĩ
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center">
            <p className="text-lg sm:text-xl font-bold text-slate-900 font-serif leading-relaxed">
              &ldquo;{currentItem.text}&rdquo;
            </p>
          </div>

          {/* 2 Targets: Trash Bin vs Study Desk */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => handleSort('trash')}
              className="p-5 rounded-2xl border-2 border-rose-300 bg-rose-50/50 hover:bg-rose-100/70 text-left transition-all hover:scale-[1.01] active:scale-95 group shadow-xs"
            >
              <div className="flex items-center gap-3 mb-2 text-rose-700">
                <Trash2 className="w-6 h-6" />
                <span className="font-bold text-sm uppercase">1. Thùng rác tâm lý</span>
              </div>
              <p className="text-xs text-rose-900 leading-relaxed">
                Tạm thời gác lại, không để nó xâm chiếm tâm trí trước bài thi sáng mai.
              </p>
            </button>

            <button
              onClick={() => handleSort('desk')}
              className="p-5 rounded-2xl border-2 border-blue-300 bg-blue-50/50 hover:bg-blue-100/70 text-left transition-all hover:scale-[1.01] active:scale-95 group shadow-xs"
            >
              <div className="flex items-center gap-3 mb-2 text-blue-700">
                <BookOpen className="w-6 h-6" />
                <span className="font-bold text-sm uppercase">2. Bàn học ôn tập</span>
              </div>
              <p className="text-xs text-blue-900 leading-relaxed">
                Hành động thiết thực: Tập trung tối đa sức lực cho bài thi trước mắt.
              </p>
            </button>
          </div>

          {/* Feedback message */}
          {lastFeedback && (
            <div className={`p-4 rounded-2xl text-xs sm:text-sm border ${
              lastFeedback.isCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-rose-50 border-rose-300 text-rose-900'
            }`}>
              <span className="font-bold block mb-1">
                {lastFeedback.isCorrect ? '✓ Phân loại rất thông minh!' : '✕ Chưa tối ưu:'}
              </span>
              {lastFeedback.reason}
            </div>
          )}
        </div>
      )}

      {/* Completion Dialog */}
      {isCompleted && (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-8 text-center space-y-4 shadow-xl animate-in fade-in">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-500 text-white flex items-center justify-center text-3xl shadow-lg">
            🧘
          </div>
          <div>
            <h2 className="text-2xl font-black text-amber-950">
              Bạn Đã Khoanh Vùng Cảm Xúc Hoàn Hảo!
            </h2>
            <p className="text-sm text-amber-900 max-w-lg mx-auto mt-2 leading-relaxed">
              Bạn biết cách tách biệt xung đột tình cảm bạn bè với bài thi học kỳ. Việc gì ra việc nấy là chìa khóa để bảo vệ thành quả học tập!
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              onClick={() => setShowDebrief(true)}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-lg shadow-indigo-600/30 transition-all"
            >
              <span>Xem Báo Cáo Phản Tư (Debrief Room)</span>
            </button>
            <Link
              href="/scenarios/endurance-exam-crush"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-md transition-all"
            >
              <span>Sang Chiều Kích ENDURANCE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-sm px-5 py-3 rounded-2xl shadow-xs transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Chơi lại</span>
            </button>
          </div>
        </div>
      )}

      {/* Debrief Room Modal */}
      <DebriefRoomModal
        isOpen={showDebrief}
        onClose={() => setShowDebrief(false)}
        scenarioId="reach-bestie-feud"
        scenarioTitle="Khoanh vùng xung đột giận dỗi với bạn thân trước kỳ thi"
        sessionLogs={items.map((it) => ({
          role: 'user',
          message_content: `Suy nghĩ: "${it.text}" -> Phân loại vào: ${sortedItems[it.id] === 'trash' ? 'Thùng rác tâm lý' : 'Bàn học ôn thi'}. Phân tích: ${it.reason}`,
        }))}
        nextScenarioPath="/scenarios/endurance-exam-crush"
        nextScenarioTitle="Sang Kịch Bản 10: MAY EXAM CRUSH"
        onRestartScenario={handleRestart}
      />
    </div>
  );
}
