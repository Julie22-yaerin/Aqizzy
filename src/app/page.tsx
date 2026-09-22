'use client';

import React from 'react';
import Link from 'next/link';
import { useAQStore } from '@/store/aqStore';
import { INJECTED_SCENARIOS } from '@/lib/scenariosData';
import COREScoreRadar from '@/components/COREScoreRadar';
import { 
  Shield, 
  Target, 
  Compass, 
  BatteryCharging, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  MessageSquare, 
  Layers, 
  SlidersHorizontal,
  GraduationCap
} from 'lucide-react';

export default function HomePage() {
  const { scores, totalAQ, user, completedScenarios, getStudentTitle } = useAQStore();

  const corePillars = [
    {
      letter: 'C',
      title: 'Control',
      viName: 'Kiểm Soát',
      desc: 'Tập trung vào những gì bạn có thể chủ động thay đổi thay vì bất lực hoặc hoảng loạn.',
      icon: Shield,
      color: 'from-blue-500 to-indigo-600',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      letter: 'O',
      title: 'Ownership',
      viName: 'Làm Chủ Trách Nhiệm',
      desc: 'Dũng cảm nhận trách nhiệm lãnh đạo và hành động khắc phục thay vì đổ lỗi cho người khác.',
      icon: Target,
      color: 'from-purple-500 to-violet-600',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
    {
      letter: 'R',
      title: 'Reach',
      viName: 'Khoanh Vùng Ảnh Hưởng',
      desc: 'Giới hạn thất bại trong đúng phạm vi của nó, không để một điểm kém phá hủy toàn bộ giá trị bản thân.',
      icon: Compass,
      color: 'from-amber-500 to-orange-600',
      textColor: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
    },
    {
      letter: 'E',
      title: 'Endurance',
      viName: 'Sức Bền Bỉ',
      desc: 'Phân bổ năng lượng hợp lý đường dài, giữ gìn thể chất và tâm trí để sống sót qua các mùa thi.',
      icon: BatteryCharging,
      color: 'from-emerald-500 to-teal-600',
      textColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-12 shadow-2xl border border-indigo-500/20">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-semibold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" />
            <span>Nền tảng Giáo dục Đột phá Dành riêng cho Học sinh Cấp 2 (Lớp 6 - 9)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            The Lyceum
          </h1>
          <p className="text-lg sm:text-xl text-indigo-200 font-medium">
            Huấn luyện Trí tuệ Nghịch cảnh (Adversity Quotient - AQ) qua Khung CORE
          </p>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Trong thế giới học đường với áp lực điểm số, sổ đầu bài, các nhóm chat Zalo và mùa thi tháng Năm, chỉ số thông minh (IQ) chưa đủ. Bạn cần <strong>AQ (Chỉ số vượt khó)</strong> để đứng vững trước mọi sóng gió học đường Việt Nam!
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href="/scenarios/control-zalo-panic"
              className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold px-6 py-3 rounded-2xl shadow-lg shadow-brand-500/30 transition-all hover:scale-105"
            >
              <span>Bắt đầu rèn luyện kịch bản đầu tiên</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/profile"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-bold px-6 py-3 rounded-2xl border border-white/20 backdrop-blur-md transition-all"
            >
              <span>Xem Hồ sơ Năng lực AQ</span>
            </Link>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* CORE 4 Pillars Section */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Mô hình CORE: 4 Trụ cột Vượt Nghịch cảnh
          </h2>
          <p className="text-sm text-slate-600">
            Phương pháp tâm lý học ứng dụng được bản địa hóa hoàn toàn cho bối cảnh trường học Việt Nam.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {corePillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.letter}
                className={`p-6 rounded-3xl border ${pillar.borderColor} ${pillar.bgColor} transition-all hover:shadow-md hover:-translate-y-1 flex flex-col justify-between`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-10 h-10 rounded-2xl bg-white shadow-xs flex items-center justify-center font-black text-lg text-slate-900 border border-slate-200">
                      {pillar.letter}
                    </span>
                    <div className={`p-2 rounded-xl bg-white shadow-xs ${pillar.textColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-slate-900">
                      {pillar.title}
                    </h3>
                    <p className={`text-xs font-semibold ${pillar.textColor}`}>
                      {pillar.viName}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live AQ Radar Chart & Student Card */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Bản đồ Radar Năng lực AQ của bạn
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Được cập nhật tự động sau mỗi quyết định trong các tình huống thực chiến.
            </p>
          </div>

          <div className="hidden sm:block text-right">
            <span className="text-xs text-slate-400 font-semibold block">Danh hiệu hiện tại</span>
            <span className="text-sm font-bold text-brand-700 bg-brand-50 px-3 py-1 rounded-xl border border-brand-200">
              {getStudentTitle()}
            </span>
          </div>
        </div>

        <COREScoreRadar scores={scores} totalAQ={totalAQ} />
      </div>

      {/* The 4 Scenarios Cards Grid */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            4 Tình huống Nhập vai Thực chiến (Interactive Scenarios)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Mỗi tình huống thử thách một chiều kích CORE cụ thể với giao diện tương tác chuyên biệt.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INJECTED_SCENARIOS.map((scenario) => {
            const isDone = Boolean(completedScenarios[scenario.id]);
            const linkPath = 
              scenario.id === 'control-zalo-panic' ? '/scenarios/control-zalo-panic' :
              scenario.id === 'ownership-homeroom-period' ? '/scenarios/ownership-homeroom' :
              scenario.id === 'reach-math-test-disaster' ? '/scenarios/reach-math-test' :
              '/scenarios/endurance-exam-crush';

            return (
              <div
                key={scenario.id}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-black px-2.5 py-1 rounded-xl ${
                        scenario.core_focus === 'C' ? 'bg-blue-100 text-blue-700' :
                        scenario.core_focus === 'O' ? 'bg-purple-100 text-purple-700' :
                        scenario.core_focus === 'R' ? 'bg-amber-100 text-amber-700' :
                        'bg-emerald-100 text-emerald-700'
                      }`}>
                        CORE: {scenario.core_focus}
                      </span>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-slate-100 text-slate-600">
                        {scenario.grade_level}
                      </span>
                    </div>

                    {/* Mechanic indicator */}
                    <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                      {scenario.type === 'chat' && <MessageSquare className="w-3.5 h-3.5 text-blue-600" />}
                      {scenario.type === 'swipe' && <Layers className="w-3.5 h-3.5 text-amber-600" />}
                      {scenario.type === 'resource' && <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-600" />}
                      <span className="uppercase text-[11px]">
                        {scenario.type === 'chat' ? 'Chat AI (Zalo/Lớp)' :
                         scenario.type === 'swipe' ? 'Tinder Swipe UI' : 'Resource UI'}
                      </span>
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-lg font-black text-slate-900 group-hover:text-brand-600 transition-colors">
                      {scenario.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      {scenario.description}
                    </p>
                  </div>

                  {/* Status */}
                  {isDone && (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 inline-flex">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Đã hoàn thành</span>
                    </div>
                  )}
                </div>

                {/* Bottom Action Button */}
                <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">
                    {isDone ? 'Luyện tập lại' : 'Chưa thử sức'}
                  </span>
                  
                  <Link
                    href={linkPath}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-slate-900 hover:bg-brand-600 text-white transition-all shadow-md group-hover:shadow-brand-500/20"
                  >
                    <span>{isDone ? 'Chơi lại kịch bản' : 'Bắt đầu ngay'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
