import { useState } from 'react';

// ============================================
// 🎯 نظام التنبؤ بالنتائج
// ============================================
export function PredictionSystem() {
  const predictions = [
    { id: 1, event: 'مباراة الفريق أ vs الفريق ب', prediction: 'فوز الفريق أ', confidence: 78, odds: '1.85', date: '2026-01-25' },
    { id: 2, event: 'أحمد محمد - 100 متر', prediction: 'رقم قياسي جديد', confidence: 85, odds: '2.10', date: '2026-01-22' },
    { id: 3, event: 'محمد خالد - اختبار اللياقة', prediction: 'نتيجة ممتازة', confidence: 92, odds: '1.45', date: '2026-01-23' },
    { id: 4, event: 'يوسف أحمد - بطولة السباحة', prediction: 'المركز الأول', confidence: 67, odds: '3.20', date: '2026-01-28' },
  ];

  return (
    <section id="predictions" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
            <span className="text-orange-300 text-xs font-semibold">Predictions</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🎯 نظام التنبؤ بالنتائج
          </h2>
          <p className="text-gray-400">تنبؤات ذكية بنتائج المباريات والأداء</p>
        </div>

        <div className="space-y-4">
          {predictions.map((pred) => (
            <div key={pred.id} className="glass-card p-6 hover:scale-[1.01] transition-transform">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-white font-bold">{pred.event}</h3>
                  <p className="text-gray-400 text-sm">{pred.date}</p>
                </div>
                <div className="text-left">
                  <div className="text-orange-400 font-bold text-lg">{pred.prediction}</div>
                  <div className="text-gray-400 text-xs">Odds: {pred.odds}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-l from-orange-500 to-red-600"
                    style={{ width: `${pred.confidence}%` }}
                  />
                </div>
                <span className="text-orange-400 font-bold">{pred.confidence}%</span>
              </div>
              <div className="text-gray-400 text-xs mt-2">نسبة الثقة</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// 🗺️ نظام الخرائط التفاعلية المتقدم
// ============================================
export function InteractiveMaps() {
  const locations = [
    { id: 1, name: 'الفرع الرئيسي', address: 'القاهرة - مدينة نصر', distance: '2.5 كم', facilities: 8, icon: '🏢' },
    { id: 2, name: 'ملعب التدريب', address: 'القاهرة - المعادي', distance: '5.2 كم', facilities: 3, icon: '⚽' },
    { id: 3, name: 'المسبح الأولمبي', address: 'القاهرة - الزمالك', distance: '8.7 كم', facilities: 2, icon: '🏊' },
    { id: 4, name: 'صالة اللياقة', address: 'القاهرة - هليوبوليس', distance: '3.1 كم', facilities: 5, icon: '🏋️' },
  ];

  return (
    <section id="interactive-maps" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-300 text-xs font-semibold">Maps</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🗺️ الخرائط التفاعلية المتقدمة
          </h2>
          <p className="text-gray-400">اكتشف الفروع والمرافق القريبة منك</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Map View */}
          <div className="glass-card p-6">
            <div className="aspect-square bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl flex items-center justify-center relative overflow-hidden">
              <div className="text-center">
                <div className="text-8xl mb-4">🗺️</div>
                <div className="text-white font-bold">خريطة تفاعلية</div>
                <div className="text-gray-400 text-sm mt-2">{locations.length} مواقع</div>
              </div>
              {/* Location Markers */}
              {locations.map((loc, i) => (
                <div
                  key={loc.id}
                  className="absolute text-2xl animate-bounce"
                  style={{
                    top: `${20 + i * 20}%`,
                    left: `${20 + i * 15}%`,
                    animationDelay: `${i * 0.2}s`
                  }}
                >
                  📍
                </div>
              ))}
            </div>
          </div>

          {/* Locations List */}
          <div className="space-y-3">
            {locations.map((location) => (
              <div key={location.id} className="glass-card p-4 hover:scale-[1.02] transition-transform cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{location.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-sm">{location.name}</h3>
                    <p className="text-gray-400 text-xs">{location.address}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs">
                      <span className="text-green-400">📍 {location.distance}</span>
                      <span className="text-gray-400">🏢 {location.facilities} مرافق</span>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300 text-xs">
                    اتجاهات
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// 🌍 نظام تعدد اللغات المتقدم
// ============================================
export function AdvancedMultiLanguage() {
  const [selectedLanguage, setSelectedLanguage] = useState('ar');

  const languages = [
    { code: 'ar', name: 'العربية', flag: '🇸🇦', progress: 100, direction: 'RTL' },
    { code: 'en', name: 'English', flag: '🇺🇸', progress: 100, direction: 'LTR' },
    { code: 'fr', name: 'Français', flag: '🇫🇷', progress: 95, direction: 'LTR' },
    { code: 'es', name: 'Español', flag: '🇪🇸', progress: 90, direction: 'LTR' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪', progress: 85, direction: 'LTR' },
    { code: 'zh', name: '中文', flag: '🇨🇳', progress: 80, direction: 'LTR' },
    { code: 'ja', name: '日本語', flag: '🇯🇵', progress: 75, direction: 'LTR' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺', progress: 70, direction: 'LTR' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷', progress: 65, direction: 'LTR' },
    { code: 'pt', name: 'Português', flag: '🇵🇹', progress: 60, direction: 'LTR' },
  ];

  return (
    <section id="advanced-multilang" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
            <span className="text-indigo-300 text-xs font-semibold">20+ Languages</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🌍 نظام تعدد اللغات المتقدم
          </h2>
          <p className="text-gray-400">دعم 20+ لغة مع ترجمة تلقائية وتوطين كامل</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-4 text-center">
            <div className="text-3xl mb-2">🌐</div>
            <div className="text-2xl font-black text-indigo-400">{languages.length}+</div>
            <div className="text-gray-400 text-xs">لغة مدعومة</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl mb-2">📝</div>
            <div className="text-2xl font-black text-purple-400">5,000+</div>
            <div className="text-gray-400 text-xs">كلمة مترجمة</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-2xl font-black text-pink-400">98%</div>
            <div className="text-gray-400 text-xs">دقة الترجمة</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl mb-2">⚡</div>
            <div className="text-2xl font-black text-amber-400">&lt;1s</div>
            <div className="text-gray-400 text-xs">وقت التبديل</div>
          </div>
        </div>

        {/* Languages Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {languages.map((lang) => (
            <div
              key={lang.code}
              onClick={() => setSelectedLanguage(lang.code)}
              className={`glass-card p-4 cursor-pointer transition-all ${
                selectedLanguage === lang.code ? 'ring-2 ring-indigo-500/50' : ''
              }`}
            >
              <div className="text-center">
                <div className="text-4xl mb-2">{lang.flag}</div>
                <h3 className="text-white font-bold text-sm">{lang.name}</h3>
                <div className="text-gray-400 text-xs mt-1">{lang.direction}</div>
                <div className="mt-2 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-l from-indigo-500 to-purple-600" style={{ width: `${lang.progress}%` }} />
                </div>
                <div className="text-indigo-400 text-xs mt-1">{lang.progress}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// 💎 نظام الاشتراكات المتقدم
// ============================================
export function AdvancedSubscriptions() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'الأساسية',
      icon: '🥉',
      monthlyPrice: 500,
      yearlyPrice: 5000,
      features: ['8 حصص شهرياً', 'مدرب معتمد', 'كارنيه رقمي', 'تقرير شهري'],
      color: 'from-gray-500 to-gray-600',
      popular: false,
    },
    {
      name: 'المتقدمة',
      icon: '🥈',
      monthlyPrice: 800,
      yearlyPrice: 8000,
      features: ['12 حصة شهرياً', 'مدرب معتمد', 'تقرير أسبوعي', 'حصتان خاصتان', 'خصم 10%'],
      color: 'from-blue-500 to-cyan-600',
      popular: true,
    },
    {
      name: 'الاحترافية',
      icon: '🥇',
      monthlyPrice: 1200,
      yearlyPrice: 12000,
      features: ['حصص غير محدودة', 'مدرب خاص', 'تقرير يومي', '4 حصص خاصة', 'خدمة نقل', 'خصم 20%'],
      color: 'from-amber-500 to-orange-600',
      popular: false,
    },
  ];

  return (
    <section id="advanced-subscriptions" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <span className="text-amber-300 text-xs font-semibold">Subscriptions</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            💎 نظام الاشتراكات المتقدم
          </h2>
          <p className="text-gray-400">باقات مرنة مع خصومات سنوية</p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center gap-3 mb-8">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-3 rounded-lg font-bold transition-all ${
              billingCycle === 'monthly'
                ? 'bg-gradient-to-l from-amber-500 to-orange-600 text-white'
                : 'glass-card text-gray-400'
            }`}
          >
            شهري
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-6 py-3 rounded-lg font-bold transition-all ${
              billingCycle === 'yearly'
                ? 'bg-gradient-to-l from-amber-500 to-orange-600 text-white'
                : 'glass-card text-gray-400'
            }`}
          >
            سنوي <span className="text-emerald-400 text-xs">(خصم 17%)</span>
          </button>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`glass-card p-6 relative ${plan.popular ? 'ring-2 ring-amber-500/50' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-l from-amber-500 to-orange-600 text-white text-xs font-bold rounded-full">
                  ⭐ الأكثر شعبية
                </div>
              )}
              <div className="text-center mb-6">
                <div className="text-5xl mb-3">{plan.icon}</div>
                <h3 className="text-white font-bold text-xl mb-2">{plan.name}</h3>
                <div className="text-4xl font-black text-white">
                  {billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                  <span className="text-lg text-gray-400"> ج.م</span>
                </div>
                <div className="text-gray-400 text-sm">
                  /{billingCycle === 'monthly' ? 'شهر' : 'سنة'}
                </div>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                    <span className="text-emerald-400">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-lg font-bold transition-all ${
                plan.popular
                  ? 'bg-gradient-to-l from-amber-500 to-orange-600 text-white'
                  : 'glass-card-light text-white hover:bg-white/10'
              }`}>
                اشترك الآن
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// 🎁 نظام الهدايا والتبرعات
// ============================================
export function GiftsAndDonations() {
  const [selectedGift, setSelectedGift] = useState<number | null>(null);

  const gifts = [
    { id: 1, name: 'قميص الفريق', price: 150, icon: '👕', category: 'ملابس' },
    { id: 2, name: 'حذاء رياضي', price: 450, icon: '👟', category: 'معدات' },
    { id: 3, name: 'حقيبة رياضية', price: 200, icon: '🎒', category: 'إكسسوارات' },
    { id: 4, name: 'زجاجة مياه', price: 50, icon: '💧', category: 'إكسسوارات' },
    { id: 5, name: 'MEGA PROTEIN', price: 350, icon: '🥤', category: 'تغذية' },
    { id: 6, name: 'كرة قدم', price: 250, icon: '⚽', category: 'معدات' },
  ];

  const donationCampaigns = [
    { id: 1, title: 'دعم اللاعبين المحتاجين', raised: 15000, goal: 25000, donors: 45, icon: '❤️' },
    { id: 2, title: 'تطوير المرافق', raised: 45000, goal: 100000, donors: 123, icon: '🏗️' },
    { id: 3, title: 'معدات رياضية جديدة', raised: 8000, goal: 15000, donors: 67, icon: '🏋️' },
  ];

  return (
    <section id="gifts-donations" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
            <span className="text-pink-300 text-xs font-semibold">Gifts & Donations</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🎁 الهدايا والتبرعات
          </h2>
          <p className="text-gray-400">أرسل هدايا للاعبين أو تبرع لدعم الأكاديمية</p>
        </div>

        {/* Gifts Section */}
        <div className="glass-card p-6 mb-8">
          <h3 className="text-white font-bold text-lg mb-4">🎁 الهدايا المتاحة</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gifts.map((gift) => (
              <div
                key={gift.id}
                onClick={() => setSelectedGift(gift.id)}
                className={`glass-card-light p-4 cursor-pointer transition-all ${
                  selectedGift === gift.id ? 'ring-2 ring-pink-500/50' : ''
                }`}
              >
                <div className="text-center">
                  <div className="text-5xl mb-2">{gift.icon}</div>
                  <h4 className="text-white font-bold text-sm">{gift.name}</h4>
                  <div className="text-gray-400 text-xs">{gift.category}</div>
                  <div className="text-pink-400 font-bold mt-2">{gift.price} ج.م</div>
                </div>
              </div>
            ))}
          </div>
          {selectedGift && (
            <button className="w-full mt-4 py-3 bg-gradient-to-l from-pink-500 to-rose-600 text-white font-bold rounded-lg">
              🎁 إرسال هدية
            </button>
          )}
        </div>

        {/* Donation Campaigns */}
        <div className="glass-card p-6">
          <h3 className="text-white font-bold text-lg mb-4">❤️ حملات التبرع</h3>
          <div className="space-y-4">
            {donationCampaigns.map((campaign) => {
              const progress = (campaign.raised / campaign.goal) * 100;
              return (
                <div key={campaign.id} className="glass-card-light p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-3xl">{campaign.icon}</div>
                    <div className="flex-1">
                      <h4 className="text-white font-bold">{campaign.title}</h4>
                      <div className="text-gray-400 text-xs">{campaign.donors} متبرع</div>
                    </div>
                    <div className="text-left">
                      <div className="text-emerald-400 font-bold">{campaign.raised.toLocaleString()} ج.م</div>
                      <div className="text-gray-400 text-xs">من {campaign.goal.toLocaleString()} ج.م</div>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-l from-pink-500 to-rose-600" style={{ width: `${progress}%` }} />
                  </div>
                  <button className="w-full mt-3 py-2 bg-pink-500/20 border border-pink-500/30 rounded-lg text-pink-300 text-sm font-bold">
                    ❤️ تبرع الآن
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
