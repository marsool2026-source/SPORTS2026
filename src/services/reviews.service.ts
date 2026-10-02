import { supabase } from '../lib/supabase';

// ============================================
// ⭐ خدمة التقييمات (Reviews Service)
// ============================================

export interface Review {
  id: string;
  user_id: string;
  target_type: string; // 'coach', 'facility', 'service'
  target_id: string;
  rating: number;
  comment?: string;
  created_at: string;
  user?: {
    full_name: string;
    avatar_url?: string;
  };
}

export interface CreateReviewData {
  userId: string;
  targetType: string;
  targetId: string;
  rating: number;
  comment?: string;
}

/**
 * جلب جميع التقييمات
 */
export const getAllReviews = async (
  targetType?: string,
  targetId?: string
): Promise<{ data: Review[] | null; error: string | null }> => {
  try {
    let query = supabase
      .from('reviews')
      .select(`
        *,
        user:users(full_name, avatar_url)
      `)
      .order('created_at', { ascending: false });

    if (targetType) {
      query = query.eq('target_type', targetType);
    }
    if (targetId) {
      query = query.eq('target_id', targetId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

/**
 * جلب تقييمات مستخدم
 */
export const getUserReviews = async (
  userId: string
): Promise<{ data: Review[] | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

/**
 * إنشاء تقييم جديد
 */
export const createReview = async (
  data: CreateReviewData
): Promise<{ data: Review | null; error: string | null }> => {
  try {
    // التحقق من عدم وجود تقييم سابق
    const { data: existing } = await supabase
      .from('reviews')
      .select('id')
      .eq('user_id', data.userId)
      .eq('target_type', data.targetType)
      .eq('target_id', data.targetId)
      .limit(1);

    if (existing && existing.length > 0) {
      throw new Error('لقد قمت بالتقييم مسبقاً');
    }

    const { data: review, error } = await supabase
      .from('reviews')
      .insert({
        user_id: data.userId,
        target_type: data.targetType,
        target_id: data.targetId,
        rating: data.rating,
        comment: data.comment,
      })
      .select()
      .single();

    if (error) throw error;

    // تحديث متوسط التقييم إذا كان تقييم مدرب
    if (data.targetType === 'coach') {
      const { data: reviews } = await supabase
        .from('reviews')
        .select('rating')
        .eq('target_type', 'coach')
        .eq('target_id', data.targetId);

      if (reviews) {
        const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
        await supabase
          .from('coaches')
          .update({ rating: avgRating })
          .eq('id', data.targetId);
      }
    }

    return { data: review, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

/**
 * تحديث تقييم
 */
export const updateReview = async (
  id: string,
  updates: { rating?: number; comment?: string }
): Promise<{ data: Review | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('reviews')
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
 * حذف تقييم
 */
export const deleteReview = async (
  id: string
): Promise<{ success: boolean; error: string | null }> => {
  try {
    const { error } = await supabase.from('reviews').delete().eq('id', id);

    if (error) throw error;
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

/**
 * جلب متوسط التقييم
 */
export const getAverageRating = async (
  targetType: string,
  targetId: string
): Promise<{ average: number; count: number; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('rating')
      .eq('target_type', targetType)
      .eq('target_id', targetId);

    if (error) throw error;

    const average = data.length > 0
      ? data.reduce((sum, r) => sum + r.rating, 0) / data.length
      : 0;

    return {
      average: Math.round(average * 10) / 10,
      count: data.length,
      error: null,
    };
  } catch (error: any) {
    return { average: 0, count: 0, error: error.message };
  }
};

/**
 * إحصائيات التقييمات
 */
export const getReviewStats = async (
  targetType?: string
): Promise<{
  total: number;
  average: number;
  distribution: Record<number, number>;
  error: string | null;
}> => {
  try {
    let query = supabase.from('reviews').select('rating');

    if (targetType) {
      query = query.eq('target_type', targetType);
    }

    const { data, error } = await query;
    if (error) throw error;

    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    data.forEach(r => {
      distribution[r.rating as keyof typeof distribution]++;
    });

    const average = data.length > 0
      ? data.reduce((sum, r) => sum + r.rating, 0) / data.length
      : 0;

    return {
      total: data.length,
      average: Math.round(average * 10) / 10,
      distribution,
      error: null,
    };
  } catch (error: any) {
    return {
      total: 0,
      average: 0,
      distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      error: error.message,
    };
  }
};
