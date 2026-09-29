import React from 'react';
import CalendarScenario from '@/components/scenarios/CalendarScenario';
import { getScenarioById } from '@/lib/scenariosData';

export const metadata = {
  title: 'Endurance (E) - The New Kid Isolation | Aqizzy',
  description: 'Hành trình 4 tuần chủ động kết nối khi chuyển đến ngôi trường mới.',
};

export default function NewKidIsolationPage() {
  const scenario = getScenarioById('endurance-new-kid-isolation');
  const weeks = scenario?.content_json?.weeks || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
      <CalendarScenario weeks={weeks} />
    </div>
  );
}
