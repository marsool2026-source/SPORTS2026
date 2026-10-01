# 🏆 أكاديمية الرياضات الاحترافية - Flutter

<div align="center">

![Flutter](https://img.shields.io/badge/Flutter-3.16-blue)
![Dart](https://img.shields.io/badge/Dart-3.2-blue)
![Platforms](https://img.shields.io/badge/Platforms-6-green)
![License](https://img.shields.io/badge/license-MIT-green)

**منصة مؤسسية متكاملة لإدارة الأكاديميات الرياضية**

**يعمل على: Android • iOS • Web • Windows • macOS • Linux**

</div>

---

## 📋 نظرة عامة

تطبيق Flutter متكامل لإدارة الأكاديميات الرياضية، يعمل على جميع المنصات بكود واحد!

### ✨ المميزات

- ✅ **6 منصات** من كود واحد
- ✅ **تصميم عصري** (Glassmorphism)
- ✅ **دعم كامل** للعربية (RTL)
- ✅ **مصادقة آمنة** (Firebase Auth)
- ✅ **قاعدة بيانات** سحابية (Firestore/Supabase)
- ✅ **إشعارات فورية** (Push Notifications)
- ✅ **QR Code** للحضور والكارنيهات
- ✅ **رسوم بيانية** تفاعلية
- ✅ **بث مباشر** للتدريبات
- ✅ **نظام مالي** متكامل

---

## 🚀 البدء السريع

### المتطلبات

- ✅ Flutter 3.16 أو أحدث
- ✅ Dart 3.2 أو أحدث
- ✅ Android Studio (لـ Android)
- ✅ Xcode (لـ iOS - Mac فقط)
- ✅ Chrome (لـ Web)

### التثبيت

```bash
# 1. استنساخ المشروع
git clone https://github.com/yourusername/sports-academy-flutter.git

# 2. الدخول للمجلد
cd sports-academy-flutter

# 3. تثبيت الحزم
flutter pub get

# 4. تشغيل المشروع
flutter run
```

### اختيار المنصة

```bash
# Web
flutter run -d chrome

# Android
flutter run -d android

# iOS (Mac فقط)
flutter run -d ios

# Windows
flutter run -d windows

# macOS
flutter run -d macos

# Linux
flutter run -d linux
```

---

## 📱 الشاشات

### 1. شاشة البداية (Splash Screen)
- شعار متحرك
- تحميل البيانات
- انتقال تلقائي

### 2. شاشة تسجيل الدخول
- بريد إلكتروني وكلمة مرور
- تسجيل دخول بـ Google
- إنشاء حساب جديد
- استعادة كلمة المرور

### 3. لوحة التحكم (Dashboard)
- إحصائيات شاملة
- رسوم بيانية
- إجراءات سريعة
- آخر التحديثات

### 4. إدارة اللاعبين
- قائمة اللاعبين
- كارنيهات رقمية
- QR Codes
- تتبع الأداء

### 5. فريق المدربين
- بطاقات المدربين
- الشهادات والخبرات
- المجموعات التدريبية

### 6. نظام الحضور
- مسح QR Code
- تسجيل فوري
- تقارير الحضور
- إحصائيات

### 7. مركز التواصل
- شات مباشر
- مكالمات صوتية
- مكالمات فيديو
- مشاركة ملفات

### 8. البطولات
- البطولات القادمة
- النتائج
- لوحة المتصدرين

### 9. النظام المالي
- المعاملات
- الاعتماد المالي
- التقارير
- الفواتير

---

## 🏗️ هيكل المشروع

```
lib/
├── main.dart                 # نقطة الدخول
│
├── models/                   # النماذج
│   ├── models.dart
│   ├── player.dart
│   ├── coach.dart
│   └── ...
│
├── screens/                  # الشاشات
│   ├── splash_screen.dart
│   ├── login_screen.dart
│   ├── dashboard_screen.dart
│   └── ...
│
├── widgets/                  # المكونات
│   ├── glass_card.dart
│   ├── custom_button.dart
│   └── ...
│
├── services/                 # الخدمات
│   ├── auth_service.dart
│   ├── api_service.dart
│   └── ...
│
├── providers/                # إدارة الحالة
│   ├── auth_provider.dart
│   ├── theme_provider.dart
│   └── ...
│
└── utils/                    # الأدوات
    ├── constants.dart
    ├── helpers.dart
    └── ...
```

---

## 🔧 التقنيات المستخدمة

### State Management
- **Provider** - لإدارة الحالة البسيطة
- **Riverpod** - للحالة المعقدة

### Navigation
- **GoRouter** - للتنقل المتقدم

### Backend
- **Firebase** - للمصادقة وقاعدة البيانات
- **Supabase** - بديل مفتوح المصدر

### UI Components
- **Material 3** - التصميم الحديث
- **Custom Widgets** - مكونات مخصصة

### Charts
- **fl_chart** - رسوم بيانية تفاعلية
- **syncfusion_flutter_charts** - رسوم متقدمة

### QR Code
- **qr_flutter** - توليد QR
- **qr_code_scanner** - مسح QR

### Notifications
- **firebase_messaging** - إشعارات Firebase
- **flutter_local_notifications** - إشعارات محلية

### PDF & Export
- **pdf** - إنشاء PDF
- **printing** - الطباعة

---

## 📊 البيانات التجريبية

التطبيق يأتي ببيانات تجريبية كاملة:

- **5 لاعبين** مع أداء وإنجازات
- **4 مدربين** مع شهادات
- **4 مجموعات** تدريبية
- **4 معاملات** مالية
- **3 بطولات**
- **4 أرقام قياسية**
- **3 كوبونات**
- **3 إشعارات**

---

## 🎨 التصميم

### الألوان
```dart
Primary: Color(0xFF3B82F6)    // أزرق
Secondary: Color(0xFF8B5CF6)  // بنفسجي
Accent: Color(0xFFF59E0B)     // برتقالي
Success: Color(0xFF10B981)    // أخضر
Danger: Color(0xFFEF4444)     // أحمر
```

### الخطوط
```dart
العربية: Cairo
الإنجليزية: Roboto
```

### التأثيرات
- **Glassmorphism** - تأثير زجاجي
- **Gradients** - تدرجات لونية
- **Shadows** - ظلال
- **Animations** - حركات سلسة

---

## 🔒 الأمان

### المصادقة
- ✅ Firebase Authentication
- ✅ Google Sign-In
- ✅ Apple Sign-In (iOS)
- ✅ Email/Password

### قاعدة البيانات
- ✅ Firestore Rules
- ✅ Supabase RLS
- ✅ تشفير البيانات

### الصلاحيات
- ✅ RBAC (Role-Based Access Control)
- ✅ 5 أدوار مختلفة
- ✅ حماية المسارات

---

## 🌐 الترجمة

التطبيق يدعم لغتين:

### العربية (ar)
```dart
'welcome': 'مرحباً بك',
'login': 'تسجيل الدخول',
'signup': 'إنشاء حساب',
```

### الإنجليزية (en)
```dart
'welcome': 'Welcome',
'login': 'Login',
'signup': 'Sign Up',
```

---

## 📦 البناء للإنتاج

### Web
```bash
flutter build web
# انشر مجلد build/web
```

### Android
```bash
# APK
flutter build apk --release

# AAB (لـ Google Play)
flutter build appbundle --release
```

### iOS
```bash
flutter build ios --release
# افتح في Xcode وارفع إلى App Store
```

### Windows
```bash
flutter build windows --release
```

### macOS
```bash
flutter build macos --release
```

### Linux
```bash
flutter build linux --release
```

---

## 🧪 الاختبارات

### تشغيل الاختبارات
```bash
flutter test
```

### اختبار Widget
```dart
testWidgets('PlayerCard displays player name', (WidgetTester tester) async {
  await tester.pumpWidget(
    MaterialApp(
      home: PlayerCard(player: mockPlayer),
    ),
  );
  
  expect(find.text('أحمد محمد علي'), findsOneWidget);
});
```

### اختبار Integration
```bash
flutter test integration_test/app_test.dart
```

---

## 🐛 حل المشاكل الشائعة

### ❌ "No connected devices"
```bash
# للويب:
flutter run -d chrome

# لـ Android:
# شغّل Android Emulator أو وصل جهاز

# لـ iOS (Mac فقط):
# شغّل iOS Simulator أو وصل جهاز
```

### ❌ "Build failed"
```bash
flutter clean
flutter pub get
flutter run
```

### ❌ "Hot reload not working"
```bash
# أعد تشغيل التطبيق
flutter run
```

---

## 📚 موارد مفيدة

### التوثيق الرسمي
- 🌐 [Flutter Docs](https://flutter.dev/docs)
- 🌐 [Dart Docs](https://dart.dev/guides)
- 🌐 [Material Design](https://material.io/design)

### دورات تعليمية
- 🎥 [Flutter Official Channel](https://www.youtube.com/c/flutterdev)
- 🎥 [The Net Ninja](https://www.youtube.com/playlist?list=PL4cUxeGkcC9jLYyp2Aoh6wcWlKQPXgPvK)

### مجتمعات
- 💬 [Flutter Community](https://flutter.dev/community)
- 💬 [Reddit r/FlutterDev](https://www.reddit.com/r/FlutterDev/)
- 💬 [Discord](https://discord.gg/flutter)

---

## 🤝 المساهمة

المساهمات مرحب بها! يرجى:

1. Fork المشروع
2. إنشاء فرع جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push للفرع (`git push origin feature/amazing-feature`)
5. فتح Pull Request

---

## 📄 الترخيص

MIT License - انظر ملف [LICENSE](LICENSE) للتفاصيل

---

## 📞 التواصل

- 🌐 الموقع: https://sportsacademy.com
- 📧 البريد: info@sportsacademy.com
- 📱 الهاتف: +20 100 123 4567

---

<div align="center">

**صُنع بـ ❤️ بواسطة فريق Sports Academy**

⭐ إذا أعجبك المشروع، لا تنسى إعطاء نجمة!

**6 منصات | كود واحد | أداء ممتاز** 🚀

</div>
