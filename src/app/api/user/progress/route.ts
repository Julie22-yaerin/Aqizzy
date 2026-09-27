import { NextRequest, NextResponse } from 'next/server';
import { getUserProgressFromDb, saveUserProgressToDb } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId parameter' }, { status: 400 });
    }

    const data = await getUserProgressFromDb(userId);
    if (!data) {
      return NextResponse.json({ found: false, message: 'No progress found in DB' }, { status: 404 });
    }

    return NextResponse.json({ found: true, ...data });
  } catch (error: any) {
    console.error('[API /api/user/progress GET] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, displayName, currentLevel, avatarUrl, scores, completedScenarios, lastScenarioCompleted } = body;

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId parameter' }, { status: 400 });
    }

    const success = await saveUserProgressToDb({
      userId,
      displayName: displayName || 'Học sinh Cấp 2',
      currentLevel,
      avatarUrl,
      scores: scores || { c: 50, o: 50, r: 50, e: 50 },
      completedScenarios: completedScenarios || {},
      lastScenarioCompleted,
    });

    return NextResponse.json({ success });
  } catch (error: any) {
    console.error('[API /api/user/progress POST] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
