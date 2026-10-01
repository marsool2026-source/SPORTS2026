export default function PartnersSection() {
  const partners = [
    { name: 'نايك', category: 'رعاية رياضية', logo: '✓', tier: 'gold' },
    { name: 'أديداس', category: 'معدات رياضية', logo: '✓', tier: 'gold' },
    { name: 'فودافون', category: 'اتصالات', logo: '✓', tier: 'silver' },
    { name: 'باناسونيك', category: 'إلكترونيات', logo: '✓', tier: 'silver' },
    { name: 'بيوميد', category: 'مكملات غذائية', logo: '✓', tier: 'bronze' },
    { name: 'سبورتنج', category: 'ملابس رياضية', logo: '✓', tier: 'bronze' },
    { name: 'فيتنس فرست', category: 'صالات رياضية', logo: '✓', tier: 'bronze' },
    { name: 'المصرية للاتصالات', category: 'اتصالات', logo: '✓', tier: 'bronze' },
  ];

  const getTierStyle = (tier: string) => {
    const styles = {
      gold: 'from-amber-500/20 to-yellow-500/20 border-amber-500/30',
      silver: 'from-gray-400/20 to-gray-500/20 border-gray-400/30',
      bronze: 'from-orange-700/20 to-orange-800/20 border-orange-700/30',
    };
    return styles[tier as keyof typeof styles];
  };

  const getTierLabel = (tier: string) => {
    const labels = {
      gold: { text: 'شريك ذهبي', color: 'text-amber-400' },
      silver: { text: 'شريك فضي', color: 'text-gray-300' },
      bronze: { text: 'شريك برونزي', color: 'text-orange-400' },
    };
    return labels[tier as keyof typeof labels];
  };

  return (
    <section id="partners" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <span className="text-amber-300 text-xs font-semibold">شركاؤنا</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🤝 شركاء <span className="gradient-text">النجاح</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            نفخر بشراكاتنا مع أفضل العلامات التجارية العالمية والمحلية
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {partners.map((partner, i) => {
            const tierLabel = getTierLabel(partner.tier);
            return (
              <div
                key={i}
                className={`glass-card p-5 text-center hover:scale-105 transition-all bg-gradient-to-br ${getTierStyle(partner.tier)} border`}
              >
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl mx-auto mb-3">
                  {partner.logo}
                </div>
                <h3 className="text-white font-bold text-sm mb-1">{partner.name}</h3>
                <p className="text-gray-400 text-xs mb-2">{partner.category}</p>
                <span className={`text-[10px] font-semibold ${tierLabel.color}`}>
                  {tierLabel.text}
                </span>
              </div>
            );
          })}
        </div>

        {/* Become a Partner CTA */}
        <div className="glass-card p-8 text-center">
          <div className="text-5xl mb-4">🤝</div>
          <h3 className="text-white font-bold text-xl mb-2">هل تريد أن تصبح شريكاً؟</h3>
          <p className="text-gray-400 text-sm mb-6 max-w-xl mx-auto">
            انضم إلى عائلة شركائنا واستفد من الوصول إلى أكثر من 500 لاعب وعائلاتهم. 
            نقدم باقات رعاية مرنة تناسب جميع الميزانيات.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button className="px-6 py-3 bg-gradient-to-l from-amber-500 to-orange-600 text-white text-sm font-bold rounded-lg shadow-lg hover:opacity-90 transition-opacity">
              طلب شراكة
            </button>
            <button className="px-6 py-3 glass-card text-white text-sm rounded-lg hover:bg-white/10 transition-colors">
              تحميل كتيب الشركاء
            </button>
          </div>
        </div>

        {/* Partnership Benefits */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {[
            { icon: '📢', title: 'وصول مباشر', desc: 'وصول إلى 500+ لاعب وعائلة' },
            { icon: '🎯', title: 'استهداف دقيق', desc: 'جمهور رياضي مهتم بالمعدات والملابس' },
            { icon: '📊', title: 'تقارير أداء', desc: 'تقارير شهرية عن تأثير الرعاية' },
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
