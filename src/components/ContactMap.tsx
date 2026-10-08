import { useState } from 'react';

export default function ContactMap() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-cyan-300 text-xs font-semibold">تواصل معنا</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            📍 موقعنا <span className="gradient-text-blue">والتواصل</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            نسعد بتواصلكم معنا في أي وقت
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map & Info */}
          <div>
            {/* Map Placeholder */}
            <div className="glass-card p-6 mb-6">
              <div className="aspect-video bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="text-center">
                  <div className="text-6xl mb-2">🗺️</div>
                  <p className="text-white font-bold">موقع الأكاديمية</p>
                  <p className="text-gray-400 text-sm mt-1">القاهرة، مصر</p>
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-cyan-500/20 rounded-full blur-2xl" />
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-blue-500/20 rounded-full blur-2xl" />
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              {[
                { icon: '📍', label: 'العنوان', value: 'شارع الجامعة، مدينة نصر، القاهرة' },
                { icon: '📞', label: 'الهاتف', value: '+20 100 123 4567' },
                { icon: '✉️', label: 'البريد الإلكتروني', value: 'info@sportsacademy.com' },
                { icon: '⏰', label: 'ساعات العمل', value: 'السبت - الخميس: 4:00 م - 10:00 م' },
              ].map((item, i) => (
                <div key={i} className="glass-card p-4 flex items-center gap-3 hover:scale-[1.02] transition-transform">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xl">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs">{item.label}</div>
                    <div className="text-white font-semibold text-sm">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div className="mt-6 glass-card p-4">
              <h4 className="text-white font-bold text-sm mb-3">تابعنا على</h4>
              <div className="flex gap-2">
                {['📘', '📷', '🐦', '▶️'].map((icon, i) => (
                  <button
                    key={i}
                    className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-xl transition-colors"
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
              <span>💬</span> أرسل لنا رسالة
            </h3>

            {submitted ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">✅</div>
                <h4 className="text-white font-bold text-xl mb-2">تم الإرسال بنجاح!</h4>
                <p className="text-gray-400 text-sm">سنتواصل معك في أقرب وقت</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">الاسم *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
                      placeholder="اسمك الكامل"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">الهاتف *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
                      placeholder="01xxxxxxxxx"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1">البريد الإلكتروني</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1">الموضوع *</label>
                  <select
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-500/50"
                  >
                    <option value="">اختر الموضوع</option>
                    <option value="registration">استفسار عن التسجيل</option>
                    <option value="pricing">الأسعار والباقات</option>
                    <option value="schedule">جدول التدريبات</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1">الرسالة *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 resize-none"
                    placeholder="اكتب رسالتك هنا..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-l from-cyan-500 to-blue-600 text-white text-sm font-bold rounded-lg shadow-lg hover:opacity-90 transition-opacity"
                >
                  إرسال الرسالة 📤
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
