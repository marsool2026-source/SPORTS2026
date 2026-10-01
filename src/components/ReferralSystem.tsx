import { useState } from 'react';

interface Referral {
  id: number;
  code: string;
  referrer: string;
  referred: string;
  date: string;
  reward: number;
  status: 'pending' | 'completed';
}

interface ReferralStats {
  totalReferrals: number;
  completedReferrals: number;
  totalRewards: number;
  pendingRewards: number;
}

const referrals: Referral[] = [
  { id: 1, code: 'SA2026-001', referrer: 'أحمد محمد', referred: 'يوسف أحمد', date: '2026-01-15', reward: 100, status: 'completed' },
  { id: 2, code: 'SA2026-002', referrer: 'محمد خالد', referred: 'عمر طارق', date: '2026-01-14', reward: 100, status: 'completed' },
  { id: 3, code: 'SA2026-003', referrer: 'أحمد محمد', referred: 'كريم حسام', date: '2026-01-13', reward: 100, status: 'pending' },
  { id: 4, code: 'SA2026-004', referrer: 'يوسف أحمد', referred: 'زياد إبراهيم', date: '2026-01-12', reward: 100, status: 'completed' },
];

const stats: ReferralStats = {
  totalReferrals: 4,
  completedReferrals: 3,
  totalRewards: 300,
  pendingRewards: 100
};

export default function ReferralSystem() {
  const [userCode] = useState('SA2026-YOU');
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(userCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareReferral = (platform: string) => {
    const message = `انضم إلى أكاديمية الرياضات الاحترافية باستخدام كود الإحالة الخاص بي: ${userCode} واحصل على خصم 10% على الاشتراك الأول!`;
    
    const urls = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(message)}`,
      telegram: `https://t.me/share/url?text=${encodeURIComponent(message)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(message)}`
    };

    window.open(urls[platform as keyof typeof urls], '_blank');
  };

  return (
    <section id="referrals" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-emerald-300 text-xs font-semibold">نظام الإحالات</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🤝 نظام <span className="gradient-text-blue">الإحالات</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            ادعُ أصدقاءك واحصل على مكافآت عند اشتراكهم
          </p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'إجمالي الإحالات', value: stats.totalReferrals, icon: '👥', color: 'from-blue-500 to-cyan-500' },
            { label: 'إحالات مكتملة', value: stats.completedReferrals, icon: '✓', color: 'from-emerald-500 to-teal-500' },
            { label: 'مكافآت مكتسبة', value: `${stats.totalRewards} ج.م`, icon: '💰', color: 'from-amber-500 to-orange-500' },
            { label: 'مكافآت معلقة', value: `${stats.pendingRewards} ج.م`, icon: '⏳', color: 'from-purple-500 to-violet-500' },
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

        {/* Your Referral Code */}
        <div className="glass-card p-6 mb-8">
          <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <span>🎫</span> كود الإحالة الخاص بك
          </h3>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 glass-card-light p-4 text-center">
              <div className="text-3xl font-mono font-black text-emerald-400 mb-1">{userCode}</div>
              <div className="text-gray-400 text-xs">شارك هذا الكود مع أصدقائك</div>
            </div>
            <button
              onClick={copyCode}
              className={`px-6 py-4 rounded-lg font-bold text-sm transition-all ${
                copied
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gradient-to-l from-emerald-500 to-teal-600 text-white hover:opacity-90'
              }`}
            >
              {copied ? '✓ تم النسخ' : '📋 نسخ'}
            </button>
          </div>

          {/* Share Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { platform: 'whatsapp', label: 'واتساب', icon: '💬', color: 'from-green-500 to-emerald-600' },
              { platform: 'telegram', label: 'تيليجرام', icon: '📱', color: 'from-blue-400 to-cyan-500' },
              { platform: 'twitter', label: 'تويتر', icon: '🐦', color: 'from-sky-400 to-blue-500' },
              { platform: 'facebook', label: 'فيسبوك', icon: '📘', color: 'from-blue-600 to-indigo-600' },
            ].map((item) => (
              <button
                key={item.platform}
                onClick={() => shareReferral(item.platform)}
                className={`p-3 bg-gradient-to-br ${item.color} text-white text-sm font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="glass-card p-6 mb-8">
          <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <span>💡</span> كيف يعمل النظام؟
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { step: 1, title: 'شارك كودك', desc: 'شارك كود الإحالة الخاص بك مع أصدقائك', icon: '📤' },
              { step: 2, title: 'يسجل صديقك', desc: 'عندما يسجل صديقك باستخدام كودك', icon: '📝' },
              { step: 3, title: 'تحصل على مكافأة', desc: 'تحصل على 100 ج.م عند اكتمال اشتراكه', icon: '💰' },
            ].map((item) => (
              <div key={item.step} className="glass-card-light p-4 text-center">
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold mx-auto mb-2">
                  {item.step}
                </div>
                <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                <p className="text-gray-400 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Referrals History */}
        <div className="glass-card p-6">
          <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <span>📊</span> سجل الإحالات
          </h3>
          <div className="space-y-3">
            {referrals.map((ref) => (
              <div key={ref.id} className="glass-card-light p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                    ref.status === 'completed' ? 'bg-gradient-to-br from-emerald-500 to-teal-600' : 'bg-gradient-to-br from-amber-500 to-orange-600'
                  }`}>
                    {ref.referred[0]}
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{ref.referred}</div>
                    <div className="text-gray-400 text-xs">{ref.date}</div>
                  </div>
                </div>
                <div className="text-left">
                  <div className={`text-sm font-bold ${
                    ref.status === 'completed' ? 'text-emerald-400' : 'text-amber-400'
                  }`}>
                    +{ref.reward} ج.م
                  </div>
                  <div className={`text-[10px] ${
                    ref.status === 'completed' ? 'text-emerald-400' : 'text-amber-400'
                  }`}>
                    {ref.status === 'completed' ? '✓ مكتمل' : '⏳ معلق'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
