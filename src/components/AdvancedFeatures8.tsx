import { useState } from 'react';

// ============================================
// 💼 نظام CRM لإدارة العلاقات
// ============================================
export function CRMSystem() {
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);

  const customers = [
    { id: '1', name: 'أحمد محمود', phone: '01012345678', email: 'ahmed@example.com', children: 2, lastContact: '2026-01-20', status: 'active', satisfaction: 5 },
    { id: '2', name: 'فاطمة علي', phone: '01098765432', email: 'fatima@example.com', children: 1, lastContact: '2026-01-19', status: 'active', satisfaction: 4 },
    { id: '3', name: 'محمد حسن', phone: '01112345678', email: 'mohamed@example.com', children: 3, lastContact: '2026-01-18', status: 'active', satisfaction: 5 },
    { id: '4', name: 'سارة أحمد', phone: '01212345678', email: 'sara@example.com', children: 1, lastContact: '2026-01-15', status: 'inactive', satisfaction: 3 },
  ];

  const communications = [
    { id: 1, type: 'email', subject: 'تذكير بالدفع', date: '2026-01-20', status: 'sent' },
    { id: 2, type: 'sms', subject: 'موعد التدريب', date: '2026-01-19', status: 'delivered' },
    { id: 3, type: 'whatsapp', subject: 'استفسار عن الباقات', date: '2026-01-18', status: 'read' },
    { id: 4, type: 'call', subject: 'متابعة رضا العميل', date: '2026-01-17', status: 'completed' },
  ];

  return (
    <section id="crm" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-blue-300 text-xs font-semibold">CRM</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            💼 نظام إدارة العلاقات
          </h2>
          <p className="text-gray-400">إدارة شاملة لعلاقات العملاء وأولياء الأمور</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">👥</div>
            <div className="text-2xl font-black text-blue-400">{customers.length}</div>
            <div className="text-gray-400 text-xs">عميل</div>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">👶</div>
            <div className="text-2xl font-black text-purple-400">{customers.reduce((s, c) => s + c.children, 0)}</div>
            <div className="text-gray-400 text-xs">لاعب</div>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">⭐</div>
            <div className="text-2xl font-black text-amber-400">4.5</div>
            <div className="text-gray-400 text-xs">متوسط الرضا</div>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">📧</div>
            <div className="text-2xl font-black text-emerald-400">{communications.length}</div>
            <div className="text-gray-400 text-xs">تواصل</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Customers List */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4">👥 قائمة العملاء</h3>
            <div className="space-y-3">
              {customers.map((customer) => (
                <div
                  key={customer.id}
                  onClick={() => setSelectedCustomer(customer.id)}
                  className={`glass-card-light p-4 cursor-pointer transition-all ${
                    selectedCustomer === customer.id ? 'ring-2 ring-blue-500/50' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white font-bold">
                        {customer.name[0]}
                      </div>
                      <div>
                        <div className="text-white font-bold text-sm">{customer.name}</div>
                        <div className="text-gray-400 text-xs">{customer.phone}</div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      customer.status === 'active' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-gray-500/20 text-gray-300'
                    }`}>
                      {customer.status === 'active' ? '✓ نشط' : '⏸ غير نشط'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>👶 {customer.children} أطفال</span>
                    <span>⭐ {customer.satisfaction}/5</span>
                    <span>📅 {customer.lastContact}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Communications */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4">📧 سجل التواصل</h3>
            <div className="space-y-3">
              {communications.map((comm) => (
                <div key={comm.id} className="glass-card-light p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-2xl">
                      {comm.type === 'email' ? '📧' : comm.type === 'sms' ? '💬' : comm.type === 'whatsapp' ? '📱' : '📞'}
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-bold text-sm">{comm.subject}</div>
                      <div className="text-gray-400 text-xs">{comm.date}</div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      comm.status === 'sent' ? 'bg-blue-500/20 text-blue-300' :
                      comm.status === 'delivered' ? 'bg-emerald-500/20 text-emerald-300' :
                      comm.status === 'read' ? 'bg-purple-500/20 text-purple-300' :
                      'bg-gray-500/20 text-gray-300'
                    }`}>
                      {comm.status === 'sent' ? '📤 مرسل' : comm.status === 'delivered' ? '✓ تم التسليم' : comm.status === 'read' ? '👁️ مقروء' : '✓ مكتمل'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-3 bg-gradient-to-l from-blue-500 to-cyan-600 text-white font-bold rounded-lg">
              📧 إرسال رسالة جديدة
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// 🏋️ نظام إدارة المخزون والمعدات
// ============================================
export function InventorySystem() {
  const [filter, setFilter] = useState<'all' | 'available' | 'maintenance'>('all');

  const equipment = [
    { id: 1, name: 'كرات قدم', category: 'كرات', quantity: 50, available: 45, condition: 'excellent', lastMaintenance: '2026-01-10', nextMaintenance: '2026-04-10' },
    { id: 2, name: 'أقمصة تدريب', category: 'ملابس', quantity: 100, available: 85, condition: 'good', lastMaintenance: '2026-01-05', nextMaintenance: '2026-07-05' },
    { id: 3, name: 'أحذية رياضية', category: 'أحذية', quantity: 30, available: 28, condition: 'excellent', lastMaintenance: '2026-01-15', nextMaintenance: '2026-07-15' },
    { id: 4, name: 'أوزان حرة', category: 'أوزان', quantity: 20, available: 18, condition: 'good', lastMaintenance: '2026-01-08', nextMaintenance: '2026-04-08' },
    { id: 5, name: 'حصير يوجا', category: 'حصير', quantity: 40, available: 35, condition: 'fair', lastMaintenance: '2025-12-20', nextMaintenance: '2026-03-20' },
    { id: 6, name: 'شباك مرمى', category: 'مرمى', quantity: 4, available: 4, condition: 'excellent', lastMaintenance: '2026-01-12', nextMaintenance: '2026-07-12' },
  ];

  const filteredEquipment = filter === 'all' ? equipment : 
    filter === 'available' ? equipment.filter(e => e.available > 0) :
    equipment.filter(e => e.condition === 'fair');

  const totalItems = equipment.reduce((s, e) => s + e.quantity, 0);
  const availableItems = equipment.reduce((s, e) => s + e.available, 0);
  const maintenanceNeeded = equipment.filter(e => e.condition === 'fair').length;

  return (
    <section id="inventory" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-emerald-300 text-xs font-semibold">Inventory</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🏋️ إدارة المخزون والمعدات
          </h2>
          <p className="text-gray-400">تتبع شامل للمعدات والصيانة</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">📦</div>
            <div className="text-2xl font-black text-white">{totalItems}</div>
            <div className="text-gray-400 text-xs">إجمالي المعدات</div>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">✅</div>
            <div className="text-2xl font-black text-emerald-400">{availableItems}</div>
            <div className="text-gray-400 text-xs">متاح</div>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">⚠️</div>
            <div className="text-2xl font-black text-amber-400">{maintenanceNeeded}</div>
            <div className="text-gray-400 text-xs">تحتاج صيانة</div>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">💰</div>
            <div className="text-2xl font-black text-blue-400">45K</div>
            <div className="text-gray-400 text-xs">قيمة المخزون</div>
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-6">
          {[
            { id: 'all', label: 'الكل' },
            { id: 'available', label: 'متاح' },
            { id: 'maintenance', label: 'يحتاج صيانة' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as any)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                filter === f.id
                  ? 'bg-gradient-to-l from-emerald-500 to-teal-600 text-white'
                  : 'glass-card text-gray-400 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Equipment Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEquipment.map((item) => (
            <div key={item.id} className="glass-card p-5 hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-bold">{item.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  item.condition === 'excellent' ? 'bg-emerald-500/20 text-emerald-300' :
                  item.condition === 'good' ? 'bg-blue-500/20 text-blue-300' :
                  'bg-amber-500/20 text-amber-300'
                }`}>
                  {item.condition === 'excellent' ? '✓ ممتاز' : item.condition === 'good' ? '✓ جيد' : '⚠️ متوسط'}
                </span>
              </div>
              <div className="text-gray-400 text-xs mb-3">{item.category}</div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">الكمية:</span>
                  <span className="text-white font-bold">{item.available}/{item.quantity}</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-l from-emerald-500 to-teal-600"
                    style={{ width: `${(item.available / item.quantity) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>آخر صيانة: {item.lastMaintenance}</span>
                  <span>قادمة: {item.nextMaintenance}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// 📊 نظام التقارير المالية المتقدمة
// ============================================
export function AdvancedFinancialReports() {
  const [period, setPeriod] = useState<'month' | 'quarter' | 'year'>('month');

  const financialData = {
    revenue: 125000,
    expenses: 78000,
    profit: 47000,
    profitMargin: 37.6,
    cashFlow: 52000,
    receivables: 18000,
    payables: 12000,
  };

  const revenueBreakdown = [
    { category: 'اشتراكات', amount: 85000, percentage: 68 },
    { category: 'منتجات', amount: 25000, percentage: 20 },
    { category: 'بطولات', amount: 10000, percentage: 8 },
    { category: 'خدمات', amount: 5000, percentage: 4 },
  ];

  const expenseBreakdown = [
    { category: 'رواتب', amount: 45000, percentage: 58 },
    { category: 'إيجارات', amount: 15000, percentage: 19 },
    { category: 'معدات', amount: 10000, percentage: 13 },
    { category: 'تسويق', amount: 5000, percentage: 6 },
    { category: 'أخرى', amount: 3000, percentage: 4 },
  ];

  return (
    <section id="financial-reports" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <span className="text-amber-300 text-xs font-semibold">Financial Reports</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            📊 التقارير المالية المتقدمة
          </h2>
          <p className="text-gray-400">تحليل مالي شامل ومفصل</p>
        </div>

        {/* Period Selector */}
        <div className="flex justify-center gap-2 mb-8">
          {[
            { id: 'month', label: 'شهري' },
            { id: 'quarter', label: 'ربع سنوي' },
            { id: 'year', label: 'سنوي' },
          ].map((p) => (
            <button
              key={p.id}
              onClick={() => setPeriod(p.id as any)}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                period === p.id
                  ? 'bg-gradient-to-l from-amber-500 to-orange-600 text-white'
                  : 'glass-card text-gray-400 hover:text-white'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">💰</div>
            <div className="text-2xl font-black text-emerald-400">{financialData.revenue.toLocaleString()}</div>
            <div className="text-gray-400 text-xs">الإيرادات (ج.م)</div>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">💸</div>
            <div className="text-2xl font-black text-red-400">{financialData.expenses.toLocaleString()}</div>
            <div className="text-gray-400 text-xs">المصروفات (ج.م)</div>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">📈</div>
            <div className="text-2xl font-black text-blue-400">{financialData.profit.toLocaleString()}</div>
            <div className="text-gray-400 text-xs">الربح (ج.م)</div>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-2xl font-black text-purple-400">{financialData.profitMargin}%</div>
            <div className="text-gray-400 text-xs">هامش الربح</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Revenue Breakdown */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4">💰 توزيع الإيرادات</h3>
            <div className="space-y-3">
              {revenueBreakdown.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">{item.category}</span>
                    <span className="text-emerald-400 font-bold">{item.amount.toLocaleString()} ج.م ({item.percentage}%)</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-l from-emerald-500 to-teal-600"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expense Breakdown */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4">💸 توزيع المصروفات</h3>
            <div className="space-y-3">
              {expenseBreakdown.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">{item.category}</span>
                    <span className="text-red-400 font-bold">{item.amount.toLocaleString()} ج.م ({item.percentage}%)</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-l from-red-500 to-orange-600"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cash Flow */}
        <div className="glass-card p-6 mt-6">
          <h3 className="text-white font-bold text-lg mb-4">💵 التدفق النقدي</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="glass-card-light p-4 text-center">
              <div className="text-2xl font-black text-emerald-400">{financialData.cashFlow.toLocaleString()}</div>
              <div className="text-gray-400 text-xs mt-1">التدفق النقدي</div>
            </div>
            <div className="glass-card-light p-4 text-center">
              <div className="text-2xl font-black text-blue-400">{financialData.receivables.toLocaleString()}</div>
              <div className="text-gray-400 text-xs mt-1">المستحقات</div>
            </div>
            <div className="glass-card-light p-4 text-center">
              <div className="text-2xl font-black text-amber-400">{financialData.payables.toLocaleString()}</div>
              <div className="text-gray-400 text-xs mt-1">المستحق الدفع</div>
            </div>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex gap-3 mt-6">
          <button className="flex-1 py-3 bg-gradient-to-l from-emerald-500 to-teal-600 text-white font-bold rounded-lg">
            📥 تصدير PDF
          </button>
          <button className="flex-1 py-3 bg-gradient-to-l from-blue-500 to-cyan-600 text-white font-bold rounded-lg">
            📊 تصدير Excel
          </button>
          <button className="flex-1 py-3 glass-card text-white font-bold rounded-lg">
            🖨️ طباعة
          </button>
        </div>
      </div>
    </section>
  );
}

// ============================================
// 👥 نظام إدارة الموظفين والرواتب
// ============================================
export function EmployeeManagement() {
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);

  const employees = [
    { id: '1', name: 'كابتن محمود أحمد', role: 'مدرب رئيسي', department: 'التدريب', salary: 8000, joinDate: '2020-03-15', status: 'active', attendance: 98 },
    { id: '2', name: 'كابتن سارة علي', role: 'مدربة', department: 'التدريب', salary: 7000, joinDate: '2021-06-01', status: 'active', attendance: 96 },
    { id: '3', name: 'أحمد محمد', role: 'محاسب', department: 'المالية', salary: 6000, joinDate: '2022-01-10', status: 'active', attendance: 100 },
    { id: '4', name: 'فاطمة حسن', role: 'مديرة تسويق', department: 'التسويق', salary: 7500, joinDate: '2021-09-20', status: 'active', attendance: 95 },
    { id: '5', name: 'محمد خالد', role: 'مسؤول صيانة', department: 'العمليات', salary: 5000, joinDate: '2023-02-01', status: 'active', attendance: 92 },
  ];

  const totalSalaries = employees.reduce((s, e) => s + e.salary, 0);
  const avgAttendance = employees.reduce((s, e) => s + e.attendance, 0) / employees.length;

  return (
    <section id="employees" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            <span className="text-purple-300 text-xs font-semibold">HR</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            👥 إدارة الموظفين والرواتب
          </h2>
          <p className="text-gray-400">نظام شامل لإدارة الموارد البشرية</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">👥</div>
            <div className="text-2xl font-black text-purple-400">{employees.length}</div>
            <div className="text-gray-400 text-xs">موظف</div>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">💰</div>
            <div className="text-2xl font-black text-emerald-400">{totalSalaries.toLocaleString()}</div>
            <div className="text-gray-400 text-xs">إجمالي الرواتب</div>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-2xl font-black text-blue-400">{avgAttendance.toFixed(1)}%</div>
            <div className="text-gray-400 text-xs">متوسط الحضور</div>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">🏢</div>
            <div className="text-2xl font-black text-amber-400">4</div>
            <div className="text-gray-400 text-xs">أقسام</div>
          </div>
        </div>

        {/* Employees List */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold text-lg">👥 قائمة الموظفين</h3>
            <button className="px-4 py-2 bg-gradient-to-l from-purple-500 to-violet-600 text-white text-sm font-bold rounded-lg">
              + إضافة موظف
            </button>
          </div>
          <div className="space-y-3">
            {employees.map((employee) => (
              <div
                key={employee.id}
                onClick={() => setSelectedEmployee(employee.id)}
                className={`glass-card-light p-4 cursor-pointer transition-all ${
                  selectedEmployee === employee.id ? 'ring-2 ring-purple-500/50' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-white font-bold text-lg">
                    {employee.name[0]}
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-bold">{employee.name}</div>
                    <div className="text-gray-400 text-sm">{employee.role} • {employee.department}</div>
                  </div>
                  <div className="text-left">
                    <div className="text-emerald-400 font-bold">{employee.salary.toLocaleString()} ج.م</div>
                    <div className="text-gray-400 text-xs">راتب شهري</div>
                  </div>
                  <div className="text-left">
                    <div className="text-blue-400 font-bold">{employee.attendance}%</div>
                    <div className="text-gray-400 text-xs">حضور</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payroll Actions */}
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <button className="glass-card p-4 text-center hover:scale-105 transition-transform">
            <div className="text-3xl mb-2">💳</div>
            <div className="text-white font-bold">صرف الرواتب</div>
            <div className="text-gray-400 text-xs mt-1">صرف رواتب الشهر</div>
          </button>
          <button className="glass-card p-4 text-center hover:scale-105 transition-transform">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-white font-bold">تقرير الرواتب</div>
            <div className="text-gray-400 text-xs mt-1">عرض تقرير مفصل</div>
          </button>
          <button className="glass-card p-4 text-center hover:scale-105 transition-transform">
            <div className="text-3xl mb-2">📅</div>
            <div className="text-white font-bold">سجل الحضور</div>
            <div className="text-gray-400 text-xs mt-1">عرض سجل الحضور</div>
          </button>
        </div>
      </div>
    </section>
  );
}
