import React from 'react';
import SwipeCardScenario from '@/components/scenarios/SwipeCardScenario';
import { getScenarioById } from '@/lib/scenariosData';

export const metadata = {
  title: 'Reach (R) - The Rejected Audition | Aqizzy',
  description: 'Khoanh vùng thất bại trượt tuyển chọn văn nghệ trường.',
};

export default function RejectedAuditionPage() {
  const scenario = getScenarioById('reach-rejected-audition');
  const cards = scenario?.content_json?.cards || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
      <SwipeCardScenario
        cards={cards}
        scenarioId="reach-rejected-audition"
        title="The Rejected Audition (Trượt Buổi Tuyển Chọn)"
        subtitle="Lọc nhãn dán tiêu cực: Vuốt Trái để LOẠI BỎ suy nghĩ dán nhãn bản thân tồi tệ, Vuốt Phải để GIỮ LẠI sự thật khách quan!"
      />
    </div>
  );
}
