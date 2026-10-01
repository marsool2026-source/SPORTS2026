import { useState } from 'react';

interface Backup {
  id: number;
  date: string;
  time: string;
  size: string;
  type: 'automatic' | 'manual';
  status: 'completed' | 'in-progress' | 'failed';
  location: string;
  files: number;
}

interface StorageLocation {
  id: number;
  name: string;
  icon: string;
  used: number;
  total: number;
  status: 'connected' | 'disconnected';
}

const backups: Backup[] = [
  { id: 1, date: '2026-01-20', time: '03:00', size: '2.4 GB', type: 'automatic', status: 'completed', location: 'AWS S3', files: 15420 },
  { id: 2, date: '2026-01-19', time: '03:00', size: '2.3 GB', type: 'automatic', status: 'completed', location: 'AWS S3', files: 15280 },
  { id: 3, date: '2026-01-18', time: '14:30', size: '2.3 GB', type: 'manual', status: 'completed', location: 'Google Cloud', files: 15250 },
  { id: 4, date: '2026-01-18', time: '03:00', size: '2.3 GB', type: 'automatic', status: 'completed', location: 'AWS S3', files: 15200 },
  { id: 5, date: '2026-01-17', time: '03:00', size: '2.2 GB', type: 'automatic', status: 'completed', location: 'AWS S3', files: 15100 },
];

const storageLocations: StorageLocation[] = [
  { id: 1, name: 'AWS S3', icon: '☁️', used: 45.2, total: 100, status: 'connected' },
  { id: 2, name: 'Google Cloud', icon: '🌐', used: 28.5, total: 50, status: 'connected' },
  { id: 3, name: 'Azure Blob', icon: '💾', used: 12.8, total: 50, status: 'connected' },
  { id: 4, name: 'Local Server', icon: '🖥️', used: 78.5, total: 500, status: 'connected' },
];

export default function BackupSystem() {
  const [isCreatingBackup, setIsCreatingBackup] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);
  const [autoBackupEnabled, setAutoBackupEnabled] = useState(true);
  const [encryptionEnabled, setEncryptionEnabled] = useState(true);
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const createManualBackup = () => {
    setIsCreatingBackup(true);
    setBackupProgress(0);
    
    const interval = setInterval(() => {
      setBackupProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsCreatingBackup(false);
            setBackupProgress(0);
          }, 1000);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  return (
    <section id="backup-system" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-emerald-300 text-xs font-semibold">نسخ احتياطي</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            💾 نظام <span className="gradient-text-blue">النسخ الاحتياطي</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            حماية بياناتك بنسخ احتياطي تلقائي مشفر على خوادم متعددة
          </p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-2xl font-black text-emerald-400">{backups.length}</div>
            <div className="text-gray-400 text-xs">نسخ احتياطية</div>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">💾</div>
            <div className="text-2xl font-black text-blue-400">11.5 GB</div>
            <div className="text-gray-400 text-xs">إجمالي الحجم</div>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">🔒</div>
            <div className="text-2xl font-black text-purple-400">AES-256</div>
            <div className="text-gray-400 text-xs">التشفير</div>
          </div>
          <div className="glass-card p-5 text-center">
            <div className="text-3xl mb-2">✅</div>
            <div className="text-2xl font-black text-amber-400">100%</div>
            <div className="text-gray-400 text-xs">نسبة النجاح</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Settings */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <span>⚙️</span> الإعدادات
            </h3>

            <div className="space-y-4">
              {/* Auto Backup */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white text-sm font-semibold">نسخ احتياطي تلقائي</div>
                  <div className="text-gray-400 text-xs">نسخ يومي في الساعة 3:00 ص</div>
                </div>
                <button
                  onClick={() => setAutoBackupEnabled(!autoBackupEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    autoBackupEnabled ? 'bg-emerald-500' : 'bg-gray-600'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    autoBackupEnabled ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              {/* Encryption */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white text-sm font-semibold">تشفير البيانات</div>
                  <div className="text-gray-400 text-xs">AES-256 encryption</div>
                </div>
                <button
                  onClick={() => setEncryptionEnabled(!encryptionEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    encryptionEnabled ? 'bg-emerald-500' : 'bg-gray-600'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    encryptionEnabled ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              {/* Frequency */}
              <div>
                <div className="text-white text-sm font-semibold mb-2">التكرار</div>
                <div className="grid grid-cols-3 gap-2">
                  {(['daily', 'weekly', 'monthly'] as const).map((freq) => (
                    <button
                      key={freq}
                      onClick={() => setFrequency(freq)}
                      className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                        frequency === freq
                          ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300'
                          : 'glass-card-light text-gray-400'
                      }`}
                    >
                      {freq === 'daily' ? 'يومي' : freq === 'weekly' ? 'أسبوعي' : 'شهري'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Manual Backup Button */}
              <button
                onClick={createManualBackup}
                disabled={isCreatingBackup}
                className="w-full py-3 bg-gradient-to-l from-emerald-500 to-teal-600 text-white text-sm font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isCreatingBackup ? `جاري النسخ... ${backupProgress}%` : '📤 إنشاء نسخة يدوية'}
              </button>

              {isCreatingBackup && (
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-l from-emerald-400 to-teal-500 transition-all duration-200"
                    style={{ width: `${backupProgress}%` }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Storage Locations */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <span>🌐</span> مواقع التخزين
            </h3>

            <div className="space-y-3">
              {storageLocations.map((location) => {
                const percentage = (location.used / location.total) * 100;
                return (
                  <div key={location.id} className="glass-card-light p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-2xl">{location.icon}</div>
                      <div className="flex-1">
                        <div className="text-white font-semibold text-sm">{location.name}</div>
                        <div className="text-gray-400 text-xs">
                          {location.used} GB / {location.total} GB
                        </div>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${
                        location.status === 'connected' ? 'bg-emerald-400' : 'bg-red-400'
                      }`} />
                    </div>
                    <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          percentage > 80 ? 'bg-red-500' : percentage > 60 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Backup History */}
          <div className="glass-card p-6">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <span>📋</span> سجل النسخ
            </h3>

            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {backups.map((backup) => (
                <div key={backup.id} className="glass-card-light p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        backup.type === 'automatic'
                          ? 'bg-blue-500/20 text-blue-300'
                          : 'bg-purple-500/20 text-purple-300'
                      }`}>
                        {backup.type === 'automatic' ? '🔄 تلقائي' : '📤 يدوي'}
                      </span>
                    </div>
                    <span className="text-emerald-400 text-xs">✓ مكتمل</span>
                  </div>
                  <div className="text-white text-sm font-semibold">{backup.date}</div>
                  <div className="text-gray-400 text-xs">
                    {backup.time} • {backup.size} • {backup.files.toLocaleString()} ملف
                  </div>
                  <div className="text-gray-500 text-xs mt-1">📍 {backup.location}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid md:grid-cols-4 gap-4">
          {[
            { icon: '🔒', title: 'تشفير AES-256', desc: 'حماية عالية للبيانات' },
            { icon: '🌍', title: 'تخزين متعدد', desc: '4 مواقع سحابية' },
            { icon: '⚡', title: 'استعادة سريعة', desc: 'أقل من 5 دقائق' },
            { icon: '📊', title: 'سجل كامل', desc: 'تتبع جميع النسخ' },
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
