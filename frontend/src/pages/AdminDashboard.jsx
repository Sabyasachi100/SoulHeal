import React from 'react';
import { Users, BookOpen, Calendar, TrendingUp, AlertTriangle, ArrowUpRight, ArrowDownRight, Settings } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Students', value: '1,284', grow: true, percentage: '12%', icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Psychologists', value: '42', grow: true, percentage: '5%', icon: ShieldCheck, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { label: 'Resources', value: '156', grow: false, percentage: '2%', icon: BookOpen, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { label: 'Avg Stress Level', value: 'Moderate', grow: false, percentage: '15%', icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-400/10' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2 text-gradient">Admin Panel</h1>
          <p className="text-slate-400 font-medium tracking-wide">Overview of platform health and user activity.</p>
        </div>
        <button className="p-4 bg-slate-800 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
          <Settings className="w-6 h-6 text-slate-400" />
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="premium-card">
            <div className="flex items-center justify-between mb-6">
              <div className={`p-3 rounded-xl ${s.bg}`}>
                {s.icon && <s.icon className={`w-6 h-6 ${s.color}`} />}
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-bold ${s.grow ? 'text-emerald-400' : 'text-red-400'}`}>
                {s.grow ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {s.percentage}
              </div>
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{s.label}</p>
            <p className="text-3xl font-bold text-white tracking-tight">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Management Preview */}
        <div className="lg:col-span-2 premium-card">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white">Recent Registrations</h2>
            <button className="text-sm font-bold text-purple-400 hover:underline">Manage Users</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="pb-4 text-[10px] uppercase tracking-widest text-slate-500 font-bold">User</th>
                  <th className="pb-4 text-[10px] uppercase tracking-widest text-slate-500 font-bold">Role</th>
                  <th className="pb-4 text-[10px] uppercase tracking-widest text-slate-500 font-bold">Status</th>
                  <th className="pb-4 text-[10px] uppercase tracking-widest text-slate-500 font-bold">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { name: 'Alice Wong', role: 'Student', status: 'Active', date: '2 hours ago' },
                  { name: 'Dr. John Doe', role: 'Counselor', status: 'Pending', date: '5 hours ago' },
                  { name: 'Bob Smith', role: 'Student', status: 'Active', date: 'Yesterday' },
                ].map((user, i) => (
                  <tr key={i} className="group">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm font-semibold text-white">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded ${user.role === 'Counselor' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                        <span className="text-xs text-slate-400 font-medium">{user.status}</span>
                      </div>
                    </td>
                    <td className="py-4 text-xs text-slate-500 font-medium">{user.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Global Analytics Preview */}
        <div className="premium-card bg-gradient-to-br from-slate-900/40 via-purple-900/10 to-slate-900/40">
          <h2 className="text-xl font-bold text-white mb-8">Platform Activity</h2>
          <div className="space-y-8">
            <div className="h-48 flex items-end justify-between gap-2 px-2">
              {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                <div key={i} className="flex-1 space-y-2 group">
                  <div className="w-full bg-slate-800 rounded-lg overflow-hidden relative" style={{ height: '100%' }}>
                    <div 
                      className="absolute bottom-0 w-full bg-gradient-to-t from-purple-600 to-pink-500 opacity-80 group-hover:opacity-100 transition-all rounded-t-lg" 
                      style={{ height: `${h}%` }}
                    />
                  </div>
                  <div className="text-[8px] font-bold text-slate-600 text-center uppercase">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</div>
                </div>
              ))}
            </div>
            
            <div className="p-4 rounded-xl bg-white/5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">Database Load</span>
                <span className="text-xs font-bold text-emerald-400">Healthy</span>
              </div>
              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="w-[34%] h-full bg-emerald-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShieldCheck = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
);

export default AdminDashboard;
