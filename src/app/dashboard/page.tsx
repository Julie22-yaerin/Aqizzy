'use client';

import React from 'react';
import { useAQStore } from '@/store/aqStore';
import COREScoreRadar from '@/components/COREScoreRadar';
import AnalyticsPanel from '@/components/AnalyticsPanel';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { INJECTED_SCENARIOS } from '@/lib/scenariosData';

export default function DashboardPage() {
  const { scores, totalAQ, completedScenarios, getStudentTitle } = useAQStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <AnalyticsPanel />

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

      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            4 Tình huống Nhập vai Thực chiến
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
                  <div className="flex items-center">
                    <span className={`text-xs font-black px-2.5 py-1 rounded-xl ${
                      scenario.core_focus === 'C' ? 'bg-blue-100 text-blue-700' :
                      scenario.core_focus === 'O' ? 'bg-purple-100 text-purple-700' :
                      scenario.core_focus === 'R' ? 'bg-amber-100 text-amber-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      CORE: {scenario.core_focus}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-slate-900 group-hover:text-brand-600 transition-colors">
                      {scenario.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      {scenario.description}
                    </p>
                  </div>

                  {isDone && (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 inline-flex">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Đã hoàn thành</span>
                    </div>
                  )}
                </div>

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
