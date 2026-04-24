# Daftar Penambahan Fitur dan Perubahan (v2)

Berikut adalah daftar perubahan yang telah ditambahkan ke dalam proyek berdasarkan dokumentasi `v2.md`:

## 1. Backend (PHP API)
- **File Baru**: `backend/api/products.php` - Endpoint CRUD untuk manajemen produk (GET, POST, DELETE).
- **Fitur Upload**: Menambahkan logika upload gambar ke `backend/uploads/products/`.
- **Database Diperbarui**: `backend/database.sql` telah diperbarui dengan:
  - Tabel `categories` untuk kategori produk
  - Tabel `products` lengkap dengan field (sku, barcode, name, description, category_id, price, stock, image_url)
  - Foreign key constraint antara `products.category_id` dan `categories.id`
  - Sample data: 2 kategori (Makanan, Minuman) dan 2 produk (Indomie Goreng, Aqua Botol)

## 2. Frontend (React Native - Expo)
- **Instalasi Library**:
    - `@react-navigation/native` & `@react-navigation/native-stack` (Navigasi)
    - `react-native-screens` & `react-native-safe-area-context` (Pendukung navigasi)
    - `expo-image-picker` (Untuk memilih gambar dari galeri)
- **File Baru**:
    - `mobile-app/src/screens/ProductListScreen.js` - Layar untuk menampilkan daftar produk dengan fitur pencarian.
    - `mobile-app/src/screens/AddEditProductScreen.js` - Layar untuk menambah produk baru beserta upload gambar.
- **Perubahan File**:
    - `mobile-app/App.js`: Diperbarui dari navigasi manual/palsu ke **React Navigation (Stack)**. Mendaftarkan semua layar (Login, Profile, ProductList, AddEditProduct).
    - `mobile-app/src/screens/ProfileScreen.js`: Menambahkan tombol **"Manage Products"** yang mengarah ke daftar produk.

## 3. Struktur Folder
- Membuat folder baru `backend/uploads/products/` untuk penyimpanan gambar produk.

---

### Catatan Penting untuk Database:
Jika tabel produk belum ada, silakan jalankan SQL berikut di database `jwt_db`:

```sql
-- Tabel Categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabel Products
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sku` varchar(50) DEFAULT NULL,
  `barcode` varchar(50) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data Awal
INSERT IGNORE INTO `categories` (`id`, `name`) VALUES (1, 'Makanan'), (2, 'Minuman');
```
