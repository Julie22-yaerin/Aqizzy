import React from 'react';
import PrivateChatScenario from '@/components/scenarios/PrivateChatScenario';

export const metadata = {
  title: 'Control (C) - The Toxic Rumor | Aqizzy',
  description: 'Trò chuyện 1-1 hạ nhiệt tin đồn ác ý và kiểm soát khủng hoảng.',
};

export default function ToxicRumorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
      <PrivateChatScenario />
    </div>
  );
}
