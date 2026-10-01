import { useState } from 'react';

// ============================================
// 🧠 نظام الذكاء العاطفي
// ============================================

export function EmotionalAI() {
  const [mood, setMood] = useState<string>('');
  const moods = [
    { emoji: '😊', label: 'سعيد', color: 'from-yellow-400 to-orange-500' },
    { emoji: '😐', label: 'عادي', color: 'from-gray-400 to-gray-500' },
    { emoji: '😔', label: 'حزين', color: 'from-blue-400 to-blue-600' },
    { emoji: '😤', label: 'غاضب', color: 'from-red-400 to-red-600' },
    { emoji: '😰', label: 'قلق', color: 'from-purple-400 to-purple-600' },
    { emoji: '😴', label: 'متعب', color: 'from-indigo-400 to-indigo-600' },
  ];

  const recommendations = {
    'سعيد': ['حافظ على هذا المزاج!', 'شارك فرحتك مع الفريق', 'استغل طاقتك في التدريب'],
    'عادي': ['جرب تمارين التنفس', 'استمع لموسيقى تحفيزية', 'تحدث مع مدربك'],
    'حزين': ['تحدث مع شخص تثق به', 'مارس رياضة خفيفة', 'خذ وقتاً لنفسك'],
    'غاضب': ['مارس تمارين التنفس العميق', 'اذهب للمشي', 'اكتب ما تشعر به'],
    'قلق': ['مارس التأمل', 'تنفس بعمق', 'تحدث مع مختص'],
    'متعب': ['خذ قسطاً من الراحة', 'اشرب ماءً كثيراً', 'نم مبكراً الليلة'],
  };

  return (
    <section id="emotional-ai" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🧠 الذكاء العاطفي
          </h2>
          <p className="text-gray-400">تحليل مشاعرك وتقديم توصيات مخصصة</p>
        </div>

        <div className="glass-card p-6 mb-6">
          <h3 className="text-white font-bold text-lg mb-4">كيف تشعر اليوم؟</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {moods.map((m) => (
              <button
                key={m.label}
                onClick={() => setMood(m.label)}
                className={`p-4 rounded-xl transition-all hover:scale-110 ${
                  mood === m.label
                    ? `bg-gradient-to-br ${m.color} ring-2 ring-white`
                    : 'glass-card-light'
                }`}
              >
                <div className="text-4xl mb-2">{m.emoji}</div>
                <div className="text-white text-xs font-bold">{m.label}</div>
              </button>
            ))}
          </div>
        </div>

        {mood && (
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4">💡 توصيات مخصصة لك</h3>
            <div className="space-y-3">
              {recommendations[mood as keyof typeof recommendations]?.map((rec, i) => (
                <div key={i} className="glass-card-light p-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold">
                    {i + 1}
                  </div>
                  <div className="text-white">{rec}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ============================================
// 💬 نظام الدردشة الصوتية
// ============================================

export function VoiceChat() {
  const [isRecording, setIsRecording] = useState(false);
  const rooms = [
    { id: 1, name: 'غرفة المدربين', participants: 5, status: 'active', icon: '👨‍🏫' },
    { id: 2, name: 'غرفة اللاعبين', participants: 12, status: 'active', icon: '⚽' },
    { id: 3, name: 'غرفة أولياء الأمور', participants: 8, status: 'active', icon: '👨‍👩‍👧' },
    { id: 4, name: 'جلسة أسئلة وأجوبة', participants: 15, status: 'live', icon: '❓' },
  ];

  return (
    <section id="voice-chat" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            💬 الدردشة الصوتية
          </h2>
          <p className="text-gray-400">غرف دردشة صوتية مباشرة</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {rooms.map((room) => (
            <div key={room.id} className="glass-card p-6 hover:scale-105 transition-transform">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl">
                  {room.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg">{room.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>👥 {room.participants} مشارك</span>
                    {room.status === 'live' && (
                      <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">LIVE</span>
                    )}
                  </div>
                </div>
              </div>
              <button className="w-full py-3 bg-gradient-to-l from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity">
                🎙️ انضم للغرفة
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 glass-card p-6 text-center">
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center text-4xl transition-all ${
              isRecording
                ? 'bg-red-500 animate-pulse'
                : 'bg-gradient-to-br from-blue-500 to-purple-600 hover:scale-110'
            }`}
          >
            {isRecording ? '⏹️' : '🎤'}
          </button>
          <p className="text-white mt-4 font-bold">
            {isRecording ? 'جاري التسجيل... اضغط للإيقاف' : 'اضغط لبدء التسجيل'}
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================
// 👥 نظام المجموعات الاجتماعية
// ============================================

export function SocialGroups() {
  const groups = [
    { id: 1, name: 'فريق كرة القدم', members: 45, icon: '⚽', category: 'رياضة' },
    { id: 2, name: 'مجموعة اللياقة', members: 32, icon: '💪', category: 'صحة' },
    { id: 3, name: 'نادي السباحة', members: 28, icon: '🏊', category: 'رياضة' },
    { id: 4, name: 'مجموعة التغذية', members: 56, icon: '🥗', category: 'صحة' },
    { id: 5, name: 'فريق البطولات', members: 38, icon: '🏆', category: 'منافسات' },
    { id: 6, name: 'مجموعة الدعم النفسي', members: 24, icon: '🧠', category: 'دعم' },
  ];

  return (
    <section id="social-groups" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            👥 المجموعات الاجتماعية
          </h2>
          <p className="text-gray-400">انضم لمجموعات حسب اهتماماتك</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <div key={group.id} className="glass-card p-6 hover:scale-105 transition-transform">
              <div className="text-5xl mb-4 text-center">{group.icon}</div>
              <h3 className="text-white font-bold text-lg mb-2 text-center">{group.name}</h3>
              <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                <span>👥 {group.members} عضو</span>
                <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">{group.category}</span>
              </div>
              <button className="w-full py-2 bg-gradient-to-l from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity">
                انضم
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// 🏆 نظام المسابقات والبطولات
// ============================================

export function Competitions() {
  const competitions = [
    { id: 1, name: 'بطولة السرعة الشهرية', participants: 32, prize: '1000 ج.م', status: 'ongoing', icon: '⚡' },
    { id: 2, name: 'تحدي اللياقة الأسبوعي', participants: 48, prize: '500 ج.م', status: 'upcoming', icon: '💪' },
    { id: 3, name: 'كأس الأكاديمية', participants: 64, prize: '2000 ج.م', status: 'upcoming', icon: '🏆' },
    { id: 4, name: 'تحدي التسديد', participants: 24, prize: '750 ج.م', status: 'completed', icon: '🎯' },
  ];

  return (
    <section id="competitions" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🏆 المسابقات والبطولات
          </h2>
          <p className="text-gray-400">شارك في تحديات مثيرة واربح جوائز</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {competitions.map((comp) => (
            <div key={comp.id} className="glass-card p-6 hover:scale-105 transition-transform">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-3xl">
                  {comp.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg">{comp.name}</h3>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <span>👥 {comp.participants} مشارك</span>
                    <span>💰 {comp.prize}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  comp.status === 'ongoing' ? 'bg-emerald-500/20 text-emerald-300' :
                  comp.status === 'upcoming' ? 'bg-blue-500/20 text-blue-300' :
                  'bg-gray-500/20 text-gray-300'
                }`}>
                  {comp.status === 'ongoing' ? '🔴 جارية' : comp.status === 'upcoming' ? '⏰ قادمة' : '✓ مكتملة'}
                </span>
                <button className="px-4 py-2 bg-gradient-to-l from-amber-500 to-orange-600 text-white text-sm font-bold rounded-lg">
                  سجل الآن
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// 🎬 نظام القصص (Stories)
// ============================================

export function StoriesSystem() {
  const stories = [
    { id: 1, user: 'أحمد محمد', content: 'تدريب رائع اليوم! ⚽', time: 'منذ ساعتين', views: 234, icon: '⚽' },
    { id: 2, user: 'كابتن محمود', content: 'استعدادات البطولة 🏆', time: 'منذ 3 ساعات', views: 456, icon: '🏆' },
    { id: 3, user: 'محمد خالد', content: 'رقم قياسي جديد! 🎉', time: 'منذ 5 ساعات', views: 678, icon: '🎉' },
    { id: 4, user: 'سارة علي', content: 'فريق رائع اليوم 💪', time: 'منذ 6 ساعات', views: 345, icon: '💪' },
  ];

  return (
    <section id="stories" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🎬 القصص
          </h2>
          <p className="text-gray-400">شارك لحظاتك مع المجتمع</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stories.map((story) => (
            <div key={story.id} className="glass-card overflow-hidden hover:scale-105 transition-transform cursor-pointer">
              <div className="aspect-[9/16] bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center relative">
                <div className="text-7xl">{story.icon}</div>
                <div className="absolute top-3 left-3 right-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                      {story.user[0]}
                    </div>
                    <div className="text-white text-xs font-bold">{story.user}</div>
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white text-sm mb-1">{story.content}</p>
                  <div className="flex items-center justify-between text-xs text-gray-300">
                    <span>{story.time}</span>
                    <span>👁️ {story.views}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button className="px-6 py-3 bg-gradient-to-l from-purple-500 to-pink-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity">
            📸 أضف قصة جديدة
          </button>
        </div>
      </div>
    </section>
  );
}

// ============================================
// 🎓 نظام التدريب عن بعد
// ============================================

export function RemoteTraining() {
  const courses = [
    { id: 1, title: 'أساسيات كرة القدم', lessons: 12, duration: '6 ساعات', level: 'مبتدئ', icon: '⚽' },
    { id: 2, title: 'التدريب المتقدم', lessons: 20, duration: '10 ساعات', level: 'متقدم', icon: '🏆' },
    { id: 3, title: 'اللياقة البدنية', lessons: 15, duration: '8 ساعات', level: 'متوسط', icon: '💪' },
    { id: 4, title: 'التغذية الرياضية', lessons: 10, duration: '5 ساعات', level: 'مبتدئ', icon: '🥗' },
  ];

  return (
    <section id="remote-training" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🎓 التدريب عن بعد
          </h2>
          <p className="text-gray-400">دروس فيديو وجلسات مباشرة</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="glass-card p-6 hover:scale-105 transition-transform">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-3xl">
                  {course.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg">{course.title}</h3>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <span>📚 {course.lessons} درس</span>
                    <span>⏱️ {course.duration}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  course.level === 'مبتدئ' ? 'bg-emerald-500/20 text-emerald-300' :
                  course.level === 'متوسط' ? 'bg-amber-500/20 text-amber-300' :
                  'bg-red-500/20 text-red-300'
                }`}>
                  {course.level}
                </span>
                <button className="px-4 py-2 bg-gradient-to-l from-blue-500 to-cyan-600 text-white text-sm font-bold rounded-lg">
                  ابدأ الآن
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// 🧠 نظام الصحة النفسية
// ============================================

export function MentalHealth() {
  const exercises = [
    { id: 1, title: 'تمارين التنفس', duration: '5 دقائق', icon: '🌬️', category: 'استرخاء' },
    { id: 2, title: 'التأمل الموجه', duration: '10 دقائق', icon: '🧘', category: 'تأمل' },
    { id: 3, title: 'إدارة الضغط', duration: '15 دقيقة', icon: '💆', category: 'إدارة' },
    { id: 4, title: 'تمارين اليقظة', duration: '7 دقائق', icon: '👁️', category: 'يقظة' },
  ];

  return (
    <section id="mental-health" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🧠 الصحة النفسية
          </h2>
          <p className="text-gray-400">تمارين تأمل وإدارة الضغط</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {exercises.map((exercise) => (
            <div key={exercise.id} className="glass-card p-6 text-center hover:scale-105 transition-transform">
              <div className="text-5xl mb-4">{exercise.icon}</div>
              <h3 className="text-white font-bold text-lg mb-2">{exercise.title}</h3>
              <div className="text-gray-400 text-sm mb-3">⏱️ {exercise.duration}</div>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">{exercise.category}</span>
              <button className="w-full mt-4 py-2 bg-gradient-to-l from-purple-500 to-pink-600 text-white text-sm font-bold rounded-lg">
                ابدأ التمرين
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 glass-card p-6">
          <h3 className="text-white font-bold text-lg mb-4">📞 دعم فوري</h3>
          <p className="text-gray-400 mb-4">هل تحتاج للتحدث مع مختص؟</p>
          <button className="px-6 py-3 bg-gradient-to-l from-emerald-500 to-teal-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity">
            احجز جلسة مع مختص
          </button>
        </div>
      </div>
    </section>
  );
}

// ============================================
// 🥗 نظام التغذية الذكية
// ============================================

export function SmartNutrition() {
  const mealPlans = [
    { id: 1, name: 'خطة بناء العضلات', calories: 2500, protein: '150g', icon: '💪' },
    { id: 2, name: 'خطة فقدان الوزن', calories: 1800, protein: '120g', icon: '🏃' },
    { id: 3, name: 'خطة الأداء', calories: 2200, protein: '140g', icon: '⚡' },
    { id: 4, name: 'خطة الصيانة', calories: 2000, protein: '130g', icon: '🔧' },
  ];

  return (
    <section id="smart-nutrition" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🥗 التغذية الذكية
          </h2>
          <p className="text-gray-400">خطط غذائية مخصصة لأهدافك</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {mealPlans.map((plan) => (
            <div key={plan.id} className="glass-card p-6 hover:scale-105 transition-transform">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-3xl">
                  {plan.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg">{plan.name}</h3>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <span>🔥 {plan.calories} سعرة</span>
                    <span>🥩 {plan.protein} بروتين</span>
                  </div>
                </div>
              </div>
              <button className="w-full py-2 bg-gradient-to-l from-emerald-500 to-teal-600 text-white text-sm font-bold rounded-lg">
                عرض الخطة
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 glass-card p-6">
          <h3 className="text-white font-bold text-lg mb-4">📊 تتبع السعرات</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="glass-card-light p-4 text-center">
              <div className="text-2xl font-black text-emerald-400">1,850</div>
              <div className="text-xs text-gray-400">سعرة اليوم</div>
            </div>
            <div className="glass-card-light p-4 text-center">
              <div className="text-2xl font-black text-blue-400">120g</div>
              <div className="text-xs text-gray-400">بروتين</div>
            </div>
            <div className="glass-card-light p-4 text-center">
              <div className="text-2xl font-black text-purple-400">2,000</div>
              <div className="text-xs text-gray-400">الهدف</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// 🎙️ نظام البودكاست
// ============================================

export function PodcastSystem() {
  const episodes = [
    { id: 1, title: 'أسرار النجاح الرياضي', guest: 'كابتن محمود', duration: '45 دقيقة', icon: '🎙️' },
    { id: 2, title: 'التغذية الصحيحة', guest: 'د. أحمد سعيد', duration: '30 دقيقة', icon: '🥗' },
    { id: 3, title: 'قصص نجاح', guest: 'لاعبون محترفون', duration: '60 دقيقة', icon: '⭐' },
    { id: 4, title: 'الإصابات والوقاية', guest: 'د. محمد حسن', duration: '40 دقيقة', icon: '🏥' },
  ];

  return (
    <section id="podcast" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🎙️ البودكاست
          </h2>
          <p className="text-gray-400">مقابلات ونصائح من الخبراء</p>
        </div>

        <div className="space-y-4">
          {episodes.map((episode) => (
            <div key={episode.id} className="glass-card p-6 hover:scale-[1.02] transition-transform">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-3xl">
                  {episode.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg">{episode.title}</h3>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <span>🎤 {episode.guest}</span>
                    <span>⏱️ {episode.duration}</span>
                  </div>
                </div>
                <button className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-xl hover:scale-110 transition-transform">
                  ▶️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// 🎵 نظام الموسيقى التحفيزية
// ============================================

export function MotivationalMusic() {
  const playlists = [
    { id: 1, name: 'تمارين القوة', songs: 25, duration: '1h 30m', icon: '💪' },
    { id: 2, name: 'الجري والكارديو', songs: 30, duration: '2h', icon: '🏃' },
    { id: 3, name: 'الاسترخاء', songs: 20, duration: '1h 15m', icon: '🧘' },
    { id: 4, name: 'التحفيز', songs: 35, duration: '2h 30m', icon: '⚡' },
  ];

  return (
    <section id="music" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🎵 الموسيقى التحفيزية
          </h2>
          <p className="text-gray-400">قوائم تشغيل مخصصة لأنشطتك</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {playlists.map((playlist) => (
            <div key={playlist.id} className="glass-card p-6 hover:scale-105 transition-transform">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-3xl">
                  {playlist.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg">{playlist.name}</h3>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <span>🎵 {playlist.songs} أغنية</span>
                    <span>⏱️ {playlist.duration}</span>
                  </div>
                </div>
              </div>
              <button className="w-full py-2 bg-gradient-to-l from-pink-500 to-rose-600 text-white text-sm font-bold rounded-lg">
                ▶️ تشغيل
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// 📸 نظام الفلاتر والتأثيرات
// ============================================

export function FiltersEffects() {
  const filters = [
    { id: 1, name: 'الأكاديمية', icon: '🏆', color: 'from-blue-500 to-purple-600' },
    { id: 2, name: 'البطل', icon: '🥇', color: 'from-amber-500 to-orange-600' },
    { id: 3, name: 'الطاقة', icon: '⚡', color: 'from-yellow-400 to-red-500' },
    { id: 4, name: 'القوة', icon: '💪', color: 'from-red-500 to-pink-600' },
    { id: 5, name: 'السرعة', icon: '🏃', color: 'from-cyan-400 to-blue-600' },
    { id: 6, name: 'النجاح', icon: '⭐', color: 'from-purple-500 to-pink-600' },
  ];

  return (
    <section id="filters" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            📸 الفلاتر والتأثيرات
          </h2>
          <p className="text-gray-400">فلاتر AR احترافية لصورك</p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {filters.map((filter) => (
            <div key={filter.id} className="glass-card p-4 text-center hover:scale-110 transition-transform cursor-pointer">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${filter.color} flex items-center justify-center text-4xl mx-auto mb-2`}>
                {filter.icon}
              </div>
              <div className="text-white text-xs font-bold">{filter.name}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 glass-card p-6 text-center">
          <div className="text-6xl mb-4">📷</div>
          <h3 className="text-white font-bold text-lg mb-2">التقط صورة الآن</h3>
          <p className="text-gray-400 text-sm mb-4">استخدم الفلاتر وشارك إنجازاتك</p>
          <button className="px-6 py-3 bg-gradient-to-l from-pink-500 to-purple-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity">
            📸 افتح الكاميرا
          </button>
        </div>
      </div>
    </section>
  );
}

// ============================================
// 🤝 نظام الشراكات
// ============================================

export function Partnerships() {
  const partners = [
    { id: 1, name: 'نايك', category: 'ملابس رياضية', discount: '20%', icon: '✓' },
    { id: 2, name: 'أديداس', category: 'معدات رياضية', discount: '15%', icon: '✓' },
    { id: 3, name: 'فودافون', category: 'اتصالات', discount: '10%', icon: '✓' },
    { id: 4, name: 'باناسونيك', category: 'إلكترونيات', discount: '25%', icon: '✓' },
  ];

  return (
    <section id="partnerships" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🤝 الشراكات والعروض
          </h2>
          <p className="text-gray-400">عروض حصرية من شركائنا</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {partners.map((partner) => (
            <div key={partner.id} className="glass-card p-6 text-center hover:scale-105 transition-transform">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl mx-auto mb-4">
                {partner.icon}
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{partner.name}</h3>
              <p className="text-gray-400 text-sm mb-3">{partner.category}</p>
              <div className="text-3xl font-black text-emerald-400 mb-4">{partner.discount}</div>
              <button className="w-full py-2 bg-gradient-to-l from-emerald-500 to-teal-600 text-white text-sm font-bold rounded-lg">
                احصل على العرض
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// 💰 نظام التبرعات
// ============================================

export function DonationsSystem() {
  const campaigns = [
    { id: 1, title: 'دعم اللاعبين المحتاجين', raised: 15000, target: 25000, icon: '🤝' },
    { id: 2, title: 'تجهيز الملعب الجديد', raised: 45000, target: 100000, icon: '🏟️' },
    { id: 3, title: 'شراء معدات تدريب', raised: 8000, target: 15000, icon: '⚽' },
  ];

  return (
    <section id="donations" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            💰 التبرعات
          </h2>
          <p className="text-gray-400">ساهم في دعم الأكاديمية واللاعبين</p>
        </div>

        <div className="space-y-6">
          {campaigns.map((campaign) => {
            const percentage = (campaign.raised / campaign.target) * 100;
            return (
              <div key={campaign.id} className="glass-card p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-3xl">
                    {campaign.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg">{campaign.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <span>💰 {campaign.raised.toLocaleString()} ج.م</span>
                      <span>🎯 {campaign.target.toLocaleString()} ج.م</span>
                    </div>
                  </div>
                </div>
                <div className="h-3 bg-gray-700 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-to-l from-emerald-500 to-teal-600"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                  <span>{percentage.toFixed(1)}% مكتمل</span>
                  <span>{(campaign.target - campaign.raised).toLocaleString()} ج.م متبقي</span>
                </div>
                <button className="w-full py-3 bg-gradient-to-l from-emerald-500 to-teal-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity">
                  تبرع الآن
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================
// 📊 نظام التقارير المالية المتقدمة
// ============================================

export function AdvancedFinancialReports() {
  const reports = [
    { id: 1, title: 'تقرير الإيرادات الشهري', date: '2026-01', type: 'PDF', icon: '💰' },
    { id: 2, title: 'تقرير المصروفات', date: '2026-01', type: 'Excel', icon: '💸' },
    { id: 3, title: 'الميزانية العمومية', date: '2026-01', type: 'PDF', icon: '📊' },
    { id: 4, title: 'تقرير التدفقات النقدية', date: '2026-01', type: 'Excel', icon: '💵' },
  ];

  return (
    <section id="financial-reports" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            📊 التقارير المالية المتقدمة
          </h2>
          <p className="text-gray-400">تقارير مفصلة وتحليلات متقدمة</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {reports.map((report) => (
            <div key={report.id} className="glass-card p-6 hover:scale-105 transition-transform">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-3xl">
                  {report.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg">{report.title}</h3>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <span>📅 {report.date}</span>
                    <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded text-xs">{report.type}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-300 text-sm">
                  📥 تحميل
                </button>
                <button className="flex-1 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-300 text-sm">
                  👁️ معاينة
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-card p-6">
          <h3 className="text-white font-bold text-lg mb-4">📈 التحليلات المتقدمة</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-card-light p-4 text-center">
              <div className="text-2xl font-black text-emerald-400">+15%</div>
              <div className="text-xs text-gray-400">نمو الإيرادات</div>
            </div>
            <div className="glass-card-light p-4 text-center">
              <div className="text-2xl font-black text-blue-400">-8%</div>
              <div className="text-xs text-gray-400">انخفاض المصروفات</div>
            </div>
            <div className="glass-card-light p-4 text-center">
              <div className="text-2xl font-black text-purple-400">92%</div>
              <div className="text-xs text-gray-400">هامش الربح</div>
            </div>
            <div className="glass-card-light p-4 text-center">
              <div className="text-2xl font-black text-amber-400">4.5x</div>
              <div className="text-xs text-gray-400">العائد على الاستثمار</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// 🎭 نظام المحاكاة
// ============================================

export function SimulationSystem() {
  const scenarios = [
    { id: 1, title: 'محاكاة المباراة النهائية', duration: '45 دقيقة', difficulty: 'متقدم', icon: '🏆' },
    { id: 2, title: 'سيناريو الضغط العالي', duration: '30 دقيقة', difficulty: 'صعب', icon: '😰' },
    { id: 3, title: 'اتخاذ القرارات', duration: '20 دقيقة', difficulty: 'متوسط', icon: '🎯' },
    { id: 4, title: 'العمل الجماعي', duration: '25 دقيقة', difficulty: 'متوسط', icon: '🤝' },
  ];

  return (
    <section id="simulation" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🎭 نظام المحاكاة
          </h2>
          <p className="text-gray-400">سيناريوهات تدريبية واقعية</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {scenarios.map((scenario) => (
            <div key={scenario.id} className="glass-card p-6 hover:scale-105 transition-transform">
              <div className="text-5xl mb-4 text-center">{scenario.icon}</div>
              <h3 className="text-white font-bold text-lg mb-2 text-center">{scenario.title}</h3>
              <div className="flex items-center justify-center gap-3 text-sm text-gray-400 mb-4">
                <span>⏱️ {scenario.duration}</span>
                <span>🎯 {scenario.difficulty}</span>
              </div>
              <button className="w-full py-3 bg-gradient-to-l from-purple-500 to-pink-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity">
                ابدأ المحاكاة
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// 🌐 نظام الميتافيرس
// ============================================

export function MetaverseSystem() {
  const worlds = [
    { id: 1, name: 'عالم التدريب', visitors: 234, icon: '🏋️', status: 'active' },
    { id: 2, name: 'ملعب البطولات', visitors: 567, icon: '🏟️', status: 'active' },
    { id: 3, name: 'صالة الاجتماعات', visitors: 89, icon: '🤝', status: 'active' },
    { id: 4, name: 'عالم الاسترخاء', visitors: 156, icon: '🧘', status: 'active' },
  ];

  return (
    <section id="metaverse" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🌐 الميتافيرس
          </h2>
          <p className="text-gray-400">عالم افتراضي للتدريب والاجتماعات</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {worlds.map((world) => (
            <div key={world.id} className="glass-card p-6 hover:scale-105 transition-transform">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-3xl">
                  {world.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg">{world.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>👥 {world.visitors} زائر</span>
                    <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                    <span className="text-emerald-400 text-xs">نشط</span>
                  </div>
                </div>
              </div>
              <button className="w-full py-3 bg-gradient-to-l from-purple-500 to-pink-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity">
                🌐 ادخل العالم
              </button>
            </div>
          ))}
        </div>

        <div className="glass-card p-6 text-center">
          <div className="text-6xl mb-4">🥽</div>
          <h3 className="text-white font-bold text-xl mb-2">استعد للدخول للميتافيرس</h3>
          <p className="text-gray-400 mb-4">تحتاج نظارة VR أو متصفح متوافق</p>
          <button className="px-8 py-4 bg-gradient-to-l from-purple-500 to-pink-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity">
            🚀 ابدأ الآن
          </button>
        </div>
      </div>
    </section>
  );
}
