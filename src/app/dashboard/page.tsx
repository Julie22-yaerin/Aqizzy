'use client';

import React, { useState } from 'react';
import { useAQStore } from '@/store/aqStore';
import COREScoreRadar from '@/components/COREScoreRadar';
import AnalyticsPanel from '@/components/AnalyticsPanel';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Gamepad2,
  Layers,
  Shield,
  Award,
  Zap,
  Flame,
  Compass,
  MessageSquare,
  Grid,
  GitBranch,
  CreditCard,
  Trash2,
  BatteryCharging,
  CalendarDays,
} from 'lucide-react';
import { CORE_SECTIONS, INJECTED_SCENARIOS, getScenariosByCore } from '@/lib/scenariosData';
import { CoreDimension, ScenarioType } from '@/types';

export default function DashboardPage() {
  const { scores, totalAQ, completedScenarios, getStudentTitle } = useAQStore();

  // Accordion state: by default, section C is open or all can be toggled
  const [expandedSections, setExpandedSections] = useState<Record<CoreDimension, boolean>>({
    C: true,
    O: true,
    R: true,
    E: true,
  });

  const [filterCore, setFilterCore] = useState<CoreDimension | 'ALL'>('ALL');

  const toggleSection = (dimension: CoreDimension) => {
    setExpandedSections((prev) => ({
      ...prev,
      [dimension]: !prev[dimension],
    }));
  };

  const totalCompletedCount = Object.keys(completedScenarios).length;
  const dimensions: CoreDimension[] = ['C', 'O', 'R', 'E'];

  const getFormatIcon = (type: ScenarioType) => {
    switch (type) {
      case 'chat':
        return <MessageSquare className="w-3.5 h-3.5 text-blue-500" />;
      case 'matrix':
        return <Grid className="w-3.5 h-3.5 text-indigo-500" />;
      case 'branching':
        return <GitBranch className="w-3.5 h-3.5 text-purple-500" />;
      case 'swipe':
        return <CreditCard className="w-3.5 h-3.5 text-amber-500" />;
      case 'trash_sort':
        return <Trash2 className="w-3.5 h-3.5 text-rose-500" />;
      case 'resource':
        return <BatteryCharging className="w-3.5 h-3.5 text-emerald-500" />;
      case 'calendar':
        return <CalendarDays className="w-3.5 h-3.5 text-teal-500" />;
      default:
        return <Gamepad2 className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  const getFormatLabel = (type: ScenarioType) => {
    switch (type) {
      case 'chat':
        return 'Chat AI Zalo / Đối thoại';
      case 'matrix':
        return 'Ma trận Ưu tiên Eisenhower';
      case 'branching':
        return 'Cây Quyết Định Rẽ Nhánh';
      case 'swipe':
        return 'Tinder Swipe Vuốt Thẻ';
      case 'trash_sort':
        return 'Thùng Rác Phân Loại Suy Nghĩ';
      case 'resource':
        return 'Quản Lý Năng Lượng & Căng Thẳng';
      case 'calendar':
        return 'Nhật Ký Tiến Trình 4 Tuần';
      default:
        return 'Mô phỏng Thực chiến';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Analytics Panel */}
      <AnalyticsPanel />

      {/* Radar Map Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Bản đồ Radar Năng lực AQ của bạn
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Được cập nhật tự động theo thời gian thực sau mỗi quyết định trong 12 tình huống thực chiến.
            </p>
          </div>

          <div className="hidden sm:block text-right">
            <span className="text-xs text-slate-400 font-semibold block">Danh hiệu hiện tại</span>
            <span className="text-sm font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-xl border border-indigo-200">
              {getStudentTitle()}
            </span>
          </div>
        </div>

        <COREScoreRadar scores={scores} totalAQ={totalAQ} />
      </div>

      {/* 12 CORE Scenarios Section Header */}
      <div className="space-y-6 pt-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hệ Thống 12 Tình Huống Nghịch Cảnh C.O.R.E</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Chọn Chiều Kích & Bắt Đầu Thử Thách
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              12 kịch bản tương tác chuyên biệt rèn luyện 4 chiều kích: <strong>Control</strong> (Kiểm soát), <strong>Ownership</strong> (Trách nhiệm), <strong>Reach</strong> (Khoanh vùng ảnh hưởng), và <strong>Endurance</strong> (Sức bền bỉ). Bấm vào từng Section để xem danh sách trò chơi.
            </p>
          </div>

          {/* Quick Stats & Progress */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center gap-4 shrink-0">
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase">Tiến độ chung</div>
              <div className="text-xl font-black text-slate-900">
                {totalCompletedCount} <span className="text-xs font-semibold text-slate-400">/ 12 kịch bản</span>
              </div>
            </div>
            <div className="w-24 bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.round((totalCompletedCount / 12) * 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Dimension Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => setFilterCore('ALL')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
              filterCore === 'ALL'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Tất cả 4 Chiều Kích (12 Game)
          </button>
          {dimensions.map((dim) => {
            const meta = CORE_SECTIONS[dim];
            const scenarios = getScenariosByCore(dim);
            const doneCount = scenarios.filter((s) => completedScenarios[s.id]).length;
            const isActive = filterCore === dim;

            return (
              <button
                key={dim}
                onClick={() => {
                  setFilterCore(dim);
                  setExpandedSections((prev) => ({ ...prev, [dim]: true }));
                }}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                  isActive
                    ? `${meta.badgeBg} ${meta.badgeColor} ${meta.borderColor} ring-2 ring-indigo-500/20 shadow-xs font-black`
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>{meta.code} - {meta.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500 font-bold">
                  {doneCount}/{scenarios.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* 4 CORE Sections List */}
        <div className="space-y-6">
          {dimensions
            .filter((dim) => filterCore === 'ALL' || filterCore === dim)
            .map((dim) => {
              const meta = CORE_SECTIONS[dim];
              const scenarios = getScenariosByCore(dim);
              const doneCount = scenarios.filter((s) => completedScenarios[s.id]).length;
              const isExpanded = Boolean(expandedSections[dim]);

              return (
                <div
                  key={dim}
                  className={`bg-white rounded-3xl border-2 transition-all shadow-xs overflow-hidden ${
                    isExpanded ? meta.borderColor : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Section Clickable Header / Accordion Trigger */}
                  <div
                    onClick={() => toggleSection(dim)}
                    className="p-5 sm:p-6 cursor-pointer flex items-center justify-between gap-4 select-none hover:bg-slate-50/60 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {/* Dimension Icon Badge */}
                      <div
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${meta.gradient} text-white flex items-center justify-center font-black text-xl shadow-md shrink-0`}
                      >
                        {meta.code}
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-lg sm:text-xl font-black text-slate-900">
                            {meta.code} • {meta.name} ({meta.nameVi})
                          </h3>
                          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${meta.badgeBg} ${meta.badgeColor}`}>
                            {meta.taglineVi}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl line-clamp-1">
                          {meta.descriptionVi}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="hidden sm:flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700">
                        <span>Hoàn thành:</span>
                        <span className="text-indigo-600 font-black">
                          {doneCount}/{scenarios.length}
                        </span>
                      </div>

                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Section Games Grid (Visible when expanded) */}
                  {isExpanded && (
                    <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 bg-slate-50/40">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 pt-4">
                        Danh sách 3 tình huống thuộc chiều kích {meta.nameVi}:
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {scenarios.map((scenario) => {
                          const isDone = Boolean(completedScenarios[scenario.id]);

                          return (
                            <div
                              key={scenario.id}
                              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group"
                            >
                              <div className="space-y-3">
                                {/* Badges */}
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-slate-900 text-white uppercase tracking-wider">
                                    Game {scenario.game_number}
                                  </span>

                                  <div className="flex items-center gap-1.5">
                                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                                      {scenario.grade_level}
                                    </span>
                                  </div>
                                </div>

                                {/* Format badge */}
                                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/80">
                                  {getFormatIcon(scenario.type)}
                                  <span>{getFormatLabel(scenario.type)}</span>
                                </div>

                                {/* Title & Description */}
                                <div>
                                  <h4 className="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                                    {scenario.title}
                                  </h4>
                                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-3">
                                    {scenario.description}
                                  </p>
                                </div>
                              </div>

                              {/* Footer Action */}
                              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                                <div>
                                  {isDone ? (
                                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                                      <CheckCircle2 className="w-3.5 h-3.5" />
                                      <span>Đã xong</span>
                                    </span>
                                  ) : (
                                    <span className="text-[11px] font-semibold text-slate-400">
                                      Chưa thử sức
                                    </span>
                                  )}
                                </div>

                                <Link
                                  href={scenario.path}
                                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all shadow-xs ${
                                    isDone
                                      ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20'
                                  }`}
                                >
                                  <span>{isDone ? 'Chơi lại' : 'Vào chơi'}</span>
                                  <ArrowRight className="w-3 h-3" />
                                </Link>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
