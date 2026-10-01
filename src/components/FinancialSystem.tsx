import { useState } from 'react';

interface Transaction {
  id: number;
  type: 'subscription' | 'product';
  player: string;
  amount: number;
  method: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}

const initialTransactions: Transaction[] = [
  { id: 1, type: 'subscription', player: 'أحمد محمد علي', amount: 500, method: 'فودافون كاش', status: 'pending', date: '2026-01-15' },
  { id: 2, type: 'subscription', player: 'محمد خالد حسن', amount: 500, method: 'فودافون كاش', status: 'pending', date: '2026-01-15' },
  { id: 3, type: 'product', player: 'يوسف أحمد سعيد', amount: 250, method: 'انستاباي', status: 'pending', date: '2026-01-14' },
  { id: 4, type: 'subscription', player: 'عمر طارق محمود', amount: 500, method: 'فودافون كاش', status: 'approved', date: '2026-01-13' },
];

export default function FinancialSystem() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);

  const pendingCount = transactions.filter(t => t.status === 'pending').length;
  const approvedCount = transactions.filter(t => t.status === 'approved').length;
  const totalPending = transactions.filter(t => t.status === 'pending').reduce((s, t) => s + t.amount, 0);
  const totalApproved = transactions.filter(t => t.status === 'approved').reduce((s, t) => s + t.amount, 0);

  const approveTransaction = (id: number) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: 'approved' as const } : t));
    setSelectedTx(null);
  };

  const rejectTransaction = (id: number) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: 'rejected' as const } : t));
    setSelectedTx(null);
  };

  return (
    <section id="financial" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <span className="text-amber-300 text-xs font-semibold">نظام محاسبي متكامل</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            💰 النظام <span className="gradient-text">المالي والمحاسبي</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            شجرة حسابات بقيد مزدوج + محافظ إلكترونية + اعتماد مالي مزدوج صارم
          </p>
        </div>

        {/* Key Features */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {[
            { icon: '📊', title: 'شجرة الحسابات', desc: 'قيد مزدوج احترافي: أصول، حقوق ملكية، إيرادات، مصروفات', color: 'from-amber-500 to-orange-500' },
            { icon: '💳', title: 'المحافظ الإلكترونية', desc: 'فودافون كاش وغيرها مع رفع الإيصالات واعتماد مزدوج', color: 'from-emerald-500 to-teal-500' },
            { icon: '🔐', title: 'الاعتماد المزدوج', desc: 'لا يُفعَّل الاشتراك إلا بعد موافقة المدير المالي', color: 'from-purple-500 to-violet-500' },
          ].map((item, i) => (
            <div key={i} className="glass-card p-5 hover:scale-[1.02] transition-transform">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-xl mb-3 shadow-lg`}>
                {item.icon}
              </div>
              <h3 className="text-white font-bold mb-1">{item.title}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Important Notice: Payment Policy */}
        <div className="glass-card p-5 mb-8 border border-amber-500/30 bg-amber-500/5">
          <div className="flex items-start gap-3">
            <span className="text-3xl">🔒</span>
            <div>
              <h4 className="text-amber-300 font-bold text-sm mb-2">سياسة السداد المعتمدة</h4>
              <div className="text-gray-300 text-xs leading-relaxed space-y-2">
                <p>
                  <strong className="text-white">1. رفع الإيصال:</strong> يقوم ولي الأمر برفع صورة إيصال التحويل من المحفظة الإلكترونية.
                </p>
                <p>
                  <strong className="text-white">2. حالة "معلق":</strong> يبقى الاشتراك في حالة <span className="text-amber-300 font-bold">"معلق بانتظار الاعتماد"</span> ولا يتم تفعيله تلقائياً.
                </p>
                <p>
                  <strong className="text-white">3. التحقق الفعلي:</strong> يقوم المدير المالي بالتحقق من وصول المبلغ فعلياً إلى محفظة الأكاديمية.
                </p>
                <p>
                  <strong className="text-white">4. الاعتماد النهائي:</strong> فقط بعد التأكد من وصول التحويل، يتم <span className="text-emerald-300 font-bold">اعتماد الدفع وتفعيل الاشتراك</span>.
                </p>
                <p className="text-amber-200 font-semibold mt-2">
                  ⚠️ لا يمكن للإداري التشغيلي تجاوز هذه السياسة أو تفعيل الاشتراكات مالياً.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Demo: Financial Manager Dashboard */}
        <div className="glass-card p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span>💼</span> لوحة المدير المالي — محاكاة حية
            </h3>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              <span className="text-amber-300 text-xs">مباشر</span>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="glass-card-light p-4 border border-amber-500/20">
              <div className="text-xs text-gray-400 mb-1">بانتظار الاعتماد</div>
              <div className="text-2xl font-bold text-amber-400">{pendingCount}</div>
              <div className="text-[10px] text-gray-500">تحويلات</div>
            </div>
            <div className="glass-card-light p-4 border border-emerald-500/20">
              <div className="text-xs text-gray-400 mb-1">تم اعتماده</div>
              <div className="text-2xl font-bold text-emerald-400">{approvedCount}</div>
              <div className="text-[10px] text-gray-500">تحويلات</div>
            </div>
            <div className="glass-card-light p-4 border border-blue-500/20">
              <div className="text-xs text-gray-400 mb-1">مبالغ معلقة</div>
              <div className="text-2xl font-bold text-blue-400">{totalPending}</div>
              <div className="text-[10px] text-gray-500">جنيه</div>
            </div>
            <div className="glass-card-light p-4 border border-purple-500/20">
              <div className="text-xs text-gray-400 mb-1">إيرادات معتمدة</div>
              <div className="text-2xl font-bold text-purple-400">{totalApproved}</div>
              <div className="text-[10px] text-gray-500">جنيه</div>
            </div>
          </div>

          {/* Transactions List */}
          <div className="space-y-2">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                onClick={() => {
                  if (tx.status === 'pending') {
                    setSelectedTx(tx);
                    setShowReceipt(true);
                  }
                }}
                className={`glass-card-light p-4 flex items-center justify-between gap-3 transition-all ${
                  tx.status === 'pending' ? 'cursor-pointer hover:bg-white/10' : 'opacity-70'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
                    tx.type === 'subscription' ? 'bg-blue-500/20' : 'bg-purple-500/20'
                  }`}>
                    {tx.type === 'subscription' ? '📋' : '🛒'}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{tx.player}</div>
                    <div className="text-[10px] text-gray-500">
                      {tx.type === 'subscription' ? 'اشتراك شهري' : 'منتج (MEGA PROTEIN)'} • {tx.method}
                    </div>
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-white">{tx.amount} ج.م</div>
                  <div className={`text-[10px] font-semibold ${
                    tx.status === 'pending' ? 'text-amber-400' :
                    tx.status === 'approved' ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {tx.status === 'pending' ? '⏳ معلق' : tx.status === 'approved' ? '✓ معتمد' : '✗ مرفوض'}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Approval Modal */}
          {showReceipt && selectedTx && (
            <div className="mt-6 glass-card-light p-5 border border-amber-500/30">
              <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                <span>🧾</span> مراجعة إيصال التحويل
              </h4>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                  <div className="text-xs text-gray-500 mb-2">صورة الإيصال</div>
                  <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center border border-dashed border-gray-600">
                    <div className="text-center">
                      <div className="text-3xl mb-1">📱</div>
                      <div className="text-[10px] text-gray-500">Vodafone Cash</div>
                      <div className="text-xs text-emerald-400 font-bold mt-1">{selectedTx.amount} ج.م</div>
                      <div className="text-[10px] text-gray-500 mt-1">Ref: VC-{selectedTx.id}84729</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="glass-card-light p-3">
                    <div className="text-[10px] text-gray-500">المستفيد</div>
                    <div className="text-sm text-white font-semibold">أكاديمية الرياضات</div>
                  </div>
                  <div className="glass-card-light p-3">
                    <div className="text-[10px] text-gray-500">المبلغ</div>
                    <div className="text-sm text-amber-400 font-bold">{selectedTx.amount} ج.م</div>
                  </div>
                  <div className="glass-card-light p-3">
                    <div className="text-[10px] text-gray-500">طريقة الدفع</div>
                    <div className="text-sm text-white">{selectedTx.method}</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => approveTransaction(selectedTx.id)}
                  className="flex-1 py-2.5 bg-gradient-to-l from-emerald-500 to-teal-600 text-white text-sm font-bold rounded-lg hover:opacity-90 transition-opacity"
                >
                  ✓ اعتماد وتفعيل الاشتراك
                </button>
                <button
                  onClick={() => rejectTransaction(selectedTx.id)}
                  className="flex-1 py-2.5 bg-red-500/20 border border-red-500/30 text-red-300 text-sm font-bold rounded-lg hover:bg-red-500/30 transition-colors"
                >
                  ✗ رفض
                </button>
                <button
                  onClick={() => { setShowReceipt(false); setSelectedTx(null); }}
                  className="px-4 py-2.5 bg-gray-700 text-white text-sm rounded-lg hover:bg-gray-600 transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Accounting Tree */}
        <div className="mt-8 glass-card p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span>🌳</span> شجرة الحسابات الأكاديمية
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { title: 'الأصول', icon: '🏦', color: 'border-blue-500/30 bg-blue-500/5', items: ['نقدية', 'بنك', 'مستحقات'] },
              { title: 'حقوق الملكية', icon: '👥', color: 'border-purple-500/30 bg-purple-500/5', items: ['رأس المال', 'جاري الشركاء'] },
              { title: 'الإيرادات', icon: '💵', color: 'border-emerald-500/30 bg-emerald-500/5', items: ['اشتراكات', 'مبيعات منتجات', 'بطولات'] },
              { title: 'المصروفات', icon: '💸', color: 'border-red-500/30 bg-red-500/5', items: ['رواتب', 'إيجارات', 'باصات', 'صيانة'] },
            ].map((cat, i) => (
              <div key={i} className={`rounded-xl border p-4 ${cat.color}`}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{cat.icon}</span>
                  <h4 className="text-white font-bold text-sm">{cat.title}</h4>
                </div>
                <div className="space-y-1">
                  {cat.items.map((item, j) => (
                    <div key={j} className="text-xs text-gray-300 flex items-center gap-2">
                      <span className="w-1 h-1 bg-gray-500 rounded-full" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
