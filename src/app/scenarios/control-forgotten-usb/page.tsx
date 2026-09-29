import React from 'react';
import EisenhowerMatrixScenario from '@/components/scenarios/EisenhowerMatrixScenario';
import { getScenarioById } from '@/lib/scenariosData';

export const metadata = {
  title: 'Control (C) - The Forgotten USB | Aqizzy',
  description: 'Ma trận Eisenhower xử lý tình huống quên USB bài làm môn KHTN.',
};

export default function ForgottenUsbPage() {
  const scenario = getScenarioById('control-forgotten-usb');
  const items = scenario?.content_json?.items || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
      <EisenhowerMatrixScenario items={items} />
    </div>
  );
}
