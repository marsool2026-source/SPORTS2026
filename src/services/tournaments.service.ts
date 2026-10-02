import { supabase } from '../lib/supabase';

// ============================================
// 🏆 خدمة البطولات (Tournaments Service)
// ============================================

export interface Tournament {
  id: string;
  name: string;
  description?: string;
  start_date: string;
  end_date: string;
  location?: string;
  category?: string;
  max_participants?: number;
  current_participants: number;
  prize?: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateTournamentData {
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  location?: string;
  category?: string;
  maxParticipants?: number;
  prize?: string;
  createdBy: string;
}

/**
 * جلب جميع البطولات
 */
export const getAllTournaments = async (
  status?: string
): Promise<{ data: Tournament[] | null; error: string | null }> => {
  try {
    let query = supabase
      .from('tournaments')
      .select('*')
      .order('start_date', { ascending: false });

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
 * جلب بطولة محددة
 */
export const getTournamentById = async (
  id: string
): Promise<{ data: Tournament | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('tournaments')
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
 * إنشاء بطولة جديدة
 */
export const createTournament = async (
  data: CreateTournamentData
): Promise<{ data: Tournament | null; error: string | null }> => {
  try {
    const { data: tournament, error } = await supabase
      .from('tournaments')
      .insert({
        name: data.name,
        description: data.description,
        start_date: data.startDate,
        end_date: data.endDate,
        location: data.location,
        category: data.category,
        max_participants: data.maxParticipants,
        prize: data.prize,
        created_by: data.createdBy,
        status: 'upcoming',
        current_participants: 0,
      })
      .select()
      .single();

    if (error) throw error;
    return { data: tournament, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

/**
 * تحديث بطولة
 */
export const updateTournament = async (
  id: string,
  updates: Partial<Tournament>
): Promise<{ data: Tournament | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('tournaments')
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
 * تسجيل لاعب في بطولة
 */
export const registerForTournament = async (
  tournamentId: string,
  playerId: string
): Promise<{ success: boolean; error: string | null }> => {
  try {
    // التحقق من وجود مقاعد
    const { data: tournament, error: fetchError } = await supabase
      .from('tournaments')
      .select('current_participants, max_participants')
      .eq('id', tournamentId)
      .single();

    if (fetchError) throw fetchError;

    if (
      tournament.max_participants &&
      tournament.current_participants >= tournament.max_participants
    ) {
      throw new Error('البطولة ممتلئة');
    }

    // تحديث عدد المشاركين
    const { error } = await supabase
      .from('tournaments')
      .update({
        current_participants: tournament.current_participants + 1,
      })
      .eq('id', tournamentId);

    if (error) throw error;
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

/**
 * جلب البطولات القادمة
 */
export const getUpcomingTournaments = async (): Promise<{
  data: Tournament[] | null;
  error: string | null;
}> => {
  try {
    const { data, error } = await supabase
      .from('tournaments')
      .select('*')
      .eq('status', 'upcoming')
      .gte('start_date', new Date().toISOString().split('T')[0])
      .order('start_date', { ascending: true })
      .limit(10);

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

/**
 * إحصائيات البطولات
 */
export const getTournamentStats = async (): Promise<{
  total: number;
  upcoming: number;
  ongoing: number;
  completed: number;
  error: string | null;
}> => {
  try {
    const { data, error } = await supabase.from('tournaments').select('status');

    if (error) throw error;

    const stats = {
      total: data.length,
      upcoming: data.filter(t => t.status === 'upcoming').length,
      ongoing: data.filter(t => t.status === 'ongoing').length,
      completed: data.filter(t => t.status === 'completed').length,
      error: null,
    };

    return stats;
  } catch (error: any) {
    return {
      total: 0,
      upcoming: 0,
      ongoing: 0,
      completed: 0,
      error: error.message,
    };
  }
};
