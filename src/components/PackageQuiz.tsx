import { useState } from 'react';

interface QuizQuestion {
  id: number;
  question: string;
  options: { label: string; value: string; points: number }[];
}

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: 'ما هو عمر اللاعب؟',
    options: [
      { label: '5-8 سنوات', value: 'kids', points: 1 },
      { label: '9-12 سنة', value: 'junior', points: 2 },
      { label: '13-16 سنة', value: 'youth', points: 3 },
      { label: '17+ سنة', value: 'senior', points: 4 },
    ],
  },
  {
    id: 2,
    question: 'ما هو مستوى الخبرة؟',
    options: [
      { label: 'مبتدئ تماماً', value: 'beginner', points: 1 },
      { label: 'لدي بعض الخبرة', value: 'intermediate', points: 2 },
      { label: 'متوسط', value: 'advanced', points: 3 },
      { label: 'محترف', value: 'pro', points: 4 },
    ],
  },
  {
    id: 3,
    question: 'كم حصة تدريبية تفضل أسبوعياً؟',
    options: [
      { label: '2 حصص', value: '2', points: 1 },
      { label: '3 حصص', value: '3', points: 2 },
      { label: '4-5 حصص', value: '4-5', points: 3 },
      { label: 'يومياً', value: 'daily', points: 4 },
    ],
  },
  {
    id: 4,
    question: 'هل تحتاج خدمة النقل؟',
    options: [
      { label: 'لا، سأحضر بنفسي', value: 'no', points: 0 },
      { label: 'نعم، أحياناً', value: 'sometimes', points: 1 },
      { label: 'نعم، دائماً', value: 'always', points: 2 },
    ],
  },
  {
    id: 5,
    question: 'هل تهتم بالحصول على حصص خاصة؟',
    options: [
      { label: 'لا أحتاج', value: 'no', points: 0 },
      { label: 'حصة واحدة شهرياً', value: '1', points: 1 },
      { label: '2-3 حصص شهرياً', value: '2-3', points: 2 },
      { label: 'أسبوعياً', value: 'weekly', points: 3 },
    ],
  },
];

interface Package {
  name: string;
  price: number;
  features: string[];
  icon: string;
  color: string;
}

const packages: Record<string, Package> = {
  basic: {
    name: 'الباقة الأساسية',
    price: 500,
    icon: '🥉',
    color: 'from-gray-500 to-gray-600',
    features: ['8 حصص شهرياً', 'مدرب معتمد', 'كارنيه رقمي', 'تقرير شهري'],
  },
  advanced: {
    name: 'الباقة المتقدمة',
    price: 800,
    icon: '🥈',
    color: 'from-blue-500 to-cyan-600',
    features: ['12 حصة شهرياً', 'مدرب معتمد', 'تقرير أسبوعي', 'حصتان خاصتان', 'خصم 10% منتجات'],
  },
  pro: {
    name: 'الباقة الاحترافية',
    price: 1200,
    icon: '🥇',
    color: 'from-amber-500 to-orange-600',
    features: ['حصص غير محدودة', 'مدرب خاص', 'تقرير يومي', '4 حصص خاصة', 'خدمة نقل', 'خصم 20% منتجات'],
  },
};

export default function PackageQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [recommendedPackage, setRecommendedPackage] = useState<string>('');

  const handleAnswer = (points: number) => {
    const newAnswers = [...answers, points];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate recommendation
      const totalPoints = newAnswers.reduce((sum, p) => sum + p, 0);
      let packageKey = 'basic';
      
      if (totalPoints >= 12) {
        packageKey = 'pro';
      } else if (totalPoints >= 7) {
        packageKey = 'advanced';
      }
      
      setRecommendedPackage(packageKey);
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setRecommendedPackage('');
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <section id="package-quiz" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
            <span className="text-pink-300 text-xs font-semibold">اختبار تفاعلي</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🎯 اختر <span className="gradient-text">الباقة المناسبة</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            أجب على 5 أسئلة بسيطة وسنقترح لك الباقة المثالية
          </p>
        </div>

        {!showResult ? (
          <div className="glass-card p-8">
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-xs text-gray-400 mb-2">
                <span>السؤال {currentQuestion + 1} من {questions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-l from-pink-500 to-purple-600 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <h3 className="text-white font-bold text-xl mb-6">
              {questions[currentQuestion].question}
            </h3>

            {/* Options */}
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(option.points)}
                  className="w-full p-4 glass-card-light text-right hover:bg-white/10 transition-all hover:scale-[1.02]"
                >
                  <span className="text-white text-sm">{option.label}</span>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => currentQuestion > 0 && setCurrentQuestion(currentQuestion - 1)}
                disabled={currentQuestion === 0}
                className="px-4 py-2 glass-card text-gray-400 text-xs rounded-lg disabled:opacity-30"
              >
                ← السابق
              </button>
              <button
                onClick={resetQuiz}
                className="px-4 py-2 glass-card text-gray-400 text-xs rounded-lg"
              >
                إعادة البدء
              </button>
            </div>
          </div>
        ) : (
          <div className="glass-card p-8 text-center">
            {/* Result */}
            <div className="text-6xl mb-4">{packages[recommendedPackage].icon}</div>
            <h3 className="text-white font-bold text-2xl mb-2">
              الباقة المثالية لك!
            </h3>
            <p className="text-gray-400 mb-6">
              بناءً على إجاباتك، ننصحك بـ:
            </p>

            {/* Package Card */}
            <div className={`glass-card-light p-6 mb-6 bg-gradient-to-br ${packages[recommendedPackage].color} bg-opacity-10`}>
              <h4 className="text-white font-bold text-xl mb-2">
                {packages[recommendedPackage].name}
              </h4>
              <div className="text-3xl font-black text-white mb-4">
                {packages[recommendedPackage].price} <span className="text-lg">ج.م/شهر</span>
              </div>
              <ul className="space-y-2 text-right">
                {packages[recommendedPackage].features.map((feature, i) => (
                  <li key={i} className="text-white text-sm flex items-center gap-2">
                    <span className="text-emerald-400">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button className="flex-1 py-3 bg-gradient-to-l from-pink-500 to-purple-600 text-white text-sm font-bold rounded-lg shadow-lg">
                اشترك الآن
              </button>
              <button
                onClick={resetQuiz}
                className="px-6 py-3 glass-card text-white text-sm rounded-lg"
              >
                إعادة الاختبار
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
