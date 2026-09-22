import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import RequireAuth from '@/components/RequireAuth';

export const metadata: Metadata = {
  title: 'Aqizzy - Nền tảng Đào tạo AQ Cấp 2 qua Khung CORE',
  description: 'Nền tảng AI giáo dục rèn luyện Trí tuệ Nghịch cảnh (Adversity Quotient) dành cho học sinh Cấp 2 Việt Nam (Lớp 6 - 9) theo mô hình CORE.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="antialiased selection:bg-brand-500 selection:text-white">
        <RequireAuth>
          <Header />
          <main className="min-h-[calc(100vh-4rem)] pb-16">
            {children}
          </main>
        </RequireAuth>
      </body>
    </html>
  );
}
