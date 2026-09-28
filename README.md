# SANIME

SANIME adalah platform streaming anime gratis dengan desain Liquid Glass yang modern dan premium (terinspirasi dari iOS 26 UI). Dibangun menggunakan teknologi web terkini untuk memberikan pengalaman menonton yang cepat, mulus, dan responsif.

## Fitur Utama

- 🎨 **Liquid Glass UI**: Desain antarmuka premium dengan efek blur (glassmorphism) bertingkat.
- 📱 **Mobile First**: Navigasi khusus dan layout yang responsif untuk berbagai ukuran layar.
- ⚡ **Performa Tinggi**: Dibangun dengan React 18, Vite, dan caching cerdas melalui TanStack Query.
- 🔍 **Pencarian Cepat**: Cari anime favoritmu tanpa jeda loading yang lama.
- 📺 **Player Bawaan**: Langsung nonton episode dengan pilihan berbagai resolusi dan server.
- 🔖 **Bookmark & Riwayat**: Simpan anime favorit dan lanjutkan tontonan terakhirmu.
- 🌙 **Tema Gelap/Terang**: Dukungan tema yang menyatu dengan preferensi sistem.

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Custom CSS Variables (Tokens)
- **State & Data Fetching**: TanStack Query v5 (React Query)
- **Routing**: React Router v6
- **Animasi**: Framer Motion
- **Icons**: Lucide React

## Cara Menjalankan di Lokal

### 1. Clone Repository

```bash
git clone https://github.com/USERNAME/sanime.git
cd sanime
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Duplikat file `.env.example` dan ubah namanya menjadi `.env`:

```bash
cp .env.example .env
```
_Jika Wajik Anime API berjalan di port lain, sesuaikan nilai `VITE_API_BASE_URL` di dalam `.env`._

### 4. Jalankan Development Server

```bash
npm run dev
```

Buka `http://localhost:5173` di browsermu!

## API Source
Aplikasi ini mengambil data (scrape) melalui [Wajik Anime API](https://github.com/mizhu/wajik-anime-api) (atau API kustom yang kompatibel). Pastikan service API tersebut berjalan di sisi backend.

---
_Disclaimer: Proyek ini dibuat hanya untuk tujuan edukasi (UI/UX dan Frontend Development)._
