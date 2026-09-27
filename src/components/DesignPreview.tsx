import { useState } from 'react';

interface DesignImage {
  id: number;
  title: string;
  titleEn: string;
  description: string;
  url: string;
  category: string;
}

const designImages: DesignImage[] = [
  {
    id: 1,
    title: 'شاشة تسجيل الدخول',
    titleEn: 'Login Screen',
    description: 'واجهة زجاجية عصرية مع دائرة أيقونات رياضية متحركة ودعم ثنائي اللغة',
    url: 'https://image.qwenlm.ai/generated-images/be9822b3-fd25-4216-b02f-9a31707304f6/_result.png',
    category: 'Authentication'
  },
  {
    id: 2,
    title: 'لوحة التحكم الرئيسية',
    titleEn: 'Main Dashboard',
    description: 'لوحة تحكم شاملة تعرض الكارنيه الرقمي، جدول التدريبات، وإحصائيات الحضور',
    url: 'https://image.qwenlm.ai/generated-images/ce9b5a0f-205d-491a-8e0e-590e45d4487d/_result.png',
    category: 'Dashboard'
  },
  {
    id: 3,
    title: 'الكارنيه الرقمي',
    titleEn: 'Digital ID Card',
    description: 'بطاقة تعريفية ذكية مع QR Code فريد وتأثيرات هولوغرافية',
    url: 'https://image.qwenlm.ai/generated-images/6bc6cd3f-9405-42e1-b673-0bccc8b81138/_result.png',
    category: 'Player Card'
  },
  {
    id: 4,
    title: 'نظام الحضور عبر QR',
    titleEn: 'QR Attendance System',
    description: 'واجهة المدرب لمسح أكواد QR وتسجيل الحضور فورياً',
    url: 'https://image.qwenlm.ai/generated-images/cca606f0-7175-4acb-bf21-1c0f2601ea08/_result.png',
    category: 'Attendance'
  },
  {
    id: 5,
    title: 'مركز التواصل التدريبي',
    titleEn: 'Communication Hub',
    description: 'شات جماعي مع رفع ملفات ومكالمات صوتية وفيديو',
    url: 'https://image.qwenlm.ai/generated-images/cf66570d-6bf6-4452-aeab-c20cc0ea1e03/_result.png',
    category: 'Communication'
  },
  {
    id: 6,
    title: 'لوحة المدير المالي',
    titleEn: 'Financial Dashboard',
    description: 'إدارة التحويلات المعلقة والاعتماد المالي المزدوج',
    url: 'https://image.qwenlm.ai/generated-images/484b821b-03c7-4fa8-b08e-62553b32fe33/_result.png',
    category: 'Finance'
  }
];

export default function DesignPreview() {
  const [selectedImage, setSelectedImage] = useState<DesignImage | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const categories = ['all', ...new Set(designImages.map(img => img.category))];
  
  const filteredImages = filter === 'all' 
    ? designImages 
    : designImages.filter(img => img.category === filter);

  return (
    <section id="design-preview" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
            <span className="text-pink-300 text-xs font-semibold">معاينة التصميم</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🎨 تصميمات <span className="gradient-text">التطبيق</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            معاينة احترافية لواجهات التطبيق الرئيسية — اضغط على أي صورة للتكبير والمراجعة
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                filter === cat
                  ? 'bg-gradient-to-l from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/30'
                  : 'glass-card text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat === 'all' ? 'الكل' : cat}
            </button>
          ))}
        </div>

        {/* Images Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              onClick={() => setSelectedImage(image)}
              className="glass-card overflow-hidden cursor-pointer group hover:scale-105 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[9/16] overflow-hidden bg-gradient-to-br from-gray-900 to-black">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 rounded-full bg-white/20 backdrop-blur text-white text-[10px] font-semibold">
                        {image.category}
                      </span>
                    </div>
                    <h3 className="text-white font-bold text-sm">{image.title}</h3>
                    <p className="text-gray-300 text-xs mt-1">{image.titleEn}</p>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 rounded-full bg-gradient-to-l from-pink-500/20 to-purple-500/20 text-pink-300 text-[10px] font-semibold border border-pink-500/20">
                    {image.category}
                  </span>
                </div>
                <h3 className="text-white font-bold text-sm mb-1">{image.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{image.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col">
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                ✕
              </button>

              {/* Image */}
              <div className="flex-1 overflow-auto glass-card p-4">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="w-full h-auto rounded-lg"
                />
              </div>

              {/* Info */}
              <div className="mt-4 glass-card p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 rounded-full bg-gradient-to-l from-pink-500/20 to-purple-500/20 text-pink-300 text-xs font-semibold border border-pink-500/20">
                    {selectedImage.category}
                  </span>
                  <span className="text-gray-500 text-xs">#{selectedImage.id}</span>
                </div>
                <h3 className="text-white font-bold text-xl mb-1">{selectedImage.title}</h3>
                <p className="text-gray-400 text-sm mb-2">{selectedImage.titleEn}</p>
                <p className="text-gray-300 text-sm leading-relaxed">{selectedImage.description}</p>
              </div>
            </div>
          </div>
        )}

        {/* Design Notes */}
        <div className="mt-12 glass-card p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span>📝</span> ملاحظات التصميم
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: '🎨', title: 'نظام الألوان', desc: 'تدرجات من الأزرق والبنفسجي والسيان مع خلفية داكنة' },
              { icon: '✨', title: 'التأثيرات', desc: 'Glassmorphism، Glow Effects، حركات سلسة' },
              { icon: '📱', title: 'التصميم', desc: 'Mobile-First مع دعم RTL كامل للعربية' },
              { icon: '🎯', title: 'التجربة', desc: 'واجهات بديهية مع تدفق عمليات واضح' },
            ].map((item, i) => (
              <div key={i} className="glass-card-light p-4 flex items-start gap-3">
                <div className="text-2xl">{item.icon}</div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
