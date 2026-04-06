

# خطة التنفيذ — Hero Slider + Dashboard إدارة المحتوى

---

## المرحلة 1: Hero Section مع Slider صور

**الهدف:** تحويل الـ Hero من خلفية ثابتة إلى سلايدر صور يعرض قطاعات الشركة (طيران، بترول، اتصالات، تعدين) مع طبقة blur/overlay فوق الصور.

**التنفيذ:**
- استخدام صور من Unsplash (مجانية) لكل قطاع كخلفيات
- إضافة auto-play slider يتبدل كل 5 ثوانٍ مع transition ناعم (fade)
- طبقة `bg-black/60 backdrop-blur-sm` فوق الصور لإظهار النصوص بوضوح
- مؤشرات (dots) صغيرة أسفل الـ Hero لإظهار الشريحة الحالية
- حفظ بيانات السلايدر (صور + عناوين) في ملف بيانات مشترك تقدر الداشبورد تعدل عليه

**الملفات:** `src/data/siteContent.ts` (جديد), `src/components/HeroSection.tsx` (تعديل)

---

## المرحلة 2: نظام بيانات مركزي للمحتوى

**الهدف:** إنشاء ملف بيانات مركزي يتحكم في كل محتوى الموقع (يُعدَّل من الداشبورد).

**البيانات تشمل:**
- **Site Config:** اسم اللوجو (نص أو صورة URL)، أيقونة التبويب (favicon)
- **Hero Slides:** صورة + عنوان لكل شريحة
- **Articles:** عنوان، excerpt، محتوى كامل (rich text بسيط)، صورة بانر، تصنيف القطاع
- **About Page:** نص المقدمة، المهمة، القطاعات، القيم
- **Contact Page:** بيانات التواصل (إيميل، عنوان، ساعات العمل)

**الملفات:** `src/data/siteContent.ts` (جديد), `src/contexts/SiteContentContext.tsx` (جديد)

---

## المرحلة 3: Dashboard — الهيكل الأساسي

**الهدف:** بناء صفحة داشبورد على route `/dashboard` بدون تسجيل دخول (حسب طلبك).

**التصميم:**
- Sidebar يسار فيه أقسام: General، Hero Slides، Articles، About، Contact
- المحتوى يمين حسب القسم المختار
- تصميم dark متوافق مع باقي الموقع
- الداشبورد تستخدم `localStorage` لحفظ التعديلات (بدون backend)

**الملفات:** `src/pages/Dashboard.tsx`, `src/components/dashboard/DashboardSidebar.tsx`, `src/App.tsx` (إضافة route)

---

## المرحلة 4: Dashboard — قسم General (لوجو + Favicon)

**الميزات:**
- اختيار نوع اللوجو: نص أو صورة (رفع صورة)
- تعديل نص اللوجو
- رفع أيقونة التبويب (favicon)
- معاينة مباشرة للتغييرات

**الملفات:** `src/components/dashboard/GeneralSettings.tsx`

---

## المرحلة 5: Dashboard — إدارة Hero Slides

**الميزات:**
- عرض الشرائح الحالية مع معاينة مصغرة
- إضافة/حذف/ترتيب شرائح
- لكل شريحة: رفع صورة + عنوان فرعي اختياري

**الملفات:** `src/components/dashboard/HeroSlidesManager.tsx`

---

## المرحلة 6: Dashboard — إدارة المقالات (محرر Rich Text)

**الميزات:**
- قائمة المقالات الحالية مع إمكانية التعديل/الحذف
- إضافة مقال جديد:
  - عنوان، excerpt، تصنيف (طيران/بترول/تعدين/اتصالات)
  - صورة بانر للمقال
  - **محرر محتوى** يدعم: H1, H2, H3، فقرات، bold/italic، إدراج صور في المحتوى
  - سيتم استخدام مكتبة `tiptap` (محرر rich text خفيف لـ React)
- معاينة المقال قبل الحفظ

**الملفات:** `src/components/dashboard/ArticlesManager.tsx`, `src/components/dashboard/ArticleEditor.tsx`

---

## المرحلة 7: Dashboard — تعديل About و Contact

**About:**
- تعديل عنوان الصفحة والوصف
- تعديل نص المهمة
- إضافة/تعديل القطاعات
- تعديل القيم

**Contact:**
- تعديل بيانات التواصل (إيميل، عنوان، ساعات العمل)
- تعديل نص الترحيب

**الملفات:** `src/components/dashboard/AboutEditor.tsx`, `src/components/dashboard/ContactEditor.tsx`

---

## المرحلة 8: ربط الداشبورد بالموقع

**الهدف:** جعل كل صفحات الموقع تقرأ من البيانات المحفوظة في localStorage (عبر Context).

- الـ Navbar يعرض اللوجو حسب الإعداد (نص/صورة)
- الـ Hero يعرض السلايدر من البيانات المحفوظة
- المقالات تُقرأ من البيانات المعدلة
- About و Contact يعرضون المحتوى المحدث
- تحديث الـ favicon ديناميكياً

---

## ملاحظات تقنية

- **التخزين:** `localStorage` — بدون backend أو تسجيل دخول
- **محرر النصوص:** مكتبة `tiptap` (خفيفة، تدعم headings + صور + formatting)
- **الصور:** تُحفظ كـ base64 في localStorage (مناسب للاستخدام البسيط)
- **لا يظهر رابط الداشبورد في الـ Navbar** — الوصول فقط عبر URL مباشر `/dashboard`

---

## ترتيب التنفيذ
```text
المرحلة 1 → Hero Slider
المرحلة 2 → نظام البيانات المركزي
المرحلة 3 → هيكل الداشبورد
المرحلة 4 → General Settings
المرحلة 5 → Hero Slides Manager
المرحلة 6 → Articles Manager + Rich Editor
المرحلة 7 → About + Contact Editors
المرحلة 8 → ربط كل شيء ببعض
```

بعد موافقتك أبدأ بالمرحلة الأولى (Hero Slider).

