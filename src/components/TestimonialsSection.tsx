import { useState } from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
  date: string;
  player?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'أحمد محمود',
    role: 'ولي أمر',
    content: 'أكاديمية رائعة! ابني تطور بشكل ملحوظ خلال 6 أشهر فقط. المدربون محترفون ويهتمون بكل لاعب بشكل شخصي.',
    rating: 5,
    avatar: '👨',
    date: 'منذ أسبوع',
    player: 'أحمد محمد - ناشئين U10'
  },
  {
    id: 2,
    name: 'فاطمة علي',
    role: 'ولي أمر',
    content: 'أفضل استثمار لابني. النظام الاحترافي في المتابعة والتقييم جعلني أرى تقدمه يوماً بعد يوم. شكراً لكم!',
    rating: 5,
    avatar: '👩',
    date: 'منذ شهر',
    player: 'يوسف أحمد - براعم U8'
  },
  {
    id: 3,
    name: 'محمد حسن',
    role: 'لاعب سابق',
    content: 'بفضل الأكاديمية، حصلت على منحة دراسية في جامعة مرموقة. المدربون لم يعلموني الرياضة فحسب، بل علموني الانضباط والعمل الجماعي.',
    rating: 5,
    avatar: '👨‍🎓',
    date: 'منذ 3 أشهر'
  },
  {
    id: 4,
    name: 'سارة أحمد',
    role: 'ولي أمر',
    content: 'التواصل المستمر مع المدرب عبر التطبيق ممتاز. أستطيع متابعة حضور ابني وأدائه لحظة بلحظة. خدمة النقل أيضاً رائعة.',
    rating: 4,
    avatar: '👩‍💼',
    date: 'منذ أسبوعين',
    player: 'عمر طارق - شباب U13'
  },
  {
    id: 5,
    name: 'خالد إبراهيم',
    role: 'ولي أمر',
    content: 'الاحترافية في كل شيء. من التسجيل إلى الدفع إلى المتابعة. النظام المالي واضح وشفاف. أنصح بها بشدة.',
    rating: 5,
    avatar: '👨‍💻',
    date: 'منذ شهرين',
    player: 'كريم حسام - ناشئين U10'
  },
  {
    id: 6,
    name: 'نورا سعيد',
    role: 'لاعبة',
    content: 'أحب التدريبات هنا! المدربون يشجعوننا دائماً والمجموعات منظمة. فزت ببطولة المنطقة بفضلهم!',
    rating: 5,
    avatar: '👧',
    date: 'منذ شهر'
  }
];

const stats = [
  { label: 'ولي أمر راضٍ', value: 98, suffix: '%' },
  { label: 'تقييم 5 نجوم', value: 85, suffix: '%' },
  { label: 'لاعب حقق هدفه', value: 92, suffix: '%' },
  { label: 'ساعات تدريب أسبوعياً', value: 40, suffix: '+' }
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [filter, setFilter] = useState<'all' | 'parents' | 'players'>('all');

  const filteredTestimonials = testimonials.filter(t => {
    if (filter === 'all') return true;
    if (filter === 'parents') return t.role === 'ولي أمر';
    return t.role === 'لاعب سابق' || t.role === 'لاعبة';
  });

  return (
    <section id="testimonials" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <span className="text-amber-300 text-xs font-semibold">آراء العملاء</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ⭐ الشهادات <span className="gradient-text">والتقييمات</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            ماذا يقول أولياء الأمور واللاعبون عن تجربتهم معنا
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="glass-card p-5 text-center hover:scale-105 transition-transform">
              <div className="text-3xl md:text-4xl font-black gradient-text mb-1">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-gray-400 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex justify-center gap-2 mb-8">
          {[
            { id: 'all', label: 'الكل', count: testimonials.length },
            { id: 'parents', label: 'أولياء الأمور', count: testimonials.filter(t => t.role === 'ولي أمر').length },
            { id: 'players', label: 'اللاعبون', count: testimonials.filter(t => t.role.includes('لاعب')).length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                filter === tab.id
                  ? 'bg-gradient-to-l from-amber-500 to-orange-600 text-white'
                  : 'glass-card text-gray-400 hover:text-white'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="glass-card p-6 hover:scale-105 transition-all">
              {/* Header */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-2xl shrink-0">
                  {testimonial.avatar}
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-bold text-sm">{testimonial.name}</h4>
                  <p className="text-gray-400 text-xs">{testimonial.role}</p>
                  {testimonial.player && (
                    <p className="text-amber-300 text-[10px] mt-0.5">{testimonial.player}</p>
                  )}
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={`text-lg ${i < testimonial.rating ? 'text-amber-400' : 'text-gray-600'}`}>
                    ★
                  </span>
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-300 text-sm leading-relaxed mb-3">
                "{testimonial.content}"
              </p>

              {/* Date */}
              <div className="text-gray-500 text-xs">{testimonial.date}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <div className="glass-card p-6 inline-block">
            <p className="text-white font-bold mb-2">انضم إلى عائلة الأكاديمية!</p>
            <p className="text-gray-400 text-sm mb-4">أكثر من 500 لاعب يحققون أحلامهم معنا</p>
            <button className="px-6 py-3 bg-gradient-to-l from-amber-500 to-orange-600 text-white text-sm font-bold rounded-lg shadow-lg hover:opacity-90 transition-opacity">
              ابدأ الآن 🚀
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
