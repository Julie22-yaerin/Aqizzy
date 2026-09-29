import React from 'react';
import BranchingScenario from '@/components/scenarios/BranchingScenario';

export const metadata = {
  title: 'Ownership (O) - The Broken Beaker | Aqizzy',
  description: 'Cây quyết định nhân quả khi làm vỡ dụng cụ thí nghiệm.',
};

export default function BrokenBeakerPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
      <BranchingScenario />
    </div>
  );
}
