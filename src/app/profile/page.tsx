'use client';

import React, { useState } from 'react';
import { useAQStore } from '@/store/aqStore';
import COREScoreRadar from '@/components/COREScoreRadar';
import { 
  Award, 
  User, 
  GraduationCap, 
  Edit3, 
  Check, 
  Printer, 
  RotateCcw, 
  BookOpen, 
  HeartHandshake, 
  Sparkles 
} from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { scores, totalAQ, user, completedScenarios, getStudentTitle, setUserDisplayName, resetProgress } = useAQStore();
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(user.display_name);

  const handleSaveName = () => {
    if (tempName.trim()) {
      setUserDisplayName(tempName.trim());
    }
    setIsEditingName(false);
  };

  const completedCount = Object.keys(completedScenarios).length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
      
      {/* Student Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center text-4xl shadow-lg shadow-brand-500/20">
            {user.avatar_url || '🎓'}
          </div>

          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="border border-brand-500 px-3 py-1 rounded-xl text-base font-bold text-slate-900 outline-hidden"
                  />
                  <button
                    onClick={handleSaveName}
                    className="p-1.5 bg-brand-600 text-white rounded-lg hover:bg-brand-700"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                    {user.display_name}
                  </h1>
                  <button
                    onClick={() => setIsEditingName(true)}
                    className="text-slate-400 hover:text-slate-600 p-1"
                    title="Đổi tên học sinh"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs">
              <span className="font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200">
                {user.current_level}
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-600 font-medium">
                {getStudentTitle()}
              </span>
            </div>
          </div>
        </div>

        {/* Quick AQ Metric & Scenario Stats */}
        <div className="flex items-center gap-4">
          <div className="bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl text-center">
            <div className="text-xs text-slate-500 font-semibold">Tình huống hoàn thành</div>
            <div className="text-2xl font-black text-indigo-600 mt-0.5">
              {completedCount} / 4
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl text-center">
            <div className="text-xs text-slate-500 font-semibold">Chỉ số AQ tổng</div>
            <div className="text-2xl font-black text-brand-600 mt-0.5">
              {totalAQ} <span className="text-xs font-normal text-slate-400">/ 400</span>
            </div>
          </div>
        </div>
      </div>

      {/* CORE Radar Chart Component */}
      <div className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Hồ sơ Năng lực Vượt Nghịch cảnh (CORE Diagnostic)
        </h2>
        <COREScoreRadar scores={scores} totalAQ={totalAQ} />
      </div>

      {/* Personalized Recommendations & School Psychology Advice */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Advice for Student */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 space-y-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">
                Lời khuyên Dành cho Học sinh Cấp 2
              </h3>
              <p className="text-xs text-slate-500">
                Chiến lược tâm lý học đường thực tế
              </p>
            </div>
          </div>

          <ul className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold mt-0.5">•</span>
              <span>
                <strong>Khi gặp khủng hoảng Zalo nhóm (Control):</strong> Đừng bao giờ hùa theo cảm xúc hoảng loạn của tập thể. Hãy luôn là người đầu tiên đặt câu hỏi: <em>&ldquo;Bây giờ việc tốt nhất mình có thể làm ngay lúc này là gì?&rdquo;</em>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500 font-bold mt-0.5">•</span>
              <span>
                <strong>Khi bị trừ điểm thi đua (Ownership):</strong> Người lãnh đạo thực thụ là người biết nhận phần trách nhiệm về mình và chủ động đưa ra giải pháp khắc phục (như trực nhật, phụ đạo bạn).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 font-bold mt-0.5">•</span>
              <span>
                <strong>Khi nhận điểm kém (Reach):</strong> Luôn nhớ một bài kiểm tra 1 tiết chỉ phản ánh 1 mảng kiến thức nhỏ, tuyệt đối không đại diện cho toàn bộ tương lai hay trí tuệ của bạn.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold mt-0.5">•</span>
              <span>
                <strong>Vào mùa thi tháng Năm (Endurance):</strong> Hãy dũng cảm xin phụ huynh điều chỉnh lịch học thêm để đảm bảo ngủ đủ 7-8 tiếng. Não bộ kiệt quệ sẽ xóa sạch mọi kiến thức khi bước vào phòng thi.
              </span>
            </li>
          </ul>
        </div>

        {/* Advice for Parents & Teachers */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 space-y-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">
                Góc nhìn Dành cho Phụ huynh & Giáo viên
              </h3>
              <p className="text-xs text-slate-500">
                Đồng hành nuôi dưỡng bản lĩnh nghịch cảnh
              </p>
            </div>
          </div>

          <ul className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-purple-500 font-bold mt-0.5">•</span>
              <span>
                <strong>Thay đổi câu hỏi khi con bị điểm kém:</strong> Thay vì hỏi <em>&ldquo;Tại sao con lại bị điểm 4 thế này?&rdquo;</em>, hãy hỏi: <em>&ldquo;Dạng bài nào trong đề thi con cảm thấy chưa hiểu và mẹ có thể hỗ trợ con thế nào?&rdquo;</em>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold mt-0.5">•</span>
              <span>
                <strong>Khen ngợi nỗ lực và trách nhiệm:</strong> Khi con dũng cảm nhận lỗi trước tập thể hoặc tự giác lập thời gian biểu ôn thi, hãy khen ngợi phẩm chất đó trước khi nhìn vào bảng điểm.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold mt-0.5">•</span>
              <span>
                <strong>Giảm tải các ca học thêm dồn dập:</strong> Học sinh cấp 2 cần thời gian tự học và nghỉ ngơi để củng cố trí nhớ dài hạn. Lịch học thêm dày đặc là nguyên nhân số 1 gây ra kiệt sức sớm.
              </span>
            </li>
          </ul>
        </div>

      </div>

      {/* Footer Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition-all"
        >
          <Printer className="w-4 h-4" />
          <span>In Báo cáo Đánh giá AQ</span>
        </button>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-xs font-bold text-brand-600 hover:text-brand-700 transition-colors"
          >
            ← Quay lại Trang Chủ
          </Link>
          <span className="text-slate-300">|</span>
          <button
            onClick={() => {
              if (confirm('Bạn có chắc chắn muốn đặt lại điểm số và lịch sử để thử lại từ đầu?')) {
                resetProgress();
              }
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Làm mới toàn bộ dữ liệu</span>
          </button>
        </div>
      </div>

    </div>
  );
}
