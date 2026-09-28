import { useState, useEffect } from 'react';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setTimeout(() => setVisible(true), 2000);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-up">
      <div className="glass-card p-4 max-w-4xl mx-auto border border-white/10">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1">
            <p className="text-white text-sm mb-1">🍪 نحن نستخدم ملفات تعريف الارتباط</p>
            <p className="text-gray-400 text-xs">
              لتحسين تجربتك على موقعنا. بمتابعة التصفح، فإنك توافق على استخدامنا لملفات تعريف الارتباط.
              <a href="#privacy" className="text-blue-400 hover:underline mr-1">سياسة الخصوصية</a>
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={decline}
              className="px-4 py-2 glass-card text-gray-400 text-xs rounded-lg hover:text-white transition-colors"
            >
              رفض
            </button>
            <button
              onClick={accept}
              className="px-4 py-2 bg-gradient-to-l from-blue-500 to-cyan-600 text-white text-xs font-bold rounded-lg"
            >
              موافق
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up { animation: slide-up 0.5s ease-out; }
      `}</style>
    </div>
  );
}

export function LegalPages() {
  return (
    <>
      {/* Privacy Policy */}
      <section id="privacy" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">🔒 سياسة الخصوصية</h2>
            <p className="text-gray-400">آخر تحديث: يناير 2026</p>
          </div>

          <div className="glass-card p-8 space-y-6 text-gray-300 leading-relaxed">
            <div>
              <h3 className="text-white font-bold text-lg mb-2">1. المعلومات التي نجمعها</h3>
              <p className="text-sm">نقوم بجمع المعلومات التالية لتحسين خدماتنا:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>البيانات الشخصية (الاسم، البريد الإلكتروني، رقم الهاتف)</li>
                <li>بيانات اللاعبين (العمر، المستوى الرياضي، التاريخ الصحي)</li>
                <li>بيانات الدفع (معلومات المحفظة الإلكترونية)</li>
                <li>بيانات الاستخدام (سجل الحضور، الأداء)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-2">2. كيف نستخدم معلوماتك</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>تقديم الخدمات الرياضية والتدريبية</li>
                <li>إدارة الاشتراكات والمدفوعات</li>
                <li>إرسال الإشعارات والتحديثات</li>
                <li>تحسين خدماتنا وتجربة المستخدم</li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-2">3. حماية البيانات</h3>
              <p className="text-sm">
                نتخذ إجراءات أمنية صارمة لحماية بياناتك، بما في ذلك التشفير، جدران الحماية، 
                والوصول المحدود للموظفين المعتمدين فقط.
              </p>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-2">4. حقوقك</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>حق الوصول إلى بياناتك</li>
                <li>حق تصحيح المعلومات</li>
                <li>حق حذف الحساب</li>
                <li>حق الاعتراض على المعالجة</li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-2">5. التواصل معنا</h3>
              <p className="text-sm">
                لأي استفسارات حول سياسة الخصوصية، تواصل معنا على: privacy@sportsacademy.com
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Terms of Service */}
      <section id="terms" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">📋 شروط الاستخدام</h2>
            <p className="text-gray-400">آخر تحديث: يناير 2026</p>
          </div>

          <div className="glass-card p-8 space-y-6 text-gray-300 leading-relaxed">
            <div>
              <h3 className="text-white font-bold text-lg mb-2">1. القبول بالشروط</h3>
              <p className="text-sm">
                باستخدامك لخدمات أكاديمية الرياضات الاحترافية، فإنك توافق على الالتزام بهذه الشروط والأحكام.
              </p>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-2">2. الخدمات</h3>
              <p className="text-sm">
                نقدم خدمات تدريب رياضي احترافي، إدارة بطولات، ومتابعة أداء اللاعبين. 
                جميع الخدمات تخضع لتوفر المدربين والمرافق.
              </p>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-2">3. الاشتراكات والدفع</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>الاشتراكات شهرية وتُجدد تلقائياً</li>
                <li>جميع المدفوعات عبر المحافظ الإلكترونية تخضع للاعتماد المالي</li>
                <li>خدمة النقل اختيارية ورسومها منفصلة</li>
                <li>يمكن الإلغاء قبل 7 أيام من انتهاء الشهر</li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-2">4. السلوك والانضباط</h3>
              <p className="text-sm">
                يتوجب على جميع اللاعبين الالتزام بقواعد الأكاديمية والسلوك الرياضي. 
                المخالفات المتكررة قد تؤدي لإيقاف الاشتراك.
              </p>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-2">5. المسؤولية</h3>
              <p className="text-sm">
                الأكاديمية غير مسؤولة عن الإصابات الناتجة عن عدم الالتزام بتعليمات المدربين 
                أو عدم الإفصاح عن الحالات الصحية.
              </p>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-2">6. التعديلات</h3>
              <p className="text-sm">
                نحتفظ بحق تعديل هذه الشروط في أي وقت. سيتم إخطار المستخدمين بالتغييرات الجوهرية.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function Page404() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="glass-card p-12">
          <div className="text-8xl mb-4">🔍</div>
          <h2 className="text-4xl font-black text-white mb-2">404</h2>
          <h3 className="text-xl font-bold text-white mb-4">الصفحة غير موجودة</h3>
          <p className="text-gray-400 mb-6">
            عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
          </p>
          <a
            href="#"
            className="inline-block px-6 py-3 bg-gradient-to-l from-blue-500 to-cyan-600 text-white text-sm font-bold rounded-lg shadow-lg hover:opacity-90 transition-opacity"
          >
            العودة للرئيسية 🏠
          </a>
        </div>
      </div>
    </section>
  );
}
