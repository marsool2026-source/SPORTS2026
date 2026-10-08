import { supabase } from '../lib/supabase';

// ============================================
// 🤝 خدمة الشراكات (Partnerships Service)
// ============================================

export interface Partnership {
  id: string;
  partner_name: string;
  partner_category?: string;
  contact_person?: string;
  contact_email?: string;
  contact_phone?: string;
  partnership_type?: string;
  start_date?: string;
  end_date?: string;
  revenue_generated: number;
  status: 'active' | 'pending' | 'expired' | 'terminated';
  logo_url?: string;
  created_at: string;
  updated_at: string;
}

export interface CreatePartnershipData {
  partnerName: string;
  partnerCategory?: string;
  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;
  partnershipType?: string;
  startDate?: string;
  endDate?: string;
  logoUrl?: string;
}

/**
 * جلب جميع الشراكات
 */
export const getAllPartnerships = async (
  status?: string
): Promise<{ data: Partnership[] | null; error: string | null }> => {
  try {
    let query = supabase
      .from('partnerships')
      .select('*')
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

/**
 * جلب شراكة محددة
 */
export const getPartnershipById = async (
  id: string
): Promise<{ data: Partnership | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('partnerships')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

/**
 * إنشاء شراكة جديدة
 */
export const createPartnership = async (
  data: CreatePartnershipData
): Promise<{ data: Partnership | null; error: string | null }> => {
  try {
    const { data: partnership, error } = await supabase
      .from('partnerships')
      .insert({
        partner_name: data.partnerName,
        partner_category: data.partnerCategory,
        contact_person: data.contactPerson,
        contact_email: data.contactEmail,
        contact_phone: data.contactPhone,
        partnership_type: data.partnershipType,
        start_date: data.startDate,
        end_date: data.endDate,
        logo_url: data.logoUrl,
        status: 'active',
        revenue_generated: 0,
      })
      .select()
      .single();

    if (error) throw error;
    return { data: partnership, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

/**
 * تحديث شراكة
 */
export const updatePartnership = async (
  id: string,
  updates: Partial<Partnership>
): Promise<{ data: Partnership | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('partnerships')
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
 * تحديث الإيرادات
 */
export const updateRevenue = async (
  partnershipId: string,
  amount: number
): Promise<{ success: boolean; error: string | null }> => {
  try {
    const { data: partnership, error: fetchError } = await supabase
      .from('partnerships')
      .select('revenue_generated')
      .eq('id', partnershipId)
      .single();

    if (fetchError) throw fetchError;

    const { error } = await supabase
      .from('partnerships')
      .update({
        revenue_generated: partnership.revenue_generated + amount,
      })
      .eq('id', partnershipId);

    if (error) throw error;
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

/**
 * جلب الشراكات النشطة
 */
export const getActivePartnerships = async (): Promise<{
  data: Partnership[] | null;
  error: string | null;
}> => {
  try {
    const { data, error } = await supabase
      .from('partnerships')
      .select('*')
      .eq('status', 'active')
      .order('revenue_generated', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

/**
 * إحصائيات الشراكات
 */
export const getPartnershipStats = async (): Promise<{
  total: number;
  active: number;
  totalRevenue: number;
  avgRevenue: number;
  error: string | null;
}> => {
  try {
    const { data, error } = await supabase.from('partnerships').select('*');

    if (error) throw error;

    const activePartnerships = data.filter(p => p.status === 'active');
    const totalRevenue = data.reduce((sum, p) => sum + p.revenue_generated, 0);

    const stats = {
      total: data.length,
      active: activePartnerships.length,
      totalRevenue,
      avgRevenue: activePartnerships.length > 0
        ? totalRevenue / activePartnerships.length
        : 0,
      error: null,
    };

    return stats;
  } catch (error: any) {
    return {
      total: 0,
      active: 0,
      totalRevenue: 0,
      avgRevenue: 0,
      error: error.message,
    };
  }
};

// ============================================
// 🏢 خدمة الفروع (Branches Service)
// ============================================

export interface Branch {
  id: string;
  name: string;
  address?: string;
  city?: string;
  country?: string;
  phone?: string;
  email?: string;
  manager_id?: string;
  players_count: number;
  coaches_count: number;
  monthly_revenue: number;
  status: 'active' | 'inactive' | 'maintenance';
  location?: {
    lat: number;
    lng: number;
  };
  created_at: string;
  updated_at: string;
  manager?: {
    full_name: string;
    email: string;
  };
}

export interface CreateBranchData {
  name: string;
  address?: string;
  city?: string;
  country?: string;
  phone?: string;
  email?: string;
  managerId?: string;
  location?: { lat: number; lng: number };
}

/**
 * جلب جميع الفروع
 */
export const getAllBranches = async (
  status?: string
): Promise<{ data: Branch[] | null; error: string | null }> => {
  try {
    let query = supabase
      .from('branches')
      .select(`
        *,
        manager:users!manager_id(full_name, email)
      `)
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

/**
 * جلب فرع محدد
 */
export const getBranchById = async (
  id: string
): Promise<{ data: Branch | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('branches')
      .select(`
        *,
        manager:users!manager_id(full_name, email)
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
 * إنشاء فرع جديد
 */
export const createBranch = async (
  data: CreateBranchData
): Promise<{ data: Branch | null; error: string | null }> => {
  try {
    const { data: branch, error } = await supabase
      .from('branches')
      .insert({
        name: data.name,
        address: data.address,
        city: data.city,
        country: data.country,
        phone: data.phone,
        email: data.email,
        manager_id: data.managerId,
        location: data.location,
        status: 'active',
        players_count: 0,
        coaches_count: 0,
        monthly_revenue: 0,
      })
      .select()
      .single();

    if (error) throw error;
    return { data: branch, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

/**
 * تحديث فرع
 */
export const updateBranch = async (
  id: string,
  updates: Partial<Branch>
): Promise<{ data: Branch | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('branches')
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
 * تحديث إحصائيات الفرع
 */
export const updateBranchStats = async (
  branchId: string
): Promise<{ success: boolean; error: string | null }> => {
  try {
    // حساب عدد اللاعبين
    const { count: playersCount } = await supabase
      .from('players')
      .select('*', { count: 'exact', head: true })
      .eq('branch_id', branchId);

    // حساب عدد المدربين
    const { count: coachesCount } = await supabase
      .from('coaches')
      .select('*', { count: 'exact', head: true })
      .eq('branch_id', branchId);

    // حساب الإيرادات الشهرية
    const startDate = new Date();
    startDate.setDate(1);
    const { data: transactions } = await supabase
      .from('transactions')
      .select('amount')
      .eq('branch_id', branchId)
      .eq('status', 'approved')
      .gte('created_at', startDate.toISOString());

    const monthlyRevenue = transactions?.reduce((sum, t) => sum + t.amount, 0) || 0;

    const { error } = await supabase
      .from('branches')
      .update({
        players_count: playersCount || 0,
        coaches_count: coachesCount || 0,
        monthly_revenue: monthlyRevenue,
      })
      .eq('id', branchId);

    if (error) throw error;
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

/**
 * إحصائيات الفروع
 */
export const getBranchStats = async (): Promise<{
  total: number;
  active: number;
  totalPlayers: number;
  totalCoaches: number;
  totalRevenue: number;
  error: string | null;
}> => {
  try {
    const { data, error } = await supabase.from('branches').select('*');

    if (error) throw error;

    const stats = {
      total: data.length,
      active: data.filter(b => b.status === 'active').length,
      totalPlayers: data.reduce((sum, b) => sum + b.players_count, 0),
      totalCoaches: data.reduce((sum, b) => sum + b.coaches_count, 0),
      totalRevenue: data.reduce((sum, b) => sum + b.monthly_revenue, 0),
      error: null,
    };

    return stats;
  } catch (error: any) {
    return {
      total: 0,
      active: 0,
      totalPlayers: 0,
      totalCoaches: 0,
      totalRevenue: 0,
      error: error.message,
    };
  }
};
