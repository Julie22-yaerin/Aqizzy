import React from 'react';
import ZaloChatScenario from '@/components/scenarios/ZaloChatScenario';

export const metadata = {
  title: 'Control (C) - The 9 PM Sunday Zalo Panic | The Lyceum',
  description: 'Tập trung vào điều bạn có thể kiểm soát ngay lúc này trước thông báo đổi đề tài gấp.',
};

export default function ControlScenarioPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      <ZaloChatScenario />
    </div>
  );
}
