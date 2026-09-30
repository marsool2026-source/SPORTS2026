import { useState } from 'react';

interface LiveStream {
  id: number;
  title: string;
  coach: string;
  viewers: number;
  status: 'live' | 'upcoming' | 'ended';
  startTime: string;
  category: string;
  thumbnail: string;
}

const liveStreams: LiveStream[] = [
  {
    id: 1,
    title: 'تدريب مباشر - ناشئين U10',
    coach: 'كابتن محمود',
    viewers: 127,
    status: 'live',
    startTime: 'منذ 15 دقيقة',
    category: 'تدريب',
    thumbnail: '⚽'
  },
  {
    id: 2,
    title: 'بطولة داخلية - نهائي',
    coach: 'كابتن أحمد',
    viewers: 342,
    status: 'live',
    startTime: 'منذ 30 دقيقة',
    category: 'بطولة',
    thumbnail: '🏆'
  },
  {
    id: 3,
    title: 'حصة خاصة - تدريب حراس',
    coach: 'كابتن محمد',
    viewers: 0,
    status: 'upcoming',
    startTime: 'بعد ساعة',
    category: 'تدريب',
    thumbnail: '🧤'
  },
  {
    id: 4,
    title: 'تدريب اللياقة - شباب U13',
    coach: 'كابتن سارة',
    viewers: 89,
    status: 'ended',
    startTime: 'منذ ساعتين',
    category: 'تدريب',
    thumbnail: '💪'
  }
];

export default function LiveStreaming() {
  const [selectedStream, setSelectedStream] = useState<LiveStream | null>(null);
  const [filter, setFilter] = useState<'all' | 'live' | 'upcoming' | 'ended'>('all');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: 'أحمد محمد', message: 'تدريب رائع!', time: 'منذ دقيقة' },
    { id: 2, user: 'ولي أمر', message: 'ما شاء الله على اللاعبين', time: 'منذ دقيقتين' },
    { id: 3, user: 'محمد خالد', message: 'كم مدة التدريب؟', time: 'منذ 3 دقائق' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const filteredStreams = liveStreams.filter(stream => {
    if (filter === 'all') return true;
    return stream.status === filter;
  });

  const getStatusBadge = (status: LiveStream['status']) => {
    const config = {
      live: { label: '🔴 مباشر', color: 'bg-red-500/20 text-red-300 border-red-500/30' },
      upcoming: { label: '⏰ قريباً', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
      ended: { label: '✓ انتهى', color: 'bg-gray-500/20 text-gray-300 border-gray-500/30' }
    };
    return config[status];
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setChatMessages([
      { id: Date.now(), user: 'أنت', message: newMessage, time: 'الآن' },
      ...chatMessages
    ]);
    setNewMessage('');
  };

  return (
    <section id="live-streaming" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
            <span className="text-red-300 text-xs font-semibold">البث المباشر</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            📹 البث <span className="gradient-text">المباشر</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            شاهد التدريبات والبطولات مباشرة وتفاعل مع المدربين واللاعبين
          </p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'بث مباشر الآن', value: liveStreams.filter(s => s.status === 'live').length, icon: '🔴', color: 'from-red-500 to-orange-500' },
            { label: 'مشاهدون نشطون', value: liveStreams.reduce((sum, s) => sum + s.viewers, 0), icon: '👥', color: 'from-blue-500 to-cyan-500' },
            { label: 'بث قادم', value: liveStreams.filter(s => s.status === 'upcoming').length, icon: '⏰', color: 'from-amber-500 to-orange-500' },
            { label: 'إجمالي الساعات', value: '48', icon: '⏱️', color: 'from-purple-500 to-violet-500' },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-5 text-center hover:scale-105 transition-transform">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl mx-auto mb-3 shadow-lg`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'all', label: 'الكل' },
            { id: 'live', label: '🔴 مباشر' },
            { id: 'upcoming', label: '⏰ قريباً' },
            { id: 'ended', label: '✓ انتهى' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                filter === tab.id
                  ? 'bg-gradient-to-l from-red-500 to-orange-600 text-white'
                  : 'glass-card text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Streams Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredStreams.map((stream) => {
            const status = getStatusBadge(stream.status);
            return (
              <div
                key={stream.id}
                onClick={() => stream.status !== 'upcoming' && setSelectedStream(stream)}
                className={`glass-card overflow-hidden hover:scale-105 transition-transform ${
                  stream.status !== 'upcoming' ? 'cursor-pointer' : 'opacity-60'
                }`}
              >
                {/* Thumbnail */}
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-6xl relative">
                  {stream.thumbnail}
                  {stream.status === 'live' && (
                    <div className="absolute top-3 right-3 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      مباشر
                    </div>
                  )}
                  {stream.status === 'live' && (
                    <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/70 backdrop-blur text-white text-xs rounded flex items-center gap-1">
                      👥 {stream.viewers}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold border ${status.color}`}>
                      {status.label}
                    </span>
                    <span className="text-gray-500 text-xs">{stream.category}</span>
                  </div>
                  <h3 className="text-white font-bold text-sm mb-2">{stream.title}</h3>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>👨‍🏫 {stream.coach}</span>
                    <span>{stream.startTime}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stream Viewer Modal */}
        {selectedStream && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="glass-card max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold">{selectedStream.title}</h3>
                  <p className="text-gray-400 text-sm">{selectedStream.coach} • 👥 {selectedStream.viewers} مشاهد</p>
                </div>
                <button
                  onClick={() => setSelectedStream(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                >
                  ✕
                </button>
              </div>

              {/* Video Player */}
              <div className="aspect-video bg-black flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">{selectedStream.thumbnail}</div>
                  <div className="text-white text-xl font-bold">بث مباشر</div>
                  <div className="text-gray-400 text-sm mt-2">{selectedStream.title}</div>
                </div>
              </div>

              {/* Chat */}
              <div className="flex-1 flex flex-col border-t border-white/10 max-h-64">
                <div className="p-4 border-b border-white/10">
                  <h4 className="text-white font-bold text-sm">💬 الدردشة المباشرة</h4>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {msg.user[0]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-blue-400 text-xs font-semibold">{msg.user}</span>
                          <span className="text-gray-500 text-[10px]">{msg.time}</span>
                        </div>
                        <p className="text-gray-300 text-sm">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-white/10 flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="اكتب رسالة..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
                  />
                  <button
                    onClick={sendMessage}
                    className="px-4 py-2 bg-gradient-to-l from-blue-500 to-cyan-600 text-white text-sm font-bold rounded-lg"
                  >
                    إرسال
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
