import { useState } from 'react';

// ============================================
// 🌐 نظام الميتافيرس الرياضي
// ============================================
export function MetaverseSystem() {
  const [activeWorld, setActiveWorld] = useState('main');
  const [avatar, setAvatar] = useState('🧑‍🦱');

  const worlds = [
    { id: 'main', name: 'العالم الرئيسي', icon: '🏟️', users: 245, description: 'المقر الرئيسي للأكاديمية' },
    { id: 'training', name: 'عالم التدريب', icon: '🏋️', users: 189, description: 'صالات تدريب افتراضية' },
    { id: 'tournament', name: 'عالم البطولات', icon: '🏆', users: 312, description: 'ساحات البطولات والمباريات' },
    { id: 'social', name: 'العالم الاجتماعي', icon: '🎉', users: 456, description: 'مكان للتواصل والاجتماعات' },
    { id: 'market', name: 'سوق NFT', icon: '💎', users: 178, description: 'تداول الشهادات والإنجازات' },
  ];

  const activities = [
    { id: 1, title: 'تدريب جماعي', time: '4:00 م', participants: 12, icon: '👥' },
    { id: 2, title: 'بطولة افتراضية', time: '6:00 م', participants: 32, icon: '🏆' },
    { id: 3, title: 'اجتماع المدربين', time: '8:00 م', participants: 8, icon: '💼' },
    { id: 4, title: 'حفل توزيع الجوائز', time: '9:00 م', participants: 150, icon: '🎊' },
  ];

  const avatarOptions = ['🧑‍🦱', '👨‍🦰', '👩‍🦳', '🧑‍🦲', '👨‍🦱', '👩‍🦰', '🧔', '👱'];

  return (
    <section id="metaverse" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            <span className="text-purple-300 text-xs font-semibold">Metaverse</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🌐 نظام الميتافيرس الرياضي
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            عالم افتراضي متكامل للتدريب والبطولات والتواصل الاجتماعي
          </p>
        </div>

        {/* Avatar Section */}
        <div className="glass-card p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold text-lg">👤 شخصيتك الافتراضية</h3>
            <div className="text-6xl">{avatar}</div>
          </div>
          <div className="grid grid-cols-8 gap-2">
            {avatarOptions.map((opt, i) => (
              <button
                key={i}
                onClick={() => setAvatar(opt)}
                className={`text-4xl p-2 rounded-lg transition-all ${
                  avatar === opt ? 'bg-purple-500/30 ring-2 ring-purple-500' : 'hover:bg-white/10'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Worlds Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {worlds.map((world) => (
            <div
              key={world.id}
              onClick={() => setActiveWorld(world.id)}
              className={`glass-card p-5 cursor-pointer transition-all ${
                activeWorld === world.id ? 'ring-2 ring-purple-500 scale-105' : 'hover:scale-105'
              }`}
            >
              <div className="text-4xl mb-3 text-center">{world.icon}</div>
              <h4 className="text-white font-bold text-center mb-2">{world.name}</h4>
              <p className="text-gray-400 text-xs text-center mb-3">{world.description}</p>
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-emerald-400 text-xs font-bold">{world.users} متصل</span>
              </div>
            </div>
          ))}
        </div>

        {/* Current World View */}
        <div className="glass-card p-6 mb-8">
          <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-xl flex items-center justify-center relative overflow-hidden mb-4">
            <div className="text-center">
              <div className="text-8xl mb-4 animate-pulse">
                {worlds.find(w => w.id === activeWorld)?.icon}
              </div>
              <div className="text-white font-bold text-2xl mb-2">
                {worlds.find(w => w.id === activeWorld)?.name}
              </div>
              <div className="text-gray-300">
                {worlds.find(w => w.id === activeWorld)?.users} مستخدم متصل الآن
              </div>
            </div>
            {/* Animated Users */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute text-2xl animate-bounce"
                style={{
                  top: `${20 + Math.random() * 60}%`,
                  left: `${10 + Math.random() * 80}%`,
                  animationDelay: `${i * 0.3}s`,
                }}
              >
                {avatarOptions[i % avatarOptions.length]}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button className="py-3 bg-gradient-to-l from-purple-500 to-violet-600 text-white font-bold rounded-lg">
              🎮 دخول العالم
            </button>
            <button className="py-3 glass-card text-white font-bold rounded-lg">
              👥 دعوة أصدقاء
            </button>
            <button className="py-3 glass-card text-white font-bold rounded-lg">
              🎁 إرسال هدية
            </button>
            <button className="py-3 glass-card text-white font-bold rounded-lg">
              📸 التقاط صورة
            </button>
          </div>
        </div>

        {/* Activities */}
        <div className="glass-card p-6">
          <h3 className="text-white font-bold text-lg mb-4">📅 الأنشطة القادمة</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {activities.map((activity) => (
              <div key={activity.id} className="glass-card-light p-4 flex items-center gap-4">
                <div className="text-4xl">{activity.icon}</div>
                <div className="flex-1">
                  <div className="text-white font-bold">{activity.title}</div>
                  <div className="text-gray-400 text-sm">⏰ {activity.time}</div>
                  <div className="text-purple-400 text-xs">👥 {activity.participants} مشارك</div>
                </div>
                <button className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-300 text-sm font-bold">
                  انضم
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// 🤖 نظام المدرب الذكي (AI Coach)
// ============================================
export function AICoach() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'مرحباً! أنا مدربك الذكي. كيف يمكنني مساعدتك اليوم؟', time: 'الآن' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const aiResponses: Record<string, string> = {
    'تمرين': 'بناءً على أدائك الأخير، أنصحك بتمارين القوة والتحمل. ابدأ بـ 3 مجموعات من 10 تكرارات، وزد الوزن تدريجياً.',
    'تغذية': 'لتحسين أدائك، تناول وجبة غنية بالبروتين قبل التمرين بساعتين. اشرب 500 مل من الماء كل 30 دقيقة أثناء التدريب.',
    'راحة': 'جسمك يحتاج 7-8 ساعات نوم يومياً. خذ يوم راحة واحد على الأقل كل أسبوع لتجنب الإصابات.',
    'إصابة': 'إذا شعرت بألم، توقف فوراً. ضع ثلج على المنطقة المصابة لمدة 15 دقيقة. إذا استمر الألم، راجع الطبيب.',
    'أداء': 'أداؤك تحسن بنسبة 15% هذا الشهر! استمر على هذا المنوال. ركز على تحسين سرعتك بنسبة 5% إضافية.',
  };

  const getAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    for (const [key, response] of Object.entries(aiResponses)) {
      if (lowerQuery.includes(key)) {
        return response;
      }
    }
    return 'سأساعدك في ذلك. دعني أحلل بياناتك وأقدم لك خطة مخصصة. هل تريد أن نبدأ بتحليل أدائك الحالي؟';
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: input,
      time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        sender: 'ai',
        text: getAIResponse(input),
        time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <section id="ai-coach" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-cyan-300 text-xs font-semibold">AI Coach</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🤖 المدرب الذكي الشخصي
          </h2>
          <p className="text-gray-400">مدرب ذكاء اصطناعي متوفر 24/7 لتحسين أدائك</p>
        </div>

        {/* Chat Interface */}
        <div className="glass-card overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-l from-cyan-600 to-blue-600 p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">
              🤖
            </div>
            <div className="flex-1">
              <div className="text-white font-bold">المدرب الذكي</div>
              <div className="text-white/70 text-xs flex items-center gap-1">
                <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                متصل الآن - جاهز لمساعدتك
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-[400px] overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl p-4 ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white'
                    : 'bg-white/5 border border-white/10 text-gray-200'
                }`}>
                  <div className="text-sm whitespace-pre-line">{msg.text}</div>
                  <div className={`text-[10px] mt-2 ${msg.sender === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-t border-white/10">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {['تمرين', 'تغذية', 'راحة', 'إصابة', 'أداء'].map((topic) => (
                <button
                  key={topic}
                  onClick={() => setInput(topic)}
                  className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-300 text-sm whitespace-nowrap hover:bg-cyan-500/30 transition-colors"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="اسأل مدربك الذكي..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
              />
              <button
                onClick={sendMessage}
                className="px-6 py-3 bg-gradient-to-l from-cyan-500 to-blue-600 text-white font-bold rounded-xl"
              >
                ➤
              </button>
            </div>
          </div>
        </div>

        {/* AI Features */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          {[
            { icon: '🎯', title: 'خطط مخصصة', desc: 'خطط تدريب مصممة خصيصاً لك' },
            { icon: '📊', title: 'تحليل فوري', desc: 'تحليل أدائك في الوقت الفعلي' },
            { icon: '💡', title: 'نصائح ذكية', desc: 'توصيات مبنية على بياناتك' },
          ].map((feature, i) => (
            <div key={i} className="glass-card p-4 text-center">
              <div className="text-3xl mb-2">{feature.icon}</div>
              <h4 className="text-white font-bold mb-1">{feature.title}</h4>
              <p className="text-gray-400 text-xs">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// 💳 نظام الدفع المتقدم
// ============================================
export function AdvancedPaymentSystem() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [amount, setAmount] = useState(500);

  const paymentMethods = [
    { id: 'vodafone', name: 'فودافون كاش', icon: '📱', fee: 0, min: 50, max: 10000 },
    { id: 'etisalat', name: 'اتصالات كاش', icon: '📲', fee: 0, min: 50, max: 10000 },
    { id: 'orange', name: 'Orange Cash', icon: '🟠', fee: 0, min: 50, max: 10000 },
    { id: 'we', name: 'WE Pay', icon: '🟣', fee: 0, min: 50, max: 10000 },
    { id: 'stripe', name: 'Stripe', icon: '💳', fee: 2.9, min: 100, max: 50000 },
    { id: 'paypal', name: 'PayPal', icon: '🅿️', fee: 3.5, min: 100, max: 100000 },
    { id: 'bank', name: 'تحويل بنكي', icon: '🏦', fee: 0, min: 500, max: 1000000 },
    { id: 'crypto', name: 'عملات مشفرة', icon: '₿', fee: 1.5, min: 100, max: 500000 },
  ];

  const selectedPayment = paymentMethods.find(p => p.id === selectedMethod);
  const fee = selectedPayment ? (amount * selectedPayment.fee / 100) : 0;
  const total = amount + fee;

  return (
    <section id="advanced-payment" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-emerald-300 text-xs font-semibold">Advanced Payment</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            💳 نظام الدفع المتقدم
          </h2>
          <p className="text-gray-400">8 طرق دفع مختلفة مع رسوم تنافسية</p>
        </div>

        {/* Payment Methods Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`glass-card p-4 cursor-pointer transition-all ${
                selectedMethod === method.id ? 'ring-2 ring-emerald-500 scale-105' : 'hover:scale-105'
              }`}
            >
              <div className="text-3xl mb-2 text-center">{method.icon}</div>
              <div className="text-white font-bold text-sm text-center mb-1">{method.name}</div>
              <div className="text-emerald-400 text-xs text-center">
                {method.fee === 0 ? 'بدون رسوم' : `${method.fee}% رسوم`}
              </div>
            </div>
          ))}
        </div>

        {/* Payment Form */}
        {selectedPayment && (
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4">💰 تفاصيل الدفع</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">المبلغ (ج.م)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  min={selectedPayment.min}
                  max={selectedPayment.max}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white"
                />
                <div className="text-gray-500 text-xs mt-1">
                  الحد الأدنى: {selectedPayment.min} ج.م | الحد الأقصى: {selectedPayment.max.toLocaleString()} ج.م
                </div>
              </div>

              <div className="glass-card-light p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">المبلغ:</span>
                  <span className="text-white">{amount} ج.م</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">الرسوم ({selectedPayment.fee}%):</span>
                  <span className="text-white">{fee.toFixed(2)} ج.م</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-white/10">
                  <span className="text-white">الإجمالي:</span>
                  <span className="text-emerald-400">{total.toFixed(2)} ج.م</span>
                </div>
              </div>

              <button className="w-full py-3 bg-gradient-to-l from-emerald-500 to-teal-600 text-white font-bold rounded-lg">
                💳 ادفع الآن
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                <span>🔒</span>
                <span>دفع آمن ومشفر 100%</span>
              </div>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="grid md:grid-cols-4 gap-4 mt-8">
          {[
            { icon: '🔒', title: 'آمن 100%', desc: 'تشفير متقدم' },
            { icon: '⚡', title: 'فوري', desc: 'معالجة سريعة' },
            { icon: '💰', title: 'رسوم منخفضة', desc: 'أفضل الأسعار' },
            { icon: '🌍', title: 'عالمي', desc: 'عملات متعددة' },
          ].map((feature, i) => (
            <div key={i} className="glass-card p-4 text-center">
              <div className="text-3xl mb-2">{feature.icon}</div>
              <h4 className="text-white font-bold text-sm mb-1">{feature.title}</h4>
              <p className="text-gray-400 text-xs">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
