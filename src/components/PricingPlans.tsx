import { useState } from 'react';

interface PricingPlan {
  id: number;
  name: string;
  price: number;
  period: string;
  features: string[];
  popular: boolean;
  color: string;
  icon: string;
}

const plans: PricingPlan[] = [
  {
    id: 1,
    name: 'الباقة الأساسية',
    price: 500,
    period: 'شهرياً',
    icon: '🥉',
    color: 'from-gray-500 to-gray-600',
    popular: false,
    features: [
      '✓ 8 حصص تدريبية شهرياً',
      '✓ مدرب معتمد',
      '✓ كارنيه رقمي',
      '✓ تقرير أداء شهري',
      '✗ حصص خاصة',
      '✗ خدمة النقل',
      '✗ منتجات بخصم',
    ],
  },
  {
    id: 2,
    name: 'الباقة المتقدمة',
    price: 800,
    period: 'شهرياً',
    icon: '🥈',
    color: 'from-blue-500 to-cyan-600',
    popular: true,
    features: [
      '✓ 12 حصة تدريبية شهرياً',
      '✓ مدرب معتمد',
      '✓ كارنيه رقمي',
      '✓ تقرير أداء أسبوعي',
      '✓ حصتان خاصتان شهرياً',
      '✗ خدمة النقل',
      '✓ خصم 10% على المنتجات',
    ],
  },
  {
    id: 3,
    name: 'الباقة الاحترافية',
    price: 1200,
    period: 'شهرياً',
    icon: '🥇',
    color: 'from-amber-500 to-orange-600',
    popular: false,
    features: [
      '✓ حصص غير محدودة',
      '✓ مدرب خاص',
      '✓ كارنيه رقمي VIP',
      '✓ تقرير أداء يومي',
      '✓ 4 حصص خاصة شهرياً',
      '✓ خدمة النقل (خط واحد)',
      '✓ خصم 20% على المنتجات',
    ],
  },
];

export default function PricingPlans() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [showCalculator, setShowCalculator] = useState(false);
  const [months, setMonths] = useState(1);

  const getPrice = (basePrice: number) => {
    if (billingPeriod === 'yearly') {
      return Math.round(basePrice * 12 * 0.85); // 15% discount
    }
    return basePrice;
  };

  return (
    <section id="pricing" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <span className="text-amber-300 text-xs font-semibold">الأسعار والباقات</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            💎 الباقات <span className="gradient-text">والأسعار</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            اختر الباقة المناسبة لاحتياجاتك مع خيارات مرنة
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className={`text-sm ${billingPeriod === 'monthly' ? 'text-white' : 'text-gray-400'}`}>شهري</span>
          <button
            onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
            className={`relative w-14 h-7 rounded-full transition-colors ${
              billingPeriod === 'yearly' ? 'bg-emerald-500' : 'bg-gray-600'
            }`}
          >
            <div
              className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${
                billingPeriod === 'yearly' ? 'right-1' : 'left-1'
              }`}
            />
          </button>
          <span className={`text-sm ${billingPeriod === 'yearly' ? 'text-white' : 'text-gray-400'}`}>
            سنوي <span className="text-emerald-400 text-xs">(خصم 15%)</span>
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`glass-card p-6 relative transition-all hover:scale-105 ${
                plan.popular ? 'ring-2 ring-blue-500/50' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-l from-blue-500 to-cyan-600 text-white text-xs font-bold rounded-full shadow-lg">
                  الأكثر شعبية ⭐
                </div>
              )}

              <div className="text-center mb-6">
                <div className="text-4xl mb-2">{plan.icon}</div>
                <h3 className="text-white font-bold text-xl mb-1">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-black text-white">{getPrice(plan.price)}</span>
                  <span className="text-gray-400 text-sm">ج.م</span>
                </div>
                <div className="text-gray-400 text-xs mt-1">
                  {billingPeriod === 'yearly' ? 'سنوياً' : 'شهرياً'}
                </div>
              </div>

              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className={`text-sm ${feature.startsWith('✓') ? 'text-gray-300' : 'text-gray-500'}`}>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-lg font-bold text-sm transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-l from-blue-500 to-cyan-600 text-white shadow-lg hover:opacity-90'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                اشترك الآن
              </button>
            </div>
          ))}
        </div>

        {/* Price Calculator */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              <span>🧮</span> حاسبة الاشتراك
            </h3>
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              className="px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-lg text-amber-300 text-xs font-bold"
            >
              {showCalculator ? 'إخفاء' : 'عرض'}
            </button>
          </div>

          {showCalculator && (
            <div className="glass-card-light p-4">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-2">اختر الباقة</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm">
                    {plans.map(plan => (
                      <option key={plan.id} value={plan.id}>{plan.name} - {plan.price} ج.م</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-2">عدد الأشهر: {months}</label>
                  <input
                    type="range"
                    min="1"
                    max="12"
                    value={months}
                    onChange={(e) => setMonths(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="glass-card p-4 text-center">
                <div className="text-gray-400 text-sm mb-1">المجموع الكلي</div>
                <div className="text-3xl font-black text-amber-400">
                  {plans[0].price * months} ج.م
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {months > 1 && `(${(plans[0].price * months / months).toFixed(0)} ج.م/شهر)`}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Additional Services */}
        <div className="mt-8 glass-card p-6">
          <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <span>➕</span> خدمات إضافية (خارج الباقة)
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { name: 'حصة خاصة', price: '150 ج.م', icon: '👤' },
              { name: 'خدمة النقل', price: '300 ج.م/شهر', icon: '🚌' },
              { name: 'تقرير أداء مفصل', price: '50 ج.م', icon: '📊' },
              { name: 'تسجيل فيديو', price: '100 ج.م', icon: '🎥' },
            ].map((service, i) => (
              <div key={i} className="glass-card-light p-3 text-center hover:bg-white/10 transition-colors">
                <div className="text-2xl mb-1">{service.icon}</div>
                <div className="text-white text-sm font-semibold">{service.name}</div>
                <div className="text-emerald-400 text-xs mt-1">{service.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
