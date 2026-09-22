import { NextRequest, NextResponse } from 'next/server';
import { generateDebriefReport } from '@/lib/nvidia';

/**
 * /api/debrief - Debrief Room Reflection Report Generator
 * Powered by NVIDIA NIM AI to provide mentoring Vietnamese feedback,
 * exact quote highlights for AQ evaluation, and updated CORE scores.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { scenarioId, scenarioTitle, sessionLogs, currentScores } = body;

    if (!scenarioId) {
      return NextResponse.json(
        { error: 'Missing scenarioId parameter.' },
        { status: 400 }
      );
    }

    const report = await generateDebriefReport(
      scenarioId,
      scenarioTitle || 'Rèn luyện Vượt Nghịch cảnh',
      sessionLogs || [],
      currentScores || { c: 50, o: 50, r: 50, e: 50 }
    );

    return NextResponse.json(report);
  } catch (error: any) {
    console.error('[API /api/debrief] Error:', error);
    return NextResponse.json(
      {
        scenario_title: 'Rèn Luyện Bản Lĩnh Vượt Khó',
        summary_review: 'Chúc mừng bạn đã vượt qua thử thách nghịch cảnh! Bạn đã thể hiện sự kiên định và cố gắng tìm kiếm giải pháp.',
        mentor_advice: 'Mỗi thử thách là một cơ hội để bạn phát triển bản lĩnh vượt khó (AQ).',
        highlighted_quotes: [],
        updated_scores: { c: 55, o: 55, r: 50, e: 50 },
        overall_aq_delta: 10,
        badge_awarded: 'Chiến Binh Kiên Trì 🛡️',
      },
      { status: 200 }
    );
  }
}
