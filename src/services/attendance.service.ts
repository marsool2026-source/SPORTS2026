import { supabase } from '../lib/supabase';

// ============================================
// 📱 خدمة الحضور (Attendance Service)
// ============================================

export interface Attendance {
  id: string;
  player_id: string;
  group_id: string;
  date: string;
  check_in_time: string;
  check_out_time?: string;
  status: 'present' | 'absent' | 'late';
  notes?: string;
  scanned_by?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  created_at: string;
  // Relations
  player?: {
    serial_number: string;
    user?: {
      full_name: string;
    };
  };
  group?: {
    name: string;
  };
}

/**
 * تسجيل حضور لاعب عبر QR Code
 */
export const recordAttendance = async (
  playerId: string,
  groupId: string,
  scannedBy: string,
  location?: { latitude: number; longitude: number }
): Promise<{ data: Attendance | null; error: string | null }> => {
  try {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const time = now.toTimeString().split(' ')[0];

    // التحقق من عدم تسجيل الحضور مسبقاً اليوم
    const { data: existing } = await supabase
      .from('attendance')
      .select('id')
      .eq('player_id', playerId)
      .eq('date', today)
      .single();

    if (existing) {
      return { data: null, error: 'تم تسجيل الحضور مسبقاً اليوم' };
    }

    // تسجيل الحضور
    const { data, error } = await supabase
      .from('attendance')
      .insert({
        player_id: playerId,
        group_id: groupId,
        date: today,
        check_in_time: now.toISOString(),
        status: 'present',
        scanned_by: scannedBy,
        location: location,
      })
      .select()
      .single();

    if (error) throw error;

    // إضافة نقاط ولاء
    await supabase.rpc('add_loyalty_points', {
      player_id: playerId,
      points: 10, // 10 نقاط لكل حضور
    });

    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

/**
 * تسجيل غياب لاعب
 */
export const recordAbsence = async (
  playerId: string,
  groupId: string,
  notes?: string
): Promise<{ success: boolean; error: string | null }> => {
  try {
    const today = new Date().toISOString().split('T')[0];

    const { error } = await supabase.from('attendance').insert({
      player_id: playerId,
      group_id: groupId,
      date: today,
      status: 'absent',
      notes: notes,
    });

    if (error) throw error;
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

/**
 * جلب سجل الحضور للاعب
 */
export const getPlayerAttendance = async (
  playerId: string,
  startDate?: string,
  endDate?: string
): Promise<{ data: Attendance[] | null; error: string | null }> => {
  try {
    let query = supabase
      .from('attendance')
      .select(`
        *,
        group:training_groups(name)
      `)
      .eq('player_id', playerId)
      .order('date', { ascending: false });

    if (startDate) {
      query = query.gte('date', startDate);
    }
    if (endDate) {
      query = query.lte('date', endDate);
    }

    const { data, error } = await query;
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

/**
 * جلب سجل الحضور لمجموعة
 */
export const getGroupAttendance = async (
  groupId: string,
  date: string
): Promise<{ data: Attendance[] | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('attendance')
      .select(`
        *,
        player:players(
          serial_number,
          user:users(full_name)
        )
      `)
      .eq('group_id', groupId)
      .eq('date', date)
      .order('check_in_time', { ascending: true });

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

/**
 * إحصائيات الحضور
 */
export const getAttendanceStats = async (
  groupId?: string,
  startDate?: string,
  endDate?: string
): Promise<{
  total: number;
  present: number;
  absent: number;
  late: number;
  attendanceRate: number;
  error: string | null;
}> => {
  try {
    let query = supabase.from('attendance').select('status');

    if (groupId) {
      query = query.eq('group_id', groupId);
    }
    if (startDate) {
      query = query.gte('date', startDate);
    }
    if (endDate) {
      query = query.lte('date', endDate);
    }

    const { data, error } = await query;
    if (error) throw error;

    const stats = {
      total: data.length,
      present: data.filter(a => a.status === 'present').length,
      absent: data.filter(a => a.status === 'absent').length,
      late: data.filter(a => a.status === 'late').length,
      attendanceRate: data.length > 0
        ? (data.filter(a => a.status === 'present').length / data.length) * 100
        : 0,
      error: null,
    };

    return stats;
  } catch (error: any) {
    return {
      total: 0,
      present: 0,
      absent: 0,
      late: 0,
      attendanceRate: 0,
      error: error.message,
    };
  }
};

/**
 * تقرير الحضور الشهري
 */
export const getMonthlyAttendanceReport = async (
  year: number,
  month: number,
  groupId?: string
): Promise<{
  data: any;
  error: string | null;
}> => {
  try {
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
    const endDate = new Date(year, month, 0).toISOString().split('T')[0];

    let query = supabase
      .from('attendance')
      .select(`
        *,
        player:players(
          serial_number,
          user:users(full_name)
        )
      `)
      .gte('date', startDate)
      .lte('date', endDate);

    if (groupId) {
      query = query.eq('group_id', groupId);
    }

    const { data, error } = await query.order('date', { ascending: false });
    if (error) throw error;

    const report = {
      period: `${year}-${String(month).padStart(2, '0')}`,
      totalRecords: data.length,
      presentCount: data.filter(a => a.status === 'present').length,
      absentCount: data.filter(a => a.status === 'absent').length,
      lateCount: data.filter(a => a.status === 'late').length,
      attendanceRate: data.length > 0
        ? (data.filter(a => a.status === 'present').length / data.length) * 100
        : 0,
      dailyBreakdown: data.reduce((acc: any, a) => {
        const date = a.date;
        if (!acc[date]) {
          acc[date] = { present: 0, absent: 0, late: 0 };
        }
        acc[date][a.status]++;
        return acc;
      }, {}),
      records: data,
      error: null,
    };

    return { data: report, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};
