import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('player');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { signIn, signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isLogin) {
        await signIn(email, password);
        setSuccess('تم تسجيل الدخول بنجاح!');
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        await signUp(email, password, fullName, role);
        setSuccess('تم إنشاء الحساب بنجاح! تحقق من بريدك الإلكتروني.');
        setTimeout(() => setIsLogin(true), 2000);
      }
    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء المصادقة');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    setError('');

    try {
      await signInWithGoogle();
      setSuccess('تم تسجيل الدخول بنجاح!');
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء تسجيل الدخول بـ Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-4xl mb-4 shadow-2xl">
            🏆
          </div>
          <h1 className="text-3xl font-black text-white mb-2">
            أكاديمية الرياضات الاحترافية
          </h1>
          <p className="text-gray-400">Sports Academy System</p>
        </div>

        {/* Auth Card */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl">
          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                isLogin
                  ? 'bg-gradient-to-l from-blue-500 to-purple-600 text-white'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              تسجيل الدخول
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                !isLogin
                  ? 'bg-gradient-to-l from-blue-500 to-purple-600 text-white'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              إنشاء حساب
            </button>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm">
              ❌ {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-300 text-sm">
              ✅ {success}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">الاسم الكامل</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required={!isLogin}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
                    placeholder="أدخل اسمك الكامل"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">الدور</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50"
                  >
                    <option value="player" className="bg-gray-900">لاعب</option>
                    <option value="parent" className="bg-gray-900">ولي أمر</option>
                    <option value="coach" className="bg-gray-900">مدرب</option>
                    <option value="admin" className="bg-gray-900">مدير</option>
                    <option value="financial" className="bg-gray-900">مدير مالي</option>
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="block text-gray-400 text-sm mb-2">البريد الإلكتروني</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
                placeholder="example@email.com"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">كلمة المرور</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-l from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  جاري المعالجة...
                </span>
              ) : isLogin ? (
                'تسجيل الدخول'
              ) : (
                'إنشاء حساب'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-gray-400 text-sm">أو</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Google Auth */}
          <button
            onClick={handleGoogleAuth}
            disabled={loading}
            className="w-full py-3 bg-white/5 border border-white/10 text-white font-bold rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50 flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            تسجيل الدخول بـ Google
          </button>

          {/* Forgot Password */}
          {isLogin && (
            <div className="text-center mt-4">
              <button className="text-blue-400 hover:text-blue-300 text-sm">
                نسيت كلمة المرور؟
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-400 text-sm">
          <p>© 2026 أكاديمية الرياضات الاحترافية. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </div>
  );
}
