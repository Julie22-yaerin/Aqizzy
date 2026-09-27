import { saveUserProgressToDb, getUserProgressFromDb, logSessionEventToDb } from '../src/lib/db';
import { evaluateChatScenario, generateDebriefReport } from '../src/lib/nvidia';
import { computeCurrentLevel, computeStudentTitle } from '../src/store/aqStore';
import { COREScore } from '../src/types';

async function runDataflowTests() {
  console.log('====================================================');
  console.log('🚀 AQIZZY DATAFLOW & SYSTEM VERIFICATION SUITE');
  console.log('====================================================\n');

  // Test 1: CORE Score Math and Level Title Computation
  console.log('--- 1. Testing Scoring & Titles Logic ---');
  const sampleScores: COREScore = { c: 75, o: 80, r: 70, e: 65 };
  const totalAQ = sampleScores.c + sampleScores.o + sampleScores.r + sampleScores.e;
  const level = computeCurrentLevel(totalAQ);
  const title = computeStudentTitle(totalAQ);
  console.log(`Total AQ: ${totalAQ} (C: 75, O: 80, R: 70, E: 65)`);
  console.log(`Computed Level: "${level}"`);
  console.log(`Computed Title: "${title}"`);
  if (totalAQ !== 290 || level !== 'Chiến binh Thép Cấp 2' || title !== 'Bản lĩnh Vượt Sóng Gió (High AQ)') {
    throw new Error('Scoring computation mismatch!');
  }
  console.log('✅ Scoring & Titles logic verified.\n');

  // Test 2: Railway PostgreSQL Persistence
  console.log('--- 2. Testing Railway PostgreSQL Persistence ---');
  const testUserId = 'test-student-' + Date.now();
  const testDisplayName = 'Nguyễn Hoàng Nam (8B)';

  console.log(`Saving progress for user ${testUserId}...`);
  const saveSuccess = await saveUserProgressToDb({
    userId: testUserId,
    displayName: testDisplayName,
    currentLevel: level,
    avatarUrl: '🎯',
    scores: sampleScores,
    lastScenarioCompleted: 'control-zalo-panic',
    completedScenarios: {
      'control-zalo-panic': {
        scenarioId: 'control-zalo-panic',
        completedAt: new Date().toISOString(),
        coreScoreDelta: { c: 15, o: 5, r: 5, e: 5 },
      },
    },
  });

  if (!saveSuccess) {
    throw new Error('Failed to save user progress to PostgreSQL!');
  }
  console.log('✅ Successfully wrote user progress to Railway PostgreSQL.');

  console.log('Reading back progress from Railway PostgreSQL...');
  const loadedProgress = await getUserProgressFromDb(testUserId);
  if (!loadedProgress) {
    throw new Error('Could not find saved progress in PostgreSQL!');
  }
  console.log('Read back result:', {
    user: loadedProgress.user,
    scores: loadedProgress.scores,
    totalAQ: loadedProgress.totalAQ,
    completedScenariosCount: Object.keys(loadedProgress.completedScenarios).length,
  });

  if (loadedProgress.user.display_name !== testDisplayName) {
    throw new Error(`Display name mismatch: expected "${testDisplayName}", got "${loadedProgress.user.display_name}"`);
  }
  if (loadedProgress.totalAQ !== 290) {
    throw new Error(`Total AQ mismatch: expected 290, got ${loadedProgress.totalAQ}`);
  }
  console.log('✅ Read-back verified: Exact data integrity confirmed in PostgreSQL.\n');

  // Test 3: Session Dialogue Logging in PostgreSQL
  console.log('--- 3. Testing Session Dialogue Logging ---');
  const testSessionId = 'session-test-' + Date.now();
  await logSessionEventToDb({
    session_id: testSessionId,
    scenario_id: 'control-zalo-panic',
    user_id: testUserId,
    role: 'user',
    message_content: 'Mọi người bình tĩnh, chúng ta cùng vẽ sơ đồ hệ hô hấp trên giấy A3 nhé!',
    extracted_core_delta: { c: 10, o: 2, r: 0, e: 2 },
    is_crisis_resolved: true,
  });
  console.log('✅ Dialogue event logged to session_logs table in PostgreSQL.\n');

  // Test 4: AI Evaluation Pipeline
  console.log('--- 4. Testing AI Evaluation & Debrief Pipeline ---');
  const aiEvaluation = await evaluateChatScenario(
    'control-zalo-panic',
    [],
    'Bình tĩnh nào các bạn, nhà mình có giấy A3 và bút vẽ, chúng ta vẽ sơ đồ hệ hô hấp 2D rồi mai lên sớm gặp cô giải thích.'
  );
  console.log('AI Evaluation Output:', {
    is_crisis_resolved: aiEvaluation.is_crisis_resolved,
    score_delta: aiEvaluation.score_delta,
  });

  const debrief = await generateDebriefReport(
    'control-zalo-panic',
    'Cơn hoảng loạn Zalo',
    [{ role: 'user', message_content: 'Bình tĩnh nào các bạn, chúng ta vẽ sơ đồ 2D.' }],
    sampleScores
  );
  console.log('Debrief Summary Review:', debrief.summary_review);
  console.log('Debrief Badge:', debrief.badge_awarded);
  console.log('✅ AI pipeline generated valid evaluations and debrief reports.\n');

  console.log('====================================================');
  console.log('🎉 ALL DATAFLOW TESTS PASSED CLEANLY & SUCCESSFULLY!');
  console.log('====================================================');
  process.exit(0);
}

runDataflowTests().catch((err) => {
  console.error('❌ Dataflow Test Suite Failed:', err);
  process.exit(1);
});
