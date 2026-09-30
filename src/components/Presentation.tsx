import { useState } from 'react';

interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  type: 'title' | 'content' | 'section' | 'list' | 'table' | 'flow' | 'end';
}

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const slides: Slide[] = [
    // Slide 1: Title
    {
      id: 1,
      title: 'منظومة أكاديمية الرياضات الاحترافية',
      subtitle: 'دليل مرجعي شامل ومفصل',
      type: 'title',
      content: (
        <div className="text-center space-y-6">
          <div className="text-8xl mb-8">🏆</div>
          <div className="text-2xl text-gray-300">الإصدار 5.0.0 - النسخة النهائية الكاملة</div>
          <div className="text-xl text-gray-400 mt-8">55+ مكوناً | 100+ وحدة تطويرية | جاهز للإنتاج</div>
        </div>
      )
    },
    // Slide 2: Contents
    {
      id: 2,
      title: 'المحتويات',
      type: 'content',
      content: (
        <div className="grid md:grid-cols-2 gap-4 text-right">
          <div className="space-y-2">
            <div className="text-lg font-bold text-blue-400">1. المقدمة</div>
            <div className="text-lg font-bold text-blue-400">2. الرؤية والرسالة</div>
            <div className="text-lg font-bold text-blue-400">3. الهيكل العام</div>
            <div className="text-lg font-bold text-blue-400">4. الأقسام الرئيسية</div>
            <div className="text-lg font-bold text-blue-400">5. التكامل بين الأقسام</div>
          </div>
          <div className="space-y-2">
            <div className="text-lg font-bold text-purple-400">6. السياسات والقواعد</div>
            <div className="text-lg font-bold text-purple-400">7. الأدوار والصلاحيات</div>
            <div className="text-lg font-bold text-purple-400">8. التدفق الكامل</div>
            <div className="text-lg font-bold text-purple-400">9. التقنيات المستخدمة</div>
            <div className="text-lg font-bold text-purple-400">10. التوافق والأمان</div>
          </div>
        </div>
      )
    },
    // Slide 3: Introduction
    {
      id: 3,
      title: 'المقدمة',
      type: 'content',
      content: (
        <div className="space-y-6 text-right">
          <div className="glass-card-light p-6">
            <h3 className="text-xl font-bold text-white mb-3">ما هي المنظومة؟</h3>
            <p className="text-gray-300 leading-relaxed">
              منصة مؤسسية متكاملة لإدارة الأكاديميات الرياضية بمستوى احترافي عالمي، تجمع بين العمليات التشغيلية، الشق المالي، وتجربة المستخدم المتطورة.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="glass-card-light p-4 text-center">
              <div className="text-4xl mb-2">🎮</div>
              <div className="text-white font-bold mb-1">العمليات التشغيلية</div>
              <div className="text-gray-400 text-sm">اللاعبين، المدربين، الحضور</div>
            </div>
            <div className="glass-card-light p-4 text-center">
              <div className="text-4xl mb-2">💰</div>
              <div className="text-white font-bold mb-1">الشق المالي</div>
              <div className="text-gray-400 text-sm">شجرة حسابات، محافظ إلكترونية</div>
            </div>
            <div className="glass-card-light p-4 text-center">
              <div className="text-4xl mb-2">🎨</div>
              <div className="text-white font-bold mb-1">تجربة المستخدم</div>
              <div className="text-gray-400 text-sm">واجهات زجاجية، كارنيهات رقمية</div>
            </div>
          </div>
        </div>
      )
    },
    // Slide 4: Vision & Mission
    {
      id: 4,
      title: 'الرؤية والرسالة',
      type: 'content',
      content: (
        <div className="space-y-6">
          <div className="glass-card-light p-6">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-xl font-bold text-white mb-3">الرؤية</h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              "أن نكون الأكاديمية الرياضية الرائدة في المنطقة، ونصنع جيلاً من الأبطال رياضياً وأخلاقياً، ونساهم في بناء مجتمع صحي ورياضي."
            </p>
          </div>
          <div className="glass-card-light p-6">
            <div className="text-3xl mb-3">🚀</div>
            <h3 className="text-xl font-bold text-white mb-3">الرسالة</h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              "تقديم تجربة رياضية احترافية متكاملة تجمع بين التدريب عالي الجودة، التكنولوجيا الحديثة، والاهتمام الشخصي بكل لاعب لتحقيق أقصى إمكاناته."
            </p>
          </div>
        </div>
      )
    },
    // Slide 5: Values
    {
      id: 5,
      title: 'القيم والمبادئ',
      type: 'content',
      content: (
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: '🏆', title: 'الاحترافية', desc: 'معايير عالمية في كل شيء' },
            { icon: '🤝', title: 'العمل الجماعي', desc: 'نجاح الفرد من نجاح الفريق' },
            { icon: '💪', title: 'الانضباط', desc: 'الالتزام هو مفتاح النجاح' },
            { icon: '🌟', title: 'التميز', desc: 'نسعى دائماً للأفضل' },
            { icon: '🔒', title: 'الشفافية', desc: 'وضوح في جميع المعاملات' },
            { icon: '🎯', title: 'الجودة', desc: 'لا نقبل إلا الأفضل' },
          ].map((value, i) => (
            <div key={i} className="glass-card-light p-5 text-center">
              <div className="text-5xl mb-3">{value.icon}</div>
              <h4 className="text-white font-bold text-lg mb-2">{value.title}</h4>
              <p className="text-gray-400">{value.desc}</p>
            </div>
          ))}
        </div>
      )
    },
    // Slide 6: Architecture
    {
      id: 6,
      title: 'الهيكل المعماري',
      type: 'content',
      content: (
        <div className="space-y-4">
          {[
            { layer: 'طبقة العرض', icon: '🖥️', color: 'from-blue-500 to-cyan-500', items: ['واجهات المستخدم', 'التصميم المتجاوب', 'الثيمات الديناميكية'] },
            { layer: 'طبقة المنطق', icon: '⚙️', color: 'from-purple-500 to-violet-500', items: ['نظام الصلاحيات', 'محرك القيد المزدوج', 'الاعتماد المالي', 'الذكاء الاصطناعي'] },
            { layer: 'طبقة البيانات', icon: '🗄️', color: 'from-amber-500 to-orange-500', items: ['PostgreSQL', 'تخزين الملفات', 'المصادقة الآمنة', 'Realtime'] },
            { layer: 'طبقة التوافق', icon: '🔧', color: 'from-emerald-500 to-teal-500', items: ['StorageManager', 'NotificationManager', 'PlatformDetector', 'SafeAPI'] },
          ].map((item, i) => (
            <div key={i} className="glass-card-light p-4 flex items-center gap-4">
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-3xl shrink-0`}>
                {item.icon}
              </div>
              <div className="flex-1">
                <h4 className="text-white font-bold text-lg mb-2">{item.layer}</h4>
                <div className="flex flex-wrap gap-2">
                  {item.items.map((subItem, j) => (
                    <span key={j} className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300">
                      {subItem}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )
    },
    // Slide 7: Login System
    {
      id: 7,
      title: 'نظام تسجيل الدخول',
      type: 'content',
      content: (
        <div className="space-y-6">
          <div className="glass-card-light p-6">
            <h3 className="text-xl font-bold text-white mb-4">🚪 الوصف</h3>
            <p className="text-gray-300 leading-relaxed">
              واجهة التطبيق الأولى بتصميم زجاجي عصري وتدرجات لونية هادئة وجذابة، مع تأثيرات حركية واقتصاص سلس عند التبديل بين وضع تسجيل الدخول وإنشاء حساب جديد.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass-card-light p-5">
              <h4 className="text-white font-bold mb-3">✨ المميزات</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>✅ تأثيرات حركية سلسة</li>
                <li>✅ دعم ثنائي اللغة (عربي/إنجليزي)</li>
                <li>✅ تسجيل دخول اجتماعي</li>
                <li>✅ انتقال سلس للوحة التحكم</li>
                <li>✅ تصميم زجاجي عصري</li>
              </ul>
            </div>
            <div className="glass-card-light p-5">
              <h4 className="text-white font-bold mb-3">🔄 التدفق</h4>
              <ol className="space-y-2 text-gray-300 text-sm">
                <li>1️⃣ المستخدم يفتح التطبيق</li>
                <li>2️⃣ يرى شاشة تسجيل الدخول</li>
                <li>3️⃣ يدخل بياناته</li>
                <li>4️⃣ يضغط "تسجيل الدخول"</li>
                <li>5️⃣ النظام يتحقق</li>
                <li>6️⃣ يتم توجيهه للوحة التحكم</li>
              </ol>
            </div>
          </div>
        </div>
      )
    },
    // Slide 8: Digital Card
    {
      id: 8,
      title: 'الكارنيه الرقمي + QR Code',
      type: 'content',
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass-card-light p-5">
              <h4 className="text-white font-bold mb-3">🪪 الملف الشخصي</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>✅ أرشفة كاملة لبيانات اللاعبين</li>
                <li>✅ رفع الصور الشخصية</li>
                <li>✅ بيانات الاتصال والعنوان</li>
                <li>✅ التاريخ الصحي والإصابات</li>
              </ul>
            </div>
            <div className="glass-card-light p-5">
              <h4 className="text-white font-bold mb-3">🔢 الترقيم التسلسلي</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>✅ كود تسلسلي فريد لكل لاعب</li>
                <li>✅ مرتبط بسنة الميلاد</li>
                <li>✅ مثال: SA-2014-PL-1234</li>
                <li>✅ للتصنيف والبطولات</li>
              </ul>
            </div>
          </div>
          <div className="glass-card-light p-5">
            <h4 className="text-white font-bold mb-3">📱 الكارنيه الرقمي</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-300 text-sm mb-3">
                  بطاقة تعريفية ذكية تحتوي على:
                </p>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>• صورة اللاعب</li>
                  <li>• الاسم الكامل</li>
                  <li>• النشاط الرياضي</li>
                  <li>• الكود التسلسلي</li>
                  <li>• تاريخ الانتهاء</li>
                  <li>• QR Code فريد</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg p-4 text-center">
                <div className="text-6xl mb-2">🪪</div>
                <div className="text-white font-bold">كارنيه رقمي</div>
                <div className="text-gray-400 text-xs mt-1">مع QR Code تلقائي</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    // Slide 9: Attendance System
    {
      id: 9,
      title: 'نظام الحضور عبر QR Code',
      type: 'content',
      content: (
        <div className="space-y-6">
          <div className="glass-card-light p-6">
            <h3 className="text-xl font-bold text-white mb-4">📱 كيف يعمل النظام؟</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { step: '1', title: 'QR فريد', desc: 'كل لاعب يحصل على QR Code فريد في الكارنيه' },
                { step: '2', title: 'المسح', desc: 'المدرب يمسح الكود عبر الكاميرا' },
                { step: '3', title: 'التسجيل', desc: 'يُسجَّل الحضور تلقائياً مع الوقت' },
              ].map((item, i) => (
                <div key={i} className="glass-card p-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                    {item.step}
                  </div>
                  <h4 className="text-white font-bold mb-2">{item.title}</h4>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass-card-light p-5">
              <h4 className="text-white font-bold mb-3">⚡ المميزات التقنية</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>✅ تسجيل فوري بدون إنترنت</li>
                <li>✅ QR مشفر لا يمكن تزويره</li>
                <li>✅ التحقق من الموقع الجغرافي</li>
                <li>✅ يعمل على جميع الأجهزة</li>
                <li>✅ تقارير فورية للإدارة</li>
              </ul>
            </div>
            <div className="glass-card-light p-5">
              <h4 className="text-white font-bold mb-3">🔄 التدفق الكامل</h4>
              <div className="text-gray-300 text-sm space-y-1">
                <div>اللاعب يصل → المدرب يمسح QR →</div>
                <div>يُسجَّل الحضور → تُحدَّث الإحصائيات →</div>
                <div>تُرسل التقارير → ولي الأمر receives إشعار</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    // Slide 10: Communication
    {
      id: 10,
      title: 'نظام التواصل التدريبي',
      type: 'content',
      content: (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="glass-card-light p-5">
            <div className="text-4xl mb-3">💬</div>
            <h4 className="text-white font-bold text-lg mb-3">شات فوري</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>✅ محادثة جماعية وفردية</li>
              <li>✅ رسائل مع حالات</li>
              <li>✅ بحث في المحادثات</li>
              <li>✅ إرسال فوري</li>
            </ul>
          </div>
          <div className="glass-card-light p-5">
            <div className="text-4xl mb-3">📞</div>
            <h4 className="text-white font-bold text-lg mb-3">مكالمات صوتية</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>✅ شاشة اتصال متحركة</li>
              <li>✅ عداد وقت المكالمة</li>
              <li>✅ أزرار تحكم</li>
              <li>✅ جودة HD</li>
            </ul>
          </div>
          <div className="glass-card-light p-5">
            <div className="text-4xl mb-3">🎥</div>
            <h4 className="text-white font-bold text-lg mb-3">مكالمات فيديو</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>✅ شاشة فيديو جماعية</li>
              <li>✅ عرض المشاركين</li>
              <li>✅ أزرار تحكم</li>
              <li>✅ حتى 50 مشارك</li>
            </ul>
          </div>
          <div className="glass-card-light p-5">
            <div className="text-4xl mb-3">📎</div>
            <h4 className="text-white font-bold text-lg mb-3">مشاركة ملفات</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>✅ رفع صور</li>
              <li>✅ رفع PDF</li>
              <li>✅ رفع فيديو</li>
              <li>✅ رفع صوت</li>
            </ul>
          </div>
        </div>
      )
    },
    // Slide 11: Financial System
    {
      id: 11,
      title: 'النظام المالي والمحاسبي',
      type: 'content',
      content: (
        <div className="space-y-6">
          <div className="glass-card-light p-5">
            <h4 className="text-white font-bold mb-3">📊 شجرة الحسابات</h4>
            <div className="grid md:grid-cols-4 gap-3">
              {[
                { title: 'الأصول', items: ['نقدية', 'بنك', 'مستحقات'] },
                { title: 'حقوق الملكية', items: ['رأس المال', 'جاري الشركاء'] },
                { title: 'الإيرادات', items: ['اشتراكات', 'منتجات', 'بطولات'] },
                { title: 'المصروفات', items: ['رواتب', 'إيجارات', 'باصات'] },
              ].map((cat, i) => (
                <div key={i} className="glass-card p-3">
                  <div className="text-white font-bold text-sm mb-2">{cat.title}</div>
                  <div className="space-y-1">
                    {cat.items.map((item, j) => (
                      <div key={j} className="text-gray-400 text-xs">• {item}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card-light p-5 border border-amber-500/30">
            <h4 className="text-amber-300 font-bold mb-3">⚠️ الاعتماد المالي المزدوج</h4>
            <div className="space-y-2 text-gray-300 text-sm">
              <div>1️⃣ رفع الإيصال: ولي الأمر يرفع صورة إيصال التحويل</div>
              <div>2️⃣ حالة "معلق": يبقى الاشتراك معلقاً حتى الاعتماد</div>
              <div>3️⃣ التحقق الفعلي: المدير المالي يتحقق من وصول المبلغ</div>
              <div>4️⃣ الاعتماد النهائي: فقط بعد التأكد يتم تفعيل الاشتراك</div>
              <div className="text-amber-300 font-bold mt-3">
                ⚠️ لا يمكن للإداري التشغيلي تجاوز هذه السياسة
              </div>
            </div>
          </div>
        </div>
      )
    },
    // Slide 12: World Records
    {
      id: 12,
      title: 'نظام الأرقام القياسية العالمية',
      type: 'content',
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-5 gap-3">
            {[
              { icon: '⚡', title: 'السرعة', color: 'from-blue-500 to-cyan-500' },
              { icon: '💪', title: 'القوة', color: 'from-red-500 to-orange-500' },
              { icon: '🔥', title: 'التحمل', color: 'from-emerald-500 to-teal-500' },
              { icon: '🎯', title: 'الدقة', color: 'from-purple-500 to-violet-500' },
              { icon: '🤸', title: 'الرشاقة', color: 'from-amber-500 to-yellow-500' },
            ].map((cat, i) => (
              <div key={i} className="glass-card-light p-4 text-center">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl mx-auto mb-2`}>
                  {cat.icon}
                </div>
                <div className="text-white font-bold text-sm">{cat.title}</div>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass-card-light p-5">
              <h4 className="text-white font-bold mb-3">🌍 الأرقام العالمية</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>✅ 10 رياضات مختلفة</li>
                <li>✅ 10 أرقام قياسية عالمية</li>
                <li>✅ مقارنة مع المعايير</li>
                <li>✅ فلترة حسب الرياضة</li>
              </ul>
            </div>
            <div className="glass-card-light p-5">
              <h4 className="text-white font-bold mb-3">👤 الأرقام الشخصية</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>✅ تسجيل الأرقام الشخصية</li>
                <li>✅ تتبع التحسينات</li>
                <li>✅ مقارنة مع العالمية</li>
                <li>✅ رسوم بيانية للتطور</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    // Slide 13: AI Analysis
    {
      id: 13,
      title: 'نظام الذكاء الاصطناعي',
      type: 'content',
      content: (
        <div className="grid md:grid-cols-3 gap-4">
          <div className="glass-card-light p-5">
            <div className="text-4xl mb-3">💡</div>
            <h4 className="text-white font-bold text-lg mb-3">الرؤى الذكية</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>✅ تحليل الأداء التلقائي</li>
              <li>✅ اكتشاف الأنماط</li>
              <li>✅ توصيات ذكية</li>
              <li>✅ تنبؤات بالإصابات</li>
              <li>✅ نسبة الثقة</li>
            </ul>
          </div>
          <div className="glass-card-light p-5">
            <div className="text-4xl mb-3">📊</div>
            <h4 className="text-white font-bold text-lg mb-3">تحليل اللاعبين</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>✅ التقييم العام (0-100)</li>
              <li>✅ نقاط القوة</li>
              <li>✅ نقاط الضعف</li>
              <li>✅ التوصيات المخصصة</li>
              <li>✅ مستوى خطر الإصابة</li>
            </ul>
          </div>
          <div className="glass-card-light p-5">
            <div className="text-4xl mb-3">🔮</div>
            <h4 className="text-white font-bold text-lg mb-3">التنبؤات</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>✅ تنبؤ بالأرقام</li>
              <li>✅ تنبؤ بالإصابات</li>
              <li>✅ تنبؤ بالأداء</li>
              <li>✅ نسبة دقة التنبؤ</li>
            </ul>
            <div className="mt-4 glass-card p-3 text-center">
              <div className="text-2xl font-black text-purple-400">94%</div>
              <div className="text-gray-400 text-xs">دقة التنبؤ</div>
            </div>
          </div>
        </div>
      )
    },
    // Slide 14: Live Streaming
    {
      id: 14,
      title: 'نظام البث المباشر',
      type: 'content',
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass-card-light p-5">
              <div className="text-4xl mb-3">📹</div>
              <h4 className="text-white font-bold text-lg mb-3">البث المباشر</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>✅ بث التدريبات مباشرة</li>
                <li>✅ بث البطولات</li>
                <li>✅ تسجيل وحفظ البث</li>
                <li>✅ إعادة المشاهدة</li>
              </ul>
            </div>
            <div className="glass-card-light p-5">
              <div className="text-4xl mb-3">💬</div>
              <h4 className="text-white font-bold text-lg mb-3">الدردشة المباشرة</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>✅ دردشة أثناء البث</li>
                <li>✅ تفاعل مع المدربين</li>
                <li>✅ تفاعل مع اللاعبين</li>
                <li>✅ سجل المحادثات</li>
              </ul>
            </div>
          </div>
          <div className="glass-card-light p-5">
            <h4 className="text-white font-bold mb-3">📊 الإحصائيات</h4>
            <div className="grid md:grid-cols-4 gap-3">
              {[
                { label: 'بث مباشر', value: '2', icon: '🔴' },
                { label: 'مشاهدون', value: '558', icon: '👥' },
                { label: 'بث قادم', value: '1', icon: '⏰' },
                { label: 'إجمالي الساعات', value: '48', icon: '⏱️' },
              ].map((stat, i) => (
                <div key={i} className="glass-card p-3 text-center">
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-gray-400 text-xs">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    // Slide 15: Referral System
    {
      id: 15,
      title: 'نظام الإحالات',
      type: 'content',
      content: (
        <div className="space-y-6">
          <div className="glass-card-light p-5">
            <h4 className="text-white font-bold mb-3">🎫 كيف يعمل النظام؟</h4>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { step: '1', title: 'شارك كودك', desc: 'شارك كود الإحالة مع أصدقائك', icon: '📤' },
                { step: '2', title: 'يسجل صديقك', desc: 'عندما يسجل باستخدام كودك', icon: '📝' },
                { step: '3', title: 'تحصل على مكافأة', desc: '100 ج.م عند اكتمال الاشتراك', icon: '💰' },
              ].map((item, i) => (
                <div key={i} className="glass-card p-4 text-center">
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
          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass-card-light p-5">
              <h4 className="text-white font-bold mb-3">📱 المشاركة</h4>
              <div className="grid grid-cols-2 gap-2">
                {['💬 واتساب', '📱 تيليجرام', '🐦 تويتر', '📘 فيسبوك'].map((platform, i) => (
                  <div key={i} className="glass-card p-2 text-center text-sm text-gray-300">
                    {platform}
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card-light p-5">
              <h4 className="text-white font-bold mb-3">📊 الإحصائيات</h4>
              <div className="space-y-2 text-gray-300 text-sm">
                <div className="flex justify-between">
                  <span>إجمالي الإحالات:</span>
                  <span className="font-bold">4</span>
                </div>
                <div className="flex justify-between">
                  <span>إحالات مكتملة:</span>
                  <span className="font-bold text-emerald-400">3</span>
                </div>
                <div className="flex justify-between">
                  <span>مكافآت مكتسبة:</span>
                  <span className="font-bold text-amber-400">300 ج.م</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    // Slide 16: Coupon System
    {
      id: 16,
      title: 'نظام الكوبونات',
      type: 'content',
      content: (
        <div className="space-y-6">
          <div className="glass-card-light p-5">
            <h4 className="text-white font-bold mb-3">🎫 إنشاء كوبونات</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-gray-300 font-semibold mb-2">المعلومات الأساسية:</h5>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>• كود الكوبون</li>
                  <li>• نوع الخصم (نسبة / مبلغ ثابت)</li>
                  <li>• قيمة الخصم</li>
                  <li>• الحد الأدنى للشراء</li>
                </ul>
              </div>
              <div>
                <h5 className="text-gray-300 font-semibold mb-2">التواريخ والحدود:</h5>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>• تاريخ البداية</li>
                  <li>• تاريخ النهاية</li>
                  <li>• الحد الأقصى للاستخدام</li>
                  <li>• الفئة المستهدفة</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="glass-card-light p-5">
            <h4 className="text-white font-bold mb-3">🎯 الفئات المستهدفة</h4>
            <div className="grid md:grid-cols-4 gap-3">
              {[
                { label: 'الكل', icon: '👥' },
                { label: 'عملاء جدد', icon: '🆕' },
                { label: 'عملاء مخلصون', icon: '⭐' },
                { label: 'عرض خاص', icon: '🎁' },
              ].map((cat, i) => (
                <div key={i} className="glass-card p-3 text-center">
                  <div className="text-2xl mb-1">{cat.icon}</div>
                  <div className="text-white text-sm font-semibold">{cat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    // Slide 17: Invoice System
    {
      id: 17,
      title: 'نظام الفواتير',
      type: 'content',
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="glass-card-light p-5">
              <div className="text-3xl mb-2">📄</div>
              <h4 className="text-white font-bold mb-2">إنشاء الفواتير</h4>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• رقم الفاتورة تلقائي</li>
                <li>• بيانات اللاعب</li>
                <li>• البنود والكميات</li>
                <li>• الإجمالي</li>
              </ul>
            </div>
            <div className="glass-card-light p-5">
              <div className="text-3xl mb-2">📊</div>
              <h4 className="text-white font-bold mb-2">حالات الفاتورة</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  <span className="text-gray-300 text-sm">✓ مدفوع</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                  <span className="text-gray-300 text-sm">⏳ معلق</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="text-gray-300 text-sm">⚠ متأخر</span>
                </div>
              </div>
            </div>
            <div className="glass-card-light p-5">
              <div className="text-3xl mb-2">📥</div>
              <h4 className="text-white font-bold mb-2">التصدير</h4>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• تصدير PDF</li>
                <li>• تصدير Excel</li>
                <li>• تصدير TXT</li>
                <li>• تقارير مالية</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    // Slide 18: Integration Flow
    {
      id: 18,
      title: 'التكامل بين الأقسام',
      type: 'content',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white mb-4">🔄 السيناريو الكامل</h3>
          <div className="space-y-3">
            {[
              { step: 1, title: 'تسجيل لاعب جديد', desc: 'يُولد الكود التسلسلي + QR + الكارنيه', icon: '📝' },
              { step: 2, title: 'اختيار الباقة والدفع', desc: 'يدفع عبر المحفظة → الحالة: معلق', icon: '💳' },
              { step: 3, title: 'اعتماد مالي', desc: 'المدير المالي يراجع ويعتمد', icon: '✓' },
              { step: 4, title: 'تصنيف اللاعب', desc: 'يصنف تلقائياً حسب سنة الميلاد', icon: '📊' },
              { step: 5, title: 'تسجيل الحضور', desc: 'المدرب يمسح QR → يُسجَّل الحضور', icon: '📱' },
              { step: 6, title: 'تحليل الأداء', desc: 'الذكاء الاصطناعي يحلل ويقدم توصيات', icon: '🤖' },
            ].map((item) => (
              <div key={item.step} className="glass-card-light p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shrink-0">
                  {item.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{item.icon}</span>
                    <h4 className="text-white font-bold">{item.title}</h4>
                  </div>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    // Slide 19: Roles & Permissions
    {
      id: 19,
      title: 'الأدوار والصلاحيات',
      type: 'content',
      content: (
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { icon: '👑', title: 'المدير العام', permissions: ['تحكم كامل', 'إدارة جميع الأقسام', 'التقارير التنفيذية'] },
            { icon: '💼', title: 'المدير المالي', permissions: ['اعتماد المدفوعات', 'التقارير المالية', 'شجرة الحسابات'] },
            { icon: '🏅', title: 'المدرب', permissions: ['إدارة التدريبات', 'تسجيل الحضور', 'تتبع الأداء'] },
            { icon: '📋', title: 'الإداري', permissions: ['العمليات اليومية', 'إدارة اللاعبين', 'الجدولة'] },
            { icon: '⚽', title: 'اللاعب', permissions: ['عرض الكارنيه', 'الجدول', 'الدفع'] },
          ].map((role, i) => (
            <div key={i} className="glass-card-light p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-4xl">{role.icon}</div>
                <h4 className="text-white font-bold text-lg">{role.title}</h4>
              </div>
              <ul className="space-y-1 text-gray-300 text-sm">
                {role.permissions.map((perm, j) => (
                  <li key={j}>✅ {perm}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )
    },
    // Slide 20: Technologies
    {
      id: 20,
      title: 'التقنيات المستخدمة',
      type: 'content',
      content: (
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { title: 'Frontend', techs: ['React 18', 'TypeScript', 'Tailwind CSS', 'Vite'] },
            { title: 'State', techs: ['React Context', 'useState', 'Lazy Loading'] },
            { title: 'Charts', techs: ['Recharts', 'Chart.js', 'Custom'] },
            { title: 'Communication', techs: ['WebRTC', 'Socket.io', 'Push'] },
            { title: 'Database', techs: ['PostgreSQL', 'Supabase', 'IndexedDB'] },
            { title: 'Security', techs: ['JWT', 'OAuth 2.0', 'Encryption'] },
          ].map((cat, i) => (
            <div key={i} className="glass-card-light p-4">
              <h4 className="text-white font-bold mb-3">{cat.title}</h4>
              <div className="flex flex-wrap gap-2">
                {cat.techs.map((tech, j) => (
                  <span key={j} className="px-2 py-1 bg-white/5 rounded text-xs text-gray-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )
    },
    // Slide 21: Compatibility
    {
      id: 21,
      title: 'التوافق عبر المنصات',
      type: 'content',
      content: (
        <div className="space-y-6">
          <div className="glass-card-light p-5">
            <h4 className="text-white font-bold mb-4">✅ مدعوم بالكامل على:</h4>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { platform: 'Android', details: 'Chrome, Firefox, Samsung' },
                { platform: 'iOS', details: 'Safari, Chrome' },
                { platform: 'Windows', details: 'Chrome, Firefox, Edge' },
                { platform: 'macOS', details: 'Safari, Chrome, Firefox' },
                { platform: 'Linux', details: 'Chrome, Firefox' },
                { platform: 'Web', details: 'جميع المتصفحات' },
              ].map((item, i) => (
                <div key={i} className="glass-card p-3">
                  <div className="text-white font-bold mb-1">{item.platform}</div>
                  <div className="text-gray-400 text-xs">{item.details}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card-light p-5">
            <h4 className="text-white font-bold mb-3">🔧 طبقة التوافق الشاملة</h4>
            <div className="grid md:grid-cols-2 gap-3">
              {['StorageManager', 'NotificationManager', 'PlatformDetector', 'SafeAPI', 'ViewportHelper', 'AccessibilityHelper', 'ErrorHandler'].map((comp, i) => (
                <div key={i} className="glass-card p-2 text-center text-sm text-gray-300">
                  {comp}
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    // Slide 22: Security
    {
      id: 22,
      title: 'الأمان والحماية',
      type: 'content',
      content: (
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { title: 'المصادقة', items: ['JWT Tokens', 'OAuth 2.0', 'Session Management'] },
            { title: 'التفويض', items: ['RBAC', 'Permission Checks', 'Resource Security'] },
            { title: 'حماية البيانات', items: ['Encryption at Rest', 'Encryption in Transit', 'Secure Headers'] },
            { title: 'حماية من الهجمات', items: ['XSS Protection', 'CSRF Protection', 'SQL Injection'] },
          ].map((cat, i) => (
            <div key={i} className="glass-card-light p-5">
              <h4 className="text-white font-bold mb-3">{cat.title}</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                {cat.items.map((item, j) => (
                  <li key={j}>✅ {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )
    },
    // Slide 23: Statistics
    {
      id: 23,
      title: 'الإحصائيات والأرقام',
      type: 'content',
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { label: 'المكونات', value: '55+', icon: '📦' },
              { label: 'الوحدات التطويرية', value: '100+', icon: '⚙️' },
              { label: 'مراحل التطوير', value: '6', icon: '🎯' },
              { label: 'الأدوار', value: '5', icon: '👥' },
              { label: 'الثيمات', value: '5', icon: '🎨' },
              { label: 'الصور AI', value: '6', icon: '🖼️' },
            ].map((stat, i) => (
              <div key={i} className="glass-card-light p-5 text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="glass-card-light p-5">
            <h4 className="text-white font-bold mb-3">📊 الأداء</h4>
            <div className="grid md:grid-cols-4 gap-3">
              {[
                { label: 'وقت التحميل', value: '< 3s' },
                { label: 'FCP', value: '< 1.5s' },
                { label: 'LCP', value: '< 2.5s' },
                { label: 'CLS', value: '< 0.1' },
              ].map((metric, i) => (
                <div key={i} className="glass-card p-3 text-center">
                  <div className="text-xl font-bold text-emerald-400">{metric.value}</div>
                  <div className="text-gray-400 text-xs mt-1">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    // Slide 24: End
    {
      id: 24,
      title: 'الخلاصة',
      subtitle: 'المشروع جاهز 100% للإطلاق',
      type: 'end',
      content: (
        <div className="text-center space-y-8">
          <div className="text-8xl">🎉</div>
          <div className="space-y-4">
            <div className="text-3xl font-black gradient-text">
              منظومة أكاديمية الرياضات الاحترافية
            </div>
            <div className="text-xl text-gray-300">
              النسخة النهائية الكاملة v5.0.0
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="glass-card-light p-4">
              <div className="text-3xl font-black text-blue-400">55+</div>
              <div className="text-gray-400 text-sm">مكون</div>
            </div>
            <div className="glass-card-light p-4">
              <div className="text-3xl font-black text-purple-400">100+</div>
              <div className="text-gray-400 text-sm">وحدة</div>
            </div>
            <div className="glass-card-light p-4">
              <div className="text-3xl font-black text-emerald-400">100%</div>
              <div className="text-gray-400 text-sm">جاهز</div>
            </div>
          </div>
          <div className="text-gray-400 text-sm mt-8">
            صُنع بـ ❤️ بواسطة فريق Sports Academy
          </div>
        </div>
      )
    },
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Header */}
      <div className="glass-card border-b border-white/10 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
            SA
          </div>
          <div>
            <h1 className="text-white font-bold text-sm">عرض تقديمي - منظومة أكاديمية الرياضات</h1>
            <p className="text-gray-400 text-xs">الدليل المرجعي الشامل</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-400 text-sm">
            {currentSlide + 1} / {slides.length}
          </span>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="px-4 py-2 glass-card text-white text-sm rounded-lg hover:bg-white/10 transition-colors"
          >
            {isFullscreen ? '✕ إغلاق' : '⛶ ملء الشاشة'}
          </button>
        </div>
      </div>

      {/* Slide Content */}
      <div className="flex-1 p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-4xl font-black text-white mb-2">{currentSlideData.title}</h2>
          {currentSlideData.subtitle && (
            <p className="text-xl text-gray-400">{currentSlideData.subtitle}</p>
          )}
        </div>
        <div className="glass-card p-8 min-h-[500px]">
          {currentSlideData.content}
        </div>
      </div>

      {/* Navigation */}
      <div className="glass-card border-t border-white/10 p-4 flex items-center justify-between">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="px-6 py-3 glass-card text-white rounded-lg hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          → السابق
        </button>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === currentSlide ? 'bg-blue-500 w-8' : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="px-6 py-3 bg-gradient-to-l from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
        >
          التالي ←
        </button>
      </div>
    </div>
  );
}
