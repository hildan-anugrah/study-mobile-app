# JWT Auth — PHP Backend + React Native (Expo)

Proyek autentikasi JWT lengkap dengan PHP Native (PDO) sebagai Backend API dan React Native (Expo) sebagai Frontend Mobile.

---

## 📁 Struktur Folder

```
jwt-project/
├── backend/                  ← Taruh di xampp/htdocs/jwt/
│   ├── database.sql          ← Jalankan di phpMyAdmin
│   ├── composer.json
│   ├── config/
│   │   ├── database.php
│   │   └── jwt_key.php
│   └── api/
│       ├── login.php         ← POST /api/login.php
│       ├── profile.php       ← GET  /api/profile.php (protected)
│       └── middleware.php
└── mobile-app/               ← Project React Native / Expo
    ├── App.js
    ├── package.json
    └── src/
        ├── api/
        │   └── config.js     ← Konfigurasi Axios + interceptor
        └── screens/
            ├── LoginScreen.js
            └── ProfileScreen.js
```

---

## 🚀 Cara Menjalankan

### Backend (PHP)

1. **Copy folder `backend`** ke `C:/xampp/htdocs/jwt/`
2. **Jalankan XAMPP** (Apache + MySQL)
3. **Buat database**: Buka `http://localhost/phpmyadmin` → Import atau jalankan isi `database.sql`
4. **Install dependensi PHP**:
   ```bash
   cd C:/xampp/htdocs/jwt
   composer install
   ```
5. Backend siap di: `http://localhost/jwt/api/`

---

### Frontend (React Native / Expo)

1. **Masuk ke folder mobile-app**:
   ```bash
   cd mobile-app
   ```

2. **Install dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan di Web** (agar bisa akses localhost):
   ```bash
   npm run web
   ```
   Buka: `http://localhost:8081`

4. **Jalankan di HP fisik / Emulator**:
   - Edit `src/api/config.js`, ganti `localhost` dengan IP lokal PC Anda (contoh: `192.168.1.100`)
   ```bash
   npm start
   ```
   Scan QR code dengan aplikasi Expo Go.

---

## 🔑 Akun Test

| Field    | Value              |
|----------|--------------------|
| Email    | test@example.com   |
| Password | password123        |

---

## 🔐 Alur Autentikasi

```
[App Start]
     │
     ▼
Cek AsyncStorage (ada token?)
     ├── Ya  → ProfileScreen (fetch /profile.php)
     └── Tidak → LoginScreen
                     │
                     ▼
              POST /login.php
              (email + password)
                     │
                     ▼
              Dapat JWT token
              Simpan ke AsyncStorage
                     │
                     ▼
              ProfileScreen
              GET /profile.php
              (Bearer token di header)
```

---

## ⚠️ Catatan Penting

- **Jangan gunakan plain text password di production!** Gunakan `password_hash()` dan `password_verify()` PHP.
- Ganti `JWT_KEY` di `config/jwt_key.php` dengan string acak yang panjang dan aman.
- Untuk production, batasi `Access-Control-Allow-Origin` ke domain spesifik.
