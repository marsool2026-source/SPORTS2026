import { supabase } from '../lib/supabase';

// ============================================
// 👨‍🏫 خدمة المدربين (Coaches Service)
// ============================================

export interface Coach {
  id: string;
  user_id: string;
  specialty: string;
  experience_years: number;
  certifications: string[];
  rating: number;
  players_count: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  user?: {
    full_name: string;
    email: string;
    phone?: string;
    avatar_url?: string;
  };
}

export interface CreateCoachData {
  userId: string;
  fullName: string;
  email: string;
  phone?: string;
  specialty: string;
  experienceYears: number;
  certifications?: string[];
}

/**
 * جلب جميع المدربين
 */
export const getAllCoaches = async (): Promise<{ data: Coach[] | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('coaches')
      .select(`
        *,
        user:users(full_name, email, phone, avatar_url)
      `)
      .eq('is_active', true)
      .order('rating', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

/**
 * جلب مدرب محدد
 */
export const getCoachById = async (id: string): Promise<{ data: Coach | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('coaches')
      .select(`
        *,
        user:users(full_name, email, phone, avatar_url)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

/**
 * إنشاء مدرب جديد
 */
export const createCoach = async (data: CreateCoachData): Promise<{ data: Coach | null; error: string | null }> => {
  try {
    const { data: coach, error } = await supabase
      .from('coaches')
      .insert({
        user_id: data.userId,
        specialty: data.specialty,
        experience_years: data.experienceYears,
        certifications: data.certifications || [],
        rating: 0,
        players_count: 0,
        is_active: true,
      })
      .select()
      .single();

    if (error) throw error;
    return { data: coach, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

/**
 * تحديث مدرب
 */
export const updateCoach = async (
  id: string,
  updates: Partial<Coach>
): Promise<{ data: Coach | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('coaches')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

/**
 * تحديث تقييم المدرب
 */
export const updateCoachRating = async (coachId: string): Promise<{ success: boolean; error: string | null }> => {
  try {
    // حساب متوسط التقييم من جدول reviews
    const { data: reviews, error: reviewsError } = await supabase
      .from('reviews')
      .select('rating')
      .eq('target_type', 'coach')
      .eq('target_id', coachId);

    if (reviewsError) throw reviewsError;

    const avgRating = reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

    const { error } = await supabase
      .from('coaches')
      .update({ rating: avgRating })
      .eq('id', coachId);

    if (error) throw error;
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

/**
 * جلب مدربين حسب التخصص
 */
export const getCoachesBySpecialty = async (
  specialty: string
): Promise<{ data: Coach[] | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('coaches')
      .select(`
        *,
        user:users(full_name, email, phone, avatar_url)
      `)
      .eq('specialty', specialty)
      .eq('is_active', true)
      .order('rating', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

/**
 * إحصائيات المدربين
 */
export const getCoachStats = async (): Promise<{
  total: number;
  active: number;
  avgRating: number;
  error: string | null;
}> => {
  try {
    const { data, error } = await supabase
      .from('coaches')
      .select('is_active, rating');

    if (error) throw error;

    const stats = {
      total: data.length,
      active: data.filter(c => c.is_active).length,
      avgRating: data.length > 0
        ? data.reduce((sum, c) => sum + c.rating, 0) / data.length
        : 0,
      error: null,
    };

    return stats;
  } catch (error: any) {
    return {
      total: 0,
      active: 0,
      avgRating: 0,
      error: error.message,
    };
  }
};
