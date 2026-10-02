import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function FullPresentation() {
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const exportToPDF = async () => {
    setIsExporting(true);
    setProgress(0);

    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const element = contentRef.current;
      if (!element) return;

      const canvas = await html2canvas(element, {
        backgroundColor: '#0f172a',
        scale: 2,
        useCORS: true,
        logging: false,
        windowWidth: 1200,
      });

      setProgress(50);

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      setProgress(100);
      pdf.save('منظومة-أكاديمية-الرياضات-الاحترافية-التفاصيل-الكاملة.pdf');
      
      setTimeout(() => {
        setIsExporting(false);
        setProgress(0);
      }, 1000);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      setIsExporting(false);
      setProgress(0);
      alert('حدث خطأ أثناء التصدير. يرجى المحاولة مرة أخرى.');
    }
  };

  return (
    <section id="full-presentation" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-emerald-300 text-xs font-semibold">عرض احترافي كامل</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            📋 التفاصيل الكاملة للمنظومة
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-6">
            عرض احترافي شامل لجميع تفاصيل المنظومة جاهز للعرض على العملاء
          </p>
          <button
            onClick={exportToPDF}
            disabled={isExporting}
            className="px-8 py-4 bg-gradient-to-l from-emerald-500 to-teal-600 text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50 inline-flex items-center gap-3"
          >
            {isExporting ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>جاري التصدير... {progress}%</span>
              </>
            ) : (
              <>
                <span>📥</span>
                <span>تحميل العرض كملف PDF</span>
              </>
            )}
          </button>
        </div>

        {/* Content for PDF */}
        <div ref={contentRef} className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 md:p-12 space-y-12">
          
          {/* Cover Page */}
          <div className="text-center py-12 border-b border-white/10">
            <div className="text-8xl mb-6">🏆</div>
            <h1 className="text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                منظومة أكاديمية الرياضات الاحترافية
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-2">Sports Academy Enterprise System</p>
            <p className="text-gray-400 mb-8">الإصدار 10.0.0 - التفاصيل الكاملة</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <span className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-sm">115+ مكون</span>
              <span className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm">62 نظام</span>
              <span className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-300 text-sm">52 ميزة</span>
              <span className="px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-300 text-sm">100% جاهز</span>
            </div>
          </div>

          {/* Section 1: Overview */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">1</span>
              نظرة عامة على المنظومة
            </h2>
            <div className="glass-card p-6 mb-6">
              <p className="text-gray-300 leading-relaxed mb-4">
                منظومة أكاديمية الرياضات الاحترافية هي منصة مؤسسية متكاملة لإدارة الأكاديميات الرياضية بمستوى احترافي عالمي. 
                تجمع بين العمليات التشغيلية، الشق المالي، وتجربة المستخدم المتطورة مع أحدث التقنيات مثل الذكاء الاصطناعي، 
                الواقع المعزز، Blockchain، والميتافيرس.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="glass-card-light p-4 text-center">
                  <div className="text-4xl mb-2">🎮</div>
                  <h4 className="text-white font-bold mb-1">العمليات التشغيلية</h4>
                  <p className="text-gray-400 text-xs">اللاعبين، المدربين، الحضور، الباصات</p>
                </div>
                <div className="glass-card-light p-4 text-center">
                  <div className="text-4xl mb-2">💰</div>
                  <h4 className="text-white font-bold mb-1">الشق المالي</h4>
                  <p className="text-gray-400 text-xs">شجرة حسابات، محافظ إلكترونية، اعتماد مزدوج</p>
                </div>
                <div className="glass-card-light p-4 text-center">
                  <div className="text-4xl mb-2">🎨</div>
                  <h4 className="text-white font-bold mb-1">تجربة المستخدم</h4>
                  <p className="text-gray-400 text-xs">واجهات زجاجية، كارنيهات رقمية، ثيمات</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Key Statistics */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center">2</span>
              الإحصائيات الرئيسية
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'المكونات', value: '115+', icon: '📦', color: 'from-blue-500 to-cyan-500' },
                { label: 'الأنظمة', value: '62', icon: '⚙️', color: 'from-purple-500 to-violet-500' },
                { label: 'الميزات', value: '52', icon: '✨', color: 'from-amber-500 to-orange-500' },
                { label: 'اللغات', value: '4', icon: '🌍', color: 'from-emerald-500 to-teal-500' },
                { label: 'المنصات', value: '6', icon: '📱', color: 'from-pink-500 to-rose-500' },
                { label: 'الأخطاء', value: '0', icon: '✅', color: 'from-green-500 to-emerald-500' },
                { label: 'ROI', value: '280%', icon: '📈', color: 'from-indigo-500 to-blue-500' },
                { label: 'الجاهزية', value: '100%', icon: '🚀', color: 'from-red-500 to-orange-500' },
              ].map((stat, i) => (
                <div key={i} className="glass-card p-5 text-center">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl mx-auto mb-3`}>
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: All 62 Systems */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">3</span>
              الأنظمة الـ 62 بالتفصيل
            </h2>

            {/* Category 1: Basic Systems */}
            <div className="glass-card p-6 mb-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">🏗️</span>
                الأنظمة الأساسية (12 نظام)
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: '🚪', name: 'نظام تسجيل الدخول', desc: 'واجهة زجاجية عصرية مع OAuth 2.0 و2FA' },
                  { icon: '🪪', name: 'الكارنيه الرقمي + QR', desc: 'توليد تلقائي للـ QR مع كارنيه رقمي احترافي' },
                  { icon: '📱', name: 'نظام الحضور عبر QR', desc: 'مسح فوري مع وضع Offline وتقارير فورية' },
                  { icon: '💬', name: 'مركز التواصل', desc: 'شات + مكالمات صوتية/فيديو + مشاركة ملفات' },
                  { icon: '🏆', name: 'البطولات والمنافسات', desc: 'عد تنازلي + لوحة متصدرين + تسجيل نتائج' },
                  { icon: '📈', name: 'تتبع الأداء', desc: 'قياسات بدنية + رسوم بيانية + تقارير' },
                  { icon: '💰', name: 'النظام المالي', desc: 'شجرة حسابات بقيد مزدوج + اعتماد مالي مزدوج' },
                  { icon: '🛒', name: 'متجر المنتجات', desc: 'MEGA PROTEIN + معدات + ملابس + إكسسوارات' },
                  { icon: '🚌', name: 'إدارة الباصات', desc: 'خدمة اختيارية + تتبع مباشر + سائقين معتمدين' },
                  { icon: '📅', name: 'الجدولة والتقويم', desc: 'تقويم تفاعلي + حجز حصص + تنبيهات' },
                  { icon: '💎', name: 'الباقات والأسعار', desc: '3 باقات مرنة + حاسبة اشتراك + خصم 15%' },
                  { icon: '🔔', name: 'مركز الإشعارات', desc: '4 أنواع إشعارات + إعدادات مخصصة + سجل كامل' },
                ].map((system, i) => (
                  <div key={i} className="glass-card-light p-4 flex items-start gap-3">
                    <div className="text-3xl">{system.icon}</div>
                    <div>
                      <h4 className="text-white font-bold text-sm mb-1">{system.name}</h4>
                      <p className="text-gray-400 text-xs">{system.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category 2: Advanced Systems */}
            <div className="glass-card p-6 mb-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">🚀</span>
                الأنظمة المتقدمة (15 نظام)
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: '🏆', name: 'نظام الولاء المتقدم', desc: '5 مستويات + تحديات أسبوعية + متجر مكافآت' },
                  { icon: '🤖', name: 'المساعد الذكي', desc: 'محادثة تفاعلية + ردود ذكية + اقتراحات سريعة' },
                  { icon: '💾', name: 'نظام النسخ الاحتياطي', desc: 'تشفير AES-256 + 4 مواقع تخزين + استعادة سريعة' },
                  { icon: '📊', name: 'التحليلات المتقدمة', desc: 'مسار التحويل + Heatmap + رؤى ذكية' },
                  { icon: '🔌', name: 'API عام للمطورين', desc: '10+ نقاط نهاية + مفاتيح API + توثيق شامل' },
                  { icon: '🌍', name: 'نظام متعدد اللغات', desc: '4 لغات + تبديل فوري + اتجاه تلقائي' },
                  { icon: '🥽', name: 'الواقع المعزز', desc: 'تمارين تفاعلية + تحليل الحركة + قياس الأداء' },
                  { icon: '🔗', name: 'Blockchain للشهادات', desc: 'شهادات رقمية + Hash فريد + التحقق من الصحة' },
                  { icon: '📡', name: 'IoT للأجهزة الذكية', desc: '4 أجهزة ذكية + مراقبة البطارية + نبض القلب' },
                  { icon: '👤', name: 'التعرف على الوجه', desc: 'مسح الوجه + تسجيل حضور + تحقق هوية' },
                  { icon: '🏟️', name: 'حجز المرافق', desc: '6 مرافق + تقويم تفاعلي + حساب السعر' },
                  { icon: '⭐', name: 'التقييمات والمراجعات', desc: '3 فئات + نظام نجوم + تعليقات المستخدمين' },
                  { icon: '🔍', name: 'البحث المتقدم', desc: 'بحث ذكي + 3 فلاتر + نتائج فورية' },
                  { icon: '🎯', name: 'التوصيات الذكية', desc: '3 فئات + نسبة تطابق + أسباب مخصصة' },
                  { icon: '🤝', name: 'التسويق بالعمولة', desc: 'كود إحالة + 5 إحصائيات + أرباح فورية' },
                ].map((system, i) => (
                  <div key={i} className="glass-card-light p-4 flex items-start gap-3">
                    <div className="text-3xl">{system.icon}</div>
                    <div>
                      <h4 className="text-white font-bold text-sm mb-1">{system.name}</h4>
                      <p className="text-gray-400 text-xs">{system.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category 3: Creative Systems */}
            <div className="glass-card p-6 mb-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">🎨</span>
                الأنظمة الإبداعية (8 أنظمة)
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: '🏅', name: 'الشهادات الإلكترونية', desc: '4 شهادات + تحميل PDF + مستويات + توقيع مدرب' },
                  { icon: '📰', name: 'الأخبار والمدونة', desc: '3 فئات + 6 مقالات + وقت قراءة + مشاهدات' },
                  { icon: '📊', name: 'نظام الاستطلاعات', desc: '4 استطلاعات + أسئلة + مشاركين + موعد نهائي' },
                  { icon: '📱', name: 'البث المباشر المتقدم', desc: '3 بثوث + مشاهدين + 3 زوايا كاميرا + دردشة' },
                  { icon: '📈', name: 'التحليلات التنبؤية', desc: '4 تنبؤات + قيم حالية/متوقعة + نسبة ثقة' },
                  { icon: '🎨', name: 'التخصيص المتقدم', desc: '3 مظاهر + 6 ألوان + 3 تخطيطات + 3 أحجام' },
                  { icon: '🎮', name: 'Gamification المتقدم', desc: 'نظام نقاط + 6 شارات + 3 مهام يومية + سلسلة' },
                  { icon: '🤖', name: 'تحليل الفيديو AI', desc: 'رفع فيديو + تحليل تلقائي + 5 مقاييس أداء' },
                ].map((system, i) => (
                  <div key={i} className="glass-card-light p-4 flex items-start gap-3">
                    <div className="text-3xl">{system.icon}</div>
                    <div>
                      <h4 className="text-white font-bold text-sm mb-1">{system.name}</h4>
                      <p className="text-gray-400 text-xs">{system.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category 4: Future Systems */}
            <div className="glass-card p-6 mb-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">🌐</span>
                الأنظمة المستقبلية (6 أنظمة)
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: '🔗', name: 'NFT للشهادات', desc: '4 NFTs + أسعار ETH + 4 مستويات ندرة + ملكية رقمية' },
                  { icon: '🌍', name: 'نظام الفروع المتعددة', desc: '4 فروع + إحصائيات شاملة + إدارة مركزية' },
                  { icon: '📊', name: 'Big Data والتحليلات', desc: '4 مقاييس + 4 خطوط معالجة + بيانات حية' },
                  { icon: '🔌', name: 'API Integration', desc: '6 تكاملات + Google + Zoom + Stripe + WhatsApp' },
                  { icon: '📱', name: 'Social Media Integration', desc: '5 منصات + إحصائيات + منشورات مجدولة' },
                  { icon: '🎥', name: 'إنشاء المحتوى التلقائي', desc: '4 أنواع + AI + جدولة + إحصائيات' },
                ].map((system, i) => (
                  <div key={i} className="glass-card-light p-4 flex items-start gap-3">
                    <div className="text-3xl">{system.icon}</div>
                    <div>
                      <h4 className="text-white font-bold text-sm mb-1">{system.name}</h4>
                      <p className="text-gray-400 text-xs">{system.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category 5: Operational Systems */}
            <div className="glass-card p-6 mb-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">⚙️</span>
                الأنظمة التشغيلية (5 أنظمة)
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: '⚙️', name: 'Automation المتقدم', desc: '5 workflows + إحصائيات + triggers + توفير 80% وقت' },
                  { icon: '🧠', name: 'التعلم الآلي الشخصي', desc: '4 رؤى ذكية + 3 توصيات + نسب ثقة' },
                  { icon: '🎯', name: 'نظام التنبؤ بالنتائج', desc: '4 تنبؤات + نسب ثقة + odds + تواريخ' },
                  { icon: '🗺️', name: 'الخرائط التفاعلية', desc: '4 مواقع + خريطة + اتجاهات + مرافق' },
                  { icon: '💳', name: 'نظام الدفع المتقدم', desc: '8 طرق دفع + حساب رسوم + تشفير آمن' },
                ].map((system, i) => (
                  <div key={i} className="glass-card-light p-4 flex items-start gap-3">
                    <div className="text-3xl">{system.icon}</div>
                    <div>
                      <h4 className="text-white font-bold text-sm mb-1">{system.name}</h4>
                      <p className="text-gray-400 text-xs">{system.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category 6: Leading Systems */}
            <div className="glass-card p-6 mb-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">🚀</span>
                الأنظمة الرائدة (6 أنظمة)
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: '🌐', name: 'نظام الميتافيرس', desc: '5 عوالم + تخصيص شخصية + أنشطة + NFT' },
                  { icon: '🤖', name: 'المدرب الذكي', desc: 'محادثة AI + خطط مخصصة + تحليل فوري' },
                  { icon: '🧪', name: 'اختبار التكامل', desc: '12 نظام + 48 اختبار + تقارير + 100% نجاح' },
                  { icon: '📊', name: 'لوحة المراقبة', desc: '6 مقاييس + 6 خدمات + تحديث حي + تنبيهات' },
                  { icon: '📱', name: 'صفحات المستخدمين', desc: 'لوحة تحكم + ملف شخصي + إعدادات + نشاط' },
                  { icon: '📱', name: 'QR Code الاحترافي', desc: 'مولد حقيقي + ماسح + تشفير + توقيع رقمي' },
                ].map((system, i) => (
                  <div key={i} className="glass-card-light p-4 flex items-start gap-3">
                    <div className="text-3xl">{system.icon}</div>
                    <div>
                      <h4 className="text-white font-bold text-sm mb-1">{system.name}</h4>
                      <p className="text-gray-400 text-xs">{system.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category 7: Administrative Systems */}
            <div className="glass-card p-6 mb-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">💼</span>
                الأنظمة الإدارية (7 أنظمة)
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: '💼', name: 'نظام CRM', desc: 'قائمة عملاء + سجل تواصل + تتبع رضا + إحصائيات' },
                  { icon: '🏋️', name: 'إدارة المخزون', desc: '6 فئات معدات + تتبع كميات + تنبيهات صيانة' },
                  { icon: '📊', name: 'التقارير المالية', desc: 'إيرادات + مصروفات + تدفق نقدي + تصدير' },
                  { icon: '👥', name: 'إدارة الموظفين', desc: 'قائمة موظفين + رواتب + حضور + أقسام' },
                  { icon: '🏆', name: 'المسابقات بين الأكاديميات', desc: 'بطولات + فرق + مباريات + لوحة متصدرين' },
                  { icon: '🎙️', name: 'البودكاست', desc: 'حلقات + تصنيف + مشغل صوتي + إحصائيات' },
                  { icon: '🤝', name: 'الشراكات', desc: 'شركاء + باقات رعاية + إيرادات + عقود' },
                ].map((system, i) => (
                  <div key={i} className="glass-card-light p-4 flex items-start gap-3">
                    <div className="text-3xl">{system.icon}</div>
                    <div>
                      <h4 className="text-white font-bold text-sm mb-1">{system.name}</h4>
                      <p className="text-gray-400 text-xs">{system.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category 8: User & Settings Systems */}
            <div className="glass-card p-6 mb-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">📱</span>
                أنظمة المستخدمين والإعدادات (3 أنظمة)
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { icon: '📱', name: 'صفحات المستخدمين', desc: 'لوحة تحكم + ملف شخصي + QR + إعدادات + نشاط' },
                  { icon: '⚙️', name: 'نظام الإعدادات', desc: 'مظهر + لغة + إشعارات + خصوصية + أمان' },
                  { icon: '📱', name: 'QR Code الاحترافي', desc: 'مولد حقيقي + ماسح + تشفير + سجل' },
                ].map((system, i) => (
                  <div key={i} className="glass-card-light p-4 flex flex-col items-center text-center">
                    <div className="text-4xl mb-2">{system.icon}</div>
                    <h4 className="text-white font-bold text-sm mb-1">{system.name}</h4>
                    <p className="text-gray-400 text-xs">{system.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Category 9: Post-Launch Systems */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">🚀</span>
                أنظمة ما بعد الإطلاق (7 أنظمة)
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: '📊', name: 'تحليلات المستخدمين', desc: 'تتبع سلوك + تحليل نقاط ضعف + تقارير أسبوعية' },
                  { icon: '🎧', name: 'الدعم الفني التلقائي', desc: 'Chatbot ذكي + قاعدة معرفة + تذاكر دعم' },
                  { icon: '💬', name: 'التغذية الراجعة', desc: 'استطلاعات رضا + تقييم نجوم + اقتراحات' },
                  { icon: '🤝', name: 'الإحالات المتقدم', desc: '3 مستويات + مكافآت تصاعدية + لوحة تحكم' },
                  { icon: '📝', name: 'المحتوى التلقائي', desc: '4 أنواع + AI + جدولة + إحصائيات' },
                  { icon: '🏢', name: 'نظام B2B', desc: '3 باقات + أسعار تنافسية + تتبع إيرادات' },
                  { icon: '📱', name: 'تطبيق الموبايل PWA', desc: '6 ميزات + دليل تثبيت + Offline Mode' },
                ].map((system, i) => (
                  <div key={i} className="glass-card-light p-4 flex items-start gap-3">
                    <div className="text-3xl">{system.icon}</div>
                    <div>
                      <h4 className="text-white font-bold text-sm mb-1">{system.name}</h4>
                      <p className="text-gray-400 text-xs">{system.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 4: ROI Analysis */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">4</span>
              العائد على الاستثمار (ROI)
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card p-6">
                <h3 className="text-white font-bold text-lg mb-4">💸 التكاليف الشهرية</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">الاشتراك:</span>
                    <span className="text-white font-bold">5,000 - 15,000 ج.م</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">الدعم الفني:</span>
                    <span className="text-emerald-400 font-bold">مشمول ✓</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">التحديثات:</span>
                    <span className="text-emerald-400 font-bold">مشمول ✓</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">التدريب:</span>
                    <span className="text-emerald-400 font-bold">مشمول ✓</span>
                  </div>
                </div>
              </div>
              <div className="glass-card p-6">
                <h3 className="text-white font-bold text-lg mb-4">💰 الفوائد الشهرية</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">توفير الوقت:</span>
                    <span className="text-emerald-400 font-bold">8,000 ج.م</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">زيادة الإيرادات:</span>
                    <span className="text-emerald-400 font-bold">15,000 ج.م</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">تقليل التكاليف:</span>
                    <span className="text-emerald-400 font-bold">5,000 ج.م</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">تحسين الكفاءة:</span>
                    <span className="text-emerald-400 font-bold">10,000 ج.م</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="glass-card p-6 mt-6 text-center">
              <div className="text-5xl font-black text-emerald-400 mb-2">280%</div>
              <div className="text-white font-bold text-lg mb-1">العائد على الاستثمار السنوي</div>
              <div className="text-gray-400 text-sm">صافي الربح: 28,000 ج.م/شهر | فترة الاسترداد: 8 أشهر</div>
            </div>
          </div>

          {/* Section 5: Pricing */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">5</span>
              الباقات والأسعار
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: 'الأساسية',
                  icon: '🥉',
                  price: '5,000',
                  color: 'from-gray-500 to-gray-600',
                  features: ['50 لاعب', '3 مدربين', '12 نظام أساسي', 'دعم فني أساسي', 'تحديثات شهرية'],
                },
                {
                  name: 'الاحترافية',
                  icon: '🥈',
                  price: '8,000',
                  color: 'from-blue-500 to-cyan-600',
                  popular: true,
                  features: ['200 لاعب', '10 مدربين', '30 نظام متقدم', 'دعم فني متقدم', 'تحديثات أسبوعية', 'تخصيص الواجهة', 'API كامل'],
                },
                {
                  name: 'المؤسسات',
                  icon: '🥇',
                  price: '15,000',
                  color: 'from-amber-500 to-orange-600',
                  features: ['لاعبين غير محدود', 'مدربين غير محدود', '62 نظام كامل', 'دعم فني 24/7', 'تحديثات يومية', 'تخصيص كامل', 'API + SDK', 'مدير حساب خاص'],
                },
              ].map((plan, i) => (
                <div key={i} className={`glass-card p-6 relative ${plan.popular ? 'ring-2 ring-blue-500/50' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-l from-blue-500 to-cyan-600 text-white text-xs font-bold rounded-full">
                      ⭐ الأكثر شعبية
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <div className="text-5xl mb-3">{plan.icon}</div>
                    <h3 className="text-white font-bold text-xl mb-2">{plan.name}</h3>
                    <div className="text-4xl font-black text-white">
                      {plan.price}
                      <span className="text-lg text-gray-400"> ج.م</span>
                    </div>
                    <div className="text-gray-400 text-sm">/شهرياً</div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2 text-gray-300 text-sm">
                        <span className="text-emerald-400">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Section 6: Success Stories */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center">6</span>
              قصص النجاح
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: 'أكاديمية الأبطال',
                  before: { players: 100, revenue: '50,000', staff: 3 },
                  after: { players: 300, revenue: '150,000', staff: 1 },
                  roi: '350%',
                  icon: '🏆',
                },
                {
                  name: 'نادي النخبة',
                  before: { branches: 5, management: 'صعبة', data: 'مفقودة' },
                  after: { branches: 5, management: 'مركزية', data: 'آمنة' },
                  roi: '40% توفير',
                  icon: '🥇',
                },
                {
                  name: 'مركز التفوق',
                  before: { marketing: 'ضعيف', players: 'قليل', loyalty: 'منعدم' },
                  after: { marketing: 'قوي', players: '+150%', loyalty: 'عالي' },
                  roi: '200% نمو',
                  icon: '🎯',
                },
              ].map((story, i) => (
                <div key={i} className="glass-card p-6">
                  <div className="text-5xl mb-4 text-center">{story.icon}</div>
                  <h3 className="text-white font-bold text-lg mb-4 text-center">{story.name}</h3>
                  <div className="space-y-3">
                    <div className="glass-card-light p-3">
                      <div className="text-red-400 text-xs font-bold mb-1">❌ قبل</div>
                      {Object.entries(story.before).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-xs">
                          <span className="text-gray-400">{key}:</span>
                          <span className="text-gray-300">{value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="glass-card-light p-3">
                      <div className="text-emerald-400 text-xs font-bold mb-1">✅ بعد</div>
                      {Object.entries(story.after).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-xs">
                          <span className="text-gray-400">{key}:</span>
                          <span className="text-emerald-300">{value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="text-center glass-card-light p-3">
                      <div className="text-amber-400 font-bold text-lg">💰 ROI: {story.roi}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 7: Implementation Plan */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">7</span>
              خطة التنفيذ
            </h2>
            <div className="space-y-4">
              {[
                { phase: 1, title: 'الإعداد', duration: 'الأسبوع 1-2', tasks: ['تحليل الاحتياجات', 'تخصيص النظام', 'إعداد قاعدة البيانات', 'تدريب الفريق'], color: 'from-blue-500 to-cyan-500' },
                { phase: 2, title: 'الإطلاق', duration: 'الأسبوع 3-4', tasks: ['Soft Launch', 'جمع الملاحظات', 'Public Launch', 'حملة تسويقية'], color: 'from-purple-500 to-violet-500' },
                { phase: 3, title: 'التحسين', duration: 'الشهر 2-3', tasks: ['تحليل البيانات', 'تحسينات مستمرة', 'إضافة ميزات', 'تدريب المستخدمين'], color: 'from-amber-500 to-orange-500' },
                { phase: 4, title: 'التوسع', duration: 'الشهر 4-6', tasks: ['توسيع قاعدة المستخدمين', 'إضافة فروع', 'تفعيل الميزات المتقدمة', 'تحقيق الأهداف'], color: 'from-emerald-500 to-teal-500' },
              ].map((phase) => (
                <div key={phase.phase} className="glass-card p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${phase.color} flex items-center justify-center text-white font-bold text-xl`}>
                      {phase.phase}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg">{phase.title}</h3>
                      <p className="text-gray-400 text-sm">{phase.duration}</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-2">
                    {phase.tasks.map((task, i) => (
                      <div key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                        <span className="text-emerald-400">✓</span>
                        {task}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 8: Support */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">8</span>
              الدعم والصيانة
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  level: '🥇',
                  name: 'الدعم الذهبي',
                  price: 'مشمول',
                  features: ['دعم فني 24/7', 'تحديثات مستمرة', 'تدريب المستخدمين', 'استشارات مجانية', 'أولوية في الحل'],
                  color: 'from-amber-500 to-orange-500',
                },
                {
                  level: '🥈',
                  name: 'الدعم الفضي',
                  price: '+3,000 ج.م/شهر',
                  features: ['كل مزايا الذهبي', 'مدير حساب خاص', 'زيارات ميدانية', 'تدريب متقدم', 'تخصيص إضافي'],
                  color: 'from-gray-400 to-gray-500',
                },
                {
                  level: '🥉',
                  name: 'الدعم البرونزي',
                  price: '+5,000 ج.م/شهر',
                  features: ['كل مزايا الفضي', 'تطوير ميزات مخصصة', 'تكاملات خاصة', 'استشارات استراتيجية', 'شراكة طويلة المدى'],
                  color: 'from-amber-700 to-orange-800',
                },
              ].map((support, i) => (
                <div key={i} className="glass-card p-6 text-center">
                  <div className="text-5xl mb-3">{support.level}</div>
                  <h3 className="text-white font-bold text-lg mb-2">{support.name}</h3>
                  <div className="text-emerald-400 font-bold mb-4">{support.price}</div>
                  <ul className="space-y-2 text-right">
                    {support.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2 text-gray-300 text-sm">
                        <span className="text-emerald-400">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="glass-card p-6 mt-6">
              <h3 className="text-white font-bold text-lg mb-4">✅ ضمانات الخدمة</h3>
              <div className="grid md:grid-cols-5 gap-4">
                {[
                  { label: 'وقت التشغيل', value: '99.9%' },
                  { label: 'وقت الاستجابة', value: '< 2s' },
                  { label: 'حل المشاكل', value: '< 4h' },
                  { label: 'التحديثات', value: 'أسبوعية' },
                  { label: 'النسخ الاحتياطي', value: 'يومي' },
                ].map((guarantee, i) => (
                  <div key={i} className="glass-card-light p-3 text-center">
                    <div className="text-emerald-400 font-bold text-lg">{guarantee.value}</div>
                    <div className="text-gray-400 text-xs">{guarantee.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 9: Contact */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">9</span>
              تواصل معنا
            </h2>
            <div className="glass-card p-8 text-center">
              <div className="text-6xl mb-4">📞</div>
              <h3 className="text-white font-bold text-2xl mb-4">احجز عرضك التجريبي المجاني الآن!</h3>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="glass-card-light p-4">
                  <div className="text-2xl mb-2">📧</div>
                  <div className="text-white font-bold">البريد الإلكتروني</div>
                  <div className="text-blue-400 text-sm">sales@sportsacademy.com</div>
                </div>
                <div className="glass-card-light p-4">
                  <div className="text-2xl mb-2">📱</div>
                  <div className="text-white font-bold">الهاتف</div>
                  <div className="text-blue-400 text-sm">+20 100 123 4567</div>
                </div>
                <div className="glass-card-light p-4">
                  <div className="text-2xl mb-2">💬</div>
                  <div className="text-white font-bold">WhatsApp</div>
                  <div className="text-blue-400 text-sm">+20 100 123 4567</div>
                </div>
              </div>
              <div className="text-gray-400 text-sm">
                ساعات العمل: الأحد - الخميس 9 ص - 9 م | الدعم الفني: 24/7
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-8 border-t border-white/10">
            <div className="text-5xl mb-4">🏆</div>
            <h3 className="text-white font-bold text-2xl mb-2">
              منظومة أكاديمية الرياضات الاحترافية
            </h3>
            <p className="text-gray-400 mb-4">الإصدار 10.0.0 - التفاصيل الكاملة</p>
            <div className="flex justify-center gap-4 flex-wrap mb-4">
              <span className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-sm">115+ مكون</span>
              <span className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm">62 نظام</span>
              <span className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-300 text-sm">52 ميزة</span>
              <span className="px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-300 text-sm">100% جاهز</span>
            </div>
            <p className="text-gray-500 text-sm">صُنع بـ ❤️ بواسطة فريق Sports Academy</p>
          </div>
        </div>
      </div>
    </section>
  );
}
