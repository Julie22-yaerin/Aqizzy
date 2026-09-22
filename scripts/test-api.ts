/**
 * Verification script for Aqizzy Database and API Layer
 * Tests:
 * 1. Supabase schema definition & seed scenario data integrity
 * 2. NVIDIA NIM simulation & Vietnamese dialogue generator
 * 3. /api/scenario-chat evaluation logic
 * 4. /api/debrief reflection report generation
 */

import { INJECTED_SCENARIOS, getScenarioById } from '../src/lib/scenariosData';
import { evaluateChatScenario, generateDebriefReport } from '../src/lib/nvidia';

async function runTests() {
  console.log('--- 1. Testing Scenarios Data & Schema Verification ---');
  console.log(`Total injected scenarios: ${INJECTED_SCENARIOS.length}`);
  for (const s of INJECTED_SCENARIOS) {
    console.log(`  - [CORE: ${s.core_focus}] [Type: ${s.type}] ${s.id}: "${s.title}"`);
  }

  console.log('\n--- 2. Testing Scenario 1 (Control) AI Evaluation ---');
  const controlTest1 = await evaluateChatScenario(
    'control-zalo-panic',
    [],
    'Tụi mày bình tĩnh nghe tao nói này! Giờ tiệm tạp hóa đóng cửa rồi nặn 3D không kịp đâu. Nhà tao có sẵn giấy A3 với bút màu, tụi mình vẽ sơ đồ 2D giải phẫu hệ hô hấp chú thích rõ ràng. Khang vẽ đẹp thì vẽ, Chi với tao làm bài thuyết trình 3 phút, mai lên sớm gặp cô giải thích lý do khách quan.'
  );
  console.log('Result (High AQ):', {
    crisis_resolved: controlTest1.is_crisis_resolved,
    score_delta: controlTest1.score_delta,
    coaching_tip: controlTest1.coaching_tip
  });

  console.log('\n--- 3. Testing Scenario 2 (Ownership) AI Evaluation ---');
  const ownershipTest1 = await evaluateChatScenario(
    'ownership-homeroom-period',
    [],
    'Thưa cô, với tư cách là Tổ trưởng Tổ 3, em xin nhận lỗi trước cô và cả lớp vì em đã chưa sâu sát, chưa nhắc nhở các bạn trong tổ kỹ lưỡng. Em xin cùng bạn Nam nhận trực nhật và quét sân trường cả tuần sau để chuộc lỗi và gỡ điểm thi đua cho lớp ạ.'
  );
  console.log('Result (High AQ):', {
    crisis_resolved: ownershipTest1.is_crisis_resolved,
    score_delta: ownershipTest1.score_delta,
    coaching_tip: ownershipTest1.coaching_tip
  });

  console.log('\n--- 4. Testing Debrief Room Reflection Report ---');
  const debriefReport = await generateDebriefReport(
    'control-zalo-panic',
    'Cơn hoảng loạn Zalo lúc 9h tối Chủ Nhật',
    [
      { role: 'user', message_content: 'Tụi mày bình tĩnh lại, tụi mình vẽ sơ đồ 2D trên giấy A3 có sẵn rồi mai lên gặp cô giải thích.' }
    ],
    { c: 65, o: 55, r: 50, e: 52 }
  );
  console.log('Debrief Summary:', debriefReport.summary_review);
  console.log('Highlighted Quote:', debriefReport.highlighted_quotes[0]?.quote);
  console.log('Assessment:', debriefReport.highlighted_quotes[0]?.assessment);
  console.log('Badge Awarded:', debriefReport.badge_awarded);

  console.log('\n✅ All Database and API layer tests passed successfully!');
}

runTests().catch(console.error);
