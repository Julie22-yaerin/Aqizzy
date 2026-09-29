import React from 'react';
import SlideChatScenario from '@/components/scenarios/SlideChatScenario';

export const metadata = {
  title: 'Ownership (O) - The Deleted Slides | Aqizzy',
  description: 'Dũng cảm nhận lỗi và khôi phục bài thuyết trình nhóm.',
};

export default function DeletedSlidesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
      <SlideChatScenario />
    </div>
  );
}
