'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAQStore } from '@/store/aqStore';
import { sound } from '@/lib/sound';
import confetti from 'canvas-confetti';
import { Send, CheckCheck, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import DebriefRoomModal from '@/components/scenarios/DebriefRoomModal';

interface Message {
  id: string;
  sender: 'ha_my' | 'duc_anh' | 'user';
  sender_name: string;
  text: string;
  timestamp: string;
  is_user: boolean;
  score_delta?: { c: number; o: number; r: number; e: number };
}

export default function SlideChatScenario() {
  const { applyScoreDelta, markScenarioCompleted, soundEnabled, user } = useAQStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'ds-1',
      sender: 'ha_my',
      sender_name: 'Hà My',
      text: 'Ủa mọi người ơi sao link Canva bài Sử sáng mai mình ấn vào nó báo "Tệp không tồn tại trong Thùng rác" vậy? 😱 Có ai vào nhầm không?',
      timestamp: '22:05',
      is_user: false,
    },
    {
      id: 'ds-2',
      sender: 'duc_anh',
      sender_name: 'Đức Anh',
      text: 'Cái gì??? Mai tiết 2 nộp rồi đó!! Cả tuần nay cày bục mặt giờ bảo mất file là sao? Ai đang giữ quyền chủ sở hữu file vậy?! 😡',
      timestamp: '22:06',
      is_user: false,
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isResolved, setIsResolved] = useState(false);
  const [showDebrief, setShowDebrief] = useState(false);
  const [totalOwnershipDelta, setTotalOwnershipDelta] = useState(0);
  const [sessionId] = useState(() => 'session-deleted-slides-' + Date.now());

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
          scenarioId: 'ownership-deleted-slides',
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
        sender: 'ha_my',
        sender_name: 'Hà My',
        text: data.npc_reply || 'Thôi được rồi, bạn dũng cảm nhận lỗi là tốt rồi. Nhà mình còn giữ bản tóm tắt nội dung, giờ mình chia nhau làm lại 6 slide cốt lõi trước 23h30 nhé!',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        is_user: false,
        score_delta: data.score_delta || { c: 0, o: 25, r: 0, e: 0 },
      };

      setMessages((prev) => [...prev, npcMsg]);

      const deltaO = data.score_delta?.o || 25;
      applyScoreDelta({ o: deltaO }, 'ownership-deleted-slides');
      setTotalOwnershipDelta((prev) => prev + deltaO);

      const admitsMistake = text.toLowerCase().includes('lỗi của mình') || text.toLowerCase().includes('mình xin lỗi') || text.toLowerCase().includes('mình lỡ tay');
      if (admitsMistake || data.is_crisis_resolved) {
        setIsResolved(true);
        markScenarioCompleted('ownership-deleted-slides', { c: 0, o: totalOwnershipDelta + deltaO, r: 0, e: 0 });
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
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 text-white rounded-3xl p-6 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
                CORE: Ownership (Nhận trách nhiệm)
              </span>
              <span className="text-purple-100 text-xs font-medium">Lớp 7 - 9</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              The Deleted Slides (File Thuyết Trình Bị Xoá)
            </h1>
            <p className="text-purple-100 text-xs sm:text-sm mt-1 max-w-2xl">
              22h đêm, file thuyết trình bị mất. Người có AQ cao dũng cảm nhận lỗi thật thà và lập tức chủ động đưa ra kế hoạch phục hồi cùng nhóm!
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
            <span className="text-xs font-semibold">Điểm Ownership:</span>
            <span className={`text-base font-black ${totalOwnershipDelta >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
              +{totalOwnershipDelta} O
            </span>
          </div>
        </div>
      </div>

      {/* Chat Room */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col h-[560px]">
        <div className="bg-[#0068FF] text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold">
              📊
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base leading-tight">
                Nhóm Lịch Sử 8A3 - Thuyết trình Tiết 2
              </h3>
              <p className="text-[11px] text-blue-100">
                4 thành viên • Hoạt động lúc 22:05
              </p>
            </div>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#EBF3FF]/40">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.is_user ? 'items-end' : 'items-start'} space-y-1`}
            >
              {!msg.is_user && (
                <span className="text-[11px] font-semibold text-slate-500 ml-10">
                  {msg.sender_name}
                </span>
              )}
              <div className={`flex items-end gap-2 max-w-[85%] sm:max-w-[75%] ${msg.is_user ? 'flex-row-reverse' : 'flex-row'}`}>
                {!msg.is_user && (
                  <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-sm flex-shrink-0">
                    {msg.sender === 'ha_my' ? '👧🏻' : '👦🏻'}
                  </div>
                )}
                <div
                  className={`p-3.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line shadow-xs ${
                    msg.is_user
                      ? 'bg-[#0068FF] text-white rounded-br-xs'
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
              <span className="animate-spin text-purple-600">⏳</span>
              <span>Cả nhóm đang chờ bạn phản hồi...</span>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={isTyping || isResolved}
            placeholder={isResolved ? 'Sự cố đã được giải quyết!' : 'Dũng cảm nhận trách nhiệm và đề xuất giải pháp làm lại cấp tốc...'}
            className="flex-1 bg-slate-100 hover:bg-slate-50 focus:bg-white text-sm px-4 py-2.5 rounded-2xl border border-transparent focus:border-purple-600 outline-hidden transition-all text-slate-900 placeholder:text-slate-400"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping || isResolved}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-slate-200 text-white p-2.5 rounded-2xl transition-all shadow-md shadow-purple-500/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Resolution Dialog */}
      {isResolved && (
        <div className="bg-purple-50 border-2 border-purple-300 rounded-3xl p-8 text-center space-y-4 shadow-xl animate-in fade-in">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-purple-600 text-white flex items-center justify-center text-3xl shadow-lg">
            💎
          </div>
          <div>
            <h2 className="text-2xl font-black text-purple-950">
              Bản Lĩnh Trách Nhiệm Xuất Sắc!
            </h2>
            <p className="text-sm text-purple-900 max-w-lg mx-auto mt-2 leading-relaxed">
              Bạn không đổ lỗi cho mạng chập chờn hay đổ lỗi cho Canva, mà dũng cảm nhận trách nhiệm giữ file và lập tức chủ động cùng nhóm hoàn thành bài trước giờ đi ngủ.
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
              href="/scenarios/ownership-broken-beaker"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-md transition-all"
            >
              <span>Sang Thử Thách 6: The Broken Beaker</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* Debrief Room Modal */}
      <DebriefRoomModal
        isOpen={showDebrief}
        onClose={() => setShowDebrief(false)}
        scenarioId="ownership-deleted-slides"
        scenarioTitle="Sự cố xoá nhầm slide Canva của nhóm"
        sessionLogs={messages.map((m) => ({
          role: m.is_user ? 'user' : 'npc',
          message_content: `${m.sender_name}: ${m.text}`,
        }))}
        nextScenarioPath="/scenarios/ownership-broken-beaker"
        nextScenarioTitle="Sang Kịch Bản 6: THE BROKEN BEAKER"
        onRestartScenario={() => {
          setIsResolved(false);
          setMessages([
            {
              id: 'ds-1',
              sender: 'ha_my',
              sender_name: 'Hà My',
              text: 'Ủa mọi người ơi sao link Canva bài Sử sáng mai mình ấn vào nó báo "Tệp không tồn tại trong Thùng rác" vậy? 😱 Có ai vào nhầm không?',
              timestamp: '22:05',
              is_user: false,
            },
            {
              id: 'ds-2',
              sender: 'duc_anh',
              sender_name: 'Đức Anh',
              text: 'Cái gì??? Mai tiết 2 nộp rồi đó!! Cả tuần nay cày bục mặt giờ bảo mất file là sao? Ai đang giữ quyền chủ sở hữu file vậy?! 😡',
              timestamp: '22:06',
              is_user: false,
            },
          ]);
        }}
      />
    </div>
  );
}
