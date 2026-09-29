'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAQStore } from '@/store/aqStore';
import { sound } from '@/lib/sound';
import confetti from 'canvas-confetti';
import { Send, CheckCheck, ArrowRight, ShieldCheck, UserCheck, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import DebriefRoomModal from '@/components/scenarios/DebriefRoomModal';

interface Message {
  id: string;
  sender: 'npc' | 'user';
  sender_name: string;
  text: string;
  timestamp: string;
  is_user: boolean;
  score_delta?: { c: number; o: number; r: number; e: number };
  coaching_tip?: string;
}

export default function PrivateChatScenario() {
  const { applyScoreDelta, markScenarioCompleted, soundEnabled, user } = useAQStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'npc',
      sender_name: 'Minh Tuấn',
      text: 'Ủa bạn thấy bài trên Confession trường chưa? 10 điểm Toán hôm nọ làm trong 20 phút thì ai tin được là tự lực cánh sinh? Cả trường đang đồn bạn chép tài liệu tinh vi kìa! 😏',
      timestamp: '16:45',
      is_user: false,
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isResolved, setIsResolved] = useState(false);
  const [showDebrief, setShowDebrief] = useState(false);
  const [totalControlDelta, setTotalControlDelta] = useState(0);
  const [sessionId] = useState(() => 'session-toxic-rumor-' + Date.now());

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    const text = inputText.trim();
    if (!text || isTyping || isResolved) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      sender_name: 'Bạn',
      text,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      is_user: true,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/scenario/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenarioId: 'control-toxic-rumor',
          messages: messages.map((m) => ({
            role: m.is_user ? 'user' : 'assistant',
            content: `${m.sender_name}: ${m.text}`,
          })),
          userMessage: text,
          sessionId,
          userId: user.id,
        }),
      });

      const data = await res.json();
      setIsTyping(false);

      if (soundEnabled) sound.playZaloPing();

      const npcMsg: Message = {
        id: `npc-${Date.now()}`,
        sender: 'npc',
        sender_name: 'Minh Tuấn',
        text: data.npc_reply || 'À... nếu bạn nói vậy thì chắc mình hiểu lầm rồi. Để mình nhờ Admin gỡ bài viết đó xuống...',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        is_user: false,
        score_delta: data.score_delta || { c: 20, o: 0, r: 0, e: 0 },
        coaching_tip: data.coaching_tip,
      };

      setMessages((prev) => [...prev, npcMsg]);

      const deltaC = data.score_delta?.c || 20;
      applyScoreDelta({ c: deltaC }, 'control-toxic-rumor');
      setTotalControlDelta((prev) => prev + deltaC);

      // Resolve scenario when handled with control
      const isConstructive = text.length >= 20 && !text.includes('chửi') && !text.includes('đánh');
      if (isConstructive || data.is_crisis_resolved) {
        setIsResolved(true);
        markScenarioCompleted('control-toxic-rumor', { c: totalControlDelta + deltaC, o: 0, r: 0, e: 0 });
        if (soundEnabled) sound.playVictory();
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        setTimeout(() => setShowDebrief(true), 1200);
      }
    } catch {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white rounded-3xl p-6 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
                CORE: Control (Hạ nhiệt tin đồn)
              </span>
              <span className="text-blue-100 text-xs font-medium">Lớp 8 - 9</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              The Toxic Rumor (Tin Đồn Thất Thiệt)
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm mt-1 max-w-2xl">
              Đối thoại 1-1 bằng sự điềm tĩnh và minh bạch. Không chửi bới, không đe dọa, kiểm soát khủng hoảng truyền thông học đường!
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
            <span className="text-xs font-semibold">Điểm Control:</span>
            <span className={`text-base font-black ${totalControlDelta >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
              +{totalControlDelta} C
            </span>
          </div>
        </div>
      </div>

      {/* 1-1 Private Chat Window */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col h-[560px]">
        {/* Top Chat Bar */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-xl font-bold">
              📱
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base leading-tight">
                Minh Tuấn (Bạn cùng khối)
              </h3>
              <p className="text-[11px] text-slate-400">
                Tin nhắn riêng tư • Trực tuyến
              </p>
            </div>
          </div>
          <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700">
            Trò chuyện 1-1
          </span>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/60">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.is_user ? 'items-end' : 'items-start'} space-y-1`}
            >
              <div className={`flex items-end gap-2 max-w-[85%] sm:max-w-[75%] ${msg.is_user ? 'flex-row-reverse' : 'flex-row'}`}>
                <div
                  className={`p-3.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line shadow-xs ${
                    msg.is_user
                      ? 'bg-blue-600 text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                  }`}
                >
                  {msg.text}
                  <div className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${msg.is_user ? 'text-blue-200' : 'text-slate-400'}`}>
                    <span>{msg.timestamp}</span>
                    {msg.is_user && <CheckCheck className="w-3.5 h-3.5" />}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-slate-500 text-xs italic ml-2">
              <span className="animate-spin text-blue-600">⏳</span>
              <span>Minh Tuấn đang trả lời...</span>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input Bar (No suggested prompts, pure student input) */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={isTyping || isResolved}
            placeholder={isResolved ? 'Khủng hoảng tin đồn đã được giải quyết!' : 'Nhập tin nhắn giải quyết văn minh, đề xuất đối thoại thẳng thắn...'}
            className="flex-1 bg-slate-100 hover:bg-slate-50 focus:bg-white text-sm px-4 py-2.5 rounded-2xl border border-transparent focus:border-blue-600 outline-hidden transition-all text-slate-900 placeholder:text-slate-400"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping || isResolved}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white p-2.5 rounded-2xl transition-all shadow-md shadow-blue-500/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Resolution Dialog */}
      {isResolved && (
        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-8 text-center space-y-4 shadow-xl animate-in fade-in">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-600 text-white flex items-center justify-center text-3xl shadow-lg">
            🕊️
          </div>
          <div>
            <h2 className="text-2xl font-black text-emerald-950">
              Xuất sắc! Bạn đã dập tắt tin đồn độc hại!
            </h2>
            <p className="text-sm text-emerald-900 max-w-lg mx-auto mt-2 leading-relaxed">
              Bạn không bị cuốn vào vòng xoáy đấu tố hay kích động bạo lực, mà dùng sự điềm tĩnh, đề nghị đối thoại minh bạch trước thầy cô để kiểm soát tình hình.
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
              href="/scenarios/ownership-homeroom"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-md transition-all"
            >
              <span>Sang Chiều Kích OWNERSHIP</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* Debrief Room Modal */}
      <DebriefRoomModal
        isOpen={showDebrief}
        onClose={() => setShowDebrief(false)}
        scenarioId="control-toxic-rumor"
        scenarioTitle="Kiểm soát tin đồn ác ý trên Confession trường"
        sessionLogs={messages.map((m) => ({
          role: m.is_user ? 'user' : 'npc',
          message_content: `${m.sender_name}: ${m.text}`,
        }))}
        nextScenarioPath="/scenarios/ownership-homeroom"
        nextScenarioTitle="Sang Kịch Bản 4: HOMEROOM PERIOD"
        onRestartScenario={() => {
          setIsResolved(false);
          setMessages([
            {
              id: 'm1',
              sender: 'npc',
              sender_name: 'Minh Tuấn',
              text: 'Ủa bạn thấy bài trên Confession trường chưa? 10 điểm Toán hôm nọ làm trong 20 phút thì ai tin được là tự lực cánh sinh? Cả trường đang đồn bạn chép tài liệu tinh vi kìa! 😏',
              timestamp: '16:45',
              is_user: false,
            },
          ]);
        }}
      />
    </div>
  );
}
