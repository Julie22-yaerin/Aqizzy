import React from 'react';
import HomeroomScenario from '@/components/scenarios/HomeroomScenario';

export const metadata = {
  title: 'Ownership (O) - The Homeroom Period | Aqizzy',
  description: 'Dũng cảm nhận trách nhiệm người đứng đầu tổ thay vì đùn đẩy đổ lỗi.',
};

export default function OwnershipScenarioPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      <HomeroomScenario />
    </div>
  );
}
