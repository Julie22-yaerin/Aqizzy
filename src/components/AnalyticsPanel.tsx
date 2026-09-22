'use client';

import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAQStore } from '@/store/aqStore';
import { BarChart, Users, Activity } from 'lucide-react';

export default function AnalyticsPanel() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    recentLogins: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, orderBy('lastLogin', 'desc'), limit(100));
        const snapshot = await getDocs(q);

        setStats({
          totalUsers: snapshot.size, // In a real app, use an aggregation query or count
          recentLogins: snapshot.docs.filter(doc => {
            const data = doc.data();
            if (!data.lastLogin) return false;
            const lastLogin = data.lastLogin.toDate();
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
            return lastLogin > oneWeekAgo;
          }).length
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return <div className="p-4 bg-white rounded-xl shadow animate-pulse h-32"></div>;
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-bold text-slate-900">Thống kê nhanh</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Người dùng</p>
            <p className="text-2xl font-black text-slate-900">{stats.totalUsers}</p>
          </div>
        </div>

        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-emerald-100 rounded-xl text-emerald-600">
            <BarChart className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Hoạt động (7 ngày)</p>
            <p className="text-2xl font-black text-slate-900">{stats.recentLogins}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
