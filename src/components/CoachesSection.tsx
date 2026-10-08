import { useState } from 'react';

interface Coach {
  id: number;
  name: string;
  title: string;
  specialty: string;
  experience: string;
  certifications: string[];
  achievements: string[];
  avatar: string;
  rating: number;
  players: number;
}

const coaches: Coach[] = [
  {
    id: 1,
    name: 'كابتن محمود أحمد',
    title: 'المدير الفني',
    specialty: 'كرة القدم - تكتيك متقدم',
    experience: '15 سنة خبرة',
    certifications: ['UEFA Pro License', 'مدرب معتمد FIFA', 'دكتوراه في التربية الرياضية'],
    achievements: ['درب 3 منتخبات وطنية', 'بطل الدوري 5 مرات', 'مدرب العام 2023'],
    avatar: '👨‍🏫',
    rating: 4.9,
    players: 45
  },
  {
    id: 2,
    name: 'كابتن أحمد سعيد',
    title: 'مدرب اللياقة',
    specialty: 'التدريب البدني والإصابات',
    experience: '10 سنوات خبرة',
    certifications: ['NSCA-CSCS', 'مدرب تأهيل رياضي', 'شهادة في التغذية الرياضية'],
    achievements: ['تأهيل 50+ لاعب محترف', 'خفض الإصابات بنسبة 40%', 'محاضر دولي'],
    avatar: '💪',
    rating: 4.8,
    players: 38
  },
  {
    id: 3,
    name: 'كابتن محمد حسن',
    title: 'مدرب حراس المرمى',
    specialty: 'تدريب الحراس المتقدم',
    experience: '12 سنة خبرة',
    certifications: ['مدرب حراس معتمد', 'حارس مرمى سابق دولي', 'شهادة تحليل أداء'],
    achievements: ['تدريب 20 حارس محترف', 'بطل كأس مصر 3 مرات', 'مدرب حراس المنتخب'],
    avatar: '🧤',
    rating: 4.9,
    players: 25
  },
  {
    id: 4,
    name: 'كابتن سارة علي',
    title: 'مدربة كرة نسائية',
    specialty: 'كرة القدم للسيدات',
    experience: '8 سنوات خبرة',
    certifications: ['مدربة معتمدة AFC', 'لاعبة دولية سابقة', 'شهادة في علم النفس الرياضي'],
    achievements: ['قائدة المنتخب الوطني', 'أفضل مدربة 2024', 'تدريب 100+ لاعبة'],
    avatar: '👩‍🏫',
    rating: 5.0,
    players: 32
  },
  {
    id: 5,
    name: 'كابتن خالد إبراهيم',
    title: 'مدرب ناشئين',
    specialty: 'تطوير المهارات الأساسية',
    experience: '9 سنوات خبرة',
    certifications: ['مدرب ناشئين معتمد', 'شهادة في تنمية المهارات', 'دبلوم تدريب أطفال'],
    achievements: ['اكتشاف 15 موهبة صاعدة', 'بطل منطقة القاهرة 4 مرات', 'مدرب متميز 2023'],
    avatar: '🌟',
    rating: 4.7,
    players: 50
  },
  {
    id: 6,
    name: 'كابتن عمر طارق',
    title: 'مدرب تكتيك',
    specialty: 'التحليل التكتيكي',
    experience: '11 سنة خبرة',
    certifications: ['محلل تكتيكي معتمد', 'ماجستير في علوم الرياضة', 'شهادة في تحليل الفيديو'],
    achievements: ['تحليل 500+ مباراة', 'استشاري لـ 10 أندية', 'مؤلف كتاب تكتيكي'],
    avatar: '📊',
    rating: 4.8,
    players: 28
  }
];

export default function CoachesSection() {
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const specialties = ['all', ...new Set(coaches.map(c => c.specialty.split(' - ')[0]))];
  
  const filteredCoaches = filter === 'all' 
    ? coaches 
    : coaches.filter(c => c.specialty.includes(filter));

  return (
    <section id="coaches" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-blue-300 text-xs font-semibold">فريق التدريب</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            👨‍🏫 فريق <span className="gradient-text-blue">المدربين</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            نخبة من المدربين المعتمدين دولياً بخبرات واسعة
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {specialties.map((spec) => (
            <button
              key={spec}
              onClick={() => setFilter(spec)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                filter === spec
                  ? 'bg-gradient-to-l from-blue-500 to-cyan-600 text-white'
                  : 'glass-card text-gray-400 hover:text-white'
              }`}
            >
              {spec === 'all' ? 'الكل' : spec}
            </button>
          ))}
        </div>

        {/* Coaches Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCoaches.map((coach) => (
            <div
              key={coach.id}
              onClick={() => setSelectedCoach(coach)}
              className="glass-card p-6 cursor-pointer hover:scale-105 transition-all group"
            >
              {/* Avatar */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform">
                  {coach.avatar}
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{coach.name}</h3>
                  <p className="text-blue-300 text-sm">{coach.title}</p>
                </div>
              </div>

              {/* Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-400">🎯</span>
                  <span className="text-gray-300">{coach.specialty}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-400">⏱️</span>
                  <span className="text-gray-300">{coach.experience}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-400">⭐</span>
                  <span className="text-amber-400 font-semibold">{coach.rating}/5</span>
                  <span className="text-gray-500 text-xs">({coach.players} لاعب)</span>
                </div>
              </div>

              {/* View Details */}
              <button className="w-full py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-300 text-xs font-bold hover:bg-blue-500/30 transition-colors">
                عرض التفاصيل
              </button>
            </div>
          ))}
        </div>

        {/* Coach Details Modal */}
        {selectedCoach && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedCoach(null)}
          >
            <div
              className="glass-card p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-4xl shadow-lg">
                    {selectedCoach.avatar}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-2xl">{selectedCoach.name}</h3>
                    <p className="text-blue-300">{selectedCoach.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-amber-400">⭐ {selectedCoach.rating}</span>
                      <span className="text-gray-400 text-sm">• {selectedCoach.players} لاعب</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCoach(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                >
                  ✕
                </button>
              </div>

              {/* Specialty */}
              <div className="glass-card-light p-4 mb-4">
                <div className="text-xs text-gray-400 mb-1">التخصص</div>
                <div className="text-white font-semibold">{selectedCoach.specialty}</div>
                <div className="text-gray-400 text-sm mt-1">{selectedCoach.experience}</div>
              </div>

              {/* Certifications */}
              <div className="mb-4">
                <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                  <span>🎓</span> الشهادات والاعتمادات
                </h4>
                <div className="space-y-2">
                  {selectedCoach.certifications.map((cert, i) => (
                    <div key={i} className="glass-card-light p-3 flex items-center gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span className="text-gray-300 text-sm">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                  <span>🏆</span> الإنجازات
                </h4>
                <div className="space-y-2">
                  {selectedCoach.achievements.map((achievement, i) => (
                    <div key={i} className="glass-card-light p-3 flex items-center gap-2">
                      <span className="text-amber-400">⭐</span>
                      <span className="text-gray-300 text-sm">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
