import { useState } from 'react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: '10 نصائح لتحسين أداء اللاعبين الناشئين',
    excerpt: 'اكتشف أهم النصائح التي يساعد تطبيقها على تطوير مهارات اللاعبين الصغار بشكل ملحوظ خلال فترة قصيرة.',
    category: 'تدريب',
    author: 'كابتن محمود',
    date: '15 يناير 2026',
    readTime: '5 دقائق',
    image: '⚽',
  },
  {
    id: 2,
    title: 'التغذية السليمة للرياضيين الشباب',
    excerpt: 'دليل شامل حول النظام الغذائي المثالي للاعبين الناشئين لضمان نمو صحي وأداء رياضي متميز.',
    category: 'صحة',
    author: 'د. أحمد سعيد',
    date: '10 يناير 2026',
    readTime: '7 دقائق',
    image: '🥗',
  },
  {
    id: 3,
    title: 'كيف تختار الحذاء الرياضي المناسب؟',
    excerpt: 'مقارنة شاملة بين أفضل أنواع الأحذية الرياضية وكيفية اختيار ما يناسب نوع الرياضة ومستوى اللاعب.',
    category: 'معدات',
    author: 'كابتن خالد',
    date: '5 يناير 2026',
    readTime: '4 دقائق',
    image: '👟',
  },
  {
    id: 4,
    title: 'أهمية الإحماء قبل التمرين',
    excerpt: 'تعرف على التمارين الأساسية للإحماء وكيف تحمي جسمك من الإصابات وتحسن أداءك الرياضي.',
    category: 'صحة',
    author: 'كابتن أحمد',
    date: '1 يناير 2026',
    readTime: '3 دقائق',
    image: '🤸',
  },
  {
    id: 5,
    title: 'أسرار النجاح في بطولات الناشئين',
    excerpt: 'استراتيجيات مجربة من مدربين عالميين تساعد اللاعبين على التألق في البطولات الرسمية.',
    category: 'بطولات',
    author: 'كابتن محمود',
    date: '28 ديسمبر 2025',
    readTime: '6 دقائق',
    image: '🏆',
  },
  {
    id: 6,
    title: 'دور ولي الأمر في دعم اللاعب',
    excerpt: 'كيف يمكن للوالدين دعم أبنائهم نفسياً وبدنياً لتحقيق أفضل النتائج في المسيرة الرياضية.',
    category: 'تدريب',
    author: 'د. سارة علي',
    date: '20 ديسمبر 2025',
    readTime: '5 دقائق',
    image: '👨‍👩‍👧',
  },
];

export default function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const categories = ['all', ...new Set(blogPosts.map(post => post.category))];
  
  const filteredPosts = filter === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === filter);

  return (
    <section id="blog" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-emerald-300 text-xs font-semibold">المدونة</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            📝 مدونة <span className="gradient-text-blue">الأكاديمية</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            مقالات ونصائح من خبرائنا لتطوير مستواك الرياضي
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
                  ? 'bg-gradient-to-l from-emerald-500 to-teal-600 text-white'
                  : 'glass-card text-gray-400 hover:text-white'
              }`}
            >
              {cat === 'all' ? 'الكل' : cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="glass-card overflow-hidden cursor-pointer group hover:scale-105 transition-all"
            >
              {/* Image */}
              <div className="aspect-video bg-gradient-to-br from-emerald-500/10 to-teal-500/10 flex items-center justify-center text-6xl relative">
                {post.image}
                <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 backdrop-blur rounded-full text-[10px] text-white font-semibold">
                  {post.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-white font-bold text-sm mb-2 line-clamp-2 group-hover:text-emerald-300 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-[10px] text-gray-500">
                  <span>{post.author}</span>
                  <span>{post.readTime} • {post.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Post Modal */}
        {selectedPost && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedPost(null)}
          >
            <div
              className="glass-card p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="text-emerald-300 text-xs mb-2">{selectedPost.category}</div>
                  <h3 className="text-white font-bold text-2xl mb-2">{selectedPost.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span>✍️ {selectedPost.author}</span>
                    <span>📅 {selectedPost.date}</span>
                    <span>⏱️ {selectedPost.readTime}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                >
                  ✕
                </button>
              </div>

              <div className="aspect-video bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl flex items-center justify-center text-9xl mb-6">
                {selectedPost.image}
              </div>

              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>{selectedPost.excerpt}</p>
                <p>
                  هذا المقال يقدم لك نظرة شاملة حول الموضوع مع نصائح عملية يمكن تطبيقها فوراً. 
                  نحن في الأكاديمية نؤمن بأن المعرفة هي الأساس الذي يبني عليه اللاعبون نجاحهم.
                </p>
                <p>
                  من خلال سنوات من الخبرة في تدريب اللاعبين، اكتشفنا أن الالتزام بالنصائح الأساسية 
                  مع الصبر والمثابرة هو سر النجاح في المجال الرياضي.
                </p>
              </div>

              <div className="mt-6 flex gap-3">
                <button className="flex-1 py-2.5 bg-gradient-to-l from-emerald-500 to-teal-600 text-white text-sm font-bold rounded-lg">
                  أعجبني المقال 👍
                </button>
                <button className="px-4 py-2.5 glass-card text-white text-sm rounded-lg">
                  مشاركة 📤
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
