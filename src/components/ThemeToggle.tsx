import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle() {
  const { mode, setMode } = useTheme();

  const modes = [
    { id: 'dark', label: '🌙', title: 'الوضع الداكن' },
    { id: 'light', label: '☀️', title: 'الوضع الفاتح' },
    { id: 'system', label: '💻', title: 'تلقائي' },
  ] as const;

  return (
    <div className="glass-card p-1 flex gap-1">
      {modes.map((m) => (
        <button
          key={m.id}
          onClick={() => setMode(m.id)}
          className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
            mode === m.id
              ? 'bg-white/10 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
          title={m.title}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}
