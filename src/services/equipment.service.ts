import { supabase } from '../lib/supabase';

// ============================================
// 🏋️ خدمة المعدات (Equipment Service)
// ============================================

export interface Equipment {
  id: string;
  name: string;
  category: string;
  total_quantity: number;
  available_quantity: number;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  last_maintenance?: string;
  next_maintenance?: string;
  purchase_date?: string;
  purchase_price?: number;
  location?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateEquipmentData {
  name: string;
  category: string;
  totalQuantity: number;
  condition?: 'excellent' | 'good' | 'fair' | 'poor';
  purchaseDate?: string;
  purchasePrice?: number;
  location?: string;
}

/**
 * جلب جميع المعدات
 */
export const getAllEquipment = async (
  category?: string
): Promise<{ data: Equipment[] | null; error: string | null }> => {
  try {
    let query = supabase
      .from('equipment')
      .select('*')
      .order('created_at', { ascending: false });

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

/**
 * جلب معدات محددة
 */
export const getEquipmentById = async (
  id: string
): Promise<{ data: Equipment | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('equipment')
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
 * إنشاء معدات جديدة
 */
export const createEquipment = async (
  data: CreateEquipmentData
): Promise<{ data: Equipment | null; error: string | null }> => {
  try {
    const { data: equipment, error } = await supabase
      .from('equipment')
      .insert({
        name: data.name,
        category: data.category,
        total_quantity: data.totalQuantity,
        available_quantity: data.totalQuantity,
        condition: data.condition || 'excellent',
        purchase_date: data.purchaseDate,
        purchase_price: data.purchasePrice,
        location: data.location,
      })
      .select()
      .single();

    if (error) throw error;
    return { data: equipment, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

/**
 * تحديث معدات
 */
export const updateEquipment = async (
  id: string,
  updates: Partial<Equipment>
): Promise<{ data: Equipment | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('equipment')
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
 * حجز معدات
 */
export const reserveEquipment = async (
  equipmentId: string,
  quantity: number
): Promise<{ success: boolean; error: string | null }> => {
  try {
    const { data: equipment, error: fetchError } = await supabase
      .from('equipment')
      .select('available_quantity')
      .eq('id', equipmentId)
      .single();

    if (fetchError) throw fetchError;

    if (equipment.available_quantity < quantity) {
      throw new Error('الكمية غير متوفرة');
    }

    const { error } = await supabase
      .from('equipment')
      .update({
        available_quantity: equipment.available_quantity - quantity,
      })
      .eq('id', equipmentId);

    if (error) throw error;
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

/**
 * إرجاع معدات
 */
export const returnEquipment = async (
  equipmentId: string,
  quantity: number
): Promise<{ success: boolean; error: string | null }> => {
  try {
    const { data: equipment, error: fetchError } = await supabase
      .from('equipment')
      .select('available_quantity, total_quantity')
      .eq('id', equipmentId)
      .single();

    if (fetchError) throw fetchError;

    const newAvailable = Math.min(
      equipment.available_quantity + quantity,
      equipment.total_quantity
    );

    const { error } = await supabase
      .from('equipment')
      .update({
        available_quantity: newAvailable,
      })
      .eq('id', equipmentId);

    if (error) throw error;
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

/**
 * تسجيل صيانة
 */
export const recordMaintenance = async (
  equipmentId: string,
  nextMaintenanceDate: string
): Promise<{ success: boolean; error: string | null }> => {
  try {
    const { error } = await supabase
      .from('equipment')
      .update({
        last_maintenance: new Date().toISOString(),
        next_maintenance: nextMaintenanceDate,
      })
      .eq('id', equipmentId);

    if (error) throw error;
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

/**
 * جلب المعدات التي تحتاج صيانة
 */
export const getEquipmentNeedingMaintenance = async (): Promise<{
  data: Equipment[] | null;
  error: string | null;
}> => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('equipment')
      .select('*')
      .lte('next_maintenance', today)
      .order('next_maintenance', { ascending: true });

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

/**
 * إحصائيات المعدات
 */
export const getEquipmentStats = async (): Promise<{
  total: number;
  available: number;
  needsMaintenance: number;
  categories: Record<string, number>;
  error: string | null;
}> => {
  try {
    const { data, error } = await supabase.from('equipment').select('*');

    if (error) throw error;

    const today = new Date().toISOString().split('T')[0];
    const needsMaintenance = data.filter(
      e => e.next_maintenance && e.next_maintenance <= today
    ).length;

    const categories = data.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const stats = {
      total: data.length,
      available: data.reduce((sum, e) => sum + e.available_quantity, 0),
      needsMaintenance,
      categories,
      error: null,
    };

    return stats;
  } catch (error: any) {
    return {
      total: 0,
      available: 0,
      needsMaintenance: 0,
      categories: {},
      error: error.message,
    };
  }
};
