import { useState } from 'react';

interface BusRoute {
  id: number;
  name: string;
  driver: string;
  phone: string;
  capacity: number;
  currentPassengers: number;
  status: 'active' | 'inactive' | 'maintenance';
  price: number;
  schedule: string;
  stops: string[];
}

const busRoutes: BusRoute[] = [
  {
    id: 1,
    name: 'خط المعادي',
    driver: 'أبو محمود',
    phone: '01012345678',
    capacity: 20,
    currentPassengers: 15,
    status: 'active',
    price: 300,
    schedule: 'يومياً 4:00 مساءً - 7:00 مساءً',
    stops: ['المعادي', 'دار السلام', 'السادات', 'الأكاديمية'],
  },
  {
    id: 2,
    name: 'خط مدينة نصر',
    driver: 'عم حسن',
    phone: '01098765432',
    capacity: 25,
    currentPassengers: 18,
    status: 'active',
    price: 350,
    schedule: 'يومياً 4:30 مساءً - 7:30 مساءً',
    stops: ['مدينة نصر', 'العباسية', ' Ramses', 'الأكاديمية'],
  },
  {
    id: 3,
    name: 'خط 6 أكتوبر',
    driver: 'كابتن سعيد',
    phone: '01112345678',
    capacity: 22,
    currentPassengers: 0,
    status: 'maintenance',
    price: 400,
    schedule: 'متوقف للصيانة',
    stops: ['6 أكتوبر', 'الشيخ زايد', 'الدائري', 'الأكاديمية'],
  },
];

export default function BusManagement() {
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null);
  const [showSubscription, setShowSubscription] = useState(false);

  const getStatusBadge = (status: BusRoute['status']) => {
    const config = {
      active: { label: 'نشط', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
      inactive: { label: 'متوقف', color: 'bg-gray-500/20 text-gray-300 border-gray-500/30' },
      maintenance: { label: 'صيانة', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
    };
    return config[status];
  };

  return (
    <section id="buses" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-blue-300 text-xs font-semibold">خدمة اختيارية</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🚌 إدارة <span className="gradient-text-blue">خطوط النقل</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            خدمة نقل اختيارية (خارج الاشتراك الشهري) لتوصيل اللاعبين من وإلى الأكاديمية
          </p>
        </div>

        {/* Important Notice */}
        <div className="glass-card p-4 mb-6 border border-amber-500/30 bg-amber-500/5">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h4 className="text-amber-300 font-bold text-sm mb-1">ملاحظة مهمة</h4>
              <p className="text-gray-300 text-xs leading-relaxed">
                خدمة النقل بالباصات <strong className="text-white">اختيارية</strong> وغير مشمولة في الاشتراك الشهري الأساسي. 
                يتم الاشتراك فيها بشكل منفصل ودفع رسوم شهرية إضافية حسب الخط المختار.
              </p>
            </div>
          </div>
        </div>

        {/* Bus Routes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {busRoutes.map((route) => {
            const status = getStatusBadge(route.status);
            const occupancy = (route.currentPassengers / route.capacity) * 100;
            
            return (
              <div
                key={route.id}
                onClick={() => setSelectedRoute(route.id)}
                className={`glass-card p-5 cursor-pointer transition-all hover:scale-105 ${
                  selectedRoute === route.id ? 'ring-2 ring-blue-500/50' : ''
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🚌</span>
                    <h3 className="text-white font-bold">{route.name}</h3>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold border ${status.color}`}>
                    {status.label}
                  </span>
                </div>

                {/* Driver Info */}
                <div className="glass-card-light p-3 mb-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">السائق:</span>
                    <span className="text-white font-semibold">{route.driver}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs mt-1">
                    <span className="text-gray-400">الهاتف:</span>
                    <span className="text-blue-300 font-mono">{route.phone}</span>
                  </div>
                </div>

                {/* Capacity */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-400">السعة</span>
                    <span className="text-white font-semibold">
                      {route.currentPassengers}/{route.capacity}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        occupancy > 80 ? 'bg-red-500' : occupancy > 50 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${occupancy}%` }}
                    />
                  </div>
                </div>

                {/* Price & Schedule */}
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <div className="text-gray-400">الرسوم الشهرية</div>
                    <div className="text-emerald-400 font-bold">{route.price} ج.م</div>
                  </div>
                  <div className="text-left">
                    <div className="text-gray-400">الموعد</div>
                    <div className="text-white text-[10px]">{route.schedule}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Route Details */}
        {selectedRoute && (
          <div className="glass-card p-6 mb-6 border border-blue-500/20">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <span>📍</span> تفاصيل الخط
            </h3>
            
            {(() => {
              const route = busRoutes.find(r => r.id === selectedRoute);
              if (!route) return null;

              return (
                <div>
                  {/* Stops */}
                  <div className="mb-4">
                    <h4 className="text-gray-400 text-sm mb-2">محطات التوقف:</h4>
                    <div className="flex items-center gap-2 overflow-x-auto pb-2">
                      {route.stops.map((stop, i) => (
                        <div key={i} className="flex items-center gap-2 shrink-0">
                          <div className="glass-card-light px-3 py-2 rounded-lg">
                            <div className="text-white text-xs font-semibold">{stop}</div>
                          </div>
                          {i < route.stops.length - 1 && (
                            <span className="text-gray-500">←</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Subscribe Button */}
                  <button
                    onClick={() => setShowSubscription(true)}
                    disabled={route.status !== 'active'}
                    className={`w-full py-3 rounded-lg font-bold text-sm transition-all ${
                      route.status === 'active'
                        ? 'bg-gradient-to-l from-blue-500 to-cyan-600 text-white shadow-lg hover:opacity-90'
                        : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {route.status === 'active' 
                      ? `اشترك في الخط - ${route.price} ج.م/شهر`
                      : 'الخط غير متاح حالياً'
                    }
                  </button>
                </div>
              );
            })()}
          </div>
        )}

        {/* Subscription Modal */}
        {showSubscription && (
          <div className="glass-card p-6 border border-emerald-500/30 bg-emerald-500/5">
            <h4 className="text-white font-bold text-lg mb-4">✅ تأكيد الاشتراك في خدمة النقل</h4>
            <div className="space-y-3 mb-4">
              <div className="glass-card-light p-3">
                <div className="text-xs text-gray-400">الخط</div>
                <div className="text-white font-semibold">{busRoutes.find(r => r.id === selectedRoute)?.name}</div>
              </div>
              <div className="glass-card-light p-3">
                <div className="text-xs text-gray-400">الرسوم الشهرية</div>
                <div className="text-emerald-400 font-bold text-lg">
                  {busRoutes.find(r => r.id === selectedRoute)?.price} ج.م
                </div>
                <div className="text-[10px] text-gray-500">تُدفع منفصلة عن الاشتراك الشهري</div>
              </div>
              <div className="glass-card-light p-3">
                <div className="text-xs text-gray-400">طريقة الدفع</div>
                <div className="text-white">محفظة إلكترونية / نقدي / تحويل بنكي</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowSubscription(false)}
                className="flex-1 py-2.5 bg-gradient-to-l from-emerald-500 to-teal-600 text-white text-sm font-bold rounded-lg"
              >
                تأكيد الاشتراك
              </button>
              <button
                onClick={() => setShowSubscription(false)}
                className="px-4 py-2.5 bg-gray-700 text-white text-sm rounded-lg"
              >
                إلغاء
              </button>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: '📍', title: 'تتبع مباشر', desc: 'معرفة موقع الباص في الوقت الفعلي' },
            { icon: '🔔', title: 'إشعارات ذكية', desc: 'تنبيهات الوصول والمغادرة' },
            { icon: '👨‍✈️', title: 'سائقين معتمدين', desc: 'جميع السائقين مرخصين ومدربين' },
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
