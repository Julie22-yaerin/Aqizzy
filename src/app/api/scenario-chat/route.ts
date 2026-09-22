import { NextRequest, NextResponse } from 'next/server';
import { evaluateChatScenario } from '@/lib/nvidia';
import { logSessionEvent } from '@/lib/supabase';

/**
 * /api/scenario-chat - Core AI Chat Scenario Handler
 * Powered by NVIDIA NIM API with strict JSON format enforcement
 * Speeds student AQ evaluation through Vietnamese Middle School roleplay
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { scenarioId, messages, userMessage, sessionId, userId } = body;

    if (!scenarioId || !userMessage) {
      return NextResponse.json(
        {
          error: 'Missing required parameters: scenarioId and userMessage are required.',
        },
        { status: 400 }
      );
    }

    // Call NVIDIA NIM evaluation or intelligent Vietnamese fallback
    const evaluation = await evaluateChatScenario(
      scenarioId,
      messages || [],
      userMessage
    );

    // Persist session log to Supabase in background
    if (sessionId) {
      logSessionEvent({
        session_id: sessionId,
        scenario_id: scenarioId,
        user_id: userId,
        role: 'user',
        message_content: userMessage,
        extracted_core_delta: evaluation.score_delta,
        is_crisis_resolved: evaluation.is_crisis_resolved,
      }).catch((err) => {
        console.warn('[Supabase session_logs] Notice:', err);
      });
    }

    // Return strictly enforced JSON response
    return NextResponse.json({
      npc_reply: evaluation.npc_reply,
      score_delta: evaluation.score_delta,
      is_crisis_resolved: evaluation.is_crisis_resolved,
      coaching_tip: evaluation.coaching_tip,
    });
  } catch (error: any) {
    console.error('[API /api/scenario-chat] Error:', error);
    return NextResponse.json(
      {
        npc_reply: 'Đã xảy ra lỗi kết nối với máy chủ AI. Bạn hãy thử gửi lại tin nhắn nhé!',
        score_delta: { c: 0, o: 0, r: 0, e: 0 },
        is_crisis_resolved: false,
        coaching_tip: 'Lỗi kết nối mạng hoặc máy chủ.',
      },
      { status: 500 }
    );
  }
}
