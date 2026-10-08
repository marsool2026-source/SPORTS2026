import { useState } from 'react';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

const galleryItems: GalleryItem[] = [
  { id: 1, title: 'تدريب الناشئين', category: 'تدريبات', image: '⚽', description: 'حصة تدريبية للناشئين' },
  { id: 2, title: 'بطولة المنطقة', category: 'بطولات', image: '🏆', description: 'نهائي بطولة المنطقة 2026' },
  { id: 3, title: 'تدريب اللياقة', category: 'تدريبات', image: '💪', description: 'تمارين اللياقة البدنية' },
  { id: 4, title: 'حفل التخرج', category: 'فعاليات', image: '🎓', description: 'حفل تخرج الدفعة 2025' },
  { id: 5, title: 'تدريب الحراس', category: 'تدريبات', image: '🧤', description: 'تدريب خاص لحراس المرمى' },
  { id: 6, title: 'كأس الأكاديمية', category: 'بطولات', image: '🥇', description: 'النهائي الكبير' },
  { id: 7, title: 'يوم عائلي', category: 'فعاليات', image: '👨‍👩‍👧‍👦', description: 'يوم مفتوح للعائلات' },
  { id: 8, title: 'تدريب تكتيكي', category: 'تدريبات', image: '📋', description: 'تحليل تكتيكي للمباراة' },
  { id: 9, title: 'تكريم اللاعبين', category: 'فعاليات', image: '🌟', description: 'تكريم أفضل اللاعبين' },
];

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const categories = ['all', ...new Set(galleryItems.map(item => item.category))];
  
  const filteredItems = filter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  return (
    <section id="gallery" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            <span className="text-purple-300 text-xs font-semibold">معرض الصور</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            📸 معرض <span className="gradient-text">الصور والفيديوهات</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            لقطات من التدريبات والبطولات والفعاليات
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                filter === cat
                  ? 'bg-gradient-to-l from-purple-500 to-violet-600 text-white'
                  : 'glass-card text-gray-400 hover:text-white'
              }`}
            >
              {cat === 'all' ? 'الكل' : cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="glass-card overflow-hidden cursor-pointer group hover:scale-105 transition-all"
            >
              <div className="aspect-square bg-gradient-to-br from-purple-500/10 to-violet-500/10 flex items-center justify-center text-6xl relative">
                {item.image}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-white font-bold mb-1">{item.title}</div>
                    <div className="text-gray-300 text-xs">{item.description}</div>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <div className="text-purple-300 text-[10px] mb-1">{item.category}</div>
                <h3 className="text-white font-semibold text-sm">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="glass-card p-8 max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="text-purple-300 text-xs mb-1">{selectedImage.category}</div>
                  <h3 className="text-white font-bold text-2xl">{selectedImage.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                >
                  ✕
                </button>
              </div>

              <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-xl flex items-center justify-center text-9xl mb-4">
                {selectedImage.image}
              </div>

              <p className="text-gray-300 text-sm leading-relaxed">
                {selectedImage.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
