'use client';

import React, { useState } from 'react';
import { useAQStore } from '@/store/aqStore';
import { sound } from '@/lib/sound';
import confetti from 'canvas-confetti';
import { ResourceDay, ResourceChoice } from '@/types';
import { BatteryCharging, Flame, AlertCircle, ArrowRight, RotateCcw, Calendar, CheckCircle2, HeartPulse } from 'lucide-react';
import Link from 'next/link';
import DebriefRoomModal from '@/components/scenarios/DebriefRoomModal';

interface Props {
  days: ResourceDay[];
}

export default function ResourceScenario({ days }: Props) {
  const { applyScoreDelta, markScenarioCompleted, soundEnabled } = useAQStore();
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [energy, setEnergy] = useState(80); // Starts at 80%
  const [stress, setStress] = useState(25); // Starts at 25%
  const [enduranceDelta, setEnduranceDelta] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<ResourceChoice | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isBurnout, setIsBurnout] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showDebrief, setShowDebrief] = useState(false);
  const [actionHistory, setActionHistory] = useState<{ dayName: string; choiceTitle: string; feedback: string }[]>([]);

  const currentDay = days[currentDayIndex];

  const handleSelectChoice = (choice: ResourceChoice) => {
    if (showFeedback || isBurnout || isCompleted) return;

    setSelectedChoice(choice);
    setShowFeedback(true);

    const newEnergy = Math.min(100, Math.max(0, energy + choice.energy_delta));
    const newStress = Math.min(100, Math.max(0, stress + choice.stress_delta));
    const newEndurance = enduranceDelta + choice.endurance_score;

    setEnergy(newEnergy);
    setStress(newStress);
    setEnduranceDelta(newEndurance);
    applyScoreDelta({ e: choice.endurance_score }, 'endurance-may-exam-crush');

    setActionHistory((prev) => [
      ...prev,
      {
        dayName: currentDay.day_name,
        choiceTitle: choice.title,
        feedback: choice.feedback,
      },
    ]);

    // Check burnout condition
    if (newStress >= 100 || newEnergy <= 0) {
      setIsBurnout(true);
      if (soundEnabled) sound.playWarning();
      return;
    }

    if (choice.endurance_score > 0) {
      if (soundEnabled) sound.playSwipe(true);
    } else {
      if (soundEnabled) sound.playWarning();
    }
  };

  const handleNextDay = () => {
    setShowFeedback(false);
    setSelectedChoice(null);

    if (currentDayIndex + 1 < days.length) {
      setCurrentDayIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      markScenarioCompleted('endurance-may-exam-crush', { c: 0, o: 0, r: 0, e: enduranceDelta });
      if (soundEnabled) sound.playVictory();
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
      });
      setTimeout(() => setShowDebrief(true), 1200);
    }
  };

  const handleRestart = () => {
    setCurrentDayIndex(0);
    setEnergy(80);
    setStress(25);
    setEnduranceDelta(0);
    setSelectedChoice(null);
    setShowFeedback(false);
    setIsBurnout(false);
    setIsCompleted(false);
    setActionHistory([]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header Context Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white rounded-3xl p-6 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
                CORE: Endurance (Sức bền bỉ)
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              The May Exam Crush (Cơn lốc mùa thi tháng Năm)
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm mt-1 max-w-xl">
              Quản lý tài nguyên Năng lượng & Căng thẳng sống sót qua 7 ngày cam go trước kỳ thi Học kì II!
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
            <span className="text-xs font-semibold">Điểm Endurance:</span>
            <span className={`text-base font-black ${enduranceDelta >= 0 ? 'text-emerald-200' : 'text-rose-200'}`}>
              {enduranceDelta >= 0 ? `+${enduranceDelta}` : enduranceDelta}
            </span>
          </div>
        </div>
      </div>

      {/* Resource Gauges Dashboard (Energy & Stress) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Energy Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <div className="flex items-center gap-2 text-emerald-700">
                <HeartPulse className="w-4 h-4 text-emerald-600 animate-pulse" />
                <span>Năng lượng cơ thể (Energy)</span>
              </div>
              <span className={energy < 30 ? 'text-rose-600 animate-bounce' : 'text-slate-700'}>
                {energy}%
              </span>
            </div>

            <div className="h-3.5 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200 shadow-inner">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  energy > 50
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                    : energy > 25
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                    : 'bg-gradient-to-r from-rose-500 to-red-600'
                }`}
                style={{ width: `${energy}%` }}
              ></div>
            </div>
            <p className="text-[11px] text-slate-500">
              {energy < 30 ? '⚠️ Báo động: Cơ thể suy kiệt, cần ngủ đủ giấc!' : 'Trạng thái tỉnh táo và tập trung.'}
            </p>
          </div>

          {/* Stress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <div className="flex items-center gap-2 text-rose-700">
                <Flame className="w-4 h-4 text-rose-500 animate-bounce" />
                <span>Mức độ Căng thẳng (Stress)</span>
              </div>
              <span className={stress > 70 ? 'text-rose-600 font-black' : 'text-slate-700'}>
                {stress}%
              </span>
            </div>

            <div className="h-3.5 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200 shadow-inner">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  stress > 75
                    ? 'bg-gradient-to-r from-orange-500 to-rose-600'
                    : stress > 45
                    ? 'bg-gradient-to-r from-amber-400 to-orange-500'
                    : 'bg-gradient-to-r from-blue-400 to-teal-400'
                }`}
                style={{ width: `${stress}%` }}
              ></div>
            </div>
            <p className="text-[11px] text-slate-500">
              {stress > 75 ? '🔥 Quá tải tâm lý: Nguy cơ nổ tung và kiệt sức!' : 'Áp lực trong tầm kiểm soát an toàn.'}
            </p>
          </div>

        </div>

        {/* 7-Day Timeline Stepper */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between gap-1 overflow-x-auto scrollbar-none">
          {days.map((d, idx) => {
            const isPast = idx < currentDayIndex;
            const isCurrent = idx === currentDayIndex;
            return (
              <div
                key={d.day_number}
                className={`flex-1 min-w-[70px] text-center p-2 rounded-2xl border transition-all ${
                  isCurrent
                    ? 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-md scale-105'
                    : isPast
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-slate-50 text-slate-400 border-slate-200'
                }`}
              >
                <div className="text-[10px] uppercase font-semibold">
                  Ngày {d.day_number}
                </div>
                <div className="text-xs font-bold truncate">
                  {d.day_name}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Burnout State Screen */}
      {isBurnout && (
        <div className="bg-rose-50 border-2 border-rose-400 rounded-3xl p-8 text-center space-y-4 shadow-xl animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 mx-auto rounded-full bg-rose-600 text-white flex items-center justify-center text-3xl shadow-lg">
            💥
          </div>
          <div>
            <h2 className="text-2xl font-black text-rose-950">
              KIỆT SỨC (BURNOUT)!
            </h2>
            <p className="text-sm text-rose-800 max-w-lg mx-auto mt-2 leading-relaxed">
              Bạn đã để Căng thẳng chạm 100% hoặc Năng lượng tụt về 0%. Thức khuya cày cuốc liên tục và lạm dụng chất kích thích khiến cơ thể sụp đổ hoàn toàn trước ngày thi.
            </p>
          </div>

          <div className="p-4 bg-white/80 rounded-2xl border border-rose-200 max-w-md mx-auto text-xs text-slate-700 text-left">
            <span className="font-bold text-rose-900 block mb-1">💡 Bài học Endurance:</span>
            Người bền bỉ nhất không phải người chạy hùng hục từ đầu đến cuối mà là người biết nghỉ ngơi đúng lúc để duy trì nhịp độ đường dài.
          </div>

          <div className="pt-2">
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-md transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Thử lại với chiến lược điều hòa sức bền</span>
            </button>
          </div>
        </div>
      )}

      {/* Completed 7-Day Screen */}
      {isCompleted && !isBurnout && (
        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-8 text-center space-y-5 shadow-xl animate-in fade-in duration-500">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-600 text-white flex items-center justify-center text-3xl shadow-lg">
            🏆
          </div>
          <div>
            <h2 className="text-2xl font-black text-emerald-950">
              Bạn đã chinh phục thành công Mùa thi tháng Năm!
            </h2>
            <p className="text-sm text-emerald-900 max-w-lg mx-auto mt-2 leading-relaxed">
              Vượt qua 7 ngày cam go với sự dẻo dai tuyệt vời! Bạn đã chứng minh phẩm chất của một người có <strong>Endurance (Sức bền bỉ)</strong> đỉnh cao: Biết nói &ldquo;không&rdquo; với áp lực mù quáng, biết nghỉ ngơi chủ động và giữ sức cho mục tiêu dài hạn.
            </p>
          </div>

          {/* Stats Box */}
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-xs">
              <div className="text-xs text-slate-500 font-semibold">Năng lượng còn lại</div>
              <div className="text-2xl font-black text-emerald-600 mt-1">{energy}%</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-xs">
              <div className="text-xs text-slate-500 font-semibold">Điểm Endurance tích lũy</div>
              <div className="text-2xl font-black text-emerald-600 mt-1">+{enduranceDelta} E</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={() => setShowDebrief(true)}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-lg shadow-indigo-600/30 transition-all transform hover:scale-105"
            >
              <span>Mở Báo Cáo Phản Tư (Debrief Room) & Radar Chart</span>
            </button>
            <Link
              href="/profile"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-md transition-all"
            >
              <span>Xem Báo cáo Tổng kết Chỉ số CORE của bạn</span>
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
        scenarioId="endurance-may-exam-crush"
        scenarioTitle="Cơn lốc mùa thi tháng Năm (May Exam Crush)"
        sessionLogs={actionHistory.map((h) => ({
          role: 'user',
          message_content: `Lựa chọn ngày ${h.dayName}: "${h.choiceTitle}". Đánh giá tâm lý học đường: ${h.feedback}`,
        }))}
        nextScenarioPath="/profile"
        nextScenarioTitle="Xem Tổng Kết Hồ Sơ AQ"
        onRestartScenario={handleRestart}
      />

      {/* Active Day Challenge & Choices */}
      {!isBurnout && !isCompleted && currentDay && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl space-y-6">
          
          {/* Day Event Description */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>Tình huống ngày {currentDay.day_name}</span>
            </div>
            <p className="text-base sm:text-lg font-bold text-slate-800 leading-snug">
              {currentDay.scenario_event}
            </p>
          </div>

          {/* 3 Strategic Choices */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Chọn phương án phân phối sức lực của bạn:
            </div>

            {currentDay.choices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => handleSelectChoice(choice)}
                disabled={showFeedback}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all ${
                  selectedChoice?.id === choice.id
                    ? 'border-emerald-500 bg-emerald-50/70 shadow-md'
                    : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50/80 shadow-xs'
                } disabled:cursor-not-allowed`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm sm:text-base text-slate-900 leading-tight">
                      {choice.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {choice.description}
                    </p>
                  </div>

                  {/* Impact preview pills */}
                  <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1.5 flex-shrink-0 text-[11px] font-bold">
                    <span className={choice.energy_delta >= 0 ? 'text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md' : 'text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md'}>
                      Năng lượng {choice.energy_delta >= 0 ? `+${choice.energy_delta}` : choice.energy_delta}
                    </span>
                    <span className={choice.stress_delta <= 0 ? 'text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md' : 'text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md'}>
                      Căng thẳng {choice.stress_delta >= 0 ? `+${choice.stress_delta}` : choice.stress_delta}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Feedback & Proceed Button */}
          {showFeedback && selectedChoice && (
            <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>Đánh giá tâm lý học đường:</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {selectedChoice.feedback}
              </p>

              <button
                onClick={handleNextDay}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all"
              >
                <span>Chuyển sang ngày tiếp theo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
