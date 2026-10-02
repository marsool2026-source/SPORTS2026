# 🏗️ Backend Setup Guide - Sports Academy

## 📋 نظرة عامة

تم بناء Backend كامل باستخدام **Supabase** كـ Backend-as-a-Service (BaaS) يوفر:
- ✅ قاعدة بيانات PostgreSQL
- ✅ مصادقة جاهزة (Auth)
- ✅ تخزين ملفات (Storage)
- ✅ APIs تلقائية
- ✅ Real-time subscriptions
- ✅ Row Level Security (RLS)

---

## 🚀 خطوات الإعداد

### الخطوة 1: إنشاء حساب Supabase

1. اذهب إلى [https://supabase.com](https://supabase.com)
2. اضغط **Start your project**
3. سجل الدخول بحساب GitHub
4. اضغط **New Project**
5. املأ البيانات:
   - **Name**: Sports Academy
   - **Database Password**: (احفظها في مكان آمن)
   - **Region**: اختر الأقرب لك
   - **Pricing Plan**: Free (للبداية)
6. اضغط **Create new project**
7. انتظر دقيقة حتى يتم إنشاء المشروع

---

### الخطوة 2: إعداد قاعدة البيانات

#### 2.1 تشغيل SQL Schema

1. في لوحة تحكم Supabase، اذهب إلى **SQL Editor**
2. اضغط **New query**
3. انسخ محتوى الملف `src/lib/supabase-schema.sql`
4. الصقه في المحرر
5. اضغط **Run** (أو Ctrl+Enter)
6. انتظر حتى ينتهي التنفيذ

#### 2.2 التحقق من الجداول

1. اذهب إلى **Table Editor**
2. يجب أن ترى الجداول التالية:
   - ✅ users
   - ✅ players
   - ✅ coaches
   - ✅ training_groups
   - ✅ attendance
   - ✅ transactions
   - ✅ tournaments
   - ✅ performance_metrics
   - ✅ achievements
   - ✅ messages
   - ✅ notifications
   - ✅ coupons
   - ✅ referrals
   - ✅ live_streams
   - ✅ equipment
   - ✅ bookings
   - ✅ reviews
   - ✅ partnerships
   - ✅ branches
   - ✅ settings

---

### الخطوة 3: إعداد المصادقة (Authentication)

1. اذهب إلى **Authentication > Providers**
2. فعّل **Email** provider
3. (اختياري) فعّل **Google** provider:
   - اذهب إلى [Google Cloud Console](https://console.cloud.google.com)
   - أنشئ مشروع جديد
   - فعّل Google+ API
   - أنشئ OAuth 2.0 credentials
   - أضف Callback URL: `https://your-project.supabase.co/auth/v1/callback`
   - انسخ Client ID و Client Secret
   - الصقهما في Supabase

---

### الخطوة 4: إعداد التخزين (Storage)

1. اذهب إلى **Storage**
2. اضغط **New bucket**
3. أنشئ الـ buckets التالية:
   - **avatars** (للصور الشخصية)
   - **receipts** (لإيصالات الدفع)
   - **documents** (للوثائق)
   - **videos** (للفيديوهات)

4. لكل bucket، اضبط الـ Policies:
   ```sql
   -- السماح بالقراءة للجميع
   CREATE POLICY "Public Access" ON storage.objects
   FOR SELECT USING (bucket_id = 'avatars');
   
   -- السماح للمستخدمين المصادقين بالرفع
   CREATE POLICY "Authenticated Upload" ON storage.objects
   FOR INSERT WITH CHECK (
     bucket_id = 'avatars' AND auth.role() = 'authenticated'
   );
   ```

---

### الخطوة 5: الحصول على مفاتيح API

1. اذهب إلى **Settings > API**
2. انسخ القيم التالية:
   - **Project URL**: `https://your-project.supabase.co`
   - **anon public key**: `eyJhbGc...`

---

### الخطوة 6: إعداد متغيرات البيئة

1. انسخ ملف `.env.example` إلى `.env`:
   ```bash
   cp .env.example .env
   ```

2. افتح ملف `.env` واملأ القيم:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGc...
   ```

3. احفظ الملف

---

### الخطوة 7: تشغيل التطبيق

```bash
# تثبيت الاعتمادات (إذا لم تكن مثبتة)
npm install

# تشغيل التطبيق
npm run dev
```

---

## 🧪 اختبار Backend

### اختبار 1: تسجيل مستخدم جديد

```javascript
import { supabase } from './lib/supabase';

const { data, error } = await supabase.auth.signUp({
  email: 'test@example.com',
  password: 'password123',
  options: {
    data: {
      full_name: 'Test User',
      role: 'player',
    },
  },
});

console.log(data, error);
```

### اختبار 2: تسجيل دخول

```javascript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'test@example.com',
  password: 'password123',
});

console.log(data, error);
```

### اختبار 3: إنشاء لاعب

```javascript
const { data, error } = await supabase.from('players').insert({
  user_id: 'user-uuid-here',
  serial_number: 'SA-2014-FT-0001',
  birth_date: '2014-05-15',
  age_group: 'ناشئين U10',
  sport: 'كرة قدم',
  qr_code: 'QR-SA-2014-FT-0001',
});

console.log(data, error);
```

---

## 🔒 الأمان

### Row Level Security (RLS)

تم تفعيل RLS على جميع الجداول الحساسة:

```sql
-- المستخدمون يمكنهم رؤية بياناتهم فقط
CREATE POLICY "Users can view their own data" ON users
FOR SELECT USING (auth.uid() = id);

-- المدراء يمكنهم رؤية جميع البيانات
CREATE POLICY "Admins can view all users" ON users
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  )
);
```

### التحقق من الصلاحيات

```typescript
// في Frontend
const { isAdmin, isCoach, isPlayer } = useAuth();

if (!isAdmin) {
  // عرض رسالة خطأ
  return <div>غير مصرح لك</div>;
}
```

---

## 📊 مراقبة الأداء

### Supabase Dashboard

1. اذهب إلى **Dashboard**
2. راقب:
   - عدد المستخدمين النشطين
   - استخدام قاعدة البيانات
   - استخدام التخزين
   - عدد الـ API calls

### Logs

1. اذهب إلى **Logs**
2. راقب:
   - API errors
   - Auth events
   - Database queries

---

## 🚀 النشر

### Frontend (Vercel/Netlify)

```bash
# بناء المشروع
npm run build

# النشر على Vercel
npx vercel --prod

# أو Netlify
npx netlify deploy --prod --dir=dist
```

### Backend (Supabase)

Supabase يستضيف Backend تلقائياً. لا حاجة لنشر منفصل.

---

## 🔧 استكشاف الأخطاء

### مشكلة: "Failed to fetch"

**الحل:**
- تأكد من صحة `VITE_SUPABASE_URL`
- تأكد من صحة `VITE_SUPABASE_ANON_KEY`
- تحقق من اتصال الإنترنت

### مشكلة: "Invalid API key"

**الحل:**
- اذهب إلى Supabase Dashboard > Settings > API
- انسخ anon key مرة أخرى
- الصقه في `.env`
- أعد تشغيل التطبيق

### مشكلة: "relation does not exist"

**الحل:**
- تأكد من تشغيل SQL Schema
- اذهب إلى Table Editor وتحقق من وجود الجداول

---

## 📚 موارد إضافية

### التوثيق الرسمي
- [Supabase Docs](https://supabase.com/docs)
- [Supabase JS Client](https://supabase.com/docs/reference/javascript)
- [Supabase Auth](https://supabase.com/docs/guides/auth)

### فيديوهات تعليمية
- [Supabase Crash Course](https://www.youtube.com/watch?v=WiwLpZiCwRg)
- [Build a Full Stack App](https://www.youtube.com/watch?v=yFDzJM3CqD8)

### مجتمع
- [Supabase Discord](https://discord.supabase.com)
- [GitHub Discussions](https://github.com/supabase/supabase/discussions)

---

## 💰 التكلفة

### الخطة المجانية (Free Tier)
- ✅ 500 MB قاعدة بيانات
- ✅ 1 GB تخزين ملفات
- ✅ 50,000 مستخدم نشط
- ✅ 500 MB bandwidth شهرياً
- ✅ كافٍ للبداية

### الخطة المدفوعة (Pro) - $25/شهر
- ✅ 8 GB قاعدة بيانات
- ✅ 100 GB تخزين ملفات
- ✅ مستخدمين غير محدودين
- ✅ 250 GB bandwidth شهرياً
- ✅ backups يومية

---

## 🎯 الخطوات التالية

1. ✅ إنشاء حساب Supabase
2. ✅ تشغيل SQL Schema
3. ✅ إعداد المصادقة
4. ✅ إعداد التخزين
5. ✅ الحصول على المفاتيح
6. ✅ إعداد `.env`
7. ✅ تشغيل التطبيق
8. ✅ اختبار الميزات
9. ✅ النشر على الإنتاج

---

<div align="center">

## 🎉 Backend جاهز!

**الآن لديك:**
- ✅ قاعدة بيانات حقيقية
- ✅ مصادقة كاملة
- ✅ APIs جاهزة
- ✅ تخزين ملفات
- ✅ أمان عالي

**ابدأ في اختبار التطبيق!** 🚀

</div>
