export interface Phase {
  id: number;
  title: string;
  subtitle: string;
  duration: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  color: string;
  icon: string;
  modules: Module[];
  deliverables: string[];
  techStack: string[];
}

export interface Module {
  name: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  estimatedDays: number;
}

export const roadmapData: Phase[] = [
  {
    id: 1,
    title: "المرحلة الأولى: البنية التحتية والأساسيات",
    subtitle: "تأسيس النظام وإعداد البيئة التطويرية",
    duration: "6-8 أسابيع",
    status: "completed",
    color: "from-emerald-500 to-teal-600",
    icon: "🏗️",
    modules: [
      {
        name: "إعداد بيئة التطوير",
        description: "إعداد React + Vite + TypeScript + Tailwind CSS مع هيكل المشروع",
        priority: "critical",
        estimatedDays: 3
      },
      {
        name: "شاشة تسجيل الدخول الاحترافية",
        description: "واجهة زجاجية مع حركات سلسة، دائرة أيقونات رياضية، دعم ثنائي اللغة، وتسجيل اجتماعي",
        priority: "critical",
        estimatedDays: 5
      },
      {
        name: "نظام المصادقة (Auth System)",
        description: "تسجيل الدخول/إنشاء حساب مع JWT وواجهات زجاجية متحركة",
        priority: "critical",
        estimatedDays: 7
      },
      {
        name: "نظام الصلاحيات RBAC",
        description: "فصل الأدوار: مدير، مدير مالي، مدرب، إداري، لاعب/ولي أمر",
        priority: "critical",
        estimatedDays: 5
      },
      {
        name: "قاعدة البيانات",
        description: "تصميم Schema شامل مع PostgreSQL/Supabase",
        priority: "critical",
        estimatedDays: 5
      },
      {
        name: "محرك الثيمات الديناميكي",
        description: "استخراج الألوان من الشعار وتطبيقها على الواجهات",
        priority: "high",
        estimatedDays: 4
      },
      {
        name: "نظام الإشعارات",
        description: "Push Notifications + In-App + SMS",
        priority: "high",
        estimatedDays: 5
      }
    ],
    deliverables: [
      "✅ بيئة تطوير متكاملة وجاهزة",
      "✅ نظام تسجيل دخول/إنشاء حساب بحركات سلسة",
      "✅ نظام صلاحيات متعدد الأدوار",
      "✅ قاعدة بيانات مصممة ومحسّنة",
      "✅ محرك ثيمات ذكي يستخرج الألوان تلقائياً",
      "✅ نظام إشعارات متعدد القنوات"
    ],
    techStack: ["React 18", "TypeScript", "Tailwind CSS", "Framer Motion", "Supabase", "Zustand"]
  },
  {
    id: 2,
    title: "المرحلة الثانية: إدارة اللاعبين والملفات",
    subtitle: "بناء نظام إدارة شامل للاعبين والتوثيق",
    duration: "5-7 أسابيع",
    status: "completed",
    color: "from-blue-500 to-indigo-600",
    icon: "👥",
    modules: [
      {
        name: "ملف اللاعب الشامل",
        description: "أرشفة بيانات اللاعبين مع الصور والتوثيق",
        priority: "critical",
        estimatedDays: 5
      },
      {
        name: "الترقيم التسلسلي التلقائي",
        description: "توليد أكواد فريدة مرتبطة بسنة الميلاد",
        priority: "high",
        estimatedDays: 3
      },
      {
        name: "الكارنيه الرقمي السنوي + QR تلقائي",
        description: "عند تسجيل أي مستخدم (لاعب/مدرب/مدير) يُنشأ QR تلقائياً ويُدمج في تصميم الكارنيه",
        priority: "critical",
        estimatedDays: 8
      },
      {
        name: "نظام التصنيف السني",
        description: "تصنيف تلقائي حسب المواليد (براعم، ناشئين، إلخ)",
        priority: "high",
        estimatedDays: 4
      },
      {
        name: "إدارة المجموعات التدريبية",
        description: "تجميع مرن للفئات حسب المستوى أو السعة",
        priority: "high",
        estimatedDays: 5
      },
      {
        name: "نظام QR Code",
        description: "أكواد QR للحضور والتحقق من الهوية",
        priority: "medium",
        estimatedDays: 3
      }
    ],
    deliverables: [
      "✅ نظام ملفات شامل لكل لاعب",
      "✅ كارنيه رقمي احترافي بتجديد تلقائي",
      "✅ تصنيف سني ذكي وتلقائي",
      "✅ مجموعات تدريبية مرنة",
      "✅ نظام QR للحضور والتحقق"
    ],
    techStack: ["React Hook Form", "React Query", "QR Code Generator", "Canvas API", "PDF Generator"]
  },
  {
    id: 3,
    title: "المرحلة الثالثة: النظام المالي والمحاسبي",
    subtitle: "بناء منظومة مالية احترافية متكاملة",
    duration: "6-8 أسابيع",
    status: "in-progress",
    color: "from-amber-500 to-orange-600",
    icon: "💰",
    modules: [
      {
        name: "شجرة الحسابات",
        description: "نظام قيد مزدوج: أصول، حقوق ملكية، إيرادات، مصروفات",
        priority: "critical",
        estimatedDays: 10
      },
      {
        name: "المحافظ الإلكترونية",
        description: "دعم فودافون كاش وغيرها مع رفع الإيصالات",
        priority: "critical",
        estimatedDays: 7
      },
      {
        name: "الاعتماد المالي المزدوج",
        description: "مراجعة واعتماد المدير المالي قبل التفعيل",
        priority: "critical",
        estimatedDays: 5
      },
      {
        name: "إدارة الاشتراكات",
        description: "باقات اشتراك مرنة مع تجديد تلقائي",
        priority: "high",
        estimatedDays: 6
      },
      {
        name: "التقارير المالية",
        description: "قوائم دخل، ميزانية عمومية، تدفقات نقدية",
        priority: "high",
        estimatedDays: 8
      },
      {
        name: "حماية الصلاحيات المالية",
        description: "عزل تام بين العمليات المالية والتشغيلية",
        priority: "critical",
        estimatedDays: 4
      }
    ],
    deliverables: [
      "✅ شجرة حسابات احترافية بقيد مزدوج",
      "✅ نظام محافظ إلكترونية متكامل",
      "✅ اعتماد مالي مزدوج آمن",
      "✅ تقارير مالية شاملة",
      "✅ حماية صارمة للصلاحيات المالية"
    ],
    techStack: ["Double-Entry Accounting", "Chart.js", "Export to Excel/PDF", "Encryption", "Audit Trail"]
  },
  {
    id: 4,
    title: "المرحلة الرابعة: العمليات التشغيلية",
    subtitle: "إدارة الحضور والباصات والجداول",
    duration: "5-6 أسابيع",
    status: "upcoming",
    color: "from-purple-500 to-violet-600",
    icon: "⚽",
    modules: [
      {
        name: "نظام الحضور عبر QR Code",
        description: "مسح كود اللاعب من الكارنيه الرقمي → تسجيل فوري مع الوقت والتاريخ + وضع Offline",
        priority: "critical",
        estimatedDays: 8
      },
      {
        name: "توليد أكواد QR للاعبين",
        description: "كل لاعب يحصل على QR فريد مشفر مرتبط بالكارنيه الرقمي",
        priority: "critical",
        estimatedDays: 4
      },
      {
        name: "واجهة المدرب للمسح",
        description: "كاميرا مدمجة + تحقق بالموقع الجغرافي + دعم الماسحات الخارجية",
        priority: "critical",
        estimatedDays: 5
      },
      {
        name: "مركز التواصل التدريبي",
        description: "شات + مكالمات صوتية + فيديو كول + مشاركة ملفات بين المدرب والمجموعة",
        priority: "critical",
        estimatedDays: 10
      },
      {
        name: "إدارة خطوط الباصات",
        description: "تتبع مسارات النقل وحالة كل خط",
        priority: "high",
        estimatedDays: 7
      },
      {
        name: "جدولة التدريبات",
        description: "تقويم تفاعلي مع تنبيهات التعديل والإلغاء",
        priority: "high",
        estimatedDays: 5
      },
      {
        name: "إدارة البطولات",
        description: "تسجيل النتائج والأرقام القياسية الشخصية",
        priority: "medium",
        estimatedDays: 6
      },
      {
        name: "تتبع الأداء",
        description: "رسوم بيانية لتطور مستوى اللاعبين",
        priority: "medium",
        estimatedDays: 5
      },
      {
        name: "إدارة الملاعب والمرافق",
        description: "حجز وإدارة الموارد المتاحة",
        priority: "low",
        estimatedDays: 4
      }
    ],
    deliverables: [
      "✅ نظام مسح QR فوري للحضور والغياب",
      "✅ أكواد QR مشفرة فريدة لكل لاعب",
      "✅ واجهة مدرب بكاميرا مدمجة + GPS",
      "✅ إدارة خطوط باصات متكاملة",
      "✅ جدولة تدريبات تفاعلية",
      "✅ تقارير حضور تلقائية للإدارة"
    ],
    techStack: ["QR Scanner (html5-qrcode)", "Geolocation API", "IndexedDB (Offline)", "FullCalendar", "Mapbox", "WebSocket"]
  },
  {
    id: 5,
    title: "المرحلة الخامسة: لوحات التحكم والتقارير",
    subtitle: "واجهات مخصصة لكل دور مع تقارير تنفيذية",
    duration: "4-5 أسابيع",
    status: "upcoming",
    color: "from-cyan-500 to-blue-600",
    icon: "📊",
    modules: [
      {
        name: "لوحة اللاعب/ولي الأمر",
        description: "كارنيه، جدول تدريبات، حالة اشتراك، تنبيهات",
        priority: "critical",
        estimatedDays: 7
      },
      {
        name: "لوحة المدرب",
        description: "حضور، أرقام قياسية، تقييم أداء اللاعبين",
        priority: "critical",
        estimatedDays: 6
      },
      {
        name: "لوحة الإدارة العليا",
        description: "تقارير يومية تلقائية + تحكم بالإشعارات",
        priority: "high",
        estimatedDays: 8
      },
      {
        name: "لوحة المدير المالي",
        description: "تحويلات معلقة، اعتمادات، تقارير مالية",
        priority: "high",
        estimatedDays: 6
      },
      {
        name: "نظام التقارير الآلية",
        description: "توليد تقارير PDF/Excel وإرسالها تلقائياً",
        priority: "medium",
        estimatedDays: 5
      }
    ],
    deliverables: [
      "✅ لوحة تحكم مخصصة لكل دور",
      "✅ تقارير تنفيذية يومية تلقائية",
      "✅ رسوم بيانية تفاعلية",
      "✅ نظام تنبيهات ذكي",
      "✅ تصدير تقارير بصيغ متعددة"
    ],
    techStack: ["Recharts", "React Table", "PDF Generation", "Cron Jobs", "Email/SMS API"]
  },
  {
    id: 6,
    title: "المرحلة السادسة: التحسينات والتوسع",
    subtitle: "تحسين الأداء وإضافة ميزات متقدمة",
    duration: "4-6 أسابيع",
    status: "upcoming",
    color: "from-rose-500 to-pink-600",
    icon: "🚀",
    modules: [
      {
        name: "تطبيق الموبايل (PWA)",
        description: "تحويل التطبيق لـ Progressive Web App",
        priority: "high",
        estimatedDays: 8
      },
      {
        name: "نظام المنتجات والمبيعات",
        description: "إدارة منتجات مثل MEGA PROTEIN",
        priority: "medium",
        estimatedDays: 5
      },
      {
        name: "تحسين الأداء",
        description: "Lazy Loading، Caching، Code Splitting",
        priority: "high",
        estimatedDays: 5
      },
      {
        name: "الأمان المتقدم",
        description: "2FA، تشفير البيانات، Audit Logs",
        priority: "critical",
        estimatedDays: 6
      },
      {
        name: "نظام الدردشة الداخلية",
        description: "تواصل بين المدربين والإدارة وأولياء الأمور",
        priority: "low",
        estimatedDays: 7
      },
      {
        name: "API خارجي للتكامل",
        description: "ربط مع أنظمة خارجية (محاسبة، دفع)",
        priority: "medium",
        estimatedDays: 5
      }
    ],
    deliverables: [
      "✅ تطبيق PWA يعمل بدون إنترنت",
      "✅ نظام مبيعات منتجات متكامل",
      "✅ أداء محسّن وسرعة استجابة عالية",
      "✅ أمان متقدم مع 2FA",
      "✅ API مفتوح للتكاملات الخارجية"
    ],
    techStack: ["Service Workers", "IndexedDB", "WebRTC", "OAuth 2.0", "REST/GraphQL API"]
  }
];

export const systemOverview = {
  name: "أكاديمية الرياضات الاحترافية",
  nameEn: "Enterprise Sports Academy System",
  description: "منصة مؤسسية متكاملة لإدارة الأكاديميات الرياضية بمستوى احترافي",
  stats: [
    { label: "وحدات النظام", value: "60+", icon: "📦" },
    { label: "أدوار المستخدمين", value: "5", icon: "👤" },
    { label: "مراحل التطوير", value: "6", icon: "🎯" },
    { label: "المدة الإجمالية", value: "36-48 أسبوع", icon: "📅" }
  ],
  roles: [
    { name: "المدير العام", icon: "👑", permissions: "تحكم كامل في النظام" },
    { name: "المدير المالي", icon: "💼", permissions: "اعتماد المدفوعات والتقارير المالية" },
    { name: "المدير الفني/المدرب", icon: "🏅", permissions: "إدارة التدريبات والحضور والأداء" },
    { name: "الإداري التشغيلي", icon: "📋", permissions: "العمليات اليومية بدون صلاحيات مالية" },
    { name: "اللاعب / ولي الأمر", icon: "⚽", permissions: "عرض الكارنيه والجدول والدفع" }
  ]
};
