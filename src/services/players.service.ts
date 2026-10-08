import { supabase } from '../lib/supabase';

// ============================================
// 👥 خدمة اللاعبين (Players Service)
// ============================================

export interface Player {
  id: string;
  user_id: string;
  serial_number: string;
  birth_date: string;
  age_group: string;
  sport: string;
  position?: string;
  weight?: number;
  height?: number;
  qr_code: string;
  medical_conditions?: string;
  emergency_contact?: any;
  subscription_status: 'active' | 'pending' | 'inactive' | 'expired';
  subscription_plan?: string;
  subscription_start?: string;
  subscription_end?: string;
  loyalty_points: number;
  created_at: string;
  updated_at: string;
  // Relations
  user?: {
    full_name: string;
    email: string;
    phone?: string;
    avatar_url?: string;
  };
}

export interface CreatePlayerData {
  userId: string;
  fullName: string;
  email: string;
  phone?: string;
  birthDate: string;
  sport: string;
  position?: string;
  weight?: number;
  height?: number;
  medicalConditions?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

/**
 * توليد رقم تسلسلي فريد
 */
const generateSerialNumber = (birthYear: number, sport: string): string => {
  const sportCode = sport.substring(0, 2).toUpperCase();
  const random = Math.floor(Math.random() * 9000) + 1000;
  return `SA-${birthYear}-${sportCode}-${random}`;
};

/**
 * جلب جميع اللاعبين
 */
export const getAllPlayers = async (): Promise<{ data: Player[] | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('players')
      .select(`
        *,
        user:users(full_name, email, phone, avatar_url)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

/**
 * جلب لاعب محدد
 */
export const getPlayerById = async (id: string): Promise<{ data: Player | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('players')
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
 * إنشاء لاعب جديد
 */
export const createPlayer = async (data: CreatePlayerData): Promise<{ data: Player | null; error: string | null }> => {
  try {
    const birthYear = new Date(data.birthDate).getFullYear();
    const serialNumber = generateSerialNumber(birthYear, data.sport);
    const qrCode = `QR-${serialNumber}-${Date.now()}`;

    // تحديد الفئة العمرية
    const age = new Date().getFullYear() - birthYear;
    let ageGroup = '';
    if (age <= 8) ageGroup = 'براعم U8';
    else if (age <= 10) ageGroup = 'ناشئين U10';
    else if (age <= 12) ageGroup = 'ناشئين U12';
    else if (age <= 14) ageGroup = 'شباب U14';
    else if (age <= 16) ageGroup = 'شباب U16';
    else if (age <= 18) ageGroup = 'تحت 18';
    else if (age <= 20) ageGroup = 'تحت 20';
    else ageGroup = 'كبار';

    // إنشاء اللاعب
    const { data: player, error } = await supabase
      .from('players')
      .insert({
        user_id: data.userId,
        serial_number: serialNumber,
        birth_date: data.birthDate,
        age_group: ageGroup,
        sport: data.sport,
        position: data.position,
        weight: data.weight,
        height: data.height,
        qr_code: qrCode,
        medical_conditions: data.medicalConditions,
        emergency_contact: data.emergencyContact,
        subscription_status: 'inactive',
        loyalty_points: 0,
      })
      .select()
      .single();

    if (error) throw error;
    return { data: player, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

/**
 * تحديث بيانات لاعب
 */
export const updatePlayer = async (
  id: string,
  updates: Partial<Player>
): Promise<{ data: Player | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('players')
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
 * حذف لاعب
 */
export const deletePlayer = async (id: string): Promise<{ success: boolean; error: string | null }> => {
  try {
    const { error } = await supabase.from('players').delete().eq('id', id);
    if (error) throw error;
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

/**
 * تحديث حالة الاشتراك
 */
export const updateSubscription = async (
  playerId: string,
  status: 'active' | 'pending' | 'inactive' | 'expired',
  plan?: string,
  startDate?: string,
  endDate?: string
): Promise<{ success: boolean; error: string | null }> => {
  try {
    const updates: any = { subscription_status: status };
    if (plan) updates.subscription_plan = plan;
    if (startDate) updates.subscription_start = startDate;
    if (endDate) updates.subscription_end = endDate;

    const { error } = await supabase
      .from('players')
      .update(updates)
      .eq('id', playerId);

    if (error) throw error;
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

/**
 * إضافة نقاط ولاء
 */
export const addLoyaltyPoints = async (
  playerId: string,
  points: number
): Promise<{ success: boolean; error: string | null }> => {
  try {
    const { data: player, error: fetchError } = await supabase
      .from('players')
      .select('loyalty_points')
      .eq('id', playerId)
      .single();

    if (fetchError) throw fetchError;

    const newPoints = (player?.loyalty_points || 0) + points;

    const { error } = await supabase
      .from('players')
      .update({ loyalty_points: newPoints })
      .eq('id', playerId);

    if (error) throw error;
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

/**
 * البحث عن اللاعبين
 */
export const searchPlayers = async (
  query: string,
  filters?: {
    sport?: string;
    ageGroup?: string;
    subscriptionStatus?: string;
  }
): Promise<{ data: Player[] | null; error: string | null }> => {
  try {
    let dbQuery = supabase
      .from('players')
      .select(`
        *,
        user:users(full_name, email, phone, avatar_url)
      `);

    // البحث بالاسم أو الرقم التسلسلي
    if (query) {
      dbQuery = dbQuery.or(`serial_number.ilike.%${query}%`);
    }

    // تطبيق الفلاتر
    if (filters?.sport) {
      dbQuery = dbQuery.eq('sport', filters.sport);
    }
    if (filters?.ageGroup) {
      dbQuery = dbQuery.eq('age_group', filters.ageGroup);
    }
    if (filters?.subscriptionStatus) {
      dbQuery = dbQuery.eq('subscription_status', filters.subscriptionStatus);
    }

    const { data, error } = await dbQuery.order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

/**
 * جلب إحصائيات اللاعبين
 */
export const getPlayerStats = async (): Promise<{
  total: number;
  active: number;
  pending: number;
  inactive: number;
  error: string | null;
}> => {
  try {
    const { data, error } = await supabase
      .from('players')
      .select('subscription_status');

    if (error) throw error;

    const stats = {
      total: data.length,
      active: data.filter(p => p.subscription_status === 'active').length,
      pending: data.filter(p => p.subscription_status === 'pending').length,
      inactive: data.filter(p => p.subscription_status === 'inactive').length,
      error: null,
    };

    return stats;
  } catch (error: any) {
    return {
      total: 0,
      active: 0,
      pending: 0,
      inactive: 0,
      error: error.message,
    };
  }
};
