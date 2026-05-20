# AURA.KICKS - توثيق المشروع (عربي)

## نبذة

واجهة متجر أحذية حديثة مبنية بـ React و Vite مع رسوم متحركة، صفحات متجر/تفاصيل منتج/عربة/قائمة رغبات، وتكامل Firebase للمصادقة وقاعدة البيانات.

## الأدوات والتقنيات

- React 19
- Vite 8
- React Router DOM
- Firebase (Authentication + Firestore)
- GSAP (حركات وانتقالات)
- Lucide React (أيقونات)
- React Hot Toast (إشعارات)
- Three.js + @react-three/fiber + @react-three/drei (عناصر ثلاثية الأبعاد)
- Paper.js (تأثيرات/رسوم تفاعلية)

## تشغيل المشروع محليا

1. تثبيت الحزم:

```
npm install
```

2. تشغيل بيئة التطوير:

```
npm run dev
```

3. بناء نسخة إنتاج:

```
npm run build
```

4. معاينة نسخة الإنتاج:

```
npm run preview
```

## الإعدادات (Environment Variables)

أنشئ ملف `.env` في جذر المشروع وأضف المتغير التالي لاستخدام استيراد المنتجات من RapidAPI:

```
VITE_RAPIDAPI_KEY=YOUR_API_KEY
```

## قاعدة البيانات (Firestore)

المشروع يستخدم Firestore لتخزين البيانات، مع مجموعتين رئيسيتين:

- `products`: بيانات المنتجات (الاسم، السعر، الصورة، الألوان...)
- `users`: بيانات المستخدم (العربة `cartItems` وقائمة الرغبات `wishlistItems`)

## المصادقة (Authentication)

يتم استخدام Firebase Authentication مع Google Provider لتسجيل الدخول. عند أول تسجيل دخول، يتم إنشاء مستند مستخدم داخل `users` تلقائيا.

## استيراد المنتجات (Seed)

يوجد منطق في ملف `src/services/db.js` لجلب منتجات من RapidAPI وحفظها في Firestore. يتطلب ذلك `VITE_RAPIDAPI_KEY` داخل `.env`.

## الهيكل العام للمجلدات

- `src/pages`: صفحات التطبيق (Home, Store, ProductDetails, Cart, Wishlist, Login)
- `src/components`: مكونات الواجهة (Navbar, Cards, Animations)
- `src/context`: سياقات الحالة (Auth, Cart, Wishlist)
- `src/services`: الاتصال بـ Firebase و Firestore

---

# AURA.KICKS - Project Documentation (English)

## Overview

Modern sneaker store UI built with React + Vite, featuring animated hero, store/product/cart/wishlist pages, and Firebase integration for authentication and database.

## Tools and Libraries

- React 19
- Vite 8
- React Router DOM
- Firebase (Authentication + Firestore)
- GSAP (animations)
- Lucide React (icons)
- React Hot Toast (notifications)
- Three.js + @react-three/fiber + @react-three/drei (3D elements)
- Paper.js (interactive visual effects)

## Local Development

1. Install dependencies:

```
npm install
```

2. Run dev server:

```
npm run dev
```

3. Production build:

```
npm run build
```

4. Preview production build:

```
npm run preview
```

## Environment Variables

Create a `.env` file at the project root and add:

```
VITE_RAPIDAPI_KEY=YOUR_API_KEY
```

## Database (Firestore)

Firestore collections used by the app:

- `products`: product catalog data
- `users`: user data storing `cartItems` and `wishlistItems`

## Authentication

Firebase Authentication is enabled with Google provider. A user document is created in `users` on first login.

## Product Seeding

Seed logic lives in `src/services/db.js` and pulls sneaker data from RapidAPI, then stores it in Firestore. Requires `VITE_RAPIDAPI_KEY` in `.env`.

## Project Structure

- `src/pages`: app pages (Home, Store, ProductDetails, Cart, Wishlist, Login)
- `src/components`: UI components (Navbar, Cards, Animations)
- `src/context`: app state contexts (Auth, Cart, Wishlist)
- `src/services`: Firebase + Firestore services
