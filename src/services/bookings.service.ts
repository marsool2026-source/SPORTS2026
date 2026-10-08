import { supabase } from '../lib/supabase';

// ============================================
// 📅 خدمة الحجوزات (Bookings Service)
// ============================================

export interface Booking {
  id: string;
  user_id: string;
  facility_type: string;
  facility_id?: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  amount?: number;
  notes?: string;
  created_at: string;
  user?: {
    full_name: string;
    email: string;
  };
}

export interface CreateBookingData {
  userId: string;
  facilityType: string;
  facilityId?: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  amount?: number;
  notes?: string;
}

/**
 * جلب جميع الحجوزات
 */
export const getAllBookings = async (
  filters?: {
    userId?: string;
    facilityType?: string;
    date?: string;
    status?: string;
  }
): Promise<{ data: Booking[] | null; error: string | null }> => {
  try {
    let query = supabase
      .from('bookings')
      .select(`
        *,
        user:users(full_name, email)
      `)
      .order('booking_date', { ascending: false });

    if (filters?.userId) {
      query = query.eq('user_id', filters.userId);
    }
    if (filters?.facilityType) {
      query = query.eq('facility_type', filters.facilityType);
    }
    if (filters?.date) {
      query = query.eq('booking_date', filters.date);
    }
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    const { data, error } = await query;
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

/**
 * جلب حجز محدد
 */
export const getBookingById = async (
  id: string
): Promise<{ data: Booking | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        user:users(full_name, email)
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
 * إنشاء حجز جديد
 */
export const createBooking = async (
  data: CreateBookingData
): Promise<{ data: Booking | null; error: string | null }> => {
  try {
    // التحقق من عدم وجود تعارض في المواعيد
    const { data: conflicting } = await supabase
      .from('bookings')
      .select('id')
      .eq('facility_type', data.facilityType)
      .eq('booking_date', data.bookingDate)
      .eq('status', 'confirmed')
      .or(`and(start_time.lte.${data.startTime},end_time.gte.${data.endTime}),and(start_time.gte.${data.startTime},start_time.lt.${data.endTime})`)
      .limit(1);

    if (conflicting && conflicting.length > 0) {
      throw new Error('الموعد محجوز مسبقاً');
    }

    const { data: booking, error } = await supabase
      .from('bookings')
      .insert({
        user_id: data.userId,
        facility_type: data.facilityType,
        facility_id: data.facilityId,
        booking_date: data.bookingDate,
        start_time: data.startTime,
        end_time: data.endTime,
        amount: data.amount,
        notes: data.notes,
        status: 'confirmed',
      })
      .select()
      .single();

    if (error) throw error;
    return { data: booking, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

/**
 * تحديث حجز
 */
export const updateBooking = async (
  id: string,
  updates: Partial<Booking>
): Promise<{ data: Booking | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('bookings')
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
 * إلغاء حجز
 */
export const cancelBooking = async (
  id: string
): Promise<{ success: boolean; error: string | null }> => {
  try {
    const { error } = await supabase
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', id);

    if (error) throw error;
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

/**
 * جلب الحجوزات القادمة
 */
export const getUpcomingBookings = async (
  userId?: string
): Promise<{ data: Booking[] | null; error: string | null }> => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    let query = supabase
      .from('bookings')
      .select(`
        *,
        user:users(full_name, email)
      `)
      .gte('booking_date', today)
      .eq('status', 'confirmed')
      .order('booking_date', { ascending: true })
      .limit(20);

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

/**
 * إحصائيات الحجوزات
 */
export const getBookingStats = async (
  startDate?: string,
  endDate?: string
): Promise<{
  total: number;
  confirmed: number;
  cancelled: number;
  revenue: number;
  error: string | null;
}> => {
  try {
    let query = supabase.from('bookings').select('status, amount');

    if (startDate) {
      query = query.gte('booking_date', startDate);
    }
    if (endDate) {
      query = query.lte('booking_date', endDate);
    }

    const { data, error } = await query;
    if (error) throw error;

    const stats = {
      total: data.length,
      confirmed: data.filter(b => b.status === 'confirmed').length,
      cancelled: data.filter(b => b.status === 'cancelled').length,
      revenue: data
        .filter(b => b.status === 'confirmed' && b.amount)
        .reduce((sum, b) => sum + (b.amount || 0), 0),
      error: null,
    };

    return stats;
  } catch (error: any) {
    return {
      total: 0,
      confirmed: 0,
      cancelled: 0,
      revenue: 0,
      error: error.message,
    };
  }
};
