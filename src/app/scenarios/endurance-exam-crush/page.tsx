import React from 'react';
import ResourceScenario from '@/components/scenarios/ResourceScenario';
import { getScenarioById } from '@/lib/scenariosData';

export const metadata = {
  title: 'Endurance (E) - The May Exam Crush | Aqizzy',
  description: 'Quản lý tài nguyên Năng lượng & Căng thẳng sống sót qua 7 ngày ôn thi cao điểm.',
};

export default function EnduranceScenarioPage() {
  const scenario = getScenarioById('endurance-may-exam-crush');
  const days = scenario?.content_json?.days || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      <ResourceScenario days={days} />
    </div>
  );
}
