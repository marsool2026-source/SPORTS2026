import { supabase } from '../lib/supabase';

// ============================================
// 🔔 خدمة الإشعارات (Notifications Service)
// ============================================

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'urgent' | 'normal' | 'promo' | 'system';
  is_read: boolean;
  action_url?: string;
  created_at: string;
}

export interface CreateNotificationData {
  userId: string;
  title: string;
  message: string;
  type: 'urgent' | 'normal' | 'promo' | 'system';
  actionUrl?: string;
}

/**
 * جلب إشعارات المستخدم
 */
export const getUserNotifications = async (
  userId: string,
  limit: number = 50
): Promise<{ data: Notification[] | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

/**
 * جلب الإشعارات غير المقروءة
 */
export const getUnreadNotifications = async (
  userId: string
): Promise<{ data: Notification[] | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .eq('is_read', false)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

/**
 * إنشاء إشعار جديد
 */
export const createNotification = async (
  data: CreateNotificationData
): Promise<{ data: Notification | null; error: string | null }> => {
  try {
    const { data: notification, error } = await supabase
      .from('notifications')
      .insert({
        user_id: data.userId,
        title: data.title,
        message: data.message,
        type: data.type,
        action_url: data.actionUrl,
        is_read: false,
      })
      .select()
      .single();

    if (error) throw error;
    return { data: notification, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

/**
 * إنشاء إشعارات متعددة (للمجموعات)
 */
export const createBulkNotifications = async (
  userIds: string[],
  data: Omit<CreateNotificationData, 'userId'>
): Promise<{ success: boolean; error: string | null }> => {
  try {
    const notifications = userIds.map(userId => ({
      user_id: userId,
      title: data.title,
      message: data.message,
      type: data.type,
      action_url: data.actionUrl,
      is_read: false,
    }));

    const { error } = await supabase.from('notifications').insert(notifications);

    if (error) throw error;
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

/**
 * تحديد إشعار كمقروء
 */
export const markAsRead = async (
  notificationId: string
): Promise<{ success: boolean; error: string | null }> => {
  try {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId);

    if (error) throw error;
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

/**
 * تحديد جميع الإشعارات كمقروءة
 */
export const markAllAsRead = async (
  userId: string
): Promise<{ success: boolean; error: string | null }> => {
  try {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', userId)
      .eq('is_read', false);

    if (error) throw error;
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

/**
 * حذف إشعار
 */
export const deleteNotification = async (
  notificationId: string
): Promise<{ success: boolean; error: string | null }> => {
  try {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', notificationId);

    if (error) throw error;
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

/**
 * إحصائيات الإشعارات
 */
export const getNotificationStats = async (
  userId: string
): Promise<{
  total: number;
  unread: number;
  urgent: number;
  error: string | null;
}> => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .select('is_read, type')
      .eq('user_id', userId);

    if (error) throw error;

    const stats = {
      total: data.length,
      unread: data.filter(n => !n.is_read).length,
      urgent: data.filter(n => n.type === 'urgent' && !n.is_read).length,
      error: null,
    };

    return stats;
  } catch (error: any) {
    return {
      total: 0,
      unread: 0,
      urgent: 0,
      error: error.message,
    };
  }
};

/**
 * إرسال إشعار عند تسجيل حضور
 */
export const sendAttendanceNotification = async (
  playerId: string,
  playerName: string
): Promise<void> => {
  try {
    // جلب user_id من player
    const { data: player } = await supabase
      .from('players')
      .select('user_id')
      .eq('id', playerId)
      .single();

    if (player) {
      await createNotification({
        userId: player.user_id,
        title: 'تم تسجيل حضورك ✓',
        message: `تم تسجيل حضورك بنجاح يا ${playerName}`,
        type: 'system',
      });
    }
  } catch (error) {
    console.error('Error sending attendance notification:', error);
  }
};

/**
 * إرسال إشعار عند اعتماد دفع
 */
export const sendPaymentApprovedNotification = async (
  playerId: string,
  amount: number
): Promise<void> => {
  try {
    const { data: player } = await supabase
      .from('players')
      .select('user_id')
      .eq('id', playerId)
      .single();

    if (player) {
      await createNotification({
        userId: player.user_id,
        title: 'تم اعتماد الدفع ✓',
        message: `تم اعتماد دفعتك بقيمة ${amount} ج.م بنجاح`,
        type: 'system',
      });
    }
  } catch (error) {
    console.error('Error sending payment notification:', error);
  }
};

/**
 * إرسال إشعار تذكير بالتدريب
 */
export const sendTrainingReminder = async (
  userIds: string[],
  trainingName: string,
  trainingTime: string
): Promise<void> => {
  try {
    await createBulkNotifications(userIds, {
      title: 'تذكير بالتدريب ⏰',
      message: `لا تنسَ تدريب "${trainingName}" اليوم الساعة ${trainingTime}`,
      type: 'normal',
    });
  } catch (error) {
    console.error('Error sending training reminder:', error);
  }
};
