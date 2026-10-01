import { useState } from 'react';

// ============================================
// 🏆 نظام المسابقات بين الأكاديميات
// ============================================
export function InterAcademyCompetitions() {
  const [selectedCompetition, setSelectedCompetition] = useState<string | null>(null);

  const competitions = [
    { id: '1', name: 'دوري الأكاديميات 2026', organizer: 'أكاديمية الرياضات', participants: 12, startDate: '2026-02-01', endDate: '2026-05-30', status: 'upcoming', prize: '50,000 ج.م', sport: 'كرة قدم' },
    { id: '2', name: 'بطولة السباحة الشتوية', organizer: 'أكاديمية النخبة', participants: 8, startDate: '2026-01-15', endDate: '2026-01-20', status: 'ongoing', prize: '20,000 ج.م', sport: 'سباحة' },
    { id: '3', name: 'كأس كرة السلة', organizer: 'أكاديمية الأبطال', participants: 16, startDate: '2025-12-01', endDate: '2025-12-20', status: 'completed', prize: '30,000 ج.م', sport: 'كرة سلة' },
    { id: '4', name: 'بطولة ألعاب القوى', organizer: 'أكاديمية الرياضات', participants: 10, startDate: '2026-03-10', endDate: '2026-03-15', status: 'upcoming', prize: '25,000 ج.م', sport: 'ألعاب قوى' },
  ];

  const teams = [
    { id: '1', name: 'فريق النسور', academy: 'أكاديمية الرياضات', players: 22, wins: 8, losses: 2, points: 24, logo: '🦅' },
    { id: '2', name: 'فريق الأسود', academy: 'أكاديمية النخبة', players: 20, wins: 7, losses: 3, points: 21, logo: '🦁' },
    { id: '3', name: 'فريق الصقور', academy: 'أكاديمية الأبطال', players: 21, wins: 6, losses: 4, points: 18, logo: '🦅' },
    { id: '4', name: 'فريق الذئاب', academy: 'أكاديمية التفوق', players: 19, wins: 5, losses: 5, points: 15, logo: '🐺' },
  ];

  const matches = [
    { id: '1', home: 'فريق النسور', away: 'فريق الأسود', date: '2026-02-05', time: '16:00', venue: 'ملعب الأكاديمية', status: 'scheduled' },
    { id: '2', home: 'فريق الصقور', away: 'فريق الذئاب', date: '2026-02-06', time: '18:00', venue: 'ملعب النخبة', status: 'scheduled' },
    { id: '3', home: 'فريق الأسود', away: 'فريق الصقور', date: '2026-02-10', time: '16:00', venue: 'ملعب الأبطال', status: 'scheduled' },
  ];

  return (
    <section id="competitions" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
            <span className="text-orange-300 text-xs font-semibold">Competitions</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🏆 المسابقات بين الأكاديميات
          </h2>
          <p className="text-gray-400">تنظيم وإدارة البطولات بين الأكاديميات المختلفة</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">🏆</div>
            <div className="text-2xl font-black text-orange-400">{competitions.length}</div>
            <div className="text-gray-400 text-xs">بطولة</div>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">👥</div>
            <div className="text-2xl font-black text-blue-400">{teams.length}</div>
            <div className="text-gray-400 text-xs">فريق</div>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">⚽</div>
            <div className="text-2xl font-black text-emerald-400">{matches.length}</div>
            <div className="text-gray-400 text-xs">مباراة</div>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">💰</div>
            <div className="text-2xl font-black text-amber-400">125K</div>
            <div className="text-gray-400 text-xs">جوائز (ج.م)</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Competitions List */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4">🏆 البطولات</h3>
            <div className="space-y-3">
              {competitions.map((comp) => (
                <div
                  key={comp.id}
                  onClick={() => setSelectedCompetition(comp.id)}
                  className={`glass-card-light p-4 cursor-pointer transition-all ${
                    selectedCompetition === comp.id ? 'ring-2 ring-orange-500/50' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-bold">{comp.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      comp.status === 'upcoming' ? 'bg-blue-500/20 text-blue-300' :
                      comp.status === 'ongoing' ? 'bg-emerald-500/20 text-emerald-300' :
                      'bg-gray-500/20 text-gray-300'
                    }`}>
                      {comp.status === 'upcoming' ? '⏰ قادمة' : comp.status === 'ongoing' ? '🔴 جارية' : '✓ مكتملة'}
                    </span>
                  </div>
                  <div className="text-gray-400 text-sm mb-2">{comp.organizer} • {comp.sport}</div>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>👥 {comp.participants} فريق</span>
                    <span>💰 {comp.prize}</span>
                    <span>📅 {comp.startDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4">🏅 لوحة المتصدرين</h3>
            <div className="space-y-3">
              {teams.sort((a, b) => b.points - a.points).map((team, index) => (
                <div key={team.id} className="glass-card-light p-4 flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold ${
                    index === 0 ? 'bg-gradient-to-br from-amber-400 to-yellow-500' :
                    index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400' :
                    index === 2 ? 'bg-gradient-to-br from-amber-600 to-orange-700' :
                    'bg-gray-700'
                  }`}>
                    {team.logo}
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-bold">{team.name}</div>
                    <div className="text-gray-400 text-xs">{team.academy}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white font-bold">{team.wins}W - {team.losses}L</div>
                    <div className="text-orange-400 font-bold">{team.points} نقطة</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Matches */}
        <div className="glass-card p-6 mt-6">
          <h3 className="text-white font-bold text-lg mb-4">⚽ المباريات القادمة</h3>
          <div className="space-y-3">
            {matches.map((match) => (
              <div key={match.id} className="glass-card-light p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 text-right">
                    <div className="text-white font-bold">{match.home}</div>
                    <div className="text-gray-400 text-xs">المضيف</div>
                  </div>
                  <div className="px-4 text-center">
                    <div className="text-orange-400 font-bold text-lg">VS</div>
                    <div className="text-gray-400 text-xs">{match.date}</div>
                    <div className="text-gray-400 text-xs">{match.time}</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-bold">{match.away}</div>
                    <div className="text-gray-400 text-xs">الضيف</div>
                  </div>
                </div>
                <div className="text-center text-gray-400 text-xs mt-2">📍 {match.venue}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// 🎙️ نظام البودكاست والمحتوى الصوتي
// ============================================
export function PodcastSystem() {
  const [selectedEpisode, setSelectedEpisode] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const podcasts = [
    { id: '1', title: 'أسرار التدريب الاحترافي', host: 'كابتن محمود', duration: '45:30', date: '2026-01-20', plays: 1234, category: 'تدريب', image: '🎙️' },
    { id: '2', title: 'التغذية السليمة للرياضيين', host: 'د. أحمد سعيد', duration: '38:15', date: '2026-01-18', plays: 987, category: 'صحة', image: '🥗' },
    { id: '3', title: 'قصص نجاح اللاعبين', host: 'كابتن سارة', duration: '52:00', date: '2026-01-15', plays: 1567, category: 'تحفيز', image: '⭐' },
    { id: '4', title: 'تقنيات الدفاع الحديثة', host: 'كابتن محمد', duration: '41:20', date: '2026-01-12', plays: 876, category: 'تدريب', image: '🛡️' },
    { id: '5', title: 'الإصابات وكيفية الوقاية', host: 'د. فاطمة حسن', duration: '35:45', date: '2026-01-10', plays: 1123, category: 'صحة', image: '🏥' },
    { id: '6', title: 'مقابلات مع أبطال', host: 'كابتن محمود', duration: '58:30', date: '2026-01-08', plays: 2341, category: 'مقابلات', image: '🎤' },
  ];

  const categories = ['الكل', 'تدريب', 'صحة', 'تحفيز', 'مقابلات'];
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  const filteredPodcasts = selectedCategory === 'الكل' 
    ? podcasts 
    : podcasts.filter(p => p.category === selectedCategory);

  return (
    <section id="podcast" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
            <span className="text-pink-300 text-xs font-semibold">Podcast</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🎙️ البودكاست والمحتوى الصوتي
          </h2>
          <p className="text-gray-400">استمع إلى نصائح تدريبية وقصص نجاح</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">🎙️</div>
            <div className="text-2xl font-black text-pink-400">{podcasts.length}</div>
            <div className="text-gray-400 text-xs">حلقة</div>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">👂</div>
            <div className="text-2xl font-black text-purple-400">8.1K</div>
            <div className="text-gray-400 text-xs">استماع</div>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">⏱️</div>
            <div className="text-2xl font-black text-blue-400">4.5h</div>
            <div className="text-gray-400 text-xs">إجمالي المدة</div>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-2xl font-black text-emerald-400">4</div>
            <div className="text-gray-400 text-xs">فئات</div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-l from-pink-500 to-rose-600 text-white'
                  : 'glass-card text-gray-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Podcasts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPodcasts.map((podcast) => (
            <div
              key={podcast.id}
              onClick={() => {
                setSelectedEpisode(podcast.id);
                setIsPlaying(true);
              }}
              className={`glass-card overflow-hidden cursor-pointer transition-all ${
                selectedEpisode === podcast.id ? 'ring-2 ring-pink-500/50 scale-105' : 'hover:scale-105'
              }`}
            >
              <div className="aspect-square bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center text-8xl">
                {podcast.image}
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-pink-500/20 text-pink-300 text-xs rounded-full">
                    {podcast.category}
                  </span>
                  <span className="text-gray-400 text-xs">👂 {podcast.plays}</span>
                </div>
                <h3 className="text-white font-bold mb-1">{podcast.title}</h3>
                <p className="text-gray-400 text-sm mb-2">{podcast.host}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>⏱️ {podcast.duration}</span>
                  <span>📅 {podcast.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Audio Player */}
        {selectedEpisode && (
          <div className="fixed bottom-0 left-0 right-0 glass-card border-t border-white/10 p-4 z-50">
            <div className="max-w-7xl mx-auto flex items-center gap-4">
              <div className="text-4xl">
                {podcasts.find(p => p.id === selectedEpisode)?.image}
              </div>
              <div className="flex-1">
                <div className="text-white font-bold">
                  {podcasts.find(p => p.id === selectedEpisode)?.title}
                </div>
                <div className="text-gray-400 text-sm">
                  {podcasts.find(p => p.id === selectedEpisode)?.host}
                </div>
                <div className="mt-2 h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-l from-pink-500 to-rose-600 w-1/3" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 rounded-full bg-gradient-to-l from-pink-500 to-rose-600 flex items-center justify-center text-white text-xl"
                >
                  {isPlaying ? '⏸️' : '▶️'}
                </button>
                <button
                  onClick={() => {
                    setSelectedEpisode(null);
                    setIsPlaying(false);
                  }}
                  className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-white"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ============================================
// 🤝 نظام الشراكات مع العلامات التجارية
// ============================================
export function PartnershipsSystem() {
  const [selectedPartner, setSelectedPartner] = useState<string | null>(null);

  const partners = [
    { id: '1', name: 'نايك', category: 'ملابس رياضية', status: 'active', revenue: 45000, duration: '12 شهر', logo: '✓', color: 'from-orange-500 to-red-600' },
    { id: '2', name: 'أديداس', category: 'معدات رياضية', status: 'active', revenue: 38000, duration: '12 شهر', logo: '✓', color: 'from-blue-500 to-cyan-600' },
    { id: '3', name: 'فودافون', category: 'اتصالات', status: 'active', revenue: 25000, duration: '6 شهر', logo: '✓', color: 'from-red-500 to-pink-600' },
    { id: '4', name: 'باناسونيك', category: 'إلكترونيات', status: 'pending', revenue: 0, duration: '6 شهر', logo: '⏳', color: 'from-blue-600 to-indigo-700' },
    { id: '5', name: 'بيوميد', category: 'مكملات غذائية', status: 'active', revenue: 18000, duration: '12 شهر', logo: '✓', color: 'from-emerald-500 to-teal-600' },
    { id: '6', name: 'سبورتنج', category: 'ملابس رياضية', status: 'expired', revenue: 12000, duration: '6 شهر', logo: '✗', color: 'from-gray-500 to-gray-600' },
  ];

  const activePartners = partners.filter(p => p.status === 'active');
  const totalRevenue = partners.reduce((s, p) => s + p.revenue, 0);

  const sponsorshipPackages = [
    { id: '1', name: 'الباقة الذهبية', price: 50000, benefits: ['شعار على جميع الملابس', 'إعلانات في الملعب', 'ذكر في جميع المنشورات', 'حضور VIP في البطولات'], color: 'from-amber-400 to-yellow-500' },
    { id: '2', name: 'الباقة الفضية', price: 30000, benefits: ['شعار على الملابس الرئيسية', 'إعلانات في الملعب', 'ذكر في المنشورات الرئيسية'], color: 'from-gray-300 to-gray-400' },
    { id: '3', name: 'الباقة البرونزية', price: 15000, benefits: ['شعار صغير على الملابس', 'ذكر في المنشورات'], color: 'from-amber-600 to-orange-700' },
  ];

  return (
    <section id="partnerships" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-emerald-300 text-xs font-semibold">Partnerships</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🤝 نظام الشراكات مع العلامات التجارية
          </h2>
          <p className="text-gray-400">إدارة الشراكات والرعاية وتحقيق إيرادات إضافية</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">🤝</div>
            <div className="text-2xl font-black text-emerald-400">{activePartners.length}</div>
            <div className="text-gray-400 text-xs">شركاء نشطون</div>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">💰</div>
            <div className="text-2xl font-black text-amber-400">{totalRevenue.toLocaleString()}</div>
            <div className="text-gray-400 text-xs">إيرادات (ج.م)</div>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-2xl font-black text-blue-400">{partners.length}</div>
            <div className="text-gray-400 text-xs">إجمالي الشراكات</div>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">📈</div>
            <div className="text-2xl font-black text-purple-400">25%</div>
            <div className="text-gray-400 text-xs">نمو الإيرادات</div>
          </div>
        </div>

        {/* Partners Grid */}
        <div className="glass-card p-6 mb-8">
          <h3 className="text-white font-bold text-lg mb-4">🤝 الشركاء الحاليون</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {partners.map((partner) => (
              <div
                key={partner.id}
                onClick={() => setSelectedPartner(partner.id)}
                className={`glass-card-light p-4 cursor-pointer transition-all ${
                  selectedPartner === partner.id ? 'ring-2 ring-emerald-500/50' : ''
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${partner.color} flex items-center justify-center text-white font-bold text-xl`}>
                    {partner.logo}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-bold">{partner.name}</h4>
                    <p className="text-gray-400 text-xs">{partner.category}</p>
                  </div>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">الحالة:</span>
                    <span className={
                      partner.status === 'active' ? 'text-emerald-400' :
                      partner.status === 'pending' ? 'text-amber-400' :
                      'text-red-400'
                    }>
                      {partner.status === 'active' ? '✓ نشط' : partner.status === 'pending' ? '⏳ معلق' : '✗ منتهي'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">الإيرادات:</span>
                    <span className="text-emerald-400 font-bold">{partner.revenue.toLocaleString()} ج.م</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">المدة:</span>
                    <span className="text-white">{partner.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsorship Packages */}
        <div className="glass-card p-6">
          <h3 className="text-white font-bold text-lg mb-4">💎 باقات الرعاية</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {sponsorshipPackages.map((pkg) => (
              <div key={pkg.id} className={`glass-card-light p-6 text-center hover:scale-105 transition-transform`}>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pkg.color} flex items-center justify-center text-3xl mx-auto mb-4`}>
                  💎
                </div>
                <h4 className="text-white font-bold text-xl mb-2">{pkg.name}</h4>
                <div className="text-3xl font-black text-white mb-4">{pkg.price.toLocaleString()} <span className="text-sm text-gray-400">ج.م</span></div>
                <ul className="space-y-2 text-right mb-6">
                  {pkg.benefits.map((benefit, i) => (
                    <li key={i} className="text-gray-300 text-sm flex items-center gap-2">
                      <span className="text-emerald-400">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3 bg-gradient-to-l from-emerald-500 to-teal-600 text-white font-bold rounded-lg">
                  اطلب الباقة
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
