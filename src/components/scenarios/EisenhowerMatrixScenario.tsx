'use client';

import React, { useState } from 'react';
import { useAQStore } from '@/store/aqStore';
import { sound } from '@/lib/sound';
import confetti from 'canvas-confetti';
import { Check, ArrowRight, RotateCcw, AlertCircle, Sparkles, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import DebriefRoomModal from '@/components/scenarios/DebriefRoomModal';

interface MatrixItem {
  id: string;
  text: string;
  correctQuadrant: 'do_now' | 'delegate' | 'defer' | 'drop';
  explanation: string;
}

interface Props {
  items: MatrixItem[];
}

const QUADRANTS = [
  { id: 'do_now', title: '1. Làm Ngay (Khẩn cấp & Quan trọng)', color: 'border-blue-500 bg-blue-50/50 text-blue-900', badge: 'bg-blue-600 text-white' },
  { id: 'delegate', title: '2. Nhờ Trợ Giúp (Ủy quyền cho tổ)', color: 'border-purple-500 bg-purple-50/50 text-purple-900', badge: 'bg-purple-600 text-white' },
  { id: 'defer', title: '3. Lên Kế Hoạch Dự Phòng', color: 'border-amber-500 bg-amber-50/50 text-amber-900', badge: 'bg-amber-600 text-white' },
  { id: 'drop', title: '4. Loại Bỏ Ngay (Tiêu cực / Vô ích)', color: 'border-rose-500 bg-rose-50/50 text-rose-900', badge: 'bg-rose-600 text-white' },
] as const;

export default function EisenhowerMatrixScenario({ items }: Props) {
  const { applyScoreDelta, markScenarioCompleted, soundEnabled } = useAQStore();
  const [placedItems, setPlacedItems] = useState<Record<string, 'do_now' | 'delegate' | 'defer' | 'drop'>>({});
  const [selectedItem, setSelectedItem] = useState<MatrixItem | null>(items[0] || null);
  const [results, setResults] = useState<{ isCorrect: boolean; explanation: string } | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showDebrief, setShowDebrief] = useState(false);
  const [totalDelta, setTotalDelta] = useState(0);

  const unplacedItems = items.filter((it) => !placedItems[it.id]);

  const handlePlaceInQuadrant = (quadrantId: 'do_now' | 'delegate' | 'defer' | 'drop') => {
    if (!selectedItem || isCompleted) return;

    const isCorrect = selectedItem.correctQuadrant === quadrantId;
    const delta = isCorrect ? 10 : -5;

    setPlacedItems((prev) => ({ ...prev, [selectedItem.id]: quadrantId }));
    setTotalDelta((prev) => prev + delta);
    applyScoreDelta({ c: delta }, 'control-forgotten-usb');

    if (soundEnabled) {
      if (isCorrect) sound.playSwipe(true);
      else sound.playWarning();
    }

    setResults({
      isCorrect,
      explanation: selectedItem.explanation,
    });

    // Pick next unplaced item
    const remaining = items.filter((it) => it.id !== selectedItem.id && !placedItems[it.id]);
    if (remaining.length > 0) {
      setSelectedItem(remaining[0]);
    } else {
      setSelectedItem(null);
      setIsCompleted(true);
      markScenarioCompleted('control-forgotten-usb', { c: totalDelta + delta, o: 0, r: 0, e: 0 });
      if (soundEnabled) sound.playVictory();
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      setTimeout(() => setShowDebrief(true), 1200);
    }
  };

  const handleRestart = () => {
    setPlacedItems({});
    setSelectedItem(items[0] || null);
    setResults(null);
    setIsCompleted(false);
    setTotalDelta(0);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white rounded-3xl p-6 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
                CORE: Control (Kiểm soát tình thế)
              </span>
              <span className="text-blue-100 text-xs font-medium">Lớp 6 - 7</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              The Forgotten USB (Chiếc USB Bị Bỏ Quên)
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm mt-1 max-w-2xl">
              15 phút trước giờ thuyết trình KHTN, bạn nhận ra chiếc USB ở nhà. Hãy xếp từng hành động vào 4 ô Ma trận Eisenhower để làm chủ tình thế!
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
            <span className="text-xs font-semibold">Điểm Control:</span>
            <span className={`text-base font-black ${totalDelta >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
              {totalDelta >= 0 ? `+${totalDelta}` : totalDelta} C
            </span>
          </div>
        </div>
      </div>

      {/* Active Item to Categorize */}
      {!isCompleted && selectedItem && (
        <div className="bg-white rounded-3xl border-2 border-brand-500 p-6 shadow-lg space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
              Chọn ô Ma Trận cho hành động này:
            </span>
            <span className="text-xs font-semibold text-slate-400">
              Còn lại {unplacedItems.length} hành động
            </span>
          </div>

          <p className="text-base sm:text-lg font-bold text-slate-800 leading-snug">
            &ldquo;{selectedItem.text}&rdquo;
          </p>

          {/* Quick Select Buttons for 4 Quadrants */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {QUADRANTS.map((q) => (
              <button
                key={q.id}
                onClick={() => handlePlaceInQuadrant(q.id)}
                className={`text-left p-3.5 rounded-2xl border-2 transition-all hover:scale-[1.01] active:scale-95 ${q.color} shadow-xs`}
              >
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${q.badge} inline-block mb-1`}>
                  {q.title.split('(')[0]}
                </span>
                <div className="text-xs font-semibold">
                  {q.title}
                </div>
              </button>
            ))}
          </div>

          {/* Results Feedback */}
          {results && (
            <div className={`p-4 rounded-2xl text-xs sm:text-sm border ${
              results.isCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-rose-50 border-rose-300 text-rose-900'
            }`}>
              <span className="font-bold block mb-1">
                {results.isCorrect ? '✓ Phân loại rất chuẩn xác!' : '✕ Chưa tối ưu:'}
              </span>
              {results.explanation}
            </div>
          )}
        </div>
      )}

      {/* 4 Quadrants Visual Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {QUADRANTS.map((q) => {
          const placed = items.filter((it) => placedItems[it.id] === q.id);
          return (
            <div
              key={q.id}
              className={`rounded-3xl border-2 p-5 flex flex-col justify-between min-h-[180px] bg-white shadow-sm ${q.color}`}
            >
              <div>
                <div className="flex items-center justify-between mb-3 border-b pb-2 border-slate-200">
                  <h3 className="font-bold text-xs uppercase tracking-wide text-slate-800">
                    {q.title}
                  </h3>
                  <span className="text-xs font-bold text-slate-500">
                    {placed.length}
                  </span>
                </div>

                <div className="space-y-2">
                  {placed.map((item) => (
                    <div
                      key={item.id}
                      className="text-xs bg-white/90 border border-slate-200/80 p-3 rounded-xl shadow-2xs font-medium text-slate-800"
                    >
                      {item.text}
                    </div>
                  ))}
                  {placed.length === 0 && (
                    <p className="text-xs text-slate-400 italic py-4 text-center">
                      Chưa có hành động nào trong ô này
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion Dialog */}
      {isCompleted && (
        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-8 text-center space-y-4 shadow-xl animate-in fade-in">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-600 text-white flex items-center justify-center text-3xl shadow-lg">
            🎉
          </div>
          <div>
            <h2 className="text-2xl font-black text-emerald-950">
              Tuyệt vời! Bạn đã làm chủ tình thế quên USB!
            </h2>
            <p className="text-sm text-emerald-900 max-w-lg mx-auto mt-2 leading-relaxed">
              Nhờ Ma trận Eisenhower, bạn không hoảng sợ hay đổ lỗi mà lập tức xin cô lùi lịch, chuẩn bị thuyết trình chay kèm bản nháp đám mây. Đó chính là <strong>Control</strong>!
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              onClick={() => setShowDebrief(true)}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-lg shadow-indigo-600/30 transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Xem Báo Cáo Phản Tư (Debrief Room)</span>
            </button>
            <Link
              href="/scenarios/control-toxic-rumor"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-md transition-all"
            >
              <span>Sang Thử Thách 3: Toxic Rumor</span>
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
        scenarioId="control-forgotten-usb"
        scenarioTitle="Ma trận xử lý sự cố quên USB thuyết trình"
        sessionLogs={items.map((it) => ({
          role: 'user',
          message_content: `Hành động: "${it.text}" -> Xếp vào: ${placedItems[it.id]}. Lời giải thích: ${it.explanation}`,
        }))}
        nextScenarioPath="/scenarios/control-toxic-rumor"
        nextScenarioTitle="Sang Kịch Bản 3: TOXIC RUMOR"
        onRestartScenario={handleRestart}
      />
    </div>
  );
}
