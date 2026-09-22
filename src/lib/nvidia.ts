import OpenAI from 'openai';
import { AIScenarioResponse } from '@/types';

// NVIDIA NIM API client configured with OpenAI standard SDK
const nvidiaApiKey = process.env.NVIDIA_API_KEY || '';
const nvidiaBaseUrl = process.env.NVIDIA_BASE_URL || 'https://integrate.api.nvidia.com/v1';
const defaultModel = process.env.NVIDIA_MODEL || 'meta/llama-3.1-70b-instruct';

export const nvidiaClient = new OpenAI({
  apiKey: nvidiaApiKey || 'nvapi-placeholder',
  baseURL: nvidiaBaseUrl,
});

/**
 * System prompts tailored specifically to Vietnamese Middle School culture (Cấp 2 - Grades 6 to 9)
 */
export const SYSTEM_PROMPTS = {
  'control-zalo-panic': `Bạn là Động cơ Nhập vai & Đánh giá AQ (Chỉ số Vượt Nghịch cảnh) cho Học sinh Cấp 2 Việt Nam (Lớp 7-8).
TÌNH HUỐNG: "Cơn hoảng loạn Zalo lúc 9h tối Chủ Nhật" (Trụ cột C - CONTROL: Kiểm soát phản ứng & tình thế).
BỐI CẢNH: 21:00 tối Chủ Nhật. Nhóm chat Zalo môn KHTN (Khoa học Tự nhiên) lớp 8A3 nổ tung tin nhắn. Cô giáo vừa nhắn đổi chủ đề làm mô hình sáng mai từ "Tế bào thực vật" sang "Hệ hô hấp ở người". Giờ này tiệm tạp hóa/văn phòng phẩm đã đóng cửa sạch sẽ.
NHÂN VẬT BẠN PHẢI NHẬP VAI:
1. Minh Khang (👦🏻): Học sinh hay lo âu, sợ điểm kém, sợ mẹ tịch thu điện thoại, đòi thức trắng đêm nặn đất sét dù không có đồ nghề. Giọng điệu: hoảng loạn, hớt hải, dùng từ "cứu tao với", "toang rồi", "mẹ tao cắt tiền tiêu vặt".
2. Linh Chi (👧🏻): Bất cần, bực tức, đổ lỗi cho cô giáo vô lý, đòi bỏ cuộc xin điểm 0. Giọng điệu: cay cú, buông xuôi, "dẹp đi", "bất công quá", "chấp nhận 0 điểm".

NGƯỜI DÙNG (USER): Đóng vai Bạn cùng nhóm (hoặc Nhóm trưởng) đang nhắn tin trong nhóm Zalo để xử lý tình huống.

TIÊU CHÍ ĐÁNH GIÁ CORE (Trọng tâm: C - CONTROL):
- High AQ (Kiểm soát tốt): Trấn an tinh thần 2 bạn; tập trung vào điều CÓ THỂ LÀM ĐƯỢC NGAY BÂY GIỜ (vẽ sơ đồ giải phẫu hệ hô hấp 2D trên giấy A3/A4 có sẵn tại nhà thay vì nặn 3D); phân công nhiệm vụ cụ thể (Khang vẽ, Chi ghi chú thích và chuẩn bị thuyết trình); đại diện nhóm sáng mai gặp cô giáo lễ phép giải thích do thông báo gấp. (C: +8 đến +15, O: +3 đến +5, E: +3 đến +5).
- Low AQ (Mất kiểm soát): Hùa theo cơn hoảng loạn, chửi bới cô giáo, buông xuôi bỏ cuộc, hoặc ngoan cố đòi thức tới 3-4h sáng nặn mô hình khi không có vật liệu. (C: -8 đến -15, E: -5).

QUY ĐỊNH PHẢN HỒI:
- Bắt buộc nói tiếng Việt tự nhiên, chân thực như học sinh cấp 2 nhắn tin Zalo (có icon Zalo, từ ngữ đời thường, xưng hô tao/mày hoặc bạn/mình phù hợp ngữ cảnh bạn bè).
- Nếu User đưa ra phương án khả thi (vẽ 2D trên giấy A3/A4, phân chia việc, sáng mai giải thích với cô) và thuyết phục được nhóm: Đặt is_crisis_resolved = true.
- BẮT BUỘC trả về định dạng JSON thuần túy (không bọc code block thừa nếu có thể):
{
  "npc_reply": "Minh Khang: '...'\n\nLinh Chi: '...'",
  "score_delta": { "c": 0, "o": 0, "r": 0, "e": 0 },
  "is_crisis_resolved": boolean,
  "coaching_tip": "Nhận xét ngắn 1 câu về kỹ năng Control (Kiểm soát) của học sinh"
}`,

  'ownership-homeroom-period': `Bạn là Động cơ Nhập vai & Đánh giá AQ cho Học sinh Cấp 2 Việt Nam (Lớp 8-9).
TÌNH HUỐNG: "Giờ Sinh Hoạt Lớp Sóng Gió" (Trụ cột O - OWNERSHIP: Tinh thần nhận lãnh trách nhiệm).
BỐI CẢNH: Tiết sinh hoạt lớp chiều thứ Sáu. Cô Mai (Giáo viên Chủ nhiệm nghiêm khắc, rất ghét sự đùn đẩy trách nhiệm) bước vào lớp với vẻ mặt giận dữ, đập sổ thi đua xuống bàn. Lớp 8A bị tụt xuống hạng bét toàn khối (hạng 12/12) vì bị Thầy Giám thị trừ 10 điểm do Tổ 3 có bạn Nam ăn vụng bánh tráng và xả rác trong hộc bàn ở giờ truy bài. Bạn Nam đang sợ hãi run rẩy cúi gằm mặt.
NGƯỜI DÙNG (USER): Đóng vai Tổ trưởng Tổ 3, được Cô Mai gọi tên yêu cầu đứng dậy trả lời.

NHÂN VẬT BẠN PHẢI NHẬP VAI:
- Cô Mai (👩🏻‍🏫 - GVCN): Giọng điệu sắc sảo, nghiêm nghị, yêu cầu tinh thần chịu trách nhiệm của người đứng đầu, nhưng rất công bằng và bao dung nếu học sinh dũng cảm nhận lỗi và có phương án sửa sai.
- Nam (👦🏽 - Thỉnh thoảng có phản ứng ngắn nếu bạn tổ trưởng bảo vệ hoặc cùng chịu lỗi).

TIÊU CHÍ ĐÁNH GIÁ CORE (Trọng tâm: O - OWNERSHIP):
- High AQ (Làm chủ trách nhiệm): Đứng dậy lễ phép thưa cô, thẳng thắn nhận lỗi với vai trò Tổ trưởng vì đã chưa sâu sát, chưa nhắc nhở thành viên trong tổ kịp thời; KHÔNG trút sạch tội lỗi lên đầu bạn Nam trước cả lớp; dũng cảm nhận hình phạt tập thể (xin cô cho bản thân cùng bạn Nam trực nhật, quét lớp, quét sân trường tuần sau để gỡ điểm thi đua); đề xuất nội quy kiểm tra vệ sinh tổ mỗi sáng. (O: +12 đến +20, C: +5, R: +3, E: +3).
- Low AQ (Đùn đẩy, chối bỏ): Đùn đẩy ngay lập tức: "Thưa cô bạn Nam xả chứ em có xả đâu, em không liên quan!"; hoặc mắng mỏ Nam thậm tệ trước mặt cô để chứng minh mình vô tội; hoặc im lặng chống đối. (O: -12 đến -20, C: -5).

QUY ĐỊNH PHẢN HỒI:
- Bắt buộc nói tiếng Việt chân thực của môi trường học đường Việt Nam (thầy cô xưng cô - em, học sinh dạ thưa lễ phép).
- Nếu User nhận trách nhiệm Tổ trưởng và xin cùng trực nhật chuộc lỗi: Cô Mai nguôi giận, khen ngợi bản lĩnh của người làm cán bộ lớp và đặt is_crisis_resolved = true.
- BẮT BUỘC trả về định dạng JSON duy nhất:
{
  "npc_reply": "Lời thoại của Cô Mai (và phản ứng lí nhí biết ơn của Nam nếu có)",
  "score_delta": { "c": 0, "o": 0, "r": 0, "e": 0 },
  "is_crisis_resolved": boolean,
  "coaching_tip": "Nhận xét sư phạm ngắn 1 câu về kỹ năng Ownership (Làm chủ trách nhiệm)"
}`
};

/**
 * Intelligent Vietnamese Heuristic Simulator fallback when NVIDIA API key is not present or network is unavailable
 */
function simulateVietnameseResponse(
  scenarioId: string,
  userText: string,
  chatHistoryLength: number
): AIScenarioResponse {
  const text = userText.toLowerCase().trim();

  if (scenarioId === 'control-zalo-panic') {
    const isCalming = /bình tĩnh|đừng lo|yên tâm|không sao|nghe tao|từ từ|hít sâu|đừng hoảng/.test(text);
    const has2DSolution = /vẽ|giấy|sơ đồ|a4|a3|2d|thuyết trình|tài liệu|in|chú thích|mô hình phẳng|phác thảo|màu dạ/.test(text);
    const hasRoleAssignment = /phân công|mày làm|tao làm|khang vẽ|chi làm|chia việc/.test(text);
    const hasCommunicationWithTeacher = /mai lên nói|giải thích|nói với cô|trình bày với cô|xin cô|thông cảm|nói thật/.test(text);
    const isPanickingOrComplaining = /thức trắng|bỏ đi|kệ đi|ghét cô|bất công|0 điểm|chửi|bực|cô điên|sợ quá|chết chắc|toang hẳn/.test(text);

    if ((isCalming || has2DSolution || hasRoleAssignment) && !isPanickingOrComplaining) {
      const isResolved = has2DSolution || chatHistoryLength >= 3;
      return {
        npc_reply: isResolved 
          ? "Minh Khang: 'Ủa ý này hay quá tụi mày ơi!! 🎉 Nhà tao có sẵn tập giấy A3 với bộ bút lông màu của anh hai tao nè! Để tao vẽ phác thảo sơ đồ đường dẫn khí với 2 lá phổi liền!'\n\nLinh Chi: 'Ừ ha, vẽ sơ đồ 2D trên A3 vừa đẹp vừa nhanh. Tao sẽ soạn phần thuyết minh 3 phút và sáng mai 3 đứa mình lên sớm giải thích chân thành với cô Nga. May quá, tí nữa là tao dại dột buông xuôi rồi! Cảm ơn mày nha! 😭🙏'"
          : "Minh Khang: 'Nghe cũng có lý... Nhưng mà mai cô có chịu chấm bài vẽ sơ đồ thay vì nặn đất sét 3D không mày? Tao run quá à!'\n\nLinh Chi: 'Tao thấy ít ra có bài nộp chỉn chu vẫn hơn là mai lên đứng chịu 0 điểm. Giờ phân công cụ thể đứa nào làm gì đi để còn bắt tay vào làm!'",
        score_delta: { c: 14, o: 5, r: 2, e: 4 },
        is_crisis_resolved: isResolved,
        coaching_tip: "Rất xuất sắc! Bạn đã chuyển hóa cơn hoảng loạn tập thể thành kế hoạch hành động khả thi trong tầm kiểm soát (Control)."
      };
    } else if (isPanickingOrComplaining) {
      return {
        npc_reply: "Linh Chi: 'Đấy thấy chưa, tao đã bảo rồi mà! Càng nghĩ càng thấy ức chế, cô muốn cho 0 điểm thì cho luôn đi, tao off mạng đi ngủ đây!'\n\nMinh Khang: 'Trời ơi Chi ơi đừng bỏ nhóm mà! Tao sợ mẹ tao la lắm, hu hu giờ biết làm sao bây giờ... 😭😭'",
        score_delta: { c: -10, o: -4, r: -5, e: -6 },
        is_crisis_resolved: false,
        coaching_tip: "Cảnh báo Low AQ (Control): Khi bạn hùa theo cảm xúc tiêu cực hoặc trách móc ngoại cảnh, nhóm sẽ mất hoàn toàn quyền kiểm soát tình huống."
      };
    } else {
      return {
        npc_reply: "Minh Khang: 'Giờ tính sao đây cả nhà ơi? 9h15 rồi, sáng mai 6h45 là phải nộp bài rồi đó!'\n\nLinh Chi: 'Mày có cao kiến gì cụ thể không, chứ nói chung chung nãy giờ tao sốt ruột muốn nổ tung rồi nè!'",
        score_delta: { c: 3, o: 1, r: 0, e: 0 },
        is_crisis_resolved: false,
        coaching_tip: "Hãy đề xuất một giải pháp thực tế cụ thể (ví dụ: vẽ sơ đồ giải phẫu 2D trên giấy A3 có sẵn) để định hướng cho nhóm."
      };
    }
  } else {
    // Ownership: Homeroom period
    const admitsLeadershipFault = /nhận lỗi|trách nhiệm|lỗi của em|chưa nhắc nhở|tổ trưởng|quản lý|chưa sâu sát|em sai|thiếu sót/.test(text);
    const offersFix = /trực nhật|dọn vệ sinh|chuộc lỗi|quét|phạt|cam kết|rút kinh nghiệm|giám sát|kiểm tra hộc bàn|gỡ điểm/.test(text);
    const deflectsBlame = /(không phải em|chứ em có|em không xả|em có biết gì đâu|đâu phải lỗi của em|nam tự ăn|nam làm nam chịu|(do|tại|lỗi do|bắt) bạn nam)/.test(text) && !/cùng bạn nam|với bạn nam/.test(text);

    if (admitsLeadershipFault && !deflectsBlame) {
      const isResolved = offersFix || chatHistoryLength >= 2;
      return {
        npc_reply: isResolved
          ? "Cô Mai: 'Em nói được như vậy là cô thấy em có bản lĩnh của một người làm cán bộ lớp! Làm lãnh đạo không phải chỉ đứng ra nhận bằng khen khi tổ đạt giải, mà là dũng cảm đứng mũi chịu sào khi đồng đội vấp ngã. Cô đồng ý cho em và Nam cùng trực nhật lớp tuần tới để lấy lại điểm thi đua. Cả lớp cho bạn Tổ trưởng một tràng pháo tay!'\n\nNam (lí nhí, mắt rưng rưng): 'Dạ... em xin lỗi cô và em cảm ơn bạn tổ trưởng rất nhiều, tuần sau em sẽ quét lớp thật sạch ạ...'"
          : "Cô Mai: 'Em biết nhận trách nhiệm chưa sâu sát với tổ viên là điều đáng khen. Nhưng trách nhiệm của người tổ trưởng không chỉ dừng lại ở lời xin lỗi. Em và tổ 3 dự định có hành động thiết thực gì để chuộc lỗi và gỡ lại 10 điểm thi đua cho lớp?'",
        score_delta: { c: 6, o: 18, r: 4, e: 5 },
        is_crisis_resolved: isResolved,
        coaching_tip: "Đỉnh cao Ownership (Làm chủ trách nhiệm)! Dám nhận lỗi lãnh đạo và chủ động xin nhận việc khắc phục hậu quả cùng đồng đội."
      };
    } else if (deflectsBlame) {
      return {
        npc_reply: "Cô Mai đập mạnh cây thước xuống bàn giáo viên: 'Em thôi ngay cái thái độ đùn đẩy phủi tay đó đi! Ai không biết là bạn Nam xả rác? Nhưng cô đang hỏi em với tư cách là Tổ Trưởng! Nếu tổ viên vi phạm mà em chỉ biết nói \"em không biết, không phải lỗi của em\" thì cô bầu em làm cán bộ làm gì?! Thái độ vô trách nhiệm của em còn đáng trách hơn cả việc xả rác của Nam!'\n\nNam: (Càng cúi đầu sát mặt bàn, run rẩy không dám ngẩng lên)",
        score_delta: { c: -5, o: -18, r: -5, e: -4 },
        is_crisis_resolved: false,
        coaching_tip: "Báo động đỏ Low Ownership: Đùn đẩy hoàn toàn lỗi lầm cho đồng đội làm phá vỡ lòng tin và thể hiện tư duy trốn tránh trách nhiệm."
      };
    } else {
      return {
        npc_reply: "Cô Mai: 'Cô đang chờ câu trả lời rõ ràng từ em. Em là người đứng đầu Tổ 3, em nhìn nhận thế nào về việc tổ mình làm cả lớp mất điểm thi đua tuần này?'",
        score_delta: { c: 1, o: 3, r: 0, e: 0 },
        is_crisis_resolved: false,
        coaching_tip: "Hãy dũng cảm đứng dậy nhận một phần trách nhiệm bao quát và đề xuất phương án trực nhật sửa sai cùng bạn Nam."
      };
    }
  }
}

/**
 * Execute dynamic AI evaluation for chat scenarios using NVIDIA NIM
 * Strictly enforces single API call JSON output format
 */
export async function evaluateChatScenario(
  scenarioId: string,
  history: { role: 'user' | 'assistant' | 'system'; content: string }[],
  userMessage: string
): Promise<AIScenarioResponse> {
  const systemPrompt = SYSTEM_PROMPTS[scenarioId as keyof typeof SYSTEM_PROMPTS];

  // If no system prompt exists or no API key, fallback cleanly to Vietnamese simulator
  if (!systemPrompt || !nvidiaApiKey || nvidiaApiKey === 'nvapi-placeholder') {
    return simulateVietnameseResponse(scenarioId, userMessage, history.length);
  }

  try {
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      ...history.map((h) => ({
        role: (h.role === 'assistant' ? 'assistant' : 'user') as 'assistant' | 'user',
        content: h.content,
      })),
      { role: 'user', content: userMessage },
    ];

    const response = await nvidiaClient.chat.completions.create({
      model: defaultModel,
      messages: messages,
      temperature: 0.6,
      max_tokens: 600,
      response_format: { type: 'json_object' },
    });

    const rawJson = response.choices[0]?.message?.content;
    if (!rawJson) {
      return simulateVietnameseResponse(scenarioId, userMessage, history.length);
    }

    // Clean any accidental markdown fence if LLM enclosed it
    const cleanJson = rawJson.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();
    const parsed = JSON.parse(cleanJson) as AIScenarioResponse;

    return {
      npc_reply: parsed.npc_reply || 'Cả nhóm đang lắng nghe bạn...',
      score_delta: parsed.score_delta || { c: 0, o: 0, r: 0, e: 0 },
      is_crisis_resolved: Boolean(parsed.is_crisis_resolved),
      coaching_tip: parsed.coaching_tip,
    };
  } catch (error) {
    console.warn('[NVIDIA NIM API] Error/Notice, using fallback:', error);
    return simulateVietnameseResponse(scenarioId, userMessage, history.length);
  }
}

/**
 * AI Reflection Report for "The Debrief Room"
 */
export interface DebriefReport {
  scenario_title: string;
  summary_review: string;
  mentor_advice: string;
  highlighted_quotes: {
    quote: string;
    assessment: 'high_aq' | 'low_aq';
    dimension: 'C' | 'O' | 'R' | 'E';
    dimension_name: string;
    commentary: string;
  }[];
  updated_scores: {
    c: number;
    o: number;
    r: number;
    e: number;
  };
  overall_aq_delta: number;
  badge_awarded: string;
}

/**
 * Generate Debrief Reflection Report using NVIDIA NIM or intelligent Vietnamese fallback
 */
export async function generateDebriefReport(
  scenarioId: string,
  scenarioTitle: string,
  sessionLogs: { role: string; message_content: string }[],
  currentScores: { c: number; o: number; r: number; e: number }
): Promise<DebriefReport> {
  const userQuotes = sessionLogs
    .filter((log) => log.role === 'user')
    .map((log) => log.message_content);

  const fallbackReport: DebriefReport = {
    scenario_title: scenarioTitle || 'Rèn Luyện Bản Lĩnh Vượt Khó',
    summary_review: 'Chúc mừng em đã hoàn thành thử thách! Trong tình huống căng thẳng và nhiều áp lực bất ngờ, em đã chứng tỏ được sự chững chạc, bình tĩnh lắng nghe và tìm cách tháo gỡ vấn đề thay vì buông xuôi.',
    mentor_advice: 'Nghịch cảnh học đường hay trong cuộc sống đều là phòng tập thể lực cho tâm trí. Hãy nhớ: Khi bão giông ập đến, người có AQ cao luôn hỏi: "Mình có thể làm chủ điều gì ngay lúc này?".',
    highlighted_quotes: userQuotes.length > 0 ? [
      {
        quote: userQuotes[userQuotes.length - 1],
        assessment: 'high_aq',
        dimension: scenarioId.startsWith('control') ? 'C' : 'O',
        dimension_name: scenarioId.startsWith('control') ? 'Control (Kiểm soát)' : 'Ownership (Làm chủ trách nhiệm)',
        commentary: 'Câu nói này thể hiện tinh thần chủ động kiến tạo giải pháp và dám đứng ra cùng đồng đội đối mặt với khó khăn.'
      }
    ] : [],
    updated_scores: currentScores,
    overall_aq_delta: +25,
    badge_awarded: scenarioId.startsWith('control') ? 'Chỉ Huy Tĩnh Lặng 🛡️' : 'Thủ Lĩnh Bản Lĩnh ⭐',
  };

  if (!nvidiaApiKey || nvidiaApiKey === 'nvapi-placeholder') {
    return fallbackReport;
  }

  try {
    const debriefPrompt = `Bạn là Chuyên gia Cố vấn Tâm lý và Huấn luyện viên AQ (Chỉ số Vượt Nghịch cảnh) dành riêng cho học sinh Cấp 2 Việt Nam.
Nhiệm vụ: Phân tích các câu nói của học sinh trong nhật ký tình huống vừa qua và tạo một "Reflection Report" (Báo Cáo Đúc Kết Phản Tư) tràn đầy sự ấm áp, truyền cảm hứng và hướng dẫn cụ thể.

DỮ LIỆU ĐẦU VÀO:
- Tình huống: ${scenarioTitle} (${scenarioId})
- Điểm CORE hiện tại: C: ${currentScores.c}, O: ${currentScores.o}, R: ${currentScores.r}, E: ${currentScores.e}
- Các phát ngôn của học sinh:
${JSON.stringify(userQuotes, null, 2)}

YÊU CẦU:
Trích dẫn CHÍNH XÁC ít nhất 1-2 câu học sinh đã nói để chỉ rõ câu nào thể hiện High AQ (điểm mạnh) hoặc Low AQ (điểm cần rèn luyện).
BẮT BUỘC TRẢ VỀ ĐỊNH DẠNG JSON:
{
  "scenario_title": "${scenarioTitle}",
  "summary_review": "Nhận xét ấm áp, chân thành bằng tiếng Việt (khoảng 3-4 câu)",
  "mentor_advice": "Lời khuyên tâm huyết cho học sinh cấp 2",
  "highlighted_quotes": [
    {
      "quote": "Trích đúng nguyên văn câu nói của học sinh",
      "assessment": "high_aq" hoặc "low_aq",
      "dimension": "C" | "O" | "R" | "E",
      "dimension_name": "Tên trụ cột CORE tiếng Việt",
      "commentary": "Phân tích tâm lý học AQ sâu sắc"
    }
  ],
  "updated_scores": { "c": number, "o": number, "r": number, "e": number },
  "overall_aq_delta": number,
  "badge_awarded": "Tên huy hiệu danh dự kèm emoji"
}`;

    const response = await nvidiaClient.chat.completions.create({
      model: defaultModel,
      messages: [{ role: 'user', content: debriefPrompt }],
      temperature: 0.5,
      max_tokens: 800,
      response_format: { type: 'json_object' },
    });

    const rawJson = response.choices[0]?.message?.content;
    if (!rawJson) return fallbackReport;

    const cleanJson = rawJson.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();
    return JSON.parse(cleanJson) as DebriefReport;
  } catch (err) {
    console.warn('[Debrief AI] Notice, using fallback report:', err);
    return fallbackReport;
  }
}
