import { useState } from 'react';

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState<'story' | 'why' | 'how'>('story');

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-blue-300 text-xs font-semibold">من نحن</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🏛️ قصتنا <span className="gradient-text-blue">ورؤيتنا</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            تعرف على أكاديمية الرياضات الاحترافية ورحلتنا في بناء أبطال المستقبل
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {[
            { id: 'story', label: '📖 قصتنا' },
            { id: 'why', label: '⭐ لماذا نحن' },
            { id: 'how', label: '🎯 كيف نعمل' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-l from-blue-500 to-cyan-600 text-white shadow-lg'
                  : 'glass-card text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'story' && (
          <div className="space-y-6">
            {/* Story */}
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span>📖</span> قصة الأكاديمية
              </h3>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  تأسست <strong className="text-white">أكاديمية الرياضات الاحترافية</strong> في عام 2014 على يد مجموعة من المدربين المعتمدين دولياً 
                  الذين آمنوا بأن الرياضة ليست مجرد نشاط بدني، بل هي مدرسة للحياة تبني الشخصية وتنمي المهارات.
                </p>
                <p>
                  على مدار 12 عاماً، نجحنا في تخريج أكثر من <strong className="text-emerald-400">500 لاعب محترف</strong>، 
                  وحصلنا على ثقة أكثر من <strong className="text-emerald-400">2000 عائلة</strong> في جميع أنحاء مصر.
                </p>
                <p>
                  اليوم، نفخر بكوننا من أكبر الأكاديميات الرياضية في المنطقة، مع فريق من <strong className="text-emerald-400">25 مدرباً معتمداً</strong> 
                  ومرافق رياضية حديثة تغطي جميع الرياضات.
                </p>
              </div>
            </div>

            {/* Vision & Mission */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card p-6">
                <div className="text-4xl mb-3">🎯</div>
                <h4 className="text-white font-bold text-lg mb-2">رؤيتنا</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  أن نكون الأكاديمية الرياضية الرائدة في المنطقة، ونصنع جيلاً من الأبطال رياضياً وأخلاقياً، 
                  ونساهم في بناء مجتمع صحي ورياضي.
                </p>
              </div>
              <div className="glass-card p-6">
                <div className="text-4xl mb-3">🚀</div>
                <h4 className="text-white font-bold text-lg mb-2">رسالتنا</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  تقديم تجربة رياضية احترافية متكاملة تجمع بين التدريب عالي الجودة، التكنولوجيا الحديثة، 
                  والاهتمام الشخصي بكل لاعب لتحقيق أقصى إمكاناته.
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="glass-card p-6">
              <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <span>💎</span> قيمنا ومبادئنا
              </h4>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: '🏆', title: 'الاحترافية', desc: 'معايير عالمية في كل شيء' },
                  { icon: '🤝', title: 'العمل الجماعي', desc: 'نجاح الفرد من نجاح الفريق' },
                  { icon: '💪', title: 'الانضباط', desc: 'الالتزام هو مفتاح النجاح' },
                  { icon: '🌟', title: 'التميز', desc: 'نسعى دائماً للأفضل' },
                ].map((value, i) => (
                  <div key={i} className="glass-card-light p-4 text-center">
                    <div className="text-3xl mb-2">{value.icon}</div>
                    <h5 className="text-white font-bold text-sm mb-1">{value.title}</h5>
                    <p className="text-gray-400 text-xs">{value.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'why' && (
          <div className="space-y-6">
            {/* Why Choose Us */}
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span>⭐</span> لماذا تختار أكاديميتنا؟
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: '👨‍🏫', title: 'مدربون معتمدون دولياً', desc: 'فريق من أفضل المدربين بشهادات UEFA و FIFA' },
                  { icon: '🏢', title: 'مرافق حديثة', desc: 'ملاعب مجهزة بأحدث المواصفات العالمية' },
                  { icon: '📱', title: 'تكنولوجيا متطورة', desc: 'نظام إداري رقمي متكامل لمتابعة الأداء' },
                  { icon: '🎯', title: 'برامج مخصصة', desc: 'خطط تدريبية فردية حسب مستوى كل لاعب' },
                  { icon: '📊', title: 'تقارير أداء دورية', desc: 'متابعة مستمرة وتقييم دقيق للتطور' },
                  { icon: '🏆', title: 'بطولات منتظمة', desc: 'مشاركات في بطولات محلية ودولية' },
                  { icon: '🚌', title: 'خدمة نقل', desc: 'خطوط نقل آمنة من وإلى الأكاديمية' },
                  { icon: '💰', title: 'أسعار تنافسية', desc: 'باقات مرنة تناسب جميع الميزانيات' },
                ].map((item, i) => (
                  <div key={i} className="glass-card-light p-4 flex items-start gap-3 hover:bg-white/10 transition-colors">
                    <div className="text-2xl">{item.icon}</div>
                    <div>
                      <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                      <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Guarantees */}
            <div className="glass-card p-6">
              <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <span>🛡️</span> ضماناتنا لك
              </h4>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { icon: '💯', title: 'ضمان الرضا', desc: 'استرداد كامل خلال 7 أيام' },
                  { icon: '🔒', title: 'ضمان الجودة', desc: 'معايير تدريب عالمية معتمدة' },
                  { icon: '📈', title: 'ضمان التطور', desc: 'تقدم ملحوظ خلال 3 أشهر' },
                ].map((item, i) => (
                  <div key={i} className="glass-card-light p-4 text-center">
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <h5 className="text-white font-bold text-sm mb-1">{item.title}</h5>
                    <p className="text-gray-400 text-xs">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'how' && (
          <div className="space-y-6">
            {/* How It Works */}
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span>🎯</span> كيف نعمل؟
              </h3>
              <div className="space-y-4">
                {[
                  { step: 1, title: 'التسجيل', desc: 'اختر الباقة المناسبة وسجل عبر التطبيق أو الموقع', icon: '📝', color: 'from-blue-500 to-cyan-500' },
                  { step: 2, title: 'الدفع', desc: 'ادفع عبر المحفظة الإلكترونية أو نقداً (يتم الاعتماد بعد التحقق)', icon: '💳', color: 'from-emerald-500 to-teal-500' },
                  { step: 3, title: 'الكارنيه الرقمي', desc: 'احصل على كارنيهك الرقمي مع QR Code فوري', icon: '🪪', color: 'from-purple-500 to-violet-500' },
                  { step: 4, title: 'التصنيف', desc: 'يتم تصنيفك تلقائياً حسب عمرك ومستواك', icon: '📊', color: 'from-amber-500 to-orange-500' },
                  { step: 5, title: 'التدريب', desc: 'انضم لمجموعتك التدريبية واحضر التدريبات', icon: '⚽', color: 'from-pink-500 to-rose-500' },
                  { step: 6, title: 'المتابعة', desc: 'تابع أداءك عبر التطبيق واحصل على تقارير دورية', icon: '📈', color: 'from-indigo-500 to-blue-500' },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4 glass-card-light p-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-xl font-bold text-white shrink-0 shadow-lg`}>
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">{item.icon}</span>
                        <h4 className="text-white font-bold">{item.title}</h4>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
