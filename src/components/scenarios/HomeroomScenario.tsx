'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAQStore } from '@/store/aqStore';
import { sound } from '@/lib/sound';
import confetti from 'canvas-confetti';
import { Send, ArrowRight, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

interface ClassroomMessage {
  id: string;
  speaker: 'co_mai' | 'nam' | 'user';
  speaker_title: string;
  avatar: string;
  text: string;
  is_user: boolean;
  score_delta?: {
    c: number;
    o: number;
    r: number;
    e: number;
  };
  coaching_tip?: string;
}

export default function HomeroomScenario() {
  const { applyScoreDelta, markScenarioCompleted, soundEnabled } = useAQStore();
  const [messages, setMessages] = useState<ClassroomMessage[]>([
    {
      id: 'h1',
      speaker: 'co_mai',
      speaker_title: 'Cô Mai (Giáo viên Chủ nhiệm)',
      avatar: '👩🏻‍🏫',
      text: 'Cả lớp trật tự! Cô không thể tin được là tuần này lớp 8A chúng ta đứng bét toàn khối vì bị trừ 10 điểm thi đua! Thầy Giám thị báo lại: Giờ truy bài, Tổ 3 có học sinh ngang nhiên ăn quà vặt rồi nhét rác vào hộc bàn! Tổ trưởng Tổ 3 đâu, em đứng lên trả lời cho cô và cả lớp biết chuyện này là như thế nào?!',
      is_user: false,
    },
    {
      id: 'h2',
      speaker: 'nam',
      speaker_title: 'Nam (Thành viên vi phạm)',
      avatar: '👦🏽',
      text: '(Cúi gằm mặt xuống bàn, hai tay run bần bật, lí nhí): "Tổ trưởng ơi tao xin lỗi... tao không nghĩ bị thầy Giám thị ghi vào sổ..."',
      is_user: false,
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [teacherAnger, setTeacherAnger] = useState(85);
  const [isResolved, setIsResolved] = useState(false);
  const [totalScenarioDelta, setTotalScenarioDelta] = useState({ c: 0, o: 0, r: 0, e: 0 });
  const [lastTip, setLastTip] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isEvaluating]);

  const tacticalChoices = [
    {
      label: '🛡️ Nhận trách nhiệm Tổ trưởng & Xin nhận phạt chung (High AQ)',
      text: 'Thưa cô, em xin nhận trách nhiệm với tư cách là Tổ trưởng. Lỗi là do em chưa sâu sát và đôn đốc các bạn trong giờ truy bài. Em không bao biện cho bạn Nam, nhưng em xin cô cho em cùng bạn Nam chịu hình phạt trực nhật lớp suốt tuần sau để chuộc lại điểm thi đua cho lớp ạ.',
    },
    {
      label: '🤝 Đề xuất kế hoạch giám sát cụ thể',
      text: 'Thưa cô, em xin nhận lỗi vì thiếu sót trong quản lý. Từ thứ Hai tới, em cam kết sẽ kiểm tra hộc bàn của cả tổ vào lúc 6h50 trước giờ truy bài và nhắc nhở 100% các bạn không mang đồ ăn vào lớp.',
    },
    {
      label: '❌ Chối bỏ và đùn đẩy trách nhiệm (Low AQ)',
      text: 'Thưa cô, bạn Nam tự mua bánh tráng trộn ăn rồi vứt rác chứ em có xả đâu ạ! Lúc đó em đang chép bài tập, em không hề biết gì hết! Lỗi của ai thì cô phạt người đó chứ đừng mắng cả tổ em!',
    },
  ];

  const handleSendAction = async (textToSend?: string) => {
    const text = textToSend || inputText.trim();
    if (!text || isEvaluating) return;

    const userMsg: ClassroomMessage = {
      id: `u-${Date.now()}`,
      speaker: 'user',
      speaker_title: 'Bạn (Tổ trưởng Tổ 3)',
      avatar: '🙋🏻‍♂️',
      text,
      is_user: true,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsEvaluating(true);

    try {
      const res = await fetch('/api/scenario/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenarioId: 'ownership-homeroom-period',
          messages: messages.map((m) => ({
            role: m.is_user ? 'user' : 'assistant',
            content: `${m.speaker_title}: ${m.text}`,
          })),
          userMessage: text,
          sessionId: 'session-ownership-' + Date.now(),
        }),
      });

      const data = await res.json();
      setIsEvaluating(false);

      if (soundEnabled) {
        sound.playZaloPing();
      }

      const teacherMsg: ClassroomMessage = {
        id: `teacher-${Date.now()}`,
        speaker: 'co_mai',
        speaker_title: 'Cô Mai (GVCN)',
        avatar: '👩🏻‍🏫',
        text: data.npc_reply,
        is_user: false,
        score_delta: data.score_delta,
        coaching_tip: data.coaching_tip,
      };

      setMessages((prev) => [...prev, teacherMsg]);

      if (data.coaching_tip) {
        setLastTip(data.coaching_tip);
      }

      if (data.score_delta) {
        applyScoreDelta(data.score_delta, 'ownership-homeroom-period');
        setTotalScenarioDelta((prev) => ({
          c: prev.c + (data.score_delta.c || 0),
          o: prev.o + (data.score_delta.o || 0),
          r: prev.r + (data.score_delta.r || 0),
          e: prev.e + (data.score_delta.e || 0),
        }));

        if (data.score_delta.o > 0) {
          setTeacherAnger((prev) => Math.max(20, prev - 35));
        } else {
          setTeacherAnger((prev) => Math.min(100, prev + 20));
          if (soundEnabled) sound.playWarning();
        }
      }

      if (data.is_crisis_resolved) {
        setIsResolved(true);
        setTeacherAnger(15);
        markScenarioCompleted('ownership-homeroom-period', totalScenarioDelta);
        if (soundEnabled) sound.playVictory();
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 },
        });
      }
    } catch (err) {
      console.error(err);
      setIsEvaluating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 text-white rounded-3xl p-6 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
                CORE: Ownership (Làm chủ trách nhiệm)
              </span>
              <span className="text-purple-200 text-xs font-medium">Lớp 8 - 9</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              The Homeroom Period (Giờ Sinh Hoạt Lớp)
            </h1>
            <p className="text-purple-100 text-xs sm:text-sm mt-1 max-w-2xl">
              Đo lường bản lĩnh người dẫn dắt: <strong>Dũng cảm nhận trách nhiệm</strong> liên đới và hành động khắc phục, hay <strong>đùn đẩy đổ lỗi</strong> cho bạn cùng tổ?
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
            <span className="text-xs font-semibold">Điểm Ownership nhận được:</span>
            <span className={`text-base font-black ${totalScenarioDelta.o >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
              {totalScenarioDelta.o >= 0 ? `+${totalScenarioDelta.o}` : totalScenarioDelta.o}
            </span>
          </div>
        </div>
      </div>

      {/* Classroom Setting & Chalkboard Top Frame */}
      <div className="bg-[#1b2d24] text-[#fdfefe] rounded-t-3xl border-4 border-[#5c3d2e] p-4 sm:p-5 shadow-inner">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#a3b899]/30 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-[#254133] text-[#a3b899] border border-[#a3b899]/40">
              TRƯỜNG THCS QUYẾT THẮNG • LỚP 8A
            </span>
            <span className="text-xs text-amber-200 font-serif">
              Tiết Sinh Hoạt - Chiều Thứ Sáu Tuần 24
            </span>
          </div>

          {/* Emulation Points Banner */}
          <div className="flex items-center gap-2 bg-rose-900/80 border border-rose-600 px-3 py-1 rounded-xl text-rose-200 text-xs font-bold">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            <span>Thi đua tuần: Hạng 12/12 🔻 (-10 điểm: Tổ 3 xả rác)</span>
          </div>
        </div>

        {/* Teacher Mood Indicator */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="text-2xl">👩🏻‍🏫</div>
            <div>
              <div className="text-xs font-bold text-amber-300">Thái độ của Cô Mai:</div>
              <div className="text-xs text-slate-300">
                {teacherAnger > 70
                  ? '🔥 Cực kỳ phẫn nộ trước việc đùn đẩy trách nhiệm'
                  : teacherAnger > 40
                  ? '⚡ Nghiêm nghị, đang quan sát thái độ Tổ trưởng'
                  : '🌿 Đã nguôi giận, đánh giá cao sự dũng cảm'}
              </div>
            </div>
          </div>

          <div className="w-36 sm:w-48">
            <div className="flex justify-between text-[10px] text-slate-400 mb-1">
              <span>Bao dung</span>
              <span>Giận dữ</span>
            </div>
            <div className="h-2 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
              <div
                className={`h-full transition-all duration-500 ${
                  teacherAnger > 60 ? 'bg-rose-500' : teacherAnger > 30 ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${teacherAnger}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Classroom Dialogue Window */}
      <div className="bg-white rounded-b-3xl border-x-4 border-b-4 border-slate-200 shadow-xl overflow-hidden flex flex-col h-[520px]">
        
        {/* Dialogue Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.is_user ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-xl flex-shrink-0">
                {msg.avatar}
              </div>

              {/* Speech Bubble */}
              <div className={`max-w-[82%] sm:max-w-[75%] space-y-1 ${msg.is_user ? 'items-end' : 'items-start'}`}>
                <div className={`text-[11px] font-bold text-slate-600 ${msg.is_user ? 'text-right' : 'text-left'}`}>
                  {msg.speaker_title}
                </div>

                <div
                  className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-line shadow-xs ${
                    msg.is_user
                      ? 'bg-purple-600 text-white rounded-tr-xs'
                      : msg.speaker === 'nam'
                      ? 'bg-amber-50 text-amber-900 border border-amber-200 rounded-tl-xs italic'
                      : 'bg-white text-slate-900 border border-slate-200 rounded-tl-xs font-serif'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Feedback pill */}
                {msg.score_delta && (
                  <div className="mt-1 flex flex-wrap items-center gap-1.5">
                    {msg.score_delta.o !== 0 && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${msg.score_delta.o > 0 ? 'bg-purple-100 text-purple-800' : 'bg-rose-100 text-rose-800'}`}>
                        Ownership: {msg.score_delta.o > 0 ? `+${msg.score_delta.o}` : msg.score_delta.o}
                      </span>
                    )}
                    {msg.score_delta.c !== 0 && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                        Control: +{msg.score_delta.c}
                      </span>
                    )}
                    {msg.coaching_tip && (
                      <span className="text-[11px] text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded-md italic">
                        💡 {msg.coaching_tip}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isEvaluating && (
            <div className="flex items-center gap-2 text-slate-500 text-xs italic">
              <span className="animate-spin text-purple-600">⏳</span>
              <span>Cô Mai đang lắng nghe và đánh giá thái độ của bạn...</span>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Suggestion / Tactical Action Chips */}
        <div className="px-4 py-2.5 bg-slate-100/80 border-t border-slate-200 overflow-x-auto flex gap-2 scrollbar-none">
          {tacticalChoices.map((c, idx) => (
            <button
              key={idx}
              onClick={() => handleSendAction(c.text)}
              disabled={isEvaluating || isResolved}
              className="flex-shrink-0 text-xs font-semibold px-3.5 py-1.5 bg-white border border-slate-200 text-slate-800 hover:border-purple-500 hover:text-purple-700 rounded-xl transition-all shadow-2xs disabled:opacity-50"
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Freeform input */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendAction();
            }}
            disabled={isEvaluating || isResolved}
            placeholder={isResolved ? 'Tiết sinh hoạt kết thúc trong sự đồng thuận!' : 'Đứng dậy phát biểu trước cô và cả lớp...'}
            className="flex-1 bg-slate-100 hover:bg-slate-50 focus:bg-white text-sm px-4 py-2.5 rounded-2xl border border-transparent focus:border-purple-600 outline-hidden transition-all text-slate-900 placeholder:text-slate-400"
          />
          <button
            onClick={() => handleSendAction()}
            disabled={!inputText.trim() || isEvaluating || isResolved}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-slate-200 text-white p-2.5 rounded-2xl transition-all disabled:text-slate-400 shadow-md shadow-purple-500/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Resolution Dialog */}
      {isResolved && (
        <div className="bg-purple-50 border-2 border-purple-300 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-lg animate-in fade-in duration-500">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-purple-600 text-white flex items-center justify-center text-2xl shadow-md">
            👑
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-purple-950">
              Bài học Lãnh đạo Đỉnh cao: Trách nhiệm là Sức mạnh!
            </h2>
            <p className="text-sm text-purple-900 max-w-xl mx-auto mt-2">
              Bạn đã thể hiện chỉ số <strong>Ownership</strong> xuất sắc! Trong mắt thầy cô và bạn bè, người dám đứng mũi chịu sào và chủ động nhận phần việc khắc phục hậu quả luôn là người lãnh đạo đáng tin cậy nhất.
            </p>
          </div>

          <div className="inline-flex items-center gap-3 bg-white px-5 py-2.5 rounded-2xl border border-purple-200 shadow-xs">
            <span className="text-xs font-semibold text-slate-600">Điểm Ownership tích lũy:</span>
            <span className="text-lg font-black text-purple-600">+{totalScenarioDelta.o} O</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/scenarios/reach-math-test"
              className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-md shadow-amber-600/20 transition-all"
            >
              <span>Thử thách tiếp theo: REACH (Thảm họa 4 điểm Toán - Swipe UI)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/profile"
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-sm px-6 py-3 rounded-2xl shadow-xs transition-all"
            >
              Xem Hồ Sơ AQ
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
