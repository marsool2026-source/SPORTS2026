import { useState, useEffect, useRef } from 'react';

interface Message {
  id: number;
  sender: 'coach' | 'player' | 'system';
  senderName: string;
  text?: string;
  file?: { name: string; type: 'image' | 'pdf' | 'video' | 'audio'; size: string };
  time: string;
  status?: 'sent' | 'delivered' | 'read';
}

interface Group {
  id: number;
  name: string;
  ageGroup: string;
  members: number;
  avatar: string;
  color: string;
  lastMessage: string;
  unread: number;
}

const groups: Group[] = [
  { id: 1, name: 'ناشئين U10', ageGroup: '2014-2015', members: 18, avatar: '⚽', color: 'from-blue-500 to-cyan-500', lastMessage: 'المدرب: التدريب غداً 5 مساءً', unread: 3 },
  { id: 2, name: 'شباب U13', ageGroup: '2012-2013', members: 22, avatar: '🏆', color: 'from-purple-500 to-violet-500', lastMessage: 'أحمد: حاضر يا كابتن', unread: 0 },
  { id: 3, name: 'براعم U8', ageGroup: '2016-2017', members: 15, avatar: '🌟', color: 'from-amber-500 to-orange-500', lastMessage: 'تم رفع خطة التدريب', unread: 1 },
  { id: 4, name: 'أولياء الأمور', ageGroup: 'عام', members: 55, avatar: '👨‍👩‍👧', color: 'from-emerald-500 to-teal-500', lastMessage: 'ولي أمر يوسف: شكراً', unread: 5 },
];

const initialMessages: Message[] = [
  { id: 1, sender: 'system', senderName: 'النظام', text: 'تم إنشاء المجموعة • 18 عضو', time: '10:00 ص' },
  { id: 2, sender: 'coach', senderName: 'كابتن محمود', text: 'صباح الخير يا أبطال ⚽ التدريب اليوم الساعة 5 مساءً', time: '10:15 ص', status: 'read' },
  { id: 3, sender: 'player', senderName: 'أحمد محمد', text: 'حاضر يا كابتن 🏃‍♂️', time: '10:17 ص', status: 'read' },
  { id: 4, sender: 'coach', senderName: 'كابتن محمود', file: { name: 'خطة_التدريب_الأسبوع.pdf', type: 'pdf', size: '2.4 MB' }, time: '10:20 ص', status: 'read' },
  { id: 5, sender: 'player', senderName: 'يوسف سعيد', text: 'استلمت الخطة 👍', time: '10:22 ص', status: 'read' },
  { id: 6, sender: 'coach', senderName: 'كابتن محمود', text: 'ممتاز! لا تنسوا إحضار زجاجة الماء والشنط الرياضية 💧', time: '10:25 ص', status: 'delivered' },
];

export default function CommunicationSystem() {
  const [activeGroup, setActiveGroup] = useState(0);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [callState, setCallState] = useState<'idle' | 'ringing' | 'active' | 'video'>('idle');
  const [callDuration, setCallDuration] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate incoming message
  useEffect(() => {
    if (callState !== 'idle') return;
    const timeout = setTimeout(() => {
      const newMsg: Message = {
        id: messages.length + 1,
        sender: 'player',
        senderName: 'عمر طارق',
        text: 'كابتن، هل التدريب في الملعب الرئيسي؟ 🏟️',
        time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
        status: 'sent'
      };
      setMessages(prev => [...prev, newMsg]);
    }, 8000);
    return () => clearTimeout(timeout);
  }, [messages.length, callState]);

  // Call duration timer
  useEffect(() => {
    if (callState !== 'active' && callState !== 'video') return;
    const interval = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [callState]);

  const sendMessage = () => {
    if (!inputText.trim()) return;
    const newMsg: Message = {
      id: messages.length + 1,
      sender: 'coach',
      senderName: 'كابتن محمود',
      text: inputText,
      time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };
    setMessages(prev => [...prev, newMsg]);
    setInputText('');
  };

  const simulateUpload = (type: 'image' | 'pdf' | 'video' | 'audio') => {
    setShowAttachMenu(false);
    setUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const fileNames = {
              image: 'تدريب_عملي.jpg',
              pdf: 'تقرير_الأداء.pdf',
              video: 'مقطع_تدريبي.mp4',
              audio: 'تعليمات_صوتية.ogg'
            };
            const fileSizes = { image: '1.2 MB', pdf: '3.5 MB', video: '15.8 MB', audio: '0.8 MB' };
            const newMsg: Message = {
              id: messages.length + 1,
              sender: 'coach',
              senderName: 'كابتن محمود',
              file: { name: fileNames[type], type, size: fileSizes[type] },
              time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
              status: 'sent'
            };
            setMessages(prev => [...prev, newMsg]);
            setUploading(false);
            setUploadProgress(0);
          }, 300);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const currentGroup = groups[activeGroup];

  return (
    <section id="communication" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
            <span className="text-pink-300 text-xs font-semibold">تواصل احترافي</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            💬 مركز <span className="gradient-text">التواصل التدريبي</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            شات، مكالمات صوتية، مكالمات فيديو، ومشاركة ملفات — كل ما يحتاجه المدرب للتواصل مع مجموعته
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { icon: '💬', title: 'شات فوري', desc: 'محادثة جماعية وفردية', color: 'from-blue-500 to-cyan-500' },
            { icon: '📞', title: 'مكالمة صوتية', desc: 'HD صوت نقي', color: 'from-emerald-500 to-teal-500' },
            { icon: '🎥', title: 'فيديو كول', desc: 'اجتماعات مرئية', color: 'from-purple-500 to-violet-500' },
            { icon: '📎', title: 'مشاركة ملفات', desc: 'صور، فيديو، PDF', color: 'from-amber-500 to-orange-500' },
          ].map((item, i) => (
            <div key={i} className="glass-card p-4 text-center hover:scale-105 transition-transform">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-xl mx-auto mb-2 shadow-lg`}>
                {item.icon}
              </div>
              <h4 className="text-white font-bold text-sm">{item.title}</h4>
              <p className="text-gray-400 text-[10px] mt-1">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Main Chat Interface */}
        <div className="glass-card overflow-hidden">
          <div className="grid lg:grid-cols-[280px_1fr] h-[600px]">
            {/* Sidebar: Groups List */}
            <div className="border-l border-white/10 bg-black/20 flex flex-col">
              <div className="p-4 border-b border-white/10">
                <h3 className="text-white font-bold text-sm mb-2">مجموعاتي التدريبية</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="بحث..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-blue-500/50 pr-8"
                  />
                  <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {groups.map((group, i) => (
                  <button
                    key={group.id}
                    onClick={() => setActiveGroup(i)}
                    className={`w-full p-3 flex items-center gap-3 text-right border-b border-white/5 transition-colors ${
                      activeGroup === i ? 'bg-white/10' : 'hover:bg-white/5'
                    }`}
                  >
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${group.color} flex items-center justify-center text-lg shrink-0 shadow-md`}>
                      {group.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-white text-sm font-semibold truncate">{group.name}</span>
                        {group.unread > 0 && (
                          <span className="bg-blue-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center shrink-0">
                            {group.unread}
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-gray-500 truncate">{group.lastMessage}</div>
                      <div className="text-[9px] text-gray-600 mt-0.5">
                        {group.members} عضو • مواليد {group.ageGroup}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Coach Profile */}
              <div className="p-3 border-t border-white/10 bg-black/30">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-sm font-bold text-white">
                    م
                  </div>
                  <div className="flex-1">
                    <div className="text-white text-xs font-semibold">كابتن محمود</div>
                    <div className="text-emerald-400 text-[10px] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                      متصل الآن
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex flex-col bg-gradient-to-br from-slate-900/50 to-slate-800/30 relative">
              {/* Chat Header */}
              <div className="p-4 border-b border-white/10 bg-black/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${currentGroup.color} flex items-center justify-center text-lg shadow-md`}>
                    {currentGroup.avatar}
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{currentGroup.name}</div>
                    <div className="text-gray-400 text-[10px]">
                      {currentGroup.members} عضو • مواليد {currentGroup.ageGroup}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCallState('ringing')}
                    className="w-9 h-9 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 flex items-center justify-center text-emerald-400 transition-colors"
                    title="مكالمة صوتية"
                  >
                    📞
                  </button>
                  <button
                    onClick={() => setCallState('video')}
                    className="w-9 h-9 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 flex items-center justify-center text-blue-400 transition-colors"
                    title="مكالمة فيديو"
                  >
                    🎥
                  </button>
                  <button className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 transition-colors">
                    ⋮
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'coach' ? 'justify-start' : msg.sender === 'player' ? 'justify-end' : 'justify-center'}`}
                  >
                    {msg.sender === 'system' ? (
                      <div className="bg-white/5 border border-white/10 rounded-full px-3 py-1 text-[10px] text-gray-400">
                        {msg.text}
                      </div>
                    ) : (
                      <div className={`max-w-[75%] ${msg.sender === 'coach' ? '' : ''}`}>
                        <div className={`rounded-2xl p-3 ${
                          msg.sender === 'coach'
                            ? 'bg-gradient-to-br from-blue-600/30 to-blue-500/20 border border-blue-500/20'
                            : 'bg-white/5 border border-white/10'
                        }`}>
                          {msg.sender === 'player' && (
                            <div className="text-[10px] font-bold text-blue-400 mb-1">{msg.senderName}</div>
                          )}
                          {msg.text && <p className="text-white text-sm leading-relaxed">{msg.text}</p>}
                          {msg.file && (
                            <div className="bg-black/30 rounded-lg p-2.5 mt-1 flex items-center gap-2">
                              <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg ${
                                msg.file.type === 'pdf' ? 'bg-red-500/20' :
                                msg.file.type === 'image' ? 'bg-emerald-500/20' :
                                msg.file.type === 'video' ? 'bg-purple-500/20' :
                                'bg-amber-500/20'
                              }`}>
                                {msg.file.type === 'pdf' ? '📄' : msg.file.type === 'image' ? '🖼️' : msg.file.type === 'video' ? '🎬' : '🎵'}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-white text-xs font-semibold truncate">{msg.file.name}</div>
                                <div className="text-gray-400 text-[10px]">{msg.file.size}</div>
                              </div>
                            </div>
                          )}
                          <div className="flex items-center justify-end gap-1 mt-1">
                            <span className="text-[9px] text-gray-400">{msg.time}</span>
                            {msg.status === 'read' && <span className="text-[9px] text-blue-400">✓✓</span>}
                            {msg.status === 'delivered' && <span className="text-[9px] text-gray-400">✓✓</span>}
                            {msg.status === 'sent' && <span className="text-[9px] text-gray-500">✓</span>}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Upload Progress */}
                {uploading && (
                  <div className="flex justify-start">
                    <div className="max-w-[75%] bg-gradient-to-br from-blue-600/30 to-blue-500/20 border border-blue-500/20 rounded-2xl p-3">
                      <div className="text-white text-xs mb-2">جاري رفع الملف...</div>
                      <div className="h-1.5 bg-black/30 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-l from-blue-400 to-cyan-400 transition-all duration-150"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                      <div className="text-[10px] text-gray-400 mt-1">{uploadProgress}%</div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-3 border-t border-white/10 bg-black/20">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <button
                      onClick={() => setShowAttachMenu(!showAttachMenu)}
                      className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 transition-colors"
                    >
                      📎
                    </button>
                    {showAttachMenu && (
                      <div className="absolute bottom-12 right-0 glass-card p-2 space-y-1 min-w-[140px] z-10">
                        {[
                          { icon: '🖼️', label: 'صورة', type: 'image' as const },
                          { icon: '📄', label: 'PDF', type: 'pdf' as const },
                          { icon: '🎬', label: 'فيديو', type: 'video' as const },
                          { icon: '🎵', label: 'صوت', type: 'audio' as const },
                        ].map((item) => (
                          <button
                            key={item.type}
                            onClick={() => simulateUpload(item.type)}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 text-right transition-colors"
                          >
                            <span>{item.icon}</span>
                            <span className="text-white text-xs">{item.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <button className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 transition-colors">
                    🎤
                  </button>
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="اكتب رسالة..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!inputText.trim()}
                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                      inputText.trim()
                        ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg'
                        : 'bg-white/5 text-gray-500'
                    }`}
                  >
                    ➤
                  </button>
                </div>
              </div>

              {/* Call Overlay */}
              {callState !== 'idle' && (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl flex items-center justify-center z-20">
                  <div className="text-center">
                    {/* Animated Rings */}
                    {(callState === 'ringing' || callState === 'active' || callState === 'video') && (
                      <div className="relative w-40 h-40 mx-auto mb-6">
                        {callState === 'ringing' && (
                          <>
                            <div className="absolute inset-0 border-4 border-emerald-500/30 rounded-full animate-ping" />
                            <div className="absolute inset-4 border-4 border-emerald-500/40 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                          </>
                        )}
                        {callState === 'video' && (
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border-2 border-white/20 flex items-center justify-center">
                            <div className="text-6xl">🎥</div>
                          </div>
                        )}
                        {(callState === 'ringing' || callState === 'active') && (
                          <div className={`absolute inset-0 w-40 h-40 rounded-full bg-gradient-to-br ${currentGroup.color} flex items-center justify-center text-6xl shadow-2xl`}>
                            {currentGroup.avatar}
                          </div>
                        )}
                      </div>
                    )}

                    <h3 className="text-white text-xl font-bold mb-1">
                      {callState === 'video' ? 'مكالمة فيديو جماعية' : 'مكالمة صوتية'}
                    </h3>
                    <p className="text-gray-400 text-sm mb-1">{currentGroup.name}</p>
                    <p className="text-gray-500 text-xs mb-6">
                      {callState === 'ringing' ? 'جاري الاتصال...' : 
                       callState === 'video' ? `${currentGroup.members} مشارك` :
                       `${currentGroup.members} مشارك`}
                    </p>

                    {callState === 'active' && (
                      <div className="text-3xl font-mono text-emerald-400 mb-6">
                        {formatDuration(callDuration)}
                      </div>
                    )}

                    {callState === 'video' && (
                      <div className="flex justify-center gap-2 mb-6">
                        {['👤', '👤', '👤', '👤'].map((p, i) => (
                          <div key={i} className="w-12 h-12 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-lg">
                            {p}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Call Controls */}
                    <div className="flex items-center justify-center gap-3">
                      {callState === 'ringing' && (
                        <>
                          <button
                            onClick={() => { setCallState('idle'); setCallDuration(0); }}
                            className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white text-xl shadow-lg transition-colors"
                          >
                            ✕
                          </button>
                          <button
                            onClick={() => setCallState('active')}
                            className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center text-white text-xl shadow-lg transition-colors animate-pulse"
                          >
                            📞
                          </button>
                        </>
                      )}
                      {callState === 'active' && (
                        <>
                          <button className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                            🔇
                          </button>
                          <button className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                            🔊
                          </button>
                          <button
                            onClick={() => { setCallState('idle'); setCallDuration(0); }}
                            className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white text-xl shadow-lg transition-colors"
                          >
                            ✕
                          </button>
                        </>
                      )}
                      {callState === 'video' && (
                        <>
                          <button className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                            📷
                          </button>
                          <button className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                            🔇
                          </button>
                          <button
                            onClick={() => { setCallState('idle'); setCallDuration(0); }}
                            className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white text-xl shadow-lg transition-colors"
                          >
                            ✕
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {[
            { icon: '📢', title: 'إعلانات المدرب', desc: 'إرسال تعليمات التدريب، تغيير المواعيد، أو إلغاء الحصص لجميع اللاعبين', color: 'text-blue-400' },
            { icon: '🎬', title: 'مشاركة فيديوهات', desc: 'رفع مقاطع تدريبية، تحليل الأداء، ومراجعة الأخطاء مع اللاعبين', color: 'text-purple-400' },
            { icon: '📊', title: 'تقارير الأداء', desc: 'مشاركة تقارير PDF فردية مع كل لاعب وولي أمره بخصوص التطور', color: 'text-emerald-400' },
          ].map((item, i) => (
            <div key={i} className="glass-card p-5">
              <div className={`text-3xl mb-2 ${item.color}`}>{item.icon}</div>
              <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
              <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
