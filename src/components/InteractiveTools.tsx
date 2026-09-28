import { useState } from 'react';

export function BMICalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState('');

  const calculateBMI = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (h > 0 && w > 0) {
      const result = w / (h * h);
      setBmi(result);
      
      if (result < 18.5) setCategory('نقص في الوزن');
      else if (result < 25) setCategory('وزن طبيعي');
      else if (result < 30) setCategory('زيادة في الوزن');
      else setCategory('سمنة');
    }
  };

  const getBMIColor = () => {
    if (!bmi) return 'text-gray-400';
    if (bmi < 18.5) return 'text-blue-400';
    if (bmi < 25) return 'text-emerald-400';
    if (bmi < 30) return 'text-amber-400';
    return 'text-red-400';
  };

  return (
    <section id="bmi-calculator" className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-emerald-300 text-xs font-semibold">أداة تفاعلية</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            📏 حاسبة <span className="gradient-text-blue">مؤشر كتلة الجسم</span>
          </h2>
          <p className="text-gray-400">احسب مؤشر كتلة جسمك (BMI) واعرف تصنيفك</p>
        </div>

        <div className="glass-card p-6">
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs text-gray-400 mb-2">الطول (سم)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="170"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-2">الوزن (كجم)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="70"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
              />
            </div>
          </div>

          <button
            onClick={calculateBMI}
            className="w-full py-3 bg-gradient-to-l from-emerald-500 to-teal-600 text-white text-sm font-bold rounded-lg shadow-lg hover:opacity-90 transition-opacity"
          >
            احسب BMI
          </button>

          {bmi && (
            <div className="mt-6 glass-card-light p-4 text-center">
              <div className={`text-4xl font-black ${getBMIColor()} mb-2`}>
                {bmi.toFixed(1)}
              </div>
              <div className="text-white font-bold mb-1">{category}</div>
              <div className="text-gray-400 text-xs">
                {bmi < 18.5 && 'ننصح بزيادة الوزن تدريجياً'}
                {bmi >= 18.5 && bmi < 25 && 'مؤشر كتلة جسمك مثالي! استمر'}
                {bmi >= 25 && bmi < 30 && 'ننصح بممارسة الرياضة بانتظام'}
                {bmi >= 30 && 'ننصح باستشارة مدرب تغذية'}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function FreeTrialBooking() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: '',
    sport: '',
    date: '',
    time: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', age: '', sport: '', date: '', time: '' });
    }, 3000);
  };

  return (
    <section id="free-trial" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <span className="text-amber-300 text-xs font-semibold">عرض خاص</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            🎁 احجز <span className="gradient-text">تجربة مجانية</span>
          </h2>
          <p className="text-gray-400">جرب التدريب معنا مجاناً واكتشف مستواك</p>
        </div>

        <div className="glass-card p-6">
          {submitted ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-white font-bold text-xl mb-2">تم الحجز بنجاح!</h3>
              <p className="text-gray-400 text-sm">سنتواصل معك قريباً لتأكيد الموعد</p>
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
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-amber-500/50"
                    placeholder="اسم اللاعب"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">الهاتف *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-amber-500/50"
                    placeholder="01xxxxxxxxx"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">العمر *</label>
                  <input
                    type="number"
                    required
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-amber-500/50"
                    placeholder="12"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">الرياضة *</label>
                  <select
                    required
                    value={formData.sport}
                    onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500/50"
                  >
                    <option value="">اختر الرياضة</option>
                    <option value="football">كرة قدم</option>
                    <option value="basketball">كرة سلة</option>
                    <option value="swimming">سباحة</option>
                    <option value="athletics">ألعاب قوى</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">التاريخ *</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">الوقت *</label>
                  <select
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500/50"
                  >
                    <option value="">اختر الوقت</option>
                    <option value="16:00">4:00 مساءً</option>
                    <option value="17:00">5:00 مساءً</option>
                    <option value="18:00">6:00 مساءً</option>
                    <option value="19:00">7:00 مساءً</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-l from-amber-500 to-orange-600 text-white text-sm font-bold rounded-lg shadow-lg hover:opacity-90 transition-opacity"
              >
                احجز تجربتك المجانية 🎁
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
