import React from 'react';
import ResourceScenario from '@/components/scenarios/ResourceScenario';
import { getScenarioById } from '@/lib/scenariosData';

export const metadata = {
  title: 'Endurance (E) - The Sprained Ankle | Aqizzy',
  description: 'Quản lý sức bền tâm lý 4 tuần dưỡng thương cổ chân.',
};

export default function SprainedAnklePage() {
  const scenario = getScenarioById('endurance-sprained-ankle');
  const days = scenario?.content_json?.days || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
      <ResourceScenario
        days={days}
        scenarioId="endurance-sprained-ankle"
        title="The Sprained Ankle (Chấn Thương Trước Giải Đấu)"
        subtitle="Quản lý Tinh thần & Kiên nhẫn suốt 4 tuần dưỡng thương cổ chân trước thềm giải đấu lớn!"
      />
    </div>
  );
}
