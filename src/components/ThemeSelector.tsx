import { useState } from 'react';
import { useTheme, Theme } from '../contexts/ThemeContext';

export default function ThemeSelector() {
  const { theme, setTheme, themes } = useTheme();
  const [previewTheme, setPreviewTheme] = useState<Theme | null>(null);

  return (
    <section id="theme-selector" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
            <span className="text-pink-300 text-xs font-semibold">ثيمات متعددة</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🎨 اختر <span className="gradient-text">ثيم التطبيق</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            5 تصميمات زجاجية عصرية مختلفة — مرر الماوس للمعاينة، اضغط للتطبيق
          </p>
        </div>

        {/* Themes Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {themes.map((t) => {
            const isActive = theme.id === t.id;
            const isPreviewing = previewTheme?.id === t.id;

            return (
              <div
                key={t.id}
                onClick={() => setTheme(t)}
                onMouseEnter={() => setPreviewTheme(t)}
                onMouseLeave={() => setPreviewTheme(null)}
                className={`relative glass-card p-6 cursor-pointer transition-all duration-500 group ${
                  isActive
                    ? 'ring-2 ring-white/50 scale-105 shadow-2xl'
                    : 'hover:scale-105 hover:shadow-xl'
                }`}
                style={{
                  background: isPreviewing || isActive
                    ? t.preview
                    : 'rgba(255, 255, 255, 0.05)',
                }}
              >
                {/* Active Badge */}
                {isActive && (
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm shadow-lg shadow-emerald-500/50 z-10">
                    ✓
                  </div>
                )}

                {/* Theme Preview Circle */}
                <div
                  className="w-20 h-20 rounded-2xl mx-auto mb-4 shadow-2xl border-2 border-white/20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                  style={{ background: t.preview }}
                />

                {/* Theme Info */}
                <div className="text-center">
                  <h3 className="text-white font-bold text-lg mb-1">{t.nameAr}</h3>
                  <p className="text-white/70 text-xs mb-2">{t.name}</p>
                  <p className="text-white/60 text-xs leading-relaxed">{t.description}</p>
                </div>

                {/* Color Palette */}
                <div className="flex justify-center gap-1 mt-4">
                  {t.preview.split(',').map((color, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full border border-white/30"
                      style={{ background: color.trim() }}
                    />
                  ))}
                </div>

                {/* Apply Button */}
                <button
                  className={`mt-4 w-full py-2 rounded-lg text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                >
                  {isActive ? '✓ مُطبّق حالياً' : 'اضغط للتطبيق'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Live Preview */}
        <div className="glass-card p-6 md:p-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span>👁️</span> معاينة حية — الثيم المختار
          </h3>

          {/* Preview Card */}
          <div
            className="rounded-2xl p-8 transition-all duration-500"
            style={{
              background: theme.preview,
              boxShadow: `0 20px 60px -15px ${theme.glowColor}80`,
            }}
          >
            {/* Sample UI Elements */}
            <div className="bg-black/30 backdrop-blur-xl rounded-xl p-6 border border-white/20">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-xl">
                    🏆
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">أكاديمية الرياضات</h4>
                    <p className="text-white/60 text-xs">{theme.nameAr}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur" />
                  <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur" />
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { label: 'حاضر', value: '18', icon: '✓' },
                  { label: 'غائب', value: '2', icon: '✗' },
                  { label: 'الإجمالي', value: '20', icon: '👥' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur rounded-lg p-3 text-center border border-white/10">
                    <div className="text-white/60 text-[10px] mb-1">{stat.label}</div>
                    <div className="text-white text-xl font-bold">{stat.value}</div>
                    <div className="text-lg mt-1">{stat.icon}</div>
                  </div>
                ))}
              </div>

              {/* Sample Button */}
              <button className="w-full py-3 bg-white/20 backdrop-blur border border-white/30 rounded-xl text-white text-sm font-bold hover:bg-white/30 transition-colors">
                تسجيل الحضور 📷
              </button>
            </div>
          </div>

          {/* Theme Details */}
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <div className="glass-card-light p-4">
              <div className="text-xs text-gray-400 mb-1">اسم الثيم</div>
              <div className="text-white font-bold">{theme.nameAr}</div>
              <div className="text-gray-400 text-xs mt-1">{theme.name}</div>
            </div>
            <div className="glass-card-light p-4">
              <div className="text-xs text-gray-400 mb-1">الوصف</div>
              <div className="text-white text-sm">{theme.description}</div>
            </div>
            <div className="glass-card-light p-4">
              <div className="text-xs text-gray-400 mb-1">الألوان الأساسية</div>
              <div className="flex gap-1 mt-2">
                {theme.preview.split(',').map((color, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-lg border border-white/20"
                    style={{ background: color.trim() }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {[
            { icon: '🎨', title: 'استخراج من الشعار', desc: 'المحرك يستخرج الألوان من شعار الأكاديمية المرفوع' },
            { icon: '⚡', title: 'تطبيق فوري', desc: 'التغيير يطبق على جميع الواجهات لحظياً' },
            { icon: '💾', title: 'حفظ تلقائي', desc: 'يتم حفظ الثيم المختار وتطبيقه في كل زيارة' },
          ].map((item, i) => (
            <div key={i} className="glass-card p-4 text-center">
              <div className="text-3xl mb-2">{item.icon}</div>
              <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
              <p className="text-gray-400 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
