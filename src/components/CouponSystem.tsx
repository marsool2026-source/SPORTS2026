import { useState } from 'react';

interface Coupon {
  id: number;
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minPurchase: number;
  maxUses: number;
  usedCount: number;
  validFrom: string;
  validUntil: string;
  status: 'active' | 'expired' | 'inactive';
  category: 'all' | 'new' | 'loyal' | 'special';
}

const coupons: Coupon[] = [
  {
    id: 1,
    code: 'WELCOME10',
    discount: 10,
    type: 'percentage',
    minPurchase: 500,
    maxUses: 100,
    usedCount: 45,
    validFrom: '2026-01-01',
    validUntil: '2026-02-28',
    status: 'active',
    category: 'new'
  },
  {
    id: 2,
    code: 'LOYAL20',
    discount: 20,
    type: 'percentage',
    minPurchase: 1000,
    maxUses: 50,
    usedCount: 23,
    validFrom: '2026-01-01',
    validUntil: '2026-03-31',
    status: 'active',
    category: 'loyal'
  },
  {
    id: 3,
    code: 'SUMMER50',
    discount: 50,
    type: 'fixed',
    minPurchase: 800,
    maxUses: 30,
    usedCount: 12,
    validFrom: '2026-06-01',
    validUntil: '2026-08-31',
    status: 'active',
    category: 'special'
  },
  {
    id: 4,
    code: 'NEWYEAR15',
    discount: 15,
    type: 'percentage',
    minPurchase: 600,
    maxUses: 80,
    usedCount: 80,
    validFrom: '2025-12-01',
    validUntil: '2026-01-31',
    status: 'expired',
    category: 'all'
  }
];

export default function CouponSystem() {
  const [filter, setFilter] = useState<'all' | 'active' | 'expired'>('all');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const filteredCoupons = coupons.filter(c => {
    if (filter === 'all') return true;
    return c.status === filter;
  });

  const getStatusBadge = (status: Coupon['status']) => {
    const config = {
      active: { label: '✓ نشط', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
      expired: { label: '✗ منتهي', color: 'bg-red-500/20 text-red-300 border-red-500/30' },
      inactive: { label: '⏸ معطل', color: 'bg-gray-500/20 text-gray-300 border-gray-500/30' }
    };
    return config[status];
  };

  const getCategoryLabel = (category: Coupon['category']) => {
    const labels = {
      all: 'الكل',
      new: 'عملاء جدد',
      loyal: 'عملاء مخلصون',
      special: 'عرض خاص'
    };
    return labels[category];
  };

  const totalDiscount = coupons
    .filter(c => c.status === 'active')
    .reduce((sum, c) => sum + (c.usedCount * (c.type === 'percentage' ? c.discount * 10 : c.discount)), 0);

  return (
    <section id="coupons" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
            <span className="text-pink-300 text-xs font-semibold">نظام الكوبونات</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🎫 نظام <span className="gradient-text">الكوبونات والعروض</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            إنشاء وإدارة كوبونات الخصم والعروض الترويجية
          </p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'كوبونات نشطة', value: coupons.filter(c => c.status === 'active').length, icon: '✓', color: 'from-emerald-500 to-teal-500' },
            { label: 'إجمالي الاستخدام', value: coupons.reduce((sum, c) => sum + c.usedCount, 0), icon: '🎫', color: 'from-blue-500 to-cyan-500' },
            { label: 'إجمالي الخصومات', value: `${totalDiscount} ج.م`, icon: '💰', color: 'from-amber-500 to-orange-500' },
            { label: 'كوبونات منتهية', value: coupons.filter(c => c.status === 'expired').length, icon: '✗', color: 'from-red-500 to-orange-500' },
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

        {/* Create Button */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            {[
              { id: 'all', label: 'الكل' },
              { id: 'active', label: 'نشط' },
              { id: 'expired', label: 'منتهي' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  filter === tab.id
                    ? 'bg-gradient-to-l from-pink-500 to-rose-600 text-white'
                    : 'glass-card text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="px-6 py-2 bg-gradient-to-l from-pink-500 to-rose-600 text-white text-sm font-bold rounded-lg hover:opacity-90 transition-opacity"
          >
            + إنشاء كوبون
          </button>
        </div>

        {/* Create Form */}
        {showCreateForm && (
          <div className="glass-card p-6 mb-6 border border-pink-500/30">
            <h3 className="text-white font-bold text-lg mb-4">إنشاء كوبون جديد</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">كود الكوبون</label>
                <input type="text" placeholder="مثال: SUMMER20" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">نوع الخصم</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm">
                  <option value="percentage">نسبة مئوية (%)</option>
                  <option value="fixed">مبلغ ثابت (ج.م)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">قيمة الخصم</label>
                <input type="number" placeholder="20" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">الحد الأدنى للشراء</label>
                <input type="number" placeholder="500" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">تاريخ البداية</label>
                <input type="date" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">تاريخ الانتهاء</label>
                <input type="date" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">الحد الأقصى للاستخدام</label>
                <input type="number" placeholder="100" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">الفئة المستهدفة</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm">
                  <option value="all">الكل</option>
                  <option value="new">عملاء جدد</option>
                  <option value="loyal">عملاء مخلصون</option>
                  <option value="special">عرض خاص</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-2.5 bg-gradient-to-l from-emerald-500 to-teal-600 text-white text-sm font-bold rounded-lg">
                حفظ الكوبون
              </button>
              <button
                onClick={() => setShowCreateForm(false)}
                className="px-6 py-2.5 bg-gray-700 text-white text-sm rounded-lg"
              >
                إلغاء
              </button>
            </div>
          </div>
        )}

        {/* Coupons List */}
        <div className="space-y-4">
          {filteredCoupons.map((coupon) => {
            const status = getStatusBadge(coupon.status);
            const usagePercent = (coupon.usedCount / coupon.maxUses) * 100;
            
            return (
              <div key={coupon.id} className="glass-card p-5 hover:scale-[1.02] transition-transform">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-xl shrink-0">
                      🎫
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-bold text-lg font-mono">{coupon.code}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${status.color}`}>
                          {status.label}
                        </span>
                      </div>
                      <div className="text-gray-400 text-xs">
                        {getCategoryLabel(coupon.category)} • {coupon.validFrom} إلى {coupon.validUntil}
                      </div>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-black text-pink-400">
                      {coupon.discount}{coupon.type === 'percentage' ? '%' : ' ج.م'}
                    </div>
                    <div className="text-gray-400 text-xs">خصم</div>
                  </div>
                </div>

                {/* Usage Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>الاستخدام: {coupon.usedCount}/{coupon.maxUses}</span>
                    <span>{Math.round(usagePercent)}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        usagePercent >= 90 ? 'bg-red-500' : usagePercent >= 70 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${usagePercent}%` }}
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div className="glass-card-light p-2">
                    <div className="text-gray-500">الحد الأدنى</div>
                    <div className="text-white font-semibold">{coupon.minPurchase} ج.م</div>
                  </div>
                  <div className="glass-card-light p-2">
                    <div className="text-gray-500">الاستخدام</div>
                    <div className="text-white font-semibold">{coupon.usedCount}/{coupon.maxUses}</div>
                  </div>
                  <div className="glass-card-light p-2">
                    <div className="text-gray-500">البداية</div>
                    <div className="text-white font-semibold">{coupon.validFrom}</div>
                  </div>
                  <div className="glass-card-light p-2">
                    <div className="text-gray-500">النهاية</div>
                    <div className="text-white font-semibold">{coupon.validUntil}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
