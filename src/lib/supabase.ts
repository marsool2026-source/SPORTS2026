import { createClient } from '@supabase/supabase-js';

// ============================================
// 🔌 إعداد Supabase Client
// ============================================

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// إنشاء Supabase Client مع إعدادات متقدمة
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  db: {
    schema: 'public',
  },
  global: {
    headers: {
      'x-client-info': 'sports-academy/1.0.0',
    },
  },
});

// ============================================
// 🎯 Helper Functions
// ============================================

/**
 * التحقق من اتصال Supabase
 */
export const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('_health').select('*').limit(1);
    return { connected: !error, error };
  } catch (err) {
    return { connected: false, error: err };
  }
};

/**
 * الحصول على المستخدم الحالي
 */
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

/**
 * الحصول على الجلسة الحالية
 */
export const getCurrentSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  return { session, error };
};

export default supabase;
