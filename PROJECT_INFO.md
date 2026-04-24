# Project Information - JWT Study Mobile App

## Overview
Sistem Autentikasi JWT dan POS Product Management menggunakan PHP Backend dan React Native (Expo) Frontend.

---

## Backend (PHP API)

### Runtime
- **PHP**: 8.x (disarankan)
- **Database**: MySQL / MariaDB
- **Server**: Apache (XAMPP/Laragon)

### Libraries
| Library | Version | Description |
|---------|---------|-------------|
| firebase/php-jwt | ^7.0 | Library untuk generate dan verify JSON Web Token |

### Struktur Folder Backend
```
backend/
├── api/
│   ├── login.php
│   ├── logout.php
│   ├── middleware.php
│   ├── profile.php
│   └── products.php
├── config/
│   ├── database.php
│   └── jwt_key.php
├── vendor/ (gitignored)
├── uploads/products/ (untuk upload gambar)
├── database.sql
├── composer.json
└── composer.lock
```

---

## Frontend (React Native - Expo)

### SDK & Framework
- **Expo SDK**: 55.0.0
- **React Native**: 0.83.0
- **React**: 19.0.0

### Dependencies (Production)
| Library | Version | Description |
|---------|---------|-------------|
| expo | ~55.0.0 | Expo framework utama |
| expo-status-bar | ~2.1.0 | Status bar management |
| react | 19.0.0 | React library |
| react-dom | 19.0.0 | React DOM renderer |
| react-native | 0.83.0 | React Native core |
| react-native-web | ~0.21.0 | Web support untuk React Native |
| @expo/metro-runtime | ~55.0.0 | Metro bundler runtime |
| axios | ^1.7.2 | HTTP client untuk API calls |
| @react-navigation/native | ^7.0.0 | Navigation library |
| @react-navigation/native-stack | ^7.0.0 | Stack navigator |
| @react-native-async-storage/async-storage | 2.1.1 | Local storage untuk JWT token |
| expo-image-picker | ~16.0.0 | Image picker dari galeri/kamera |
| react-native-safe-area-context | 5.2.0 | Safe area handling (notch, status bar) |
| react-native-screens | ~4.7.0 | Native screens untuk navigasi |

### Dev Dependencies
| Library | Version | Description |
|---------|---------|-------------|
| @babel/core | ^7.25.2 | Babel compiler core |

### Struktur Folder Frontend
```
mobile-app/
├── src/
│   ├── api/
│   │   └── config.js (Axios client dengan JWT interceptor)
│   └── screens/
│       ├── LoginScreen.js
│       ├── ProfileScreen.js
│       ├── ProductListScreen.js
│       └── AddEditProductScreen.js
├── App.js (Root component dengan Navigation)
├── babel.config.js
├── package.json
└── node_modules/ (gitignored)
```

---

## Aturan & Konvensi Project

### 1. Git Ignore
File berikut tidak di-commit:
- `node_modules/` (semua dependencies React Native)
- `backend/vendor/` (PHP dependencies)
- `.env` files
- `uploads/` folder (file upload user)
- Build outputs (`dist/`, `web-build/`, `android/`, `ios/`)

### 2. API Configuration
- Base URL API dikonfigurasi di `mobile-app/src/api/config.js`
- Untuk emulator Android: gunakan `10.0.2.2` sebagai pengganti `localhost`
- Untuk HP fisik: gunakan IP address komputer (misal: `192.168.1.x`)

### 3. Database
- Database name: `jwt_db`
- Pastikan menjalankan `backend/database.sql` yang sudah diperbarui (termasuk tabel categories & products)

### 4. JWT Secret Key
- Disimpan di `backend/config/jwt_key.php`
- Ganti `JWT_KEY` dengan string yang aman dan unik untuk production

### 5. Upload Gambar
- Gambar produk disimpan di `backend/uploads/products/`
- Pastikan folder tersebut ada dan writable (chmod 777 di Linux/Mac)

---

## Cara Menjalankan Project

### Backend:
1. Start Apache & MySQL (XAMPP/Laragon)
2. Import `backend/database.sql` ke phpMyAdmin
3. Pastikan URL `http://localhost/jwt-project/backend/` dapat diakses

### Frontend:
```bash
cd mobile-app
npm install
npm start
```
- Scan QR code dengan Expo Go app
- Atau tekan `a` untuk Android emulator, `i` untuk iOS simulator, `w` untuk web

---

## Catatan Versi
- Expo SDK 55 menggunakan React Native 0.83
- Pastikan semua library compatible dengan Expo SDK version yang digunakan
- Untuk update dependencies: `npx expo install --fix`
