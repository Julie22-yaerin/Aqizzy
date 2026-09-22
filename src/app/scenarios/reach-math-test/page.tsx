import React from 'react';
import SwipeCardScenario from '@/components/scenarios/SwipeCardScenario';
import { getScenarioById } from '@/lib/scenariosData';

export const metadata = {
  title: 'Reach (R) - The 45-Minute Math Test Disaster | The Lyceum',
  description: 'Khoanh vùng ảnh hưởng: Phân loại suy nghĩ tiêu cực bằng cơ chế Swipe Cards.',
};

export default function ReachScenarioPage() {
  const scenario = getScenarioById('reach-math-test-disaster');
  const cards = scenario?.content_json?.cards || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      <SwipeCardScenario cards={cards} />
    </div>
  );
}
