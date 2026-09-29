'use client';

import React, { useState } from 'react';
import { useAQStore } from '@/store/aqStore';
import { sound } from '@/lib/sound';
import confetti from 'canvas-confetti';
import { ArrowRight, RotateCcw, AlertTriangle, ShieldCheck, Flame } from 'lucide-react';
import Link from 'next/link';
import DebriefRoomModal from '@/components/scenarios/DebriefRoomModal';

export default function BranchingScenario() {
  const { applyScoreDelta, markScenarioCompleted, soundEnabled } = useAQStore();
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [showDebrief, setShowDebrief] = useState(false);

  const choices = [
    {
      id: 'opt_confess',
      badge: 'Chủ động chịu trách nhiệm',
      title: '🛡️ Thú nhận ngay với thầy & Đề xuất dọn dẹp an toàn',
      text: 'Đứng nghiêm túc chờ thầy vào lớp, chủ động nhận lỗi: "Thưa thầy, em sơ ý làm rơi vỡ bình tam giác, em xin phép thầy được dọn dẹp an toàn và bồi thường cho phòng thực hành ạ."',
      outcome: 'Thầy giáo vào lớp, nhìn đống vỡ rồi nhìn bạn. Thầy khen bạn có tính trung thực và tinh thần trách nhiệm cao của một học sinh bản lĩnh. Thầy đưa bạn chổi và găng tay để dọn dẹp an toàn, và miễn tiền bồi thường vì đây là tai nạn ngoài ý muốn khi học tập.',
      score_delta: { o: 30, c: 15 },
      isGood: true,
      mindset: 'Climber (High Ownership)',
    },
    {
      id: 'opt_hide',
      badge: 'Trốn tránh & Che giấu',
      title: '🙈 Lén quét mảnh vỡ giấu vào đáy sọt rác',
      text: 'Nhanh tay gom mảnh vỡ vứt xuống đáy thùng rác dưới bàn giáo viên, lau vội bàn rồi quay về chỗ ngồi vờ như không có chuyện gì xảy ra.',
      outcome: 'Cuối tiết, thầy kiểm kê dụng cụ thấy thiếu bình định mức. Thầy xem lại camera an ninh phòng thí nghiệm và mời bạn lên phòng Giám thị viết bản kiểm điểm vì hành vi gian dối, bị hạ 1 bậc hạnh kiểm tháng này.',
      score_delta: { o: -25, c: -10 },
      isGood: false,
      mindset: 'Quitter (Che giấu lỗi lầm)',
    },
    {
      id: 'opt_blame',
      badge: 'Đùn đẩy & Đổ lỗi',
      title: '🗣️ Đổ lỗi cho bạn ngồi cùng bàn',
      text: 'Quay sang bạn bên cạnh to tiếng: "Tại cậu để bình sát mép bàn quá nên tớ mới quẹt phải chứ bộ! Lỗi do cậu cả đấy nhé!"',
      outcome: 'Bạn cùng bàn òa khóc vì bị oan, cả lớp xôn xao mất trật tự. Thầy giáo bước vào phạt cả bàn đứng góc lớp trừ 10 điểm thi đua vì thói đùn đẩy trách nhiệm và gây rối.',
      score_delta: { o: -35, c: -15 },
      isGood: false,
      mindset: 'Quitter (Đùn đẩy đổ lỗi)',
    },
  ];

  const handleSelect = (choice: typeof choices[0]) => {
    setSelectedChoiceId(choice.id);
    applyScoreDelta(choice.score_delta, 'ownership-broken-beaker');

    if (soundEnabled) {
      if (choice.isGood) sound.playVictory();
      else sound.playWarning();
    }

    if (choice.isGood) {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }

    markScenarioCompleted('ownership-broken-beaker', { c: 0, o: choice.score_delta.o, r: 0, e: 0 });
    setTimeout(() => setShowDebrief(true), 1500);
  };

  const currentChoice = choices.find((c) => c.id === selectedChoiceId);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 text-white rounded-3xl p-6 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
                CORE: Ownership (Cây Quyết Định)
              </span>
              <span className="text-purple-100 text-xs font-medium">Lớp 6 - 8</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              The Broken Beaker (Ống Nghiệm Vỡ Phòng Thí Nghiệm)
            </h1>
            <p className="text-purple-100 text-xs sm:text-sm mt-1 max-w-2xl">
              Hành động của bạn khi không có ai giám sát sẽ tiết lộ thước đo nhân cách thực sự của người dẫn dắt!
            </p>
          </div>
        </div>
      </div>

      {/* Main Situation Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl space-y-6">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-4">
          <div className="text-3xl">🧪💥</div>
          <div className="space-y-1">
            <h3 className="font-bold text-sm text-amber-900 uppercase tracking-wide">
              Biến cố phòng thực hành Hóa Học:
            </h3>
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-serif">
              Khuỷu tay bạn lỡ va vào bình tam giác định mức khiến nó rơi xuống sàn vỡ tan tành. Thầy giáo vừa bước ra ngoài nghe điện thoại. Hai bạn ngồi cùng bàn giật mình nhìn bạn. Bạn sẽ làm gì ngay bây giờ?
            </p>
          </div>
        </div>

        {/* 3 Branching Choices */}
        {!selectedChoiceId && (
          <div className="space-y-3.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Chọn 1 trong 3 nhánh hành động:
            </span>

            {choices.map((c) => (
              <button
                key={c.id}
                onClick={() => handleSelect(c)}
                className="w-full text-left p-5 rounded-2xl border-2 border-slate-200 hover:border-purple-500 hover:bg-purple-50/50 shadow-xs hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    {c.badge}
                  </span>
                  <span className="text-xs font-bold text-purple-600">
                    {c.score_delta.o > 0 ? `+${c.score_delta.o} O` : `${c.score_delta.o} O`}
                  </span>
                </div>
                <h4 className="font-bold text-base text-slate-900 group-hover:text-purple-700 transition-colors">
                  {c.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  {c.text}
                </p>
              </button>
            ))}
          </div>
        )}

        {/* Outcome Card */}
        {currentChoice && (
          <div className={`p-6 rounded-3xl border-2 space-y-4 animate-in fade-in ${
            currentChoice.isGood ? 'bg-emerald-50 border-emerald-300' : 'bg-rose-50 border-rose-300'
          }`}>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-bold px-3 py-1 rounded-xl text-white ${
                currentChoice.isGood ? 'bg-emerald-600' : 'bg-rose-600'
              }`}>
                {currentChoice.mindset}
              </span>
              <span className={`text-base font-black ${currentChoice.isGood ? 'text-emerald-700' : 'text-rose-700'}`}>
                {currentChoice.score_delta.o > 0 ? `+${currentChoice.score_delta.o} O` : `${currentChoice.score_delta.o} O`}
              </span>
            </div>

            <div>
              <h4 className={`text-lg font-black ${currentChoice.isGood ? 'text-emerald-950' : 'text-rose-950'}`}>
                Kết quả lựa chọn:
              </h4>
              <p className={`text-sm mt-1 leading-relaxed ${currentChoice.isGood ? 'text-emerald-900' : 'text-rose-900'}`}>
                {currentChoice.outcome}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setShowDebrief(true)}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all"
              >
                <span>Xem Báo Cáo Phản Tư (Debrief Room)</span>
              </button>
              <button
                onClick={() => setSelectedChoiceId(null)}
                className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Thử nhánh hành động khác</span>
              </button>
              <Link
                href="/scenarios/reach-math-test"
                className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all ml-auto"
              >
                <span>Sang Chiều Kích REACH</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Debrief Room Modal */}
      <DebriefRoomModal
        isOpen={showDebrief}
        onClose={() => setShowDebrief(false)}
        scenarioId="ownership-broken-beaker"
        scenarioTitle="Cây quyết định sự cố vỡ ống nghiệm trong giờ Hóa"
        sessionLogs={choices.map((c) => ({
          role: 'user',
          message_content: `Nhánh lựa chọn: "${c.title}". Kết quả: ${c.outcome}`,
        }))}
        nextScenarioPath="/scenarios/reach-math-test"
        nextScenarioTitle="Sang Kịch Bản 7: MATH TEST DISASTER"
        onRestartScenario={() => setSelectedChoiceId(null)}
      />
    </div>
  );
}
