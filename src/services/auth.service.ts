import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

// ============================================
// 🔐 خدمة المصادقة (Auth Service)
// ============================================

export interface SignUpData {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  role?: 'admin' | 'coach' | 'player' | 'parent' | 'financial';
}

export interface SignInData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
}

/**
 * تسجيل حساب جديد
 */
export const signUp = async (data: SignUpData): Promise<AuthResponse> => {
  try {
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
          phone: data.phone,
          role: data.role || 'player',
        },
      },
    });

    if (error) throw error;

    // إنشاء سجل في جدول users
    if (authData.user) {
      const { error: dbError } = await supabase.from('users').insert({
        id: authData.user.id,
        email: data.email,
        full_name: data.fullName,
        phone: data.phone,
        role: data.role || 'player',
      });

      if (dbError) throw dbError;
    }

    return { success: true, user: authData.user || undefined };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

/**
 * تسجيل الدخول
 */
export const signIn = async (data: SignInData): Promise<AuthResponse> => {
  try {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) throw error;

    return { success: true, user: authData.user || undefined };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

/**
 * تسجيل الدخول بـ Google
 */
export const signInWithGoogle = async (): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) throw error;

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

/**
 * تسجيل الخروج
 */
export const signOut = async (): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

/**
 * استعادة كلمة المرور
 */
export const resetPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

/**
 * تحديث كلمة المرور
 */
export const updatePassword = async (newPassword: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

/**
 * تحديث الملف الشخصي
 */
export const updateProfile = async (updates: {
  fullName?: string;
  phone?: string;
  avatarUrl?: string;
}): Promise<{ success: boolean; error?: string }> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    // تحديث في auth
    const { error: authError } = await supabase.auth.updateUser({
      data: {
        full_name: updates.fullName,
        phone: updates.phone,
      },
    });
    if (authError) throw authError;

    // تحديث في جدول users
    const { error: dbError } = await supabase
      .from('users')
      .update({
        full_name: updates.fullName,
        phone: updates.phone,
        avatar_url: updates.avatarUrl,
      })
      .eq('id', user.id);

    if (dbError) throw dbError;

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

/**
 * الحصول على المستخدم الحالي
 */
export const getCurrentUser = async (): Promise<User | null> => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

/**
 * الاستماع لتغييرات المصادقة
 */
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user || null);
  });
};
