import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const attendanceData = [
  { month: 'يناير', present: 85, absent: 15 },
  { month: 'فبراير', present: 90, absent: 10 },
  { month: 'مارس', present: 88, absent: 12 },
  { month: 'أبريل', present: 92, absent: 8 },
  { month: 'مايو', present: 95, absent: 5 },
  { month: 'يونيو', present: 93, absent: 7 },
];

const performanceData = [
  { name: 'أحمد', speed: 85, strength: 78, endurance: 92 },
  { name: 'محمد', speed: 78, strength: 85, endurance: 88 },
  { name: 'يوسف', speed: 92, strength: 75, endurance: 85 },
  { name: 'عمر', speed: 88, strength: 82, endurance: 90 },
];

const revenueData = [
  { name: 'اشتراكات', value: 60, color: '#3b82f6' },
  { name: 'منتجات', value: 25, color: '#10b981' },
  { name: 'بطولات', value: 10, color: '#f59e0b' },
  { name: 'خدمات', value: 5, color: '#8b5cf6' },
];

export default function InteractiveDashboard() {
  const [activeTab, setActiveTab] = useState<'attendance' | 'performance' | 'revenue'>('attendance');

  return (
    <section id="dashboard" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            <span className="text-purple-300 text-xs font-semibold">لوحة التحكم</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            📊 لوحة التحكم <span className="gradient-text">التفاعلية</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            رسوم بيانية تفاعلية لتحليل الأداء والحضور والإيرادات
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 justify-center">
          {[
            { id: 'attendance', label: '📅 الحضور', icon: '📅' },
            { id: 'performance', label: '📈 الأداء', icon: '📈' },
            { id: 'revenue', label: '💰 الإيرادات', icon: '💰' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-lg text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-l from-purple-500 to-violet-600 text-white shadow-lg'
                  : 'glass-card text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Charts */}
        <div className="glass-card p-6">
          {activeTab === 'attendance' && (
            <div>
              <h3 className="text-white font-bold text-lg mb-6">نسبة الحضور والغياب (6 أشهر)</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="present" fill="#10b981" name="حاضر" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="absent" fill="#ef4444" name="غائب" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {activeTab === 'performance' && (
            <div>
              <h3 className="text-white font-bold text-lg mb-6">مقارنة أداء اللاعبين</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="speed" stroke="#3b82f6" strokeWidth={3} name="السرعة" />
                  <Line type="monotone" dataKey="strength" stroke="#f59e0b" strokeWidth={3} name="القوة" />
                  <Line type="monotone" dataKey="endurance" stroke="#10b981" strokeWidth={3} name="التحمل" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {activeTab === 'revenue' && (
            <div>
              <h3 className="text-white font-bold text-lg mb-6">توزيع الإيرادات</h3>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={revenueData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {revenueData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Export Button */}
        <div className="mt-6 text-center">
          <button className="px-6 py-3 bg-gradient-to-l from-purple-500 to-violet-600 text-white font-bold rounded-lg shadow-lg hover:opacity-90 transition-opacity">
            📥 تصدير التقرير (PDF)
          </button>
        </div>
      </div>
    </section>
  );
}
