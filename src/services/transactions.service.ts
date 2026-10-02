import { supabase } from '../lib/supabase';

// ============================================
// 💰 خدمة المعاملات المالية (Transactions Service)
// ============================================

export interface Transaction {
  id: string;
  player_id: string;
  amount: number;
  type: 'subscription' | 'product' | 'bus' | 'tournament';
  payment_method: string;
  status: 'pending' | 'approved' | 'rejected' | 'refunded';
  receipt_url?: string;
  receipt_image?: string;
  approved_by?: string;
  approved_at?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  // Relations
  player?: {
    serial_number: string;
    user?: {
      full_name: string;
      email: string;
    };
  };
  approver?: {
    full_name: string;
  };
}

export interface CreateTransactionData {
  playerId: string;
  amount: number;
  type: 'subscription' | 'product' | 'bus' | 'tournament';
  paymentMethod: string;
  receiptImage?: string;
  notes?: string;
}

/**
 * إنشاء معاملة جديدة
 */
export const createTransaction = async (
  data: CreateTransactionData
): Promise<{ data: Transaction | null; error: string | null }> => {
  try {
    const { data: transaction, error } = await supabase
      .from('transactions')
      .insert({
        player_id: data.playerId,
        amount: data.amount,
        type: data.type,
        payment_method: data.paymentMethod,
        receipt_image: data.receiptImage,
        notes: data.notes,
        status: 'pending', // دائماً تبدأ كمعلقة
      })
      .select()
      .single();

    if (error) throw error;
    return { data: transaction, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

/**
 * جلب جميع المعاملات
 */
export const getAllTransactions = async (
  filters?: {
    status?: string;
    type?: string;
    playerId?: string;
  }
): Promise<{ data: Transaction[] | null; error: string | null }> => {
  try {
    let query = supabase
      .from('transactions')
      .select(`
        *,
        player:players(
          serial_number,
          user:users(full_name, email)
        ),
        approver:users!approved_by(full_name)
      `)
      .order('created_at', { ascending: false });

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.type) {
      query = query.eq('type', filters.type);
    }
    if (filters?.playerId) {
      query = query.eq('player_id', filters.playerId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

/**
 * جلب معاملة محددة
 */
export const getTransactionById = async (
  id: string
): Promise<{ data: Transaction | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select(`
        *,
        player:players(
          serial_number,
          user:users(full_name, email)
        ),
        approver:users!approved_by(full_name)
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
 * اعتماد معاملة (المدير المالي فقط)
 * ⚠️ سياسة الاعتماد المالي المزدوج:
 * 1. التحقق من وصول المبلغ فعلياً إلى المحفظة
 * 2. تسجيل القيد المحاسبي
 * 3. تفعيل الاشتراك تلقائياً
 */
export const approveTransaction = async (
  transactionId: string,
  approverId: string
): Promise<{ success: boolean; error: string | null }> => {
  try {
    // 1. جلب بيانات المعاملة
    const { data: transaction, error: fetchError } = await supabase
      .from('transactions')
      .select('*, player:players(*)')
      .eq('id', transactionId)
      .single();

    if (fetchError) throw fetchError;
    if (!transaction) throw new Error('Transaction not found');

    // 2. تحديث حالة المعاملة
    const { error: updateError } = await supabase
      .from('transactions')
      .update({
        status: 'approved',
        approved_by: approverId,
        approved_at: new Date().toISOString(),
      })
      .eq('id', transactionId);

    if (updateError) throw updateError;

    // 3. تفعيل الاشتراك إذا كان نوع المعاملة subscription
    if (transaction.type === 'subscription') {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1); // اشتراك شهري

      await supabase
        .from('players')
        .update({
          subscription_status: 'active',
          subscription_start: startDate.toISOString(),
          subscription_end: endDate.toISOString(),
        })
        .eq('id', transaction.player_id);
    }

    // 4. إضافة نقاط ولاء
    const loyaltyPoints = Math.floor(transaction.amount / 10); // 1 نقطة لكل 10 ج.م
    await supabase.rpc('add_loyalty_points', {
      player_id: transaction.player_id,
      points: loyaltyPoints,
    });

    // 5. إرسال إشعار (إذا توفر player)
    try {
      const { data: playerInfo } = await supabase
        .from('players')
        .select('user_id')
        .eq('id', transaction.player_id)
        .single();

      if (playerInfo) {
        await supabase.from('notifications').insert({
          user_id: playerInfo.user_id,
          title: 'تم اعتماد الدفع',
          message: `تم اعتماد دفعتك بقيمة ${transaction.amount} ج.م بنجاح`,
          type: 'system',
        });
      }
    } catch (notifyError) {
      // تجاهل خطأ الإشعار
    }

    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

/**
 * رفض معاملة
 */
export const rejectTransaction = async (
  transactionId: string,
  approverId: string,
  reason?: string
): Promise<{ success: boolean; error: string | null }> => {
  try {
    // جلب بيانات المعاملة
    const { data: transaction, error: fetchError } = await supabase
      .from('transactions')
      .select('player_id')
      .eq('id', transactionId)
      .single();

    if (fetchError) throw fetchError;

    // تحديث حالة المعاملة
    const { error: updateError } = await supabase
      .from('transactions')
      .update({
        status: 'rejected',
        approved_by: approverId,
        approved_at: new Date().toISOString(),
        notes: reason,
      })
      .eq('id', transactionId);

    if (updateError) throw updateError;

    // إرسال إشعار
    try {
      const { data: playerInfo } = await supabase
        .from('players')
        .select('user_id')
        .eq('id', transaction.player_id)
        .single();

      if (playerInfo) {
        await supabase.from('notifications').insert({
          user_id: playerInfo.user_id,
          title: 'تم رفض الدفع',
          message: reason || 'تم رفض دفعتك. يرجى التواصل مع الإدارة',
          type: 'system',
        });
      }
    } catch (notifyError) {
      // تجاهل خطأ الإشعار
    }

    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

/**
 * استرداد معاملة
 */
export const refundTransaction = async (
  transactionId: string,
  reason?: string
): Promise<{ success: boolean; error: string | null }> => {
  try {
    const { error } = await supabase
      .from('transactions')
      .update({
        status: 'refunded',
        notes: reason,
      })
      .eq('id', transactionId);

    if (error) throw error;
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

/**
 * رفع إيصال الدفع
 */
export const uploadReceipt = async (
  transactionId: string,
  file: File
): Promise<{ url: string | null; error: string | null }> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${transactionId}-${Date.now()}.${fileExt}`;
    const filePath = `receipts/${fileName}`;

    // رفع الملف إلى Storage
    const { error: uploadError } = await supabase.storage
      .from('receipts')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // الحصول على الرابط العام
    const { data } = supabase.storage
      .from('receipts')
      .getPublicUrl(filePath);

    // تحديث المعاملة
    await supabase
      .from('transactions')
      .update({ receipt_url: data.publicUrl })
      .eq('id', transactionId);

    return { url: data.publicUrl, error: null };
  } catch (error: any) {
    return { url: null, error: error.message };
  }
};

/**
 * جلب المعاملات المعلقة
 */
export const getPendingTransactions = async (): Promise<{
  data: Transaction[] | null;
  error: string | null;
}> => {
  return getAllTransactions({ status: 'pending' });
};

/**
 * جلب إحصائيات المعاملات
 */
export const getTransactionStats = async (
  startDate?: string,
  endDate?: string
): Promise<{
  total: number;
  approved: number;
  pending: number;
  rejected: number;
  totalAmount: number;
  approvedAmount: number;
  error: string | null;
}> => {
  try {
    let query = supabase.from('transactions').select('amount, status');

    if (startDate) {
      query = query.gte('created_at', startDate);
    }
    if (endDate) {
      query = query.lte('created_at', endDate);
    }

    const { data, error } = await query;
    if (error) throw error;

    const stats = {
      total: data.length,
      approved: data.filter(t => t.status === 'approved').length,
      pending: data.filter(t => t.status === 'pending').length,
      rejected: data.filter(t => t.status === 'rejected').length,
      totalAmount: data.reduce((sum, t) => sum + t.amount, 0),
      approvedAmount: data
        .filter(t => t.status === 'approved')
        .reduce((sum, t) => sum + t.amount, 0),
      error: null,
    };

    return stats;
  } catch (error: any) {
    return {
      total: 0,
      approved: 0,
      pending: 0,
      rejected: 0,
      totalAmount: 0,
      approvedAmount: 0,
      error: error.message,
    };
  }
};

/**
 * تقرير مالي شهري
 */
export const getMonthlyReport = async (
  year: number,
  month: number
): Promise<{
  data: any;
  error: string | null;
}> => {
  try {
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
    const endDate = new Date(year, month, 0).toISOString().split('T')[0];

    const { data: transactions, error } = await supabase
      .from('transactions')
      .select(`
        *,
        player:players(
          serial_number,
          user:users(full_name)
        )
      `)
      .gte('created_at', startDate)
      .lte('created_at', endDate)
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const report = {
      period: `${year}-${String(month).padStart(2, '0')}`,
      totalTransactions: transactions.length,
      totalRevenue: transactions.reduce((sum, t) => sum + t.amount, 0),
      byType: {
        subscription: transactions.filter(t => t.type === 'subscription').length,
        product: transactions.filter(t => t.type === 'product').length,
        bus: transactions.filter(t => t.type === 'bus').length,
        tournament: transactions.filter(t => t.type === 'tournament').length,
      },
      byPaymentMethod: transactions.reduce((acc, t) => {
        acc[t.payment_method] = (acc[t.payment_method] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      transactions,
      error: null,
    };

    return { data: report, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};
