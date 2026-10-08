import { useState } from 'react';

// ============================================
// 🔌 نظام API Integration المتقدم
// ============================================
export function APIIntegration() {
  const integrations = [
    { id: 1, name: 'Google Calendar', icon: '📅', status: 'connected', events: 245, lastSync: 'منذ 5 دقائق' },
    { id: 2, name: 'Zoom Meetings', icon: '📹', status: 'connected', events: 89, lastSync: 'منذ 10 دقائق' },
    { id: 3, name: 'Stripe Payments', icon: '💳', status: 'connected', events: 1234, lastSync: 'منذ دقيقة' },
    { id: 4, name: 'WhatsApp Business', icon: '💬', status: 'connected', events: 567, lastSync: 'منذ 2 دقيقة' },
    { id: 5, name: 'Instagram', icon: '📷', status: 'disconnected', events: 0, lastSync: 'غير متصل' },
    { id: 6, name: 'Facebook', icon: '📘', status: 'connected', events: 345, lastSync: 'منذ 15 دقيقة' },
  ];

  return (
    <section id="api-integration" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-blue-300 text-xs font-semibold">Integrations</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🔌 تكامل APIs المتقدم
          </h2>
          <p className="text-gray-400">ربط النظام مع أفضل الخدمات الخارجية</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map((integration) => (
            <div key={integration.id} className="glass-card p-6 hover:scale-105 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl">{integration.icon}</div>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  integration.status === 'connected' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                }`}>
                  {integration.status === 'connected' ? '✓ متصل' : '✗ غير متصل'}
                </span>
              </div>
              <h3 className="text-white font-bold mb-2">{integration.name}</h3>
              <div className="space-y-1 text-xs text-gray-400">
                <div>الأحداث المتزامنة: {integration.events}</div>
                <div>آخر مزامنة: {integration.lastSync}</div>
              </div>
              <button className={`w-full mt-4 py-2 rounded-lg text-sm font-bold ${
                integration.status === 'connected'
                  ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300'
                  : 'bg-blue-500/20 border border-blue-500/30 text-blue-300'
              }`}>
                {integration.status === 'connected' ? 'إدارة' : 'ربط'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// 📱 نظام Social Media Integration
// ============================================
export function SocialMediaIntegration() {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('instagram');

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: '📷', followers: '12.5K', posts: 245, engagement: '4.8%' },
    { id: 'facebook', name: 'Facebook', icon: '📘', followers: '25.3K', posts: 189, engagement: '3.2%' },
    { id: 'twitter', name: 'Twitter', icon: '🐦', followers: '8.7K', posts: 567, engagement: '2.1%' },
    { id: 'youtube', name: 'YouTube', icon: '▶️', followers: '45.2K', posts: 78, engagement: '6.5%' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵', followers: '67.8K', posts: 123, engagement: '8.9%' },
  ];

  const scheduledPosts = [
    { id: 1, platform: 'instagram', content: 'تدريب اليوم مع الفريق 🏆', scheduled: '2026-01-21 10:00', status: 'scheduled' },
    { id: 2, platform: 'facebook', content: 'انضموا لبطولتنا القادمة! 🎯', scheduled: '2026-01-22 14:00', status: 'scheduled' },
    { id: 3, platform: 'twitter', content: 'تهانينا لأبطالنا! 🏅', scheduled: '2026-01-20 18:00', status: 'published' },
  ];

  return (
    <section id="social-media" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
            <span className="text-pink-300 text-xs font-semibold">Social Media</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            📱 تكامل السوشيال ميديا
          </h2>
          <p className="text-gray-400">إدارة جميع منصات التواصل من مكان واحد</p>
        </div>

        {/* Platforms Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {platforms.map((platform) => (
            <div
              key={platform.id}
              onClick={() => setSelectedPlatform(platform.id)}
              className={`glass-card p-4 cursor-pointer transition-all ${
                selectedPlatform === platform.id ? 'ring-2 ring-pink-500/50' : ''
              }`}
            >
              <div className="text-3xl mb-2">{platform.icon}</div>
              <h3 className="text-white font-bold text-sm mb-1">{platform.name}</h3>
              <div className="text-pink-400 font-bold">{platform.followers}</div>
              <div className="text-gray-400 text-xs">{platform.engagement} تفاعل</div>
            </div>
          ))}
        </div>

        {/* Scheduled Posts */}
        <div className="glass-card p-6">
          <h3 className="text-white font-bold text-lg mb-4">📅 المنشورات المجدولة</h3>
          <div className="space-y-3">
            {scheduledPosts.map((post) => (
              <div key={post.id} className="glass-card-light p-4 flex items-center gap-4">
                <div className="text-2xl">
                  {platforms.find(p => p.id === post.platform)?.icon}
                </div>
                <div className="flex-1">
                  <div className="text-white text-sm">{post.content}</div>
                  <div className="text-gray-400 text-xs">{post.scheduled}</div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  post.status === 'published' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-blue-500/20 text-blue-300'
                }`}>
                  {post.status === 'published' ? '✓ منشور' : '⏰ مجدول'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// 🎥 نظام إنشاء المحتوى التلقائي
// ============================================
export function AutoContentCreation() {
  const [generating, setGenerating] = useState(false);
  const [contentType, setContentType] = useState<'video' | 'poster' | 'article' | 'story'>('video');

  const generatedContent = [
    { id: 1, type: 'فيديو', title: 'ملخص تدريب الأسبوع', status: 'completed', duration: '2:30', views: 1234 },
    { id: 2, type: 'بوستر', title: 'إعلان البطولة القادمة', status: 'completed', views: 567 },
    { id: 3, type: 'مقال', title: 'نصائح للاعبين الناشئين', status: 'in-progress', views: 0 },
    { id: 4, type: 'قصة', title: 'إنجازات اليوم', status: 'completed', views: 892 },
  ];

  const startGeneration = () => {
    setGenerating(true);
    setTimeout(() => setGenerating(false), 3000);
  };

  return (
    <section id="auto-content" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
            <span className="text-violet-300 text-xs font-semibold">AI Content</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🎥 إنشاء المحتوى التلقائي
          </h2>
          <p className="text-gray-400">إنشاء فيديوهات وبوسترات ومقالات بالذكاء الاصطناعي</p>
        </div>

        {/* Content Type Selector */}
        <div className="glass-card p-6 mb-6">
          <h3 className="text-white font-bold mb-4">اختر نوع المحتوى</h3>
          <div className="grid grid-cols-4 gap-3">
            {[
              { id: 'video', label: '🎬 فيديو', color: 'from-red-500 to-pink-500' },
              { id: 'poster', label: '🖼️ بوستر', color: 'from-purple-500 to-violet-500' },
              { id: 'article', label: '📝 مقال', color: 'from-blue-500 to-cyan-500' },
              { id: 'story', label: '📱 قصة', color: 'from-amber-500 to-orange-500' },
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setContentType(type.id as any)}
                className={`p-4 rounded-xl text-center transition-all ${
                  contentType === type.id
                    ? `bg-gradient-to-br ${type.color} text-white`
                    : 'glass-card-light text-gray-400 hover:text-white'
                }`}
              >
                <div className="text-2xl mb-1">{type.label.split(' ')[0]}</div>
                <div className="text-xs font-bold">{type.label.split(' ')[1]}</div>
              </button>
            ))}
          </div>
          <button
            onClick={startGeneration}
            disabled={generating}
            className="w-full mt-4 py-3 bg-gradient-to-l from-violet-500 to-purple-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {generating ? '🤖 جاري الإنشاء...' : '✨ إنشاء محتوى بالذكاء الاصطناعي'}
          </button>
        </div>

        {/* Generated Content */}
        <div className="glass-card p-6">
          <h3 className="text-white font-bold text-lg mb-4">📋 المحتوى المُنشأ</h3>
          <div className="space-y-3">
            {generatedContent.map((content) => (
              <div key={content.id} className="glass-card-light p-4 flex items-center gap-4">
                <div className="text-2xl">
                  {content.type === 'فيديو' ? '🎬' : content.type === 'بوستر' ? '🖼️' : content.type === 'مقال' ? '📝' : '📱'}
                </div>
                <div className="flex-1">
                  <div className="text-white font-bold text-sm">{content.title}</div>
                  <div className="text-gray-400 text-xs">{content.type}</div>
                </div>
                <div className="text-left">
                  <div className="text-gray-400 text-xs">{content.views} مشاهدة</div>
                  <span className={`text-xs ${content.status === 'completed' ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {content.status === 'completed' ? '✓ مكتمل' : '⏰ جاري'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// ⚙️ نظام Automation المتقدم
// ============================================
export function AutomationSystem() {
  const workflows = [
    { id: 1, name: 'ترحيب باللاعبين الجدد', trigger: 'تسجيل لاعب جديد', actions: 5, runs: 234, status: 'active' },
    { id: 2, name: 'تذكير بالدفع', trigger: 'اقتراب موعد الدفع', actions: 3, runs: 567, status: 'active' },
    { id: 3, name: 'تقرير يومي', trigger: 'كل يوم 6 مساءً', actions: 8, runs: 45, status: 'active' },
    { id: 4, name: 'تنبيه غياب', trigger: 'غياب لاعب', actions: 4, runs: 189, status: 'active' },
    { id: 5, name: 'تهنئة إنجاز', trigger: 'تحقيق إنجاز', actions: 6, runs: 78, status: 'paused' },
  ];

  return (
    <section id="automation" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <span className="text-amber-300 text-xs font-semibold">Automation</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ⚙️ نظام الأتمتة المتقدم
          </h2>
          <p className="text-gray-400">أتمتة المهام المتكررة وتوفير الوقت</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-4 text-center">
            <div className="text-3xl mb-2">⚡</div>
            <div className="text-2xl font-black text-amber-400">{workflows.length}</div>
            <div className="text-gray-400 text-xs">سير عمل</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl mb-2">🔄</div>
            <div className="text-2xl font-black text-blue-400">1,113</div>
            <div className="text-gray-400 text-xs">تشغيل هذا الشهر</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl mb-2">⏱️</div>
            <div className="text-2xl font-black text-emerald-400">156h</div>
            <div className="text-gray-400 text-xs">وقت موفر</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl mb-2">💰</div>
            <div className="text-2xl font-black text-purple-400">80%</div>
            <div className="text-gray-400 text-xs">توفير في الوقت</div>
          </div>
        </div>

        {/* Workflows */}
        <div className="space-y-3">
          {workflows.map((workflow) => (
            <div key={workflow.id} className="glass-card p-5 hover:scale-[1.01] transition-transform">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${workflow.status === 'active' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                  <div>
                    <h3 className="text-white font-bold">{workflow.name}</h3>
                    <p className="text-gray-400 text-xs">المُشغّل: {workflow.trigger}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  workflow.status === 'active' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {workflow.status === 'active' ? '🟢 نشط' : '⏸ متوقف'}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>🔧 {workflow.actions} إجراءات</span>
                <span>🔄 {workflow.runs} تشغيل</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// 🧠 نظام التعلم الآلي الشخصي
// ============================================
export function PersonalizedML() {
  const insights = [
    { type: 'تفضيلات', title: 'يفضل التدريب صباحاً', confidence: 92, icon: '🌅' },
    { type: 'سلوك', title: 'يزور صفحة البطولات بكثرة', confidence: 87, icon: '🏆' },
    { type: 'تعلم', title: 'يتعلم أسرع بالفيديو', confidence: 95, icon: '🎥' },
    { type: 'اجتماعي', title: 'يتفاعل مع المنشورات الرياضية', confidence: 89, icon: '💬' },
  ];

  const recommendations = [
    { title: 'جدولة التدريبات صباحاً', reason: 'أداؤك أفضل في الصباح', impact: '+15%', icon: '⏰' },
    { title: 'محتوى فيديو أكثر', reason: 'تتفاعل أكثر مع الفيديو', impact: '+23%', icon: '📹' },
    { title: 'تحديات جماعية', reason: 'تفضل التعلم الجماعي', impact: '+18%', icon: '👥' },
  ];

  return (
    <section id="personalized-ml" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-cyan-300 text-xs font-semibold">Machine Learning</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🧠 التعلم الآلي الشخصي
          </h2>
          <p className="text-gray-400">تجربة مخصصة 100% بناءً على سلوكك</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Insights */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4">💡 رؤى ذكية</h3>
            <div className="space-y-3">
              {insights.map((insight, i) => (
                <div key={i} className="glass-card-light p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{insight.icon}</span>
                    <div className="flex-1">
                      <div className="text-white font-bold text-sm">{insight.title}</div>
                      <div className="text-gray-400 text-xs">{insight.type}</div>
                    </div>
                    <span className="text-cyan-400 font-bold">{insight.confidence}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-l from-cyan-500 to-blue-600" style={{ width: `${insight.confidence}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4">🎯 توصيات مخصصة</h3>
            <div className="space-y-3">
              {recommendations.map((rec, i) => (
                <div key={i} className="glass-card-light p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{rec.icon}</span>
                    <div className="flex-1">
                      <div className="text-white font-bold text-sm">{rec.title}</div>
                      <div className="text-gray-400 text-xs">{rec.reason}</div>
                    </div>
                    <span className="text-emerald-400 font-bold">{rec.impact}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
