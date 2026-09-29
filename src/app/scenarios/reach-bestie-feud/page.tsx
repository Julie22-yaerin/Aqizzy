import React from 'react';
import TrashBinScenario from '@/components/scenarios/TrashBinScenario';
import { getScenarioById } from '@/lib/scenariosData';

export const metadata = {
  title: 'Reach (R) - The Bestie Feud | Aqizzy',
  description: 'Tách biệt xung đột bạn bè với kỳ thi học kỳ.',
};

export default function BestieFeudPage() {
  const scenario = getScenarioById('reach-bestie-feud');
  const items = scenario?.content_json?.items || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
      <TrashBinScenario items={items} />
    </div>
  );
}
