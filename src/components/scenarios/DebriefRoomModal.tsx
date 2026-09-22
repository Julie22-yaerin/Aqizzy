'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAQStore } from '@/store/aqStore';
import { COREScore } from '@/types';
import { DebriefReport } from '@/lib/nvidia';
import COREScoreRadar from '@/components/COREScoreRadar';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, Quote, ArrowRight, RotateCcw, ShieldCheck, CheckCircle2, AlertTriangle, HeartHandshake } from 'lucide-react';
import Link from 'next/link';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  scenarioId: string;
  scenarioTitle: string;
  sessionLogs: { role: string; message_content: string }[];
  nextScenarioPath?: string;
  nextScenarioTitle?: string;
  onRestartScenario?: () => void;
}

export default function DebriefRoomModal({
  isOpen,
  onClose,
  scenarioId,
  scenarioTitle,
  sessionLogs,
  nextScenarioPath,
  nextScenarioTitle,
  onRestartScenario,
}: Props) {
  const { scores, totalAQ } = useAQStore();
  const [report, setReport] = useState<DebriefReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setLoading(true);

    const fetchReport = async () => {
      try {
        const res = await fetch('/api/debrief', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            scenarioId,
            scenarioTitle,
            sessionLogs,
            currentScores: scores,
          }),
        });
        const data: DebriefReport = await res.json();
        if (isMounted) {
          setReport(data);
          setLoading(false);
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.5 },
          });
        }
      } catch (err) {
        console.error('Failed to fetch debrief report:', err);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchReport();

    return () => {
      isMounted = false;
    };
  }, [isOpen, scenarioId, scenarioTitle, sessionLogs, scores]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="bg-white border border-slate-200 rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 text-white p-6 sm:p-8 flex-shrink-0 relative overflow-hidden">
            <div className="absolute top-0 right-0 translate-x-8 -translate-y-8 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
            <div className="flex items-center gap-3 mb-2">
              <span className="p-2 rounded-xl bg-white/20 backdrop-blur-md text-amber-300">
                <Trophy className="w-6 h-6" />
              </span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-indigo-200">
                The Debrief Room • Phòng Phản Tư & Đúc Kết AQ
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Báo Cáo Đúc Kết Bản Lĩnh Vượt Khó
            </h2>
            <p className="text-indigo-100 text-xs sm:text-sm mt-1">
              {scenarioTitle}
            </p>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin"></div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">
                    AI Mentor đang phân tích toàn bộ nhật ký ứng xử của bạn...
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Đánh giá các phát ngôn, trích xuất chỉ số CORE và xây dựng lời khuyên cá nhân hóa.
                  </p>
                </div>
              </div>
            ) : report ? (
              <>
                {/* Badge Banner */}
                <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-300/60 rounded-2xl p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🏅</span>
                    <div>
                      <div className="text-xs uppercase font-bold text-amber-700 tracking-wider">Huy hiệu đạt được</div>
                      <div className="text-base sm:text-lg font-black text-amber-900">{report.badge_awarded}</div>
                    </div>
                  </div>
                  <div className="bg-white px-3.5 py-1.5 rounded-xl border border-amber-200 text-xs font-bold text-amber-800 shadow-2xs">
                    +{report.overall_aq_delta} Điểm AQ
                  </div>
                </div>

                {/* Mentor Summary Review */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 sm:p-6 space-y-3">
                  <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                    <HeartHandshake className="w-5 h-5" />
                    <span>Lời Nhắn Nhủ Từ AI Mentor</span>
                  </div>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic">
                    "{report.summary_review}"
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium pt-2 border-t border-slate-200/60">
                    💡 <strong>Lời khuyên vàng:</strong> {report.mentor_advice}
                  </p>
                </div>

                {/* Exact User Quote Highlights (Section 4 requirement) */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                    <Quote className="w-5 h-5 text-indigo-600" />
                    <span>Trích Dẫn Phân Tích Hành Vi Của Bạn Trong Tình Huống</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Hệ thống trích xuất chính xác câu nói của bạn để chỉ ra phản xạ High AQ hoặc điểm cần khắc phục:
                  </p>

                  <div className="space-y-3">
                    {report.highlighted_quotes.map((item, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-2xl border transition-all ${
                          item.assessment === 'high_aq'
                            ? 'bg-emerald-50/70 border-emerald-200'
                            : 'bg-rose-50/70 border-rose-200'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${
                              item.assessment === 'high_aq'
                                ? 'bg-emerald-200 text-emerald-800'
                                : 'bg-rose-200 text-rose-800'
                            }`}
                          >
                            {item.assessment === 'high_aq' ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>High AQ ({item.dimension_name || item.dimension})</span>
                              </>
                            ) : (
                              <>
                                <AlertTriangle className="w-3.5 h-3.5" />
                                <span>Low AQ ({item.dimension_name || item.dimension})</span>
                              </>
                            )}
                          </span>
                        </div>

                        <blockquote className="text-slate-900 font-semibold text-sm sm:text-base pl-3 border-l-4 border-indigo-500 my-2">
                          "{item.quote}"
                        </blockquote>

                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-2">
                          {item.commentary}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Radar Chart Visual (Updated Scores) */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    <span>Hồ Sơ Năng Lực CORE Sau Thử Thách</span>
                  </div>
                  <COREScoreRadar scores={scores} totalAQ={totalAQ} />
                </div>
              </>
            ) : null}
          </div>

          {/* Footer Action Buttons */}
          <div className="bg-slate-50 border-t border-slate-200 p-4 sm:p-6 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
            <div className="flex items-center gap-2">
              {onRestartScenario && (
                <button
                  onClick={() => {
                    onClose();
                    onRestartScenario();
                  }}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 px-4 py-2.5 rounded-2xl hover:bg-slate-200 transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Thử lại tình huống</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/profile"
                className="text-xs sm:text-sm font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 px-5 py-2.5 rounded-2xl shadow-xs transition-all"
              >
                Xem Hồ Sơ Cá Nhân
              </Link>
              {nextScenarioPath ? (
                <Link
                  href={nextScenarioPath}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-6 py-2.5 rounded-2xl shadow-md shadow-indigo-600/20 transition-all"
                >
                  <span>{nextScenarioTitle || 'Thử Thách Tiếp Theo'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <button
                  onClick={onClose}
                  className="text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-6 py-2.5 rounded-2xl shadow-md shadow-indigo-600/20 transition-all"
                >
                  Đóng Báo Cáo
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
