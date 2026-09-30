import { useState } from 'react';

interface APIEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  auth: boolean;
  rateLimit: string;
}

interface APIKey {
  id: number;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
  requests: number;
  status: 'active' | 'revoked';
}

const endpoints: APIEndpoint[] = [
  { method: 'GET', path: '/api/v1/players', description: 'جلب قائمة اللاعبين', auth: true, rateLimit: '100/min' },
  { method: 'GET', path: '/api/v1/players/:id', description: 'جلب تفاصيل لاعب', auth: true, rateLimit: '100/min' },
  { method: 'POST', path: '/api/v1/players', description: 'إضافة لاعب جديد', auth: true, rateLimit: '20/min' },
  { method: 'PUT', path: '/api/v1/players/:id', description: 'تحديث بيانات لاعب', auth: true, rateLimit: '50/min' },
  { method: 'GET', path: '/api/v1/coaches', description: 'جلب قائمة المدربين', auth: false, rateLimit: '100/min' },
  { method: 'GET', path: '/api/v1/tournaments', description: 'جلب البطولات', auth: false, rateLimit: '100/min' },
  { method: 'POST', path: '/api/v1/attendance', description: 'تسجيل حضور', auth: true, rateLimit: '200/min' },
  { method: 'GET', path: '/api/v1/transactions', description: 'جلب المعاملات المالية', auth: true, rateLimit: '50/min' },
  { method: 'POST', path: '/api/v1/payments', description: 'إنشاء دفعة جديدة', auth: true, rateLimit: '20/min' },
  { method: 'GET', path: '/api/v1/reports', description: 'جلب التقارير', auth: true, rateLimit: '30/min' },
];

const mockAPIKeys: APIKey[] = [
  { id: 1, name: 'Mobile App', key: 'sk_live_abc123xyz789', created: '2026-01-01', lastUsed: '2026-01-20', requests: 15420, status: 'active' },
  { id: 2, name: 'Web Dashboard', key: 'sk_live_def456uvw321', created: '2026-01-05', lastUsed: '2026-01-20', requests: 8934, status: 'active' },
  { id: 3, name: 'Partner Integration', key: 'sk_live_ghi789rst654', created: '2026-01-10', lastUsed: '2026-01-19', requests: 2156, status: 'active' },
];

const methodColors = {
  GET: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  POST: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  PUT: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  DELETE: 'bg-red-500/20 text-red-300 border-red-500/30',
};

export default function PublicAPI() {
  const [activeTab, setActiveTab] = useState<'endpoints' | 'keys' | 'docs'>('endpoints');
  const [apiKeys] = useState(mockAPIKeys);
  const [selectedEndpoint, setSelectedEndpoint] = useState<APIEndpoint | null>(null);

  return (
    <section id="public-api" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-300 text-xs font-semibold">API عام</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🔌 API <span className="gradient-text">للمطورين</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            واجهة برمجية كاملة للتكامل مع أنظمة خارجية
          </p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">🔌</div>
            <div className="text-2xl font-black text-green-400">{endpoints.length}</div>
            <div className="text-gray-400 text-xs">نقاط نهاية</div>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">🔑</div>
            <div className="text-2xl font-black text-blue-400">{apiKeys.length}</div>
            <div className="text-gray-400 text-xs">مفاتيح API</div>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-2xl font-black text-purple-400">26.5K</div>
            <div className="text-gray-400 text-xs">طلب اليوم</div>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">⚡</div>
            <div className="text-2xl font-black text-amber-400">45ms</div>
            <div className="text-gray-400 text-xs">متوسط الاستجابة</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'endpoints', label: '🔌 نقاط النهاية' },
            { id: 'keys', label: '🔑 مفاتيح API' },
            { id: 'docs', label: '📚 التوثيق' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-3 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-l from-green-500 to-emerald-600 text-white shadow-lg'
                  : 'glass-card text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Endpoints Tab */}
        {activeTab === 'endpoints' && (
          <div className="space-y-3">
            {endpoints.map((endpoint, i) => (
              <div
                key={i}
                onClick={() => setSelectedEndpoint(endpoint)}
                className="glass-card p-4 hover:scale-[1.01] transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${methodColors[endpoint.method]}`}>
                    {endpoint.method}
                  </span>
                  <code className="text-white text-sm font-mono flex-1">{endpoint.path}</code>
                  <div className="hidden md:flex items-center gap-3">
                    <span className="text-gray-400 text-xs">{endpoint.description}</span>
                    {endpoint.auth && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] border border-amber-500/30">
                        🔒 يتطلب مصادقة
                      </span>
                    )}
                    <span className="text-gray-500 text-xs">⚡ {endpoint.rateLimit}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* API Keys Tab */}
        {activeTab === 'keys' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold">🔑 مفاتيح API النشطة</h3>
              <button className="px-4 py-2 bg-gradient-to-l from-green-500 to-emerald-600 text-white text-sm font-bold rounded-lg">
                + إنشاء مفتاح جديد
              </button>
            </div>

            <div className="space-y-3">
              {apiKeys.map((key) => (
                <div key={key.id} className="glass-card p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-xl">
                        🔑
                      </div>
                      <div>
                        <div className="text-white font-bold">{key.name}</div>
                        <div className="text-gray-400 text-xs">
                          أنشئ في {key.created} • آخر استخدام: {key.lastUsed}
                        </div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      key.status === 'active' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                    }`}>
                      {key.status === 'active' ? '✓ نشط' : '✗ ملغي'}
                    </span>
                  </div>

                  <div className="glass-card-light p-3 mb-3">
                    <div className="flex items-center justify-between">
                      <code className="text-green-400 text-sm font-mono">{key.key}</code>
                      <button className="text-gray-400 hover:text-white text-xs">📋 نسخ</button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>📊 {key.requests.toLocaleString()} طلب</span>
                    <div className="flex gap-2">
                      <button className="text-blue-400 hover:text-blue-300">تعديل</button>
                      <span className="text-gray-600">|</span>
                      <button className="text-red-400 hover:text-red-300">إلغاء</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Documentation Tab */}
        {activeTab === 'docs' && (
          <div className="space-y-6">
            {/* Quick Start */}
            <div className="glass-card p-6">
              <h3 className="text-white font-bold text-lg mb-4">🚀 البدء السريع</h3>
              <div className="glass-card-light p-4 font-mono text-sm text-green-400 overflow-x-auto">
                <div className="text-gray-500 mb-2"># مثال: جلب قائمة اللاعبين</div>
                <div>curl -X GET https://api.sportsacademy.com/v1/players \</div>
                <div className="pr-4">-H "Authorization: Bearer YOUR_API_KEY" \</div>
                <div className="pr-4">-H "Content-Type: application/json"</div>
              </div>
            </div>

            {/* Response Example */}
            <div className="glass-card p-6">
              <h3 className="text-white font-bold text-lg mb-4">📤 مثال على الاستجابة</h3>
              <div className="glass-card-light p-4 font-mono text-xs text-blue-400 overflow-x-auto">
                <pre>{`{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "أحمد محمد علي",
      "age": 10,
      "sport": "كرة قدم",
      "serialNumber": "SA-2014-FT-0001",
      "subscriptionStatus": "active"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 520
  }
}`}</pre>
              </div>
            </div>

            {/* Authentication */}
            <div className="glass-card p-6">
              <h3 className="text-white font-bold text-lg mb-4">🔐 المصادقة</h3>
              <div className="space-y-3 text-gray-300 text-sm">
                <p>جميع الطلبات المصادق عليها تتطلب Header:</p>
                <div className="glass-card-light p-3 font-mono text-xs text-green-400">
                  Authorization: Bearer YOUR_API_KEY
                </div>
                <p className="text-gray-400 text-xs mt-3">
                  💡 احصل على مفتاح API من لوحة التحكم الخاصة بك
                </p>
              </div>
            </div>

            {/* Rate Limits */}
            <div className="glass-card p-6">
              <h3 className="text-white font-bold text-lg mb-4">⚡ حدود الاستخدام</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { plan: 'مجاني', requests: '1000/يوم', price: 'مجاني' },
                  { plan: 'احترافي', requests: '50,000/يوم', price: '$49/شهر' },
                  { plan: 'مؤسسي', requests: 'غير محدود', price: 'تواصل معنا' },
                ].map((plan, i) => (
                  <div key={i} className="glass-card-light p-4 text-center">
                    <div className="text-white font-bold mb-1">{plan.plan}</div>
                    <div className="text-green-400 text-sm mb-2">{plan.requests}</div>
                    <div className="text-gray-400 text-xs">{plan.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Endpoint Details Modal */}
        {selectedEndpoint && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedEndpoint(null)}>
            <div className="glass-card p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-lg text-sm font-bold border ${methodColors[selectedEndpoint.method]}`}>
                    {selectedEndpoint.method}
                  </span>
                  <code className="text-white font-mono">{selectedEndpoint.path}</code>
                </div>
                <button onClick={() => setSelectedEndpoint(null)} className="text-gray-400 hover:text-white">✕</button>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-gray-400 text-sm mb-1">الوصف</div>
                  <div className="text-white">{selectedEndpoint.description}</div>
                </div>

                <div>
                  <div className="text-gray-400 text-sm mb-1">المصادقة</div>
                  <div className="text-white">{selectedEndpoint.auth ? '🔒 مطلوبة' : '🔓 غير مطلوبة'}</div>
                </div>

                <div>
                  <div className="text-gray-400 text-sm mb-1">حد الاستخدام</div>
                  <div className="text-white">⚡ {selectedEndpoint.rateLimit}</div>
                </div>

                <div>
                  <div className="text-gray-400 text-sm mb-2">مثال على الطلب</div>
                  <div className="glass-card-light p-3 font-mono text-xs text-green-400">
                    curl -X {selectedEndpoint.method} https://api.sportsacademy.com{selectedEndpoint.path}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
