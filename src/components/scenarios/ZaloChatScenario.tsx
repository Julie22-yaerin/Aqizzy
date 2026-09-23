'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAQStore } from '@/store/aqStore';
import { sound } from '@/lib/sound';
import confetti from 'canvas-confetti';
import { Send, Phone, Video, MoreVertical, Sparkles, CheckCheck, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import DebriefRoomModal from '@/components/scenarios/DebriefRoomModal';

interface Message {
  id: string;
  sender: 'minh_khang' | 'linh_chi' | 'user' | 'system';
  sender_name: string;
  text: string;
  timestamp: string;
  is_user: boolean;
  score_delta?: {
    c: number;
    o: number;
    r: number;
    e: number;
  };
  coaching_tip?: string;
}

export default function ZaloChatScenario() {
  const { applyScoreDelta, markScenarioCompleted, soundEnabled } = useAQStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'minh_khang',
      sender_name: 'Minh Khang',
      text: 'Trời ơi cứu tao với tụi mày ơi!! 😭😭 Cô KHTN vừa nhắn trên Zalo đổi đề tài mô hình sáng mai sang HỆ HÔ HẤP rồi!! Mô hình tế bào tao với tụi mày dán xốp xong hết rồi mà!',
      timestamp: '21:01',
      is_user: false,
    },
    {
      id: 'm2',
      sender: 'linh_chi',
      sender_name: 'Linh Chi',
      text: 'Cái gì??? 9h tối Chủ Nhật cô mới nhắn đổi??? Giờ này tiệm tạp hóa đóng cửa sạch rồi lấy đâu ra đồ mà làm? Thôi tao dẹp, mai lên xin cô cho 0 điểm luôn đi, làm sao mà kịp được!',
      timestamp: '21:02',
      is_user: false,
    },
    {
      id: 'm3',
      sender: 'minh_khang',
      sender_name: 'Minh Khang',
      text: 'Không được đâu Chi ơi, điểm hệ số 2 đó!! Mai mà bị 0 điểm mẹ tao cắt tiền tiêu vặt với tịch thu điện thoại luôn á 😭 Hay là thức trắng đêm nay nặn đất sét đi, tao sợ quá!',
      timestamp: '21:03',
      is_user: false,
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingName, setTypingName] = useState('');
  const [isResolved, setIsResolved] = useState(false);
  const [showDebrief, setShowDebrief] = useState(false);
  const [totalScenarioDelta, setTotalScenarioDelta] = useState({ c: 0, o: 0, r: 0, e: 0 });
  const [lastTip, setLastTip] = useState<string | null>(null);

  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const quickPrompts = [
    {
      label: '💡 Đề xuất phương án 2D (High AQ)',
      text: 'Bình tĩnh nào hai bạn! Giờ tiệm đóng cửa rồi thức trắng đêm cũng không có đồ làm 3D đâu. Nhà tao có sẵn giấy A3 với bút màu dạ, tối nay tụi mình làm sơ đồ giải phẫu hệ hô hấp dạng 2D thật đẹp. Sáng mai tao sẽ đại diện nhóm lên nói thật với cô về thông báo gấp.',
    },
    {
      label: '🤝 Phân chia công việc ngay',
      text: 'Đừng hoảng! Khang phụ trách vẽ đường thở khí quản và hai lá phổi, Chi tìm thông tin chú thích các bộ phận, còn tao chuẩn bị bài thuyết trình 3 phút. Mai lên sớm trước 15 phút ráp lại là xong!',
    },
    {
      label: '⚠️ Đổ lỗi và hoảng loạn (Low AQ)',
      text: 'Tao cũng điên mất thôi! Cô giáo làm ăn kiểu gì kỳ cục vậy, 9h tối mới nhắn! Hay là kệ đi, mai cả nhóm không nộp xem cô làm gì được!',
    },
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText.trim();
    if (!text || isTyping) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      sender_name: 'Bạn (Tổ trưởng/Bạn cùng nhóm)',
      text,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      is_user: true,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);
    setTypingName('Minh Khang & Linh Chi đang soạn tin...');

    try {
      const res = await fetch('/api/scenario/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenarioId: 'control-zalo-panic',
          messages: messages.map((m) => ({
            role: m.is_user ? 'user' : 'assistant',
            content: `${m.sender_name}: ${m.text}`,
          })),
          userMessage: text,
          sessionId: 'session-control-' + Date.now(),
        }),
      });

      const data = await res.json();

      setIsTyping(false);

      if (soundEnabled) {
        sound.playZaloPing();
      }

      const npcMsg: Message = {
        id: `npc-${Date.now()}`,
        sender: 'minh_khang',
        sender_name: 'Nhóm KHTN',
        text: data.npc_reply,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        is_user: false,
        score_delta: data.score_delta,
        coaching_tip: data.coaching_tip,
      };

      setMessages((prev) => [...prev, npcMsg]);

      if (data.coaching_tip) {
        setLastTip(data.coaching_tip);
      }

      if (data.score_delta) {
        applyScoreDelta(data.score_delta, 'control-zalo-panic');
        setTotalScenarioDelta((prev) => ({
          c: prev.c + (data.score_delta.c || 0),
          o: prev.o + (data.score_delta.o || 0),
          r: prev.r + (data.score_delta.r || 0),
          e: prev.e + (data.score_delta.e || 0),
        }));
      }

      if (data.is_crisis_resolved) {
        setIsResolved(true);
        markScenarioCompleted('control-zalo-panic', totalScenarioDelta);
        if (soundEnabled) {
          sound.playVictory();
        }
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
        // Auto show Debrief Room after a brief moment
        setTimeout(() => setShowDebrief(true), 1200);
      }
    } catch (err) {
      console.error(err);
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header Context Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white rounded-3xl p-6 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
                CORE: Control (Kiểm soát)
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              The 9 PM Sunday Zalo Panic
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm mt-1 max-w-2xl">
              Tập trung vào điều bạn <strong>CÓ THỂ KIỂM SOÁT</strong> ngay lúc này. Trấn an đồng đội, đề xuất giải pháp 2D thực tế thay vì hoảng sợ thức trắng đêm!
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
            <span className="text-xs font-semibold">Điểm Control nhận được:</span>
            <span className={`text-base font-black ${totalScenarioDelta.c >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
              {totalScenarioDelta.c >= 0 ? `+${totalScenarioDelta.c}` : totalScenarioDelta.c}
            </span>
          </div>
        </div>
      </div>

      {/* Main Simulated Zalo Chat Window */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col h-[640px]">
        
        {/* Zalo Top Navigation Bar */}
        <div className="bg-[#0068FF] text-white px-4 sm:px-6 py-3.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold border border-white/30">
                🔬
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#0068FF] rounded-full"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base leading-tight">
                  Nhóm KHTN - Tổ 2 🌿 (4 thành viên)
                </h3>
              </div>
              <p className="text-[11px] text-blue-100">
                21:00 Chủ Nhật • Hoạt động 2 phút trước
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-white/90">
            <Phone className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
            <Video className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
            <MoreVertical className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
          </div>
        </div>

        {/* Chat History Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#EBF3FF]/40">
          
          {/* Timestamp Divider */}
          <div className="text-center my-2">
            <span className="text-[11px] bg-white/80 border border-slate-200/60 text-slate-500 px-3 py-1 rounded-full shadow-xs font-medium">
              Chủ Nhật, 21:00 • Thông báo khẩn từ Cô Nga KHTN
            </span>
          </div>

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.is_user ? 'items-end' : 'items-start'} space-y-1`}
            >
              {/* Sender Name */}
              {!msg.is_user && (
                <span className="text-[11px] font-semibold text-slate-500 ml-11">
                  {msg.sender_name}
                </span>
              )}

              <div className={`flex items-end gap-2 max-w-[85%] sm:max-w-[75%] ${msg.is_user ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                {!msg.is_user && (
                  <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-sm flex-shrink-0">
                    {msg.sender === 'minh_khang' ? '👦🏻' : '👧🏻'}
                  </div>
                )}

                {/* Bubble */}
                <div
                  className={`p-3.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line shadow-xs ${
                    msg.is_user
                      ? 'bg-[#0068FF] text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                  }`}
                >
                  {msg.text}

                  <div className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${msg.is_user ? 'text-blue-200' : 'text-slate-400'}`}>
                    <span>{msg.timestamp}</span>
                    {msg.is_user && <CheckCheck className="w-3.5 h-3.5" />}
                  </div>
                </div>
              </div>

              {/* Score Delta Pill & Feedback */}
              {msg.score_delta && (
                <div className="ml-11 mt-1 flex flex-wrap items-center gap-1.5">
                  {msg.score_delta.c !== 0 && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${msg.score_delta.c > 0 ? 'bg-blue-100 text-blue-800' : 'bg-rose-100 text-rose-800'}`}>
                      Control: {msg.score_delta.c > 0 ? `+${msg.score_delta.c}` : msg.score_delta.c}
                    </span>
                  )}
                  {msg.score_delta.o !== 0 && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                      Ownership: +{msg.score_delta.o}
                    </span>
                  )}
                  {msg.coaching_tip && (
                    <span className="text-[11px] text-slate-600 bg-white/90 border border-slate-200 px-2.5 py-0.5 rounded-md italic whitespace-pre-wrap block">
                      💡 {msg.coaching_tip}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-center gap-2 text-slate-500 text-xs italic ml-2">
              <div className="flex items-center gap-1 bg-white p-2 rounded-xl shadow-xs border border-slate-200">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
              <span>{typingName}</span>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 overflow-x-auto flex gap-2 scrollbar-none">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p.text)}
              disabled={isTyping || isResolved}
              className="flex-shrink-0 text-xs font-semibold px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:border-blue-500 hover:text-blue-600 rounded-xl transition-all shadow-2xs disabled:opacity-50"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            disabled={isTyping || isResolved}
            placeholder={isResolved ? 'Tình huống đã giải quyết thành công!' : 'Nhập tin nhắn trấn an và giải quyết vấn đề...'}
            className="flex-1 bg-slate-100 hover:bg-slate-50 focus:bg-white text-sm px-4 py-2.5 rounded-2xl border border-transparent focus:border-[#0068FF] outline-hidden transition-all text-slate-900 placeholder:text-slate-400"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim() || isTyping || isResolved}
            className="bg-[#0068FF] hover:bg-[#0052CC] disabled:bg-slate-200 text-white p-2.5 rounded-2xl transition-all disabled:text-slate-400 shadow-md shadow-blue-500/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Crisis Resolved Dialog */}
      {isResolved && (
        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-lg animate-in fade-in duration-500">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-2xl shadow-md">
            🎉
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-emerald-950">
              Xuất sắc! Khủng hoảng 21h Chủ Nhật đã được kiểm soát!
            </h2>
            <p className="text-sm text-emerald-800 max-w-xl mx-auto mt-2">
              Bạn đã thể hiện chỉ số <strong>Control (Kiểm soát)</strong> tuyệt vời: Không hoảng loạn, không than vãn đổ lỗi cho cô giáo, mà chủ động đề xuất giải pháp 2D vẽ trên giấy A3 có sẵn và phân công công việc rõ ràng.
            </p>
          </div>

          <div className="inline-flex items-center gap-3 bg-white px-5 py-2.5 rounded-2xl border border-emerald-200 shadow-xs">
            <span className="text-xs font-semibold text-slate-600">Điểm Control tích lũy:</span>
            <span className="text-lg font-black text-blue-600">+{totalScenarioDelta.c} C</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setShowDebrief(true)}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-lg shadow-indigo-600/30 transition-all transform hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Mở Báo Cáo Phản Tư (Debrief Room) & Radar Chart</span>
            </button>
            <Link
              href="/scenarios/ownership-homeroom"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-md shadow-purple-600/20 transition-all"
            >
              <span>Sang Thử Thách 2: OWNERSHIP</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* Debrief Room Modal */}
      <DebriefRoomModal
        isOpen={showDebrief}
        onClose={() => setShowDebrief(false)}
        scenarioId="control-zalo-panic"
        scenarioTitle="Cơn hoảng loạn Zalo lúc 9h tối Chủ Nhật"
        sessionLogs={messages.map((m) => ({
          role: m.is_user ? 'user' : 'npc',
          message_content: `${m.sender_name}: ${m.text}`,
        }))}
        nextScenarioPath="/scenarios/ownership-homeroom"
        nextScenarioTitle="Sang Kịch Bản 2: OWNERSHIP"
        onRestartScenario={() => {
          setIsResolved(false);
          setMessages([
            {
              id: 'm1',
              sender: 'minh_khang',
              sender_name: 'Minh Khang',
              text: 'Trời ơi cứu tao với tụi mày ơi!! 😭😭 Cô KHTN vừa nhắn trên Zalo đổi đề tài mô hình sáng mai sang HỆ HÔ HẤP rồi!! Mô hình tế bào tao với tụi mày dán xốp xong hết rồi mà!',
              timestamp: '21:01',
              is_user: false,
            },
            {
              id: 'm2',
              sender: 'linh_chi',
              sender_name: 'Linh Chi',
              text: 'Cái gì??? 9h tối Chủ Nhật cô mới nhắn đổi??? Giờ này tiệm tạp hóa đóng cửa sạch rồi lấy đâu ra đồ mà làm? Thôi tao dẹp, mai lên xin cô cho 0 điểm luôn đi, làm sao mà kịp được!',
              timestamp: '21:02',
              is_user: false,
            },
            {
              id: 'm3',
              sender: 'minh_khang',
              sender_name: 'Minh Khang',
              text: 'Không được đâu Chi ơi, điểm hệ số 2 đó!! Mai mà bị 0 điểm mẹ tao cắt tiền tiêu vặt với tịch thu điện thoại luôn á 😭 Hay là thức trắng đêm nay nặn đất sét đi, tao sợ quá!',
              timestamp: '21:03',
              is_user: false,
            },
          ]);
        }}
      />

    </div>
  );
}
