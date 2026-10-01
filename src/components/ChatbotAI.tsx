import { useState } from 'react';

interface ChatMessage {
  id: number;
  type: 'user' | 'bot';
  text: string;
  timestamp: string;
  suggestions?: string[];
}

interface QuickAction {
  icon: string;
  label: string;
  query: string;
}

const quickActions: QuickAction[] = [
  { icon: '📅', label: 'جدول تدريبي', query: 'ما هو جدول تدريباتي هذا الأسبوع؟' },
  { icon: '💰', label: 'حسابي', query: 'ما هي حالة اشتراكي؟' },
  { icon: '🏆', label: 'إنجازاتي', query: 'ما هي إنجازاتي الأخيرة؟' },
  { icon: '👨‍🏫', label: 'مدربي', query: 'من هو مدربي؟' },
  { icon: '📊', label: 'أدائي', query: 'كيف هو أدائي؟' },
  { icon: '🎯', label: 'تحديات', query: 'ما هي التحديات المتاحة؟' },
];

const botResponses: Record<string, { text: string; suggestions?: string[] }> = {
  'جدول': {
    text: '📅 جدولك هذا الأسبوع:\n\n• الأحد: تدريب كرة قدم - 4:00 م\n• الاثنين: تدريب لياقة - 5:00 م\n• الأربعاء: تدريب تكتيكي - 4:00 م\n• الخميس: حصة خاصة - 6:00 م',
    suggestions: ['تعديل موعد', 'إلغاء حصة', 'حجز حصة إضافية']
  },
  'اشتراك': {
    text: '💰 حالة اشتراكك:\n\n✅ الباقة: المتقدمة\n✅ الحالة: نشط\n✅ تاريخ الانتهاء: 15 فبراير 2026\n✅ المتبقي: 26 يوم',
    suggestions: ['تجديد الاشتراك', 'ترقية الباقة', 'سجل المدفوعات']
  },
  'إنجاز': {
    text: '🏆 إنجازاتك الأخيرة:\n\n⭐ أفضل لاعب في التدريب (أمس)\n⭐ حضور 10 حصص متتالية\n⭐ تحسن السرعة بنسبة 15%\n⭐ رقم قياسي جديد في 100 متر',
    suggestions: ['عرض جميع الإنجازات', 'مشاركة الإنجازات', 'التحديات التالية']
  },
  'مدرب': {
    text: '👨‍🏫 مدربك:\n\nكابتن محمود أحمد\n• الخبرة: 15 سنة\n• الشهادات: UEFA Pro, FIFA\n• التقييم: 4.9/5 ⭐\n• اللاعبون: 25 لاعب',
    suggestions: ['تواصل مع المدرب', 'تقييم المدرب', 'طلب مدرب آخر']
  },
  'أداء': {
    text: '📊 تحليل أدائك:\n\n⚡ السرعة: 85/100 (+5)\n💪 القوة: 78/100 (+3)\n🔥 التحمل: 92/100 (+8)\n🎯 الدقة: 88/100 (+4)\n🤸 الرشاقة: 80/100 (+2)\n\nالتقييم العام: ممتاز! 🌟',
    suggestions: ['تقرير مفصل', 'خطة تحسين', 'مقارنة مع اللاعبين']
  },
  'تحدي': {
    text: '🎯 التحديات المتاحة:\n\n1️⃣ حضور 10 حصص (7/10) - 200 نقطة\n2️⃣ تحدي اللياقة (85/90) - 300 نقطة\n3️⃣ روح رياضية (3/5) - 150 نقطة\n4️⃣ تحدي السرعة (60%) - 400 نقطة',
    suggestions: ['بدء تحدي', 'عرض جميع التحديات', 'التحديات المكتملة']
  },
  'default': {
    text: '🤖 أنا مساعدك الذكي! يمكنني مساعدتك في:\n\n• جداول التدريبات\n• حالة الاشتراك\n• الإنجازات والأداء\n• التواصل مع المدربين\n• التحديات والمكافآت\n\nكيف يمكنني مساعدتك؟',
    suggestions: ['جدول تدريبي', 'حالة الاشتراك', 'إنجازاتي']
  }
};

export default function ChatbotAI() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: 'bot',
      text: '👋 مرحباً! أنا مساعدك الذكي في أكاديمية الرياضات الاحترافية.\n\nكيف يمكنني مساعدتك اليوم؟',
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      suggestions: ['جدول تدريبي', 'حالة الاشتراك', 'إنجازاتي']
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const getResponse = (query: string) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('جدول') || lowerQuery.includes('تدريب')) {
      return botResponses['جدول'];
    } else if (lowerQuery.includes('اشتراك') || lowerQuery.includes('حساب')) {
      return botResponses['اشتراك'];
    } else if (lowerQuery.includes('إنجاز') || lowerQuery.includes('إنجازاتي')) {
      return botResponses['إنجاز'];
    } else if (lowerQuery.includes('مدرب')) {
      return botResponses['مدرب'];
    } else if (lowerQuery.includes('أداء') || lowerQuery.includes('أدائي')) {
      return botResponses['أداء'];
    } else if (lowerQuery.includes('تحدي') || lowerQuery.includes('تحديات')) {
      return botResponses['تحدي'];
    }
    
    return botResponses['default'];
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      type: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = getResponse(text);
      const botMessage: ChatMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: response.text,
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
        suggestions: response.suggestions
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <section id="chatbot-ai" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            <span className="text-purple-300 text-xs font-semibold">ذكاء اصطناعي</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🤖 المساعد <span className="gradient-text">الذكي</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            مساعدك الشخصي المدعوم بالذكاء الاصطناعي - متاح 24/7
          </p>
        </div>

        {/* Chat Interface */}
        <div className="glass-card overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-to-l from-purple-600 to-violet-600 p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">
              🤖
            </div>
            <div className="flex-1">
              <div className="text-white font-bold">المساعد الذكي</div>
              <div className="text-white/70 text-xs flex items-center gap-1">
                <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                متصل الآن
              </div>
            </div>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                📞
              </button>
              <button className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                ⚙️
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="h-[500px] overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-slate-900/50 to-slate-800/30">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                  <div className={`rounded-2xl p-4 ${
                    message.type === 'user'
                      ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white'
                      : 'bg-white/5 border border-white/10 text-gray-200'
                  }`}>
                    <div className="text-sm whitespace-pre-line leading-relaxed">{message.text}</div>
                    <div className={`text-[10px] mt-2 ${message.type === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
                      {message.timestamp}
                    </div>
                  </div>
                  
                  {/* Suggestions */}
                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {message.suggestions.map((suggestion, i) => (
                        <button
                          key={i}
                          onClick={() => sendMessage(suggestion)}
                          className="px-3 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold hover:bg-purple-500/30 transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-t border-white/10 bg-black/20">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {quickActions.map((action, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(action.query)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors whitespace-nowrap"
                >
                  <span>{action.icon}</span>
                  <span className="text-white text-xs">{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-black/30">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="اكتب سؤالك هنا..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="px-6 py-3 bg-gradient-to-l from-purple-500 to-violet-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ➤
              </button>
            </div>
          </form>
        </div>

        {/* Features */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {[
            { icon: '⚡', title: 'ردود فورية', desc: 'إجابات سريعة ودقيقة' },
            { icon: '🕐', title: 'متاح 24/7', desc: 'دعم في أي وقت' },
            { icon: '🧠', title: 'ذكاء متطور', desc: 'يفهم احتياجاتك' },
          ].map((item, i) => (
            <div key={i} className="glass-card p-4 text-center">
              <div className="text-3xl mb-2">{item.icon}</div>
              <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
              <p className="text-gray-400 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
