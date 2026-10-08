import { useState } from 'react';

interface Invoice {
  id: number;
  invoiceNumber: string;
  player: string;
  amount: number;
  date: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  items: { description: string; quantity: number; price: number }[];
}

const invoices: Invoice[] = [
  {
    id: 1,
    invoiceNumber: 'INV-2026-001',
    player: 'أحمد محمد علي',
    amount: 500,
    date: '2026-01-15',
    dueDate: '2026-01-30',
    status: 'paid',
    items: [
      { description: 'اشتراك شهري - الباقة الأساسية', quantity: 1, price: 500 }
    ]
  },
  {
    id: 2,
    invoiceNumber: 'INV-2026-002',
    player: 'محمد خالد حسن',
    amount: 800,
    date: '2026-01-14',
    dueDate: '2026-01-29',
    status: 'pending',
    items: [
      { description: 'اشتراك شهري - الباقة المتقدمة', quantity: 1, price: 800 }
    ]
  },
  {
    id: 3,
    invoiceNumber: 'INV-2026-003',
    player: 'يوسف أحمد سعيد',
    amount: 1200,
    date: '2026-01-13',
    dueDate: '2026-01-28',
    status: 'overdue',
    items: [
      { description: 'اشتراك شهري - الباقة الاحترافية', quantity: 1, price: 1000 },
      { description: 'خدمة النقل', quantity: 1, price: 200 }
    ]
  },
  {
    id: 4,
    invoiceNumber: 'INV-2026-004',
    player: 'عمر طارق محمود',
    amount: 650,
    date: '2026-01-12',
    dueDate: '2026-01-27',
    status: 'paid',
    items: [
      { description: 'اشتراك شهري - الباقة المتقدمة', quantity: 1, price: 500 },
      { description: 'MEGA PROTEIN', quantity: 1, price: 150 }
    ]
  }
];

export default function InvoiceSystem() {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [filter, setFilter] = useState<'all' | 'paid' | 'pending' | 'overdue'>('all');

  const filteredInvoices = invoices.filter(inv => {
    if (filter === 'all') return true;
    return inv.status === filter;
  });

  const getStatusBadge = (status: Invoice['status']) => {
    const config = {
      paid: { label: '✓ مدفوع', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
      pending: { label: '⏳ معلق', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
      overdue: { label: '⚠ متأخر', color: 'bg-red-500/20 text-red-300 border-red-500/30' }
    };
    return config[status];
  };

  const totalPaid = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0);
  const totalPending = invoices.filter(i => i.status === 'pending').reduce((sum, i) => sum + i.amount, 0);
  const totalOverdue = invoices.filter(i => i.status === 'overdue').reduce((sum, i) => sum + i.amount, 0);

  const exportInvoice = (invoice: Invoice) => {
    const content = `
فاتورة رقم: ${invoice.invoiceNumber}
التاريخ: ${invoice.date}
اللاعب: ${invoice.player}

البنود:
${invoice.items.map(item => `- ${item.description}: ${item.quantity} × ${item.price} ج.م`).join('\n')}

الإجمالي: ${invoice.amount} ج.م
الحالة: ${invoice.status === 'paid' ? 'مدفوع' : invoice.status === 'pending' ? 'معلق' : 'متأخر'}
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${invoice.invoiceNumber}.txt`;
    a.click();
  };

  return (
    <section id="invoices" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-blue-300 text-xs font-semibold">نظام الفواتير</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            📄 نظام <span className="gradient-text-blue">الفواتير</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            إدارة الفواتير والمدفوعات والتقارير المالية
          </p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'إجمالي المدفوع', value: `${totalPaid} ج.م`, icon: '✓', color: 'from-emerald-500 to-teal-500' },
            { label: 'معلق', value: `${totalPending} ج.م`, icon: '⏳', color: 'from-amber-500 to-orange-500' },
            { label: 'متأخر', value: `${totalOverdue} ج.م`, icon: '⚠', color: 'from-red-500 to-orange-500' },
            { label: 'عدد الفواتير', value: invoices.length, icon: '📄', color: 'from-blue-500 to-cyan-500' },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-5 text-center hover:scale-105 transition-transform">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl mx-auto mb-3 shadow-lg`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'all', label: 'الكل' },
            { id: 'paid', label: '✓ مدفوع' },
            { id: 'pending', label: '⏳ معلق' },
            { id: 'overdue', label: '⚠ متأخر' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                filter === tab.id
                  ? 'bg-gradient-to-l from-blue-500 to-cyan-600 text-white'
                  : 'glass-card text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Invoices List */}
        <div className="space-y-4">
          {filteredInvoices.map((invoice) => {
            const status = getStatusBadge(invoice.status);
            return (
              <div key={invoice.id} className="glass-card p-5 hover:scale-[1.02] transition-transform">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-xl shrink-0">
                      📄
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-bold font-mono">{invoice.invoiceNumber}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${status.color}`}>
                          {status.label}
                        </span>
                      </div>
                      <div className="text-gray-400 text-sm">{invoice.player}</div>
                      <div className="text-gray-500 text-xs mt-1">
                        التاريخ: {invoice.date} • الاستحقاق: {invoice.dueDate}
                      </div>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-black text-blue-400">{invoice.amount} ج.م</div>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => setSelectedInvoice(invoice)}
                        className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded text-blue-300 text-xs hover:bg-blue-500/30 transition-colors"
                      >
                        عرض
                      </button>
                      <button
                        onClick={() => exportInvoice(invoice)}
                        className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded text-emerald-300 text-xs hover:bg-emerald-500/30 transition-colors"
                      >
                        تصدير
                      </button>
                    </div>
                  </div>
                </div>

                {/* Items Preview */}
                <div className="glass-card-light p-3">
                  <div className="text-xs text-gray-400 mb-2">البنود:</div>
                  <div className="space-y-1">
                    {invoice.items.map((item, i) => (
                      <div key={i} className="flex justify-between text-xs">
                        <span className="text-gray-300">{item.description}</span>
                        <span className="text-white font-semibold">{item.quantity} × {item.price} ج.م</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Invoice Details Modal */}
        {selectedInvoice && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-white font-bold text-2xl mb-1">فاتورة</h3>
                    <p className="text-blue-400 font-mono text-lg">{selectedInvoice.invoiceNumber}</p>
                  </div>
                  <button
                    onClick={() => setSelectedInvoice(null)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                  >
                    ✕
                  </button>
                </div>

                {/* Invoice Info */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="glass-card-light p-3">
                    <div className="text-xs text-gray-400 mb-1">اللاعب</div>
                    <div className="text-white font-semibold">{selectedInvoice.player}</div>
                  </div>
                  <div className="glass-card-light p-3">
                    <div className="text-xs text-gray-400 mb-1">الحالة</div>
                    <div className={`font-semibold ${
                      selectedInvoice.status === 'paid' ? 'text-emerald-400' :
                      selectedInvoice.status === 'pending' ? 'text-amber-400' : 'text-red-400'
                    }`}>
                      {selectedInvoice.status === 'paid' ? 'مدفوع' : selectedInvoice.status === 'pending' ? 'معلق' : 'متأخر'}
                    </div>
                  </div>
                  <div className="glass-card-light p-3">
                    <div className="text-xs text-gray-400 mb-1">تاريخ الإصدار</div>
                    <div className="text-white font-semibold">{selectedInvoice.date}</div>
                  </div>
                  <div className="glass-card-light p-3">
                    <div className="text-xs text-gray-400 mb-1">تاريخ الاستحقاق</div>
                    <div className="text-white font-semibold">{selectedInvoice.dueDate}</div>
                  </div>
                </div>

                {/* Items */}
                <div className="mb-6">
                  <h4 className="text-white font-bold mb-3">البنود</h4>
                  <div className="glass-card-light overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="p-3 text-right text-gray-400 text-xs font-normal">الوصف</th>
                          <th className="p-3 text-center text-gray-400 text-xs font-normal">الكمية</th>
                          <th className="p-3 text-center text-gray-400 text-xs font-normal">السعر</th>
                          <th className="p-3 text-left text-gray-400 text-xs font-normal">الإجمالي</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedInvoice.items.map((item, i) => (
                          <tr key={i} className="border-b border-white/5">
                            <td className="p-3 text-gray-300 text-sm">{item.description}</td>
                            <td className="p-3 text-center text-white text-sm">{item.quantity}</td>
                            <td className="p-3 text-center text-white text-sm">{item.price} ج.م</td>
                            <td className="p-3 text-left text-white font-semibold text-sm">{item.quantity * item.price} ج.م</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Total */}
                <div className="glass-card-light p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold text-lg">الإجمالي</span>
                    <span className="text-3xl font-black text-blue-400">{selectedInvoice.amount} ج.م</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => exportInvoice(selectedInvoice)}
                    className="flex-1 py-3 bg-gradient-to-l from-emerald-500 to-teal-600 text-white text-sm font-bold rounded-lg"
                  >
                    📥 تصدير الفاتورة
                  </button>
                  <button
                    onClick={() => setSelectedInvoice(null)}
                    className="px-6 py-3 bg-gray-700 text-white text-sm rounded-lg"
                  >
                    إغلاق
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
