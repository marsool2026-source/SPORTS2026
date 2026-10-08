-- ============================================
-- 🏗️ Sports Academy Database Schema
-- ============================================
-- هذا الملف يحتوي على جميع الجداول والعلاقات
-- قم بتشغيله في Supabase SQL Editor

-- ============================================
-- 1. جدول المستخدمين (Users)
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  avatar_url TEXT,
  role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'coach', 'player', 'parent', 'financial')),
  is_active BOOLEAN DEFAULT true,
  email_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2. جدول اللاعبين (Players)
-- ============================================
CREATE TABLE IF NOT EXISTS players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  serial_number VARCHAR(50) UNIQUE NOT NULL,
  birth_date DATE NOT NULL,
  age_group VARCHAR(20) NOT NULL,
  sport VARCHAR(100) NOT NULL,
  position VARCHAR(50),
  weight DECIMAL(5,2),
  height DECIMAL(5,2),
  qr_code TEXT UNIQUE NOT NULL,
  medical_conditions TEXT,
  emergency_contact JSONB,
  subscription_status VARCHAR(20) DEFAULT 'inactive' CHECK (subscription_status IN ('active', 'pending', 'inactive', 'expired')),
  subscription_plan VARCHAR(50),
  subscription_start DATE,
  subscription_end DATE,
  loyalty_points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 3. جدول المدربين (Coaches)
-- ============================================
CREATE TABLE IF NOT EXISTS coaches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  specialty VARCHAR(100) NOT NULL,
  experience_years INTEGER NOT NULL,
  certifications JSONB DEFAULT '[]',
  rating DECIMAL(2,1) DEFAULT 0.0,
  players_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 4. جدول المجموعات التدريبية (Training Groups)
-- ============================================
CREATE TABLE IF NOT EXISTS training_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  age_group VARCHAR(20) NOT NULL,
  coach_id UUID REFERENCES coaches(id) ON DELETE SET NULL,
  max_capacity INTEGER NOT NULL DEFAULT 25,
  current_count INTEGER DEFAULT 0,
  schedule JSONB,
  location VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 5. جدول الحضور (Attendance)
-- ============================================
CREATE TABLE IF NOT EXISTS attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID REFERENCES players(id) ON DELETE CASCADE,
  group_id UUID REFERENCES training_groups(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  check_in_time TIMESTAMP WITH TIME ZONE,
  check_out_time TIMESTAMP WITH TIME ZONE,
  status VARCHAR(20) NOT NULL CHECK (status IN ('present', 'absent', 'late')),
  notes TEXT,
  scanned_by UUID REFERENCES users(id),
  location JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 6. جدول المعاملات المالية (Transactions)
-- ============================================
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID REFERENCES players(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('subscription', 'product', 'bus', 'tournament')),
  payment_method VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'refunded')),
  receipt_url TEXT,
  receipt_image TEXT,
  approved_by UUID REFERENCES users(id),
  approved_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 7. جدول البطولات (Tournaments)
-- ============================================
CREATE TABLE IF NOT EXISTS tournaments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  location VARCHAR(255),
  category VARCHAR(50),
  max_participants INTEGER,
  current_participants INTEGER DEFAULT 0,
  prize TEXT,
  status VARCHAR(20) DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 8. جدول الأداء (Performance)
-- ============================================
CREATE TABLE IF NOT EXISTS performance_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID REFERENCES players(id) ON DELETE CASCADE,
  metric_type VARCHAR(50) NOT NULL,
  metric_value DECIMAL(10,2) NOT NULL,
  unit VARCHAR(20),
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  recorded_by UUID REFERENCES users(id),
  notes TEXT
);

-- ============================================
-- 9. جدول الإنجازات (Achievements)
-- ============================================
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID REFERENCES players(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  achievement_date DATE NOT NULL,
  category VARCHAR(50),
  points INTEGER DEFAULT 0,
  badge_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 10. جدول الرسائل (Messages)
-- ============================================
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES users(id) ON DELETE CASCADE,
  group_id UUID REFERENCES training_groups(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  message_type VARCHAR(20) DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'file', 'audio', 'video')),
  file_url TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 11. جدول الإشعارات (Notifications)
-- ============================================
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('urgent', 'normal', 'promo', 'system')),
  is_read BOOLEAN DEFAULT false,
  action_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 12. جدول الكوبونات (Coupons)
-- ============================================
CREATE TABLE IF NOT EXISTS coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL,
  discount DECIMAL(10,2) NOT NULL,
  discount_type VARCHAR(20) NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  min_purchase DECIMAL(10,2) DEFAULT 0,
  max_uses INTEGER,
  used_count INTEGER DEFAULT 0,
  valid_from DATE NOT NULL,
  valid_until DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'expired', 'inactive')),
  target_audience VARCHAR(50) DEFAULT 'all',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 13. جدول الإحالات (Referrals)
-- ============================================
CREATE TABLE IF NOT EXISTS referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID REFERENCES users(id) ON DELETE CASCADE,
  referred_id UUID REFERENCES users(id) ON DELETE CASCADE,
  referral_code VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'expired')),
  reward_amount DECIMAL(10,2) DEFAULT 100,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 14. جدول البث المباشر (Live Streams)
-- ============================================
CREATE TABLE IF NOT EXISTS live_streams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  streamer_id UUID REFERENCES users(id) ON DELETE CASCADE,
  group_id UUID REFERENCES training_groups(id) ON DELETE SET NULL,
  status VARCHAR(20) DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'live', 'ended')),
  start_time TIMESTAMP WITH TIME ZONE,
  end_time TIMESTAMP WITH TIME ZONE,
  viewers_count INTEGER DEFAULT 0,
  recording_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 15. جدول المعدات (Equipment)
-- ============================================
CREATE TABLE IF NOT EXISTS equipment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  total_quantity INTEGER NOT NULL DEFAULT 0,
  available_quantity INTEGER NOT NULL DEFAULT 0,
  condition VARCHAR(20) DEFAULT 'excellent' CHECK (condition IN ('excellent', 'good', 'fair', 'poor')),
  last_maintenance DATE,
  next_maintenance DATE,
  purchase_date DATE,
  purchase_price DECIMAL(10,2),
  location VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 16. جدول الحجوزات (Bookings)
-- ============================================
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  facility_type VARCHAR(50) NOT NULL,
  facility_id UUID,
  booking_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status VARCHAR(20) DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  amount DECIMAL(10,2),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 17. جدول التقييمات (Reviews)
-- ============================================
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  target_type VARCHAR(50) NOT NULL,
  target_id UUID NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 18. جدول الشراكات (Partnerships)
-- ============================================
CREATE TABLE IF NOT EXISTS partnerships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_name VARCHAR(255) NOT NULL,
  partner_category VARCHAR(100),
  contact_person VARCHAR(255),
  contact_email VARCHAR(255),
  contact_phone VARCHAR(20),
  partnership_type VARCHAR(50),
  start_date DATE,
  end_date DATE,
  revenue_generated DECIMAL(10,2) DEFAULT 0,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'pending', 'expired', 'terminated')),
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 19. جدول الفروع (Branches)
-- ============================================
CREATE TABLE IF NOT EXISTS branches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  address TEXT,
  city VARCHAR(100),
  country VARCHAR(100),
  phone VARCHAR(20),
  email VARCHAR(255),
  manager_id UUID REFERENCES users(id),
  players_count INTEGER DEFAULT 0,
  coaches_count INTEGER DEFAULT 0,
  monthly_revenue DECIMAL(10,2) DEFAULT 0,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'maintenance')),
  location JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 20. جدول الإعدادات (Settings)
-- ============================================
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  setting_key VARCHAR(100) NOT NULL,
  setting_value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, setting_key)
);

-- ============================================
-- إنشاء Indexes للأداء
-- ============================================
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_players_user_id ON players(user_id);
CREATE INDEX IF NOT EXISTS idx_players_serial ON players(serial_number);
CREATE INDEX IF NOT EXISTS idx_players_subscription ON players(subscription_status);
CREATE INDEX IF NOT EXISTS idx_attendance_player ON attendance(player_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance(date);
CREATE INDEX IF NOT EXISTS idx_transactions_player ON transactions(player_id);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver ON messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(is_read);

-- ============================================
-- إنشاء Functions
-- ============================================

-- Function لتحديث updated_at تلقائياً
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger لتحديث updated_at في جدول users
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger لتحديث updated_at في جدول players
CREATE TRIGGER update_players_updated_at BEFORE UPDATE ON players
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger لتحديث updated_at في جدول coaches
CREATE TRIGGER update_coaches_updated_at BEFORE UPDATE ON coaches
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- إنشاء Policies للأمان (RLS)
-- ============================================

-- تفعيل Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE coaches ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Policy: المستخدمون يمكنهم رؤية بياناتهم فقط
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- Policy: المدراء يمكنهم رؤية جميع البيانات
CREATE POLICY "Admins can view all users" ON users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Policy: اللاعبون يمكنهم رؤية بياناتهم
CREATE POLICY "Players can view their own data" ON players
  FOR SELECT USING (user_id = auth.uid());

-- Policy: المدراء يمكنهم رؤية جميع اللاعبين
CREATE POLICY "Admins can view all players" ON players
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'coach')
    )
  );

-- ============================================
-- Insert Default Data
-- ============================================

-- إضافة مستخدم Admin افتراضي
INSERT INTO users (email, full_name, role, is_active, email_verified)
VALUES (
  'admin@sportsacademy.com',
  'System Administrator',
  'admin',
  true,
  true
) ON CONFLICT (email) DO NOTHING;

-- ============================================
-- Views للتقارير
-- ============================================

-- View لإحصائيات الحضور
CREATE OR REPLACE VIEW attendance_stats AS
SELECT 
  DATE(created_at) as date,
  COUNT(*) as total_attendance,
  COUNT(*) FILTER (WHERE status = 'present') as present_count,
  COUNT(*) FILTER (WHERE status = 'absent') as absent_count,
  COUNT(*) FILTER (WHERE status = 'late') as late_count
FROM attendance
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- View للإيرادات الشهرية
CREATE OR REPLACE VIEW monthly_revenue AS
SELECT 
  DATE_TRUNC('month', created_at) as month,
  SUM(amount) as total_revenue,
  COUNT(*) as transaction_count,
  COUNT(*) FILTER (WHERE status = 'approved') as approved_count
FROM transactions
WHERE status = 'approved'
GROUP BY DATE_TRUNC('month', created_at)
ORDER BY month DESC;

-- ============================================
-- End of Schema
-- ============================================
