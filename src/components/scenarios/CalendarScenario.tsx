'use client';

import React, { useState } from 'react';
import { useAQStore } from '@/store/aqStore';
import { sound } from '@/lib/sound';
import confetti from 'canvas-confetti';
import { Calendar, UserPlus, Check, ArrowRight, RotateCcw, Heart, Users } from 'lucide-react';
import Link from 'next/link';
import DebriefRoomModal from '@/components/scenarios/DebriefRoomModal';

interface WeekChoice {
  id: string;
  text: string;
  score: number;
  feedback: string;
}

interface WeekItem {
  week_number: number;
  theme: string;
  situation: string;
  action_choices: WeekChoice[];
}

interface Props {
  weeks: WeekItem[];
}

export default function CalendarScenario({ weeks }: Props) {
  const { applyScoreDelta, markScenarioCompleted, soundEnabled } = useAQStore();
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState<Record<number, WeekChoice>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showDebrief, setShowDebrief] = useState(false);
  const [totalEnduranceDelta, setTotalEnduranceDelta] = useState(0);

  const currentWeek = weeks[currentWeekIndex];

  const handleSelectChoice = (choice: WeekChoice) => {
    if (showFeedback || isCompleted) return;

    setSelectedChoices((prev) => ({ ...prev, [currentWeek.week_number]: choice }));
    setTotalEnduranceDelta((prev) => prev + choice.score);
    applyScoreDelta({ e: choice.score }, 'endurance-new-kid-isolation');
    setShowFeedback(true);

    if (soundEnabled) {
      if (choice.score > 0) sound.playSwipe(true);
      else sound.playWarning();
    }
  };

  const handleNextWeek = () => {
    setShowFeedback(false);

    if (currentWeekIndex + 1 < weeks.length) {
      setCurrentWeekIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      markScenarioCompleted('endurance-new-kid-isolation', { c: 0, o: 0, r: 0, e: totalEnduranceDelta });
      if (soundEnabled) sound.playVictory();
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
      setTimeout(() => setShowDebrief(true), 1200);
    }
  };

  const handleRestart = () => {
    setCurrentWeekIndex(0);
    setSelectedChoices({});
    setShowFeedback(false);
    setIsCompleted(false);
    setTotalEnduranceDelta(0);
  };

  const currentSelection = selectedChoices[currentWeek?.week_number];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white rounded-3xl p-6 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
                CORE: Endurance (Lộ trình 4 tuần)
              </span>
              <span className="text-emerald-100 text-xs font-medium">Lớp 6 - 9</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              The New Kid Isolation (Học Sinh Mới Chuyển Trường)
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm mt-1 max-w-2xl">
              Hòa nhập lớp mới không thể diễn ra trong 1 ngày. Chọn các micro-actions kiên trì qua 4 tuần để từng bước phá vỡ cảm giác cô lập!
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
            <span className="text-xs font-semibold">Điểm Endurance:</span>
            <span className={`text-base font-black ${totalEnduranceDelta >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
              +{totalEnduranceDelta} E
            </span>
          </div>
        </div>
      </div>

      {/* 4-Week Stepper Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-sm">
        <div className="grid grid-cols-4 gap-2">
          {weeks.map((w, idx) => {
            const isDone = idx < currentWeekIndex;
            const isCurrent = idx === currentWeekIndex;
            return (
              <div
                key={w.week_number}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  isCurrent
                    ? 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-md scale-102'
                    : isDone
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-slate-50 text-slate-400 border-slate-200'
                }`}
              >
                <span className="text-[10px] uppercase font-semibold block">Tuần {w.week_number}</span>
                <span className="text-xs font-bold truncate block mt-0.5">{w.theme.split(':')[1] || w.theme}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Week Challenge */}
      {!isCompleted && currentWeek && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl space-y-6">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>{currentWeek.theme}</span>
            </div>
            <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {currentWeek.situation}
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Chọn hành vi vi mô (Micro-action) bạn sẽ thực hiện:
            </span>

            {currentWeek.action_choices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => handleSelectChoice(choice)}
                disabled={showFeedback}
                className={`w-full text-left p-5 rounded-2xl border-2 transition-all ${
                  currentSelection?.id === choice.id
                    ? 'border-emerald-500 bg-emerald-50/70 shadow-md'
                    : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50/80 shadow-xs'
                } disabled:cursor-not-allowed`}
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
                    {choice.text}
                  </p>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-xl flex-shrink-0 ${
                    choice.score > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {choice.score > 0 ? `+${choice.score} E` : `${choice.score} E`}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {showFeedback && currentSelection && (
            <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4 animate-in fade-in">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Check className="w-5 h-5" />
                <span>Ý nghĩa tâm lý học đường:</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {currentSelection.feedback}
              </p>

              <button
                onClick={handleNextWeek}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all"
              >
                <span>Chuyển sang tuần tiếp theo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Completed Dialog */}
      {isCompleted && (
        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-8 text-center space-y-4 shadow-xl animate-in fade-in">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-600 text-white flex items-center justify-center text-3xl shadow-lg">
            🤝
          </div>
          <div>
            <h2 className="text-2xl font-black text-emerald-950">
              Bạn Đã Hòa Nhập Lớp Mới Thành Công!
            </h2>
            <p className="text-sm text-emerald-900 max-w-lg mx-auto mt-2 leading-relaxed">
              Nhờ sự bền bỉ qua từng hành động nhỏ mỗi tuần (chào hỏi, CLB, giúp đỡ, rủ đi chơi), bạn đã xây dựng được vòng kết nối ấm áp tại ngôi trường mới!
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
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-md transition-all"
            >
              <span>Quay Lại Dashboard Khung CORE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* Debrief Room Modal */}
      <DebriefRoomModal
        isOpen={showDebrief}
        onClose={() => setShowDebrief(false)}
        scenarioId="endurance-new-kid-isolation"
        scenarioTitle="Lộ trình 4 tuần vượt qua cảm giác cô lập khi chuyển trường"
        sessionLogs={weeks.map((w) => ({
          role: 'user',
          message_content: `Tuần ${w.week_number} (${w.theme}): ${selectedChoices[w.week_number]?.text || 'Chưa chọn'}. Đánh giá: ${selectedChoices[w.week_number]?.feedback || ''}`,
        }))}
        nextScenarioPath="/dashboard"
        nextScenarioTitle="Quay Về Trang Chủ Dashboard"
        onRestartScenario={handleRestart}
      />
    </div>
  );
}
