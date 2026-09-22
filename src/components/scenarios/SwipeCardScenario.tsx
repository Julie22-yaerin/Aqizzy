'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAQStore } from '@/store/aqStore';
import { sound } from '@/lib/sound';
import confetti from 'canvas-confetti';
import { SwipeCardItem } from '@/types';
import { Check, X, ArrowRight, RotateCcw, Compass, HelpCircle } from 'lucide-react';
import Link from 'next/link';

interface Props {
  cards: SwipeCardItem[];
}

export default function SwipeCardScenario({ cards }: Props) {
  const { applyScoreDelta, markScenarioCompleted, soundEnabled } = useAQStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [lastActionCorrect, setLastActionCorrect] = useState(false);
  const [stats, setStats] = useState({ correct: 0, totalScoreDelta: 0 });
  const [isFinished, setIsFinished] = useState(false);

  const currentCard = cards[currentIndex];

  const handleDecision = (userAction: 'left' | 'right') => {
    if (!currentCard || showExplanation) return;

    const isCorrect = userAction === currentCard.correct_action;
    setLastActionCorrect(isCorrect);
    setShowExplanation(true);

    if (soundEnabled) {
      sound.playSwipe(isCorrect);
    }

    const delta = isCorrect ? 10 : -5;
    applyScoreDelta({ r: delta }, 'reach-math-test-disaster');

    setStats((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      totalScoreDelta: prev.totalScoreDelta + delta,
    }));
  };

  const handleNextCard = () => {
    setShowExplanation(false);
    if (currentIndex + 1 < cards.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
      markScenarioCompleted('reach-math-test-disaster', { c: 0, o: 0, r: stats.totalScoreDelta, e: 0 });
      if (soundEnabled) sound.playVictory();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setShowExplanation(false);
    setIsFinished(false);
    setStats({ correct: 0, totalScoreDelta: 0 });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Header Context Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white rounded-3xl p-6 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
                CORE: Reach (Khoanh vùng ảnh hưởng)
              </span>
              <span className="text-amber-100 text-xs font-medium">Lớp 7 - 9</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              The 45-Minute Math Test Disaster (Bài kiểm tra 4 điểm)
            </h1>
            <p className="text-amber-100 text-xs sm:text-sm mt-1 max-w-xl">
              Khoanh vùng thất bại: <strong>Vuốt Trái</strong> để LOẠI BỎ suy nghĩ tiêu cực lan tỏa, <strong>Vuốt Phải</strong> để GIỮ LẠI suy nghĩ cô lập vấn đề!
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
            <span className="text-xs font-semibold">Tiến độ:</span>
            <span className="text-base font-black text-white">
              {Math.min(currentIndex + 1, cards.length)} / {cards.length}
            </span>
          </div>
        </div>
      </div>

      {/* Main Math Test Paper Backdrop & Card Deck */}
      {!isFinished ? (
        <div className="relative flex flex-col items-center">
          
          {/* Simulated Exam Sheet Background */}
          <div className="w-full bg-[#fcfbf7] border-2 border-slate-300 rounded-3xl p-6 shadow-xl relative overflow-hidden">
            
            {/* Red Ink Header of Math Test */}
            <div className="flex items-start justify-between border-b-2 border-dashed border-slate-300 pb-4 mb-6">
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Bài kiểm tra 1 tiết • Đại số Chương 2
                </div>
                <div className="text-sm font-semibold text-slate-800 mt-0.5">
                  Họ và tên: Nguyễn Minh Anh • Lớp 8A3
                </div>
              </div>

              {/* Red 4 Score Circle */}
              <div className="w-16 h-16 rounded-full border-3 border-rose-600 flex flex-col items-center justify-center text-rose-600 shadow-xs rotate-[-6deg] bg-white">
                <span className="text-2xl font-black leading-none">4</span>
                <span className="text-[10px] font-bold border-t border-rose-400 px-1 mt-0.5">10</span>
              </div>
            </div>

            {/* Teacher Red Note */}
            <div className="text-xs font-serif italic text-rose-700 bg-rose-50 border border-rose-200 px-3.5 py-1.5 rounded-xl mb-6 inline-block">
              ✍️ Lời phê của thầy: &ldquo;Bài làm thiếu cẩn thận, cần cố gắng nhiều hơn ở bài thi Học kì!&rdquo;
            </div>

            {/* Interactive Swipe Card Stack */}
            <div className="relative h-72 w-full flex items-center justify-center my-2">
              <AnimatePresence mode="wait">
                {currentCard && (
                  <motion.div
                    key={currentCard.id}
                    drag={showExplanation ? false : 'x'}
                    dragConstraints={{ left: -100, right: 100 }}
                    onDragEnd={(_, info) => {
                      if (info.offset.x > 80) handleDecision('right');
                      else if (info.offset.x < -80) handleDecision('left');
                    }}
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    whileDrag={{ scale: 1.03, rotate: 4 }}
                    className="absolute inset-x-2 sm:inset-x-8 top-0 bottom-0 bg-white rounded-3xl border-2 border-slate-200 shadow-2xl p-6 sm:p-8 flex flex-col justify-between cursor-grab active:cursor-grabbing select-none"
                  >
                    {/* Top Card Tag */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        💭 Luồng suy nghĩ #{currentIndex + 1}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        Kéo sang Trái hoặc Phải
                      </span>
                    </div>

                    {/* Thought content */}
                    <div className="my-auto py-4 text-center">
                      <p className="text-lg sm:text-xl font-bold text-slate-800 leading-snug font-serif">
                        &ldquo;{currentCard.thought}&rdquo;
                      </p>
                    </div>

                    {/* Drag helper stamps preview */}
                    <div className="flex justify-between items-center text-xs font-bold text-slate-400 pt-2 border-t border-slate-100">
                      <span className="flex items-center gap-1 text-rose-600">
                        <X className="w-4 h-4" /> KÉO TRÁI (LOẠI BỎ)
                      </span>
                      <span className="flex items-center gap-1 text-emerald-600">
                        KÉO PHẢI (GIỮ LẠI) <Check className="w-4 h-4" />
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Tactical Action Buttons for Mobile / Click */}
            {!showExplanation && (
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={() => handleDecision('left')}
                  className="flex-1 max-w-[200px] flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold border-2 border-rose-300 shadow-sm active:scale-95 transition-all text-sm"
                >
                  <X className="w-5 h-5" />
                  <span>LOẠI BỎ (Trái)</span>
                </button>

                <button
                  onClick={() => handleDecision('right')}
                  className="flex-1 max-w-[200px] flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold border-2 border-emerald-300 shadow-sm active:scale-95 transition-all text-sm"
                >
                  <span>GIỮ LẠI (Phải)</span>
                  <Check className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Explanation Modal / Drawer */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-5 rounded-2xl border-2 ${
                  lastActionCorrect
                    ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
                    : 'bg-rose-50/90 border-rose-300 text-rose-950'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    {lastActionCorrect ? (
                      <>
                        <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">✓</span>
                        <span>Phân tích Chính xác! (+10 Reach)</span>
                      </>
                    ) : (
                      <>
                        <span className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs">✕</span>
                        <span>Chưa chính xác (-5 Reach)</span>
                      </>
                    )}
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-white border border-slate-200">
                    {currentCard.aq_tag}
                  </span>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed mb-4">
                  {currentCard.explanation}
                </p>

                <button
                  onClick={handleNextCard}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-all"
                >
                  <span>Tiếp tục thẻ tiếp theo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

          </div>
        </div>
      ) : (
        /* Completion Summary Screen */
        <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-8 text-center space-y-5 shadow-xl animate-in fade-in duration-500">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-500 text-white flex items-center justify-center text-3xl shadow-lg">
            🎯
          </div>
          <div>
            <h2 className="text-2xl font-black text-amber-950">
              Bạn đã hoàn thành Thử thách Khoanh vùng Thất bại!
            </h2>
            <p className="text-sm text-amber-900 max-w-lg mx-auto mt-2 leading-relaxed">
              Điểm 4 Toán chỉ là một biến cố cục bộ. Khi bạn biết <strong>khoanh vùng ảnh hưởng (Reach)</strong>, bạn không cho phép nó lan tỏa sang lòng tự trọng hay tương lai của chính mình.
            </p>
          </div>

          {/* Stats Box */}
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-xs">
              <div className="text-xs text-slate-500 font-semibold">Thẻ phân loại đúng</div>
              <div className="text-2xl font-black text-emerald-600 mt-1">
                {stats.correct} / {cards.length}
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-xs">
              <div className="text-xs text-slate-500 font-semibold">Điểm Reach tích lũy</div>
              <div className="text-2xl font-black text-amber-600 mt-1">
                +{stats.totalScoreDelta} R
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Link
              href="/scenarios/endurance-exam-crush"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-md shadow-emerald-600/20 transition-all"
            >
              <span>Thử thách tiếp theo: ENDURANCE (Mùa thi tháng 5)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-sm px-5 py-3 rounded-2xl shadow-xs transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Chơi lại</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
