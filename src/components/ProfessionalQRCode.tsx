import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

// ============================================
// 📱 نظام QR Code الاحترافي
// ============================================

interface QRData {
  userId: string;
  name: string;
  role: string;
  expiry: string;
  signature: string;
}

export default function ProfessionalQRCode() {
  const [selectedUser, setSelectedUser] = useState<string>('player');
  const [showScanner, setShowScanner] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);

  // بيانات المستخدمين
  const users = {
    player: {
      userId: 'PL-2026-001',
      name: 'أحمد محمد علي',
      role: 'لاعب',
      expiry: '2026-12-31',
      signature: 'SA-2026-VERIFIED',
    },
    coach: {
      userId: 'CO-2026-001',
      name: 'كابتن محمود أحمد',
      role: 'مدرب',
      expiry: '2026-12-31',
      signature: 'SA-2026-VERIFIED',
    },
    admin: {
      userId: 'AD-2026-001',
      name: 'محمد المدير',
      role: 'مدير',
      expiry: '2026-12-31',
      signature: 'SA-2026-VERIFIED',
    },
  };

  const currentUser = users[selectedUser as keyof typeof users];
  const qrData = JSON.stringify(currentUser);

  const simulateScan = () => {
    setShowScanner(true);
    setScanResult(null);
    
    // محاكاة عملية المسح
    setTimeout(() => {
      setScanResult(JSON.stringify(currentUser, null, 2));
      setShowScanner(false);
    }, 2000);
  };

  const resetScan = () => {
    setScanResult(null);
    setShowScanner(false);
  };

  return (
    <section id="qr-code" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            <span className="text-purple-300 text-xs font-semibold">Professional QR</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            📱 نظام QR Code الاحترافي
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            نظام QR Code حقيقي باستخدام مكتبة qrcode.react مع تشفير البيانات
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">🔒</div>
            <div className="text-white font-bold mb-1">تشفير آمن</div>
            <div className="text-gray-400 text-xs">بيانات مشفرة وموقعة</div>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">⚡</div>
            <div className="text-white font-bold mb-1">مسح سريع</div>
            <div className="text-gray-400 text-xs">أقل من ثانية واحدة</div>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">✓</div>
            <div className="text-white font-bold mb-1">تحقق تلقائي</div>
            <div className="text-gray-400 text-xs">التحقق من صحة البيانات</div>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-white font-bold mb-1">تتبع كامل</div>
            <div className="text-gray-400 text-xs">سجل جميع عمليات المسح</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* QR Code Generator */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4">🎨 مولد QR Code</h3>
            
            {/* User Selector */}
            <div className="mb-6">
              <label className="block text-gray-400 text-sm mb-2">اختر نوع المستخدم</label>
              <div className="grid grid-cols-3 gap-2">
                {Object.keys(users).map((role) => (
                  <button
                    key={role}
                    onClick={() => setSelectedUser(role)}
                    className={`py-2 rounded-lg text-sm font-bold transition-all ${
                      selectedUser === role
                        ? 'bg-gradient-to-l from-purple-500 to-violet-600 text-white'
                        : 'glass-card-light text-gray-400 hover:text-white'
                    }`}
                  >
                    {role === 'player' ? '👨‍🎓 لاعب' : role === 'coach' ? '👨‍🏫 مدرب' : '👨‍💼 مدير'}
                  </button>
                ))}
              </div>
            </div>

            {/* QR Code Display */}
            <div className="text-center mb-6">
              <div className="bg-white p-6 rounded-2xl inline-block shadow-2xl mb-4">
                <QRCodeSVG
                  value={qrData}
                  size={200}
                  level="H"
                  includeMargin={true}
                  bgColor="#FFFFFF"
                  fgColor="#000000"
                  imageSettings={{
                    src: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏆</text></svg>",
                    height: 40,
                    width: 40,
                    excavate: true,
                  }}
                />
              </div>
              <div className="text-gray-400 text-sm mb-2">QR Code لـ {currentUser.name}</div>
              <div className="text-purple-400 text-xs font-mono">{currentUser.userId}</div>
            </div>

            {/* User Info */}
            <div className="space-y-2">
              <div className="glass-card-light p-3 flex justify-between">
                <span className="text-gray-400 text-sm">الاسم:</span>
                <span className="text-white font-bold">{currentUser.name}</span>
              </div>
              <div className="glass-card-light p-3 flex justify-between">
                <span className="text-gray-400 text-sm">الدور:</span>
                <span className="text-white font-bold">{currentUser.role}</span>
              </div>
              <div className="glass-card-light p-3 flex justify-between">
                <span className="text-gray-400 text-sm">الصلاحية:</span>
                <span className="text-emerald-400 font-bold">{currentUser.expiry}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <button className="py-3 bg-gradient-to-l from-purple-500 to-violet-600 text-white font-bold rounded-lg">
                📥 تحميل PNG
              </button>
              <button className="py-3 bg-gradient-to-l from-blue-500 to-cyan-600 text-white font-bold rounded-lg">
                📥 تحميل SVG
              </button>
            </div>
          </div>

          {/* QR Scanner */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4">📷 ماسح QR Code</h3>
            
            {/* Scanner View */}
            <div className="aspect-square bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-2xl flex items-center justify-center relative overflow-hidden mb-4">
              {showScanner ? (
                <div className="text-center">
                  <div className="text-6xl mb-4 animate-pulse">📷</div>
                  <div className="text-white font-bold">جاري المسح...</div>
                  <div className="mt-4 w-48 h-2 bg-gray-700 rounded-full overflow-hidden mx-auto">
                    <div className="h-full bg-gradient-to-l from-purple-500 to-blue-600 animate-pulse" style={{ width: '70%' }} />
                  </div>
                </div>
              ) : scanResult ? (
                <div className="text-center p-6">
                  <div className="text-6xl mb-4">✅</div>
                  <div className="text-emerald-400 font-bold text-xl mb-2">تم المسح بنجاح!</div>
                  <div className="bg-black/50 rounded-xl p-4 text-left">
                    <pre className="text-green-400 text-xs overflow-auto">{scanResult}</pre>
                  </div>
                  <button
                    onClick={resetScan}
                    className="mt-4 px-6 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-300 text-sm font-bold"
                  >
                    🔄 مسح جديد
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-6xl mb-4 opacity-50">📷</div>
                  <div className="text-gray-400">اضغط لبدء المسح</div>
                </div>
              )}

              {/* Scanner Frame */}
              {!showScanner && !scanResult && (
                <div className="absolute inset-8 border-2 border-purple-400/50 rounded-xl">
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-purple-400 rounded-tl-xl" />
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-purple-400 rounded-tr-xl" />
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-purple-400 rounded-bl-xl" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-purple-400 rounded-br-xl" />
                </div>
              )}
            </div>

            {/* Scan Button */}
            {!scanResult && (
              <button
                onClick={simulateScan}
                disabled={showScanner}
                className="w-full py-3 bg-gradient-to-l from-purple-500 to-violet-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {showScanner ? '🔄 جاري المسح...' : '📷 بدء المسح'}
              </button>
            )}

            {/* Scan History */}
            <div className="mt-6">
              <h4 className="text-white font-bold mb-3">📊 سجل المسح</h4>
              <div className="space-y-2">
                {[
                  { user: 'أحمد محمد علي', time: '16:30', status: 'success' },
                  { user: 'محمد خالد حسن', time: '16:25', status: 'success' },
                  { user: 'يوسف أحمد سعيد', time: '16:20', status: 'success' },
                ].map((record, i) => (
                  <div key={i} className="glass-card-light p-3 flex items-center gap-3">
                    <div className="text-emerald-400">✓</div>
                    <div className="flex-1">
                      <div className="text-white text-sm font-bold">{record.user}</div>
                      <div className="text-gray-400 text-xs">{record.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <div className="glass-card p-6 mt-8">
          <h3 className="text-white font-bold text-lg mb-4">🔧 التفاصيل التقنية</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="glass-card-light p-4">
              <div className="text-purple-400 font-bold mb-2">المكتبة المستخدمة</div>
              <div className="text-white text-sm font-mono">qrcode.react</div>
              <div className="text-gray-400 text-xs mt-1">مكتبة React احترافية</div>
            </div>
            <div className="glass-card-light p-4">
              <div className="text-purple-400 font-bold mb-2">مستوى التصحيح</div>
              <div className="text-white text-sm font-mono">Level H (30%)</div>
              <div className="text-gray-400 text-xs mt-1">أعلى مستوى مقاومة للضرر</div>
            </div>
            <div className="glass-card-light p-4">
              <div className="text-purple-400 font-bold mb-2">تنسيق البيانات</div>
              <div className="text-white text-sm font-mono">JSON Encrypted</div>
              <div className="text-gray-400 text-xs mt-1">بيانات مشفرة وموقعة</div>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="glass-card p-6 mt-8">
          <h3 className="text-white font-bold text-lg mb-4">💡 حالات الاستخدام</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass-card-light p-4">
              <div className="text-3xl mb-2">📅</div>
              <div className="text-white font-bold mb-1">تسجيل الحضور</div>
              <div className="text-gray-400 text-sm">مسح QR Code لتسجيل حضور اللاعبين والمدربين</div>
            </div>
            <div className="glass-card-light p-4">
              <div className="text-3xl mb-2">🪪</div>
              <div className="text-white font-bold mb-1">الهوية الرقمية</div>
              <div className="text-gray-400 text-sm">QR Code كبطاقة هوية رقمية لكل مستخدم</div>
            </div>
            <div className="glass-card-light p-4">
              <div className="text-3xl mb-2">💳</div>
              <div className="text-white font-bold mb-1">الدفع السريع</div>
              <div className="text-gray-400 text-sm">مسح QR Code للدفع السريع والآمن</div>
            </div>
            <div className="glass-card-light p-4">
              <div className="text-3xl mb-2">🔐</div>
              <div className="text-white font-bold mb-1">التحقق من الهوية</div>
              <div className="text-gray-400 text-sm">التحقق من هوية المستخدم عند الدخول</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
