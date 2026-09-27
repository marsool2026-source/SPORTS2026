import { useState } from 'react';

const faqs = [
  {
    q: 'هل يمكن استخدام النظام بدون إنترنت؟',
    a: 'نعم، نظام الحضور عبر QR Code يدعم وضع Offline، حيث يتم تخزين البيانات محلياً ثم مزامنتها تلقائياً عند عودة الاتصال.'
  },
  {
    q: 'كيف يعمل الاعتماد المالي المزدوج؟',
    a: 'عند رفع إيصال تحويل من ولي الأمر، يبقى الاشتراك "معلقاً" حتى يراجعه المدير المالي ويعتمده. لا يمكن للإداري التشغيلي التدخل في هذه العملية.'
  },
  {
    q: 'هل يُنشأ QR Code تلقائياً عند التسجيل؟',
    a: 'نعم، عند تسجيل أي مستخدم (لاعب/مدرب/مدير/مدير مالي) يُنشأ QR Code فريد تلقائياً ويُدمج في الكارنيه الرقمي فوراً.'
  },
  {
    q: 'هل يمكن تخصيص هوية بصرية لكل أكاديمية؟',
    a: 'نعم، محرك الثيمات الديناميكي يستخرج الألوان من شعار الأكاديمية المرفوع ويطبقها تلقائياً على جميع واجهات التطبيق.'
  },
  {
    q: 'هل النظام يدعم أكثر من فرع؟',
    a: 'نعم، النظام مصمم بنمط Multi-Tenant ليدعم إدارة عدة فروع من لوحة تحكم مركزية مع تقارير منفصلة لكل فرع.'
  },
  {
    q: 'ما هي طرق الدفع المدعومة؟',
    a: 'يدعم النظام المحافظ الإلكترونية (فودافون كاش، اتصالات كاش)، التحويل البنكي، الدفع النقدي، والدفع بالبطاقة.'
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ❓ أسئلة <span className="gradient-text-blue">شائعة</span>
          </h2>
          <p className="text-gray-400">إجابات على أكثر الأسئلة تكراراً حول المنظومة</p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="glass-card overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-5 flex items-center justify-between gap-4 text-right hover:bg-white/5 transition-colors"
              >
                <span className="text-white font-semibold text-sm md:text-base">{faq.q}</span>
                <svg
                  className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-5 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
