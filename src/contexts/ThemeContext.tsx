import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Theme {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
  };
  gradient: string;
  glowColor: string;
  borderColor: string;
  preview: string;
}

const themes: Theme[] = [
  {
    id: 'modern-glass',
    name: 'Modern Glass',
    nameAr: 'الزجاج العصري',
    description: 'تصميم زجاجي عصري بألوان سيان وبنفسجي',
    colors: {
      primary: 'from-cyan-500 to-blue-600',
      secondary: 'from-purple-500 to-violet-600',
      accent: 'from-pink-500 to-rose-600',
      background: 'from-slate-900 via-slate-800 to-slate-900',
      surface: 'bg-white/5',
      text: 'text-white',
      textSecondary: 'text-gray-400',
    },
    gradient: 'from-cyan-500 via-blue-600 to-purple-600',
    glowColor: 'cyan',
    borderColor: 'border-cyan-500/20',
    preview: 'linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6)',
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    nameAr: 'سايبربانك',
    description: 'تصميم مستقبلي بألوان نيون صارخة',
    colors: {
      primary: 'from-fuchsia-500 to-pink-600',
      secondary: 'from-cyan-400 to-blue-500',
      accent: 'from-yellow-400 to-orange-500',
      background: 'from-gray-950 via-purple-950 to-gray-950',
      surface: 'bg-white/5',
      text: 'text-white',
      textSecondary: 'text-gray-300',
    },
    gradient: 'from-fuchsia-500 via-pink-600 to-cyan-400',
    glowColor: 'fuchsia',
    borderColor: 'border-fuchsia-500/30',
    preview: 'linear-gradient(135deg, #d946ef, #ec4899, #06b6d4)',
  },
  {
    id: 'sunset',
    name: 'Sunset Glow',
    nameAr: 'غروب الشمس',
    description: 'ألوان دافئة مستوحاة من الغروب',
    colors: {
      primary: 'from-orange-500 to-red-600',
      secondary: 'from-amber-400 to-orange-500',
      accent: 'from-pink-500 to-rose-600',
      background: 'from-orange-950 via-red-950 to-rose-950',
      surface: 'bg-white/5',
      text: 'text-white',
      textSecondary: 'text-gray-300',
    },
    gradient: 'from-orange-500 via-red-600 to-pink-600',
    glowColor: 'orange',
    borderColor: 'border-orange-500/30',
    preview: 'linear-gradient(135deg, #f97316, #ef4444, #ec4899)',
  },
  {
    id: 'ocean',
    name: 'Deep Ocean',
    nameAr: 'المحيط العميق',
    description: 'ألوان بحرية هادئة ومريحة',
    colors: {
      primary: 'from-teal-500 to-cyan-600',
      secondary: 'from-blue-500 to-indigo-600',
      accent: 'from-emerald-400 to-teal-500',
      background: 'from-teal-950 via-blue-950 to-indigo-950',
      surface: 'bg-white/5',
      text: 'text-white',
      textSecondary: 'text-gray-300',
    },
    gradient: 'from-teal-500 via-blue-600 to-indigo-600',
    glowColor: 'teal',
    borderColor: 'border-teal-500/30',
    preview: 'linear-gradient(135deg, #14b8a6, #3b82f6, #6366f1)',
  },
  {
    id: 'aurora',
    name: 'Aurora Borealis',
    nameAr: 'الشفق القطبي',
    description: 'ألوان الشفق القطبي الساحرة',
    colors: {
      primary: 'from-green-400 to-emerald-500',
      secondary: 'from-cyan-400 to-blue-500',
      accent: 'from-purple-500 to-violet-600',
      background: 'from-emerald-950 via-teal-950 to-blue-950',
      surface: 'bg-white/5',
      text: 'text-white',
      textSecondary: 'text-gray-300',
    },
    gradient: 'from-green-400 via-cyan-500 to-purple-600',
    glowColor: 'emerald',
    borderColor: 'border-emerald-500/30',
    preview: 'linear-gradient(135deg, #4ade80, #06b6d4, #8b5cf6)',
  },
];

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(themes[0]);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.style.setProperty('--theme-gradient', theme.preview);
    document.documentElement.style.setProperty('--theme-glow', theme.glowColor);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

export { themes };
