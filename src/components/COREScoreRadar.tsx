'use client';

import React from 'react';
import { COREScore } from '@/types';
import { Shield, Target, Compass, BatteryCharging } from 'lucide-react';

interface Props {
  scores: COREScore;
  totalAQ: number;
}

export default function COREScoreRadar({ scores, totalAQ }: Props) {
  const dimensions = [
    {
      key: 'c' as const,
      name: 'Control (Kiểm soát)',
      desc: 'Khả năng tập trung vào điều mình có thể làm ngay lúc này thay vì bất lực hoặc hoảng loạn.',
      score: scores.c,
      color: 'bg-blue-500',
      text: 'text-blue-600',
      border: 'border-blue-200',
      bgLight: 'bg-blue-50',
      icon: Shield,
    },
    {
      key: 'o' as const,
      name: 'Ownership (Làm chủ)',
      desc: 'Dũng cảm nhận trách nhiệm lãnh đạo và sửa sai thay vì đùn đẩy, đổ lỗi cho hoàn cảnh hay người khác.',
      score: scores.o,
      color: 'bg-purple-500',
      text: 'text-purple-600',
      border: 'border-purple-200',
      bgLight: 'bg-purple-50',
      icon: Target,
    },
    {
      key: 'r' as const,
      name: 'Reach (Khoanh vùng)',
      desc: 'Giới hạn thất bại trong phạm vi cụ thể, không để một điểm kém phá hủy toàn bộ lòng tự trọng và các mặt khác.',
      score: scores.r,
      color: 'bg-amber-500',
      text: 'text-amber-600',
      border: 'border-amber-200',
      bgLight: 'bg-amber-50',
      icon: Compass,
    },
    {
      key: 'e' as const,
      name: 'Endurance (Bền bỉ)',
      desc: 'Khả năng phân phối sức lực đường dài qua các mùa thi, duy trì năng lượng và tránh kiệt sức (burnout).',
      score: scores.e,
      color: 'bg-emerald-500',
      text: 'text-emerald-600',
      border: 'border-emerald-200',
      bgLight: 'bg-emerald-50',
      icon: BatteryCharging,
    },
  ];

  // Calculate radar polygon points
  // Center is (150, 150), radius is 110
  const cx = 150;
  const cy = 150;
  const maxR = 105;

  // Angles for C (top, -90°), O (right, 0°), R (bottom, 90°), E (left, 180°)
  const angles = [
    -Math.PI / 2, // C (top)
    0,            // O (right)
    Math.PI / 2,  // R (bottom)
    Math.PI,      // E (left)
  ];

  const points = [
    { x: cx + (scores.c / 100) * maxR * Math.cos(angles[0]), y: cy + (scores.c / 100) * maxR * Math.sin(angles[0]) },
    { x: cx + (scores.o / 100) * maxR * Math.cos(angles[1]), y: cy + (scores.o / 100) * maxR * Math.sin(angles[1]) },
    { x: cx + (scores.r / 100) * maxR * Math.cos(angles[2]), y: cy + (scores.r / 100) * maxR * Math.sin(angles[2]) },
    { x: cx + (scores.e / 100) * maxR * Math.cos(angles[3]), y: cy + (scores.e / 100) * maxR * Math.sin(angles[3]) },
  ];

  const polygonPath = points.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 lg:p-8">
      <div className="flex flex-col md:flex-row items-center gap-8">
        
        {/* Radar SVG Visual */}
        <div className="relative flex-shrink-0 flex flex-col items-center justify-center">
          <svg width="300" height="300" className="overflow-visible">
            {/* Concentric grid circles (25%, 50%, 75%, 100%) */}
            {[0.25, 0.5, 0.75, 1].map((scale, i) => (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={maxR * scale}
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="1"
                strokeDasharray={scale === 1 ? 'none' : '4 4'}
              />
            ))}

            {/* Axis lines */}
            <line x1={cx} y1={cy - maxR} x2={cx} y2={cy + maxR} stroke="#cbd5e1" strokeWidth="1" />
            <line x1={cx - maxR} y1={cy} x2={cx + maxR} y2={cy} stroke="#cbd5e1" strokeWidth="1" />

            {/* Polygon Area */}
            <polygon
              points={polygonPath}
              fill="rgba(79, 70, 229, 0.2)"
              stroke="#4f46e5"
              strokeWidth="2.5"
              className="transition-all duration-700 ease-out"
            />

            {/* Dimension Dots */}
            {points.map((p, i) => (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r="5"
                className="fill-indigo-600 stroke-white stroke-2 transition-all duration-700 ease-out"
              />
            ))}

            {/* Labels */}
            <text x={cx} y={cy - maxR - 12} textAnchor="middle" className="text-[11px] font-bold fill-blue-600">
              C - Control ({scores.c})
            </text>
            <text x={cx + maxR + 10} y={cy + 4} textAnchor="start" className="text-[11px] font-bold fill-purple-600">
              O - Ownership ({scores.o})
            </text>
            <text x={cx} y={cy + maxR + 20} textAnchor="middle" className="text-[11px] font-bold fill-amber-600">
              R - Reach ({scores.r})
            </text>
            <text x={cx - maxR - 10} y={cy + 4} textAnchor="end" className="text-[11px] font-bold fill-emerald-600">
              E - Endurance ({scores.e})
            </text>
          </svg>

          {/* Centered Total AQ Badge */}
          <div className="mt-2 text-center">
            <span className="text-xs uppercase font-semibold tracking-wider text-slate-500">Tổng điểm AQ</span>
            <div className="text-3xl font-black text-slate-900 tracking-tight">
              {totalAQ} <span className="text-sm font-normal text-slate-400">/ 400</span>
            </div>
          </div>
        </div>

        {/* 4 Dimension Progress Bars & Descriptions */}
        <div className="flex-1 w-full space-y-4">
          {dimensions.map((dim) => {
            const Icon = dim.icon;
            return (
              <div
                key={dim.key}
                className={`p-3.5 rounded-2xl border ${dim.border} ${dim.bgLight} transition-all hover:shadow-xs`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg bg-white shadow-xs ${dim.text}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-sm text-slate-800">{dim.name}</span>
                  </div>
                  <span className={`font-black text-sm ${dim.text}`}>
                    {dim.score} / 100
                  </span>
                </div>
                
                {/* Progress track */}
                <div className="w-full h-2 rounded-full bg-white overflow-hidden shadow-inner mb-1.5">
                  <div
                    className={`h-full rounded-full ${dim.color} transition-all duration-700 ease-out`}
                    style={{ width: `${dim.score}%` }}
                  ></div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {dim.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
