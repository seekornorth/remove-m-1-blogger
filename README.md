# Cloudflare Worker: Hapus Parameter `?m=1` dari Blogger

Cloudflare Worker ini secara otomatis menghapus parameter `?m=1` dari URL Blogger agar:

- Tidak menampilkan tampilan versi mobile secara paksa
- URL lebih bersih dan SEO-friendly
- Pengunjung diarahkan ke tampilan desktop
- Menghindari redirect loop akibat redirect dari Blogger mobile

---

## 🚀 Fitur

- Menghapus `?m=1` dari URL masuk
- Memaksa Blogger menampilkan versi desktop (mengubah User-Agent)
- Menangani redirect dari Blogger (301/302/303/307/308) yang mengandung `?m=1`
- Mencegah redirect loop
- Super ringan dan cepat karena dijalankan di edge (Cloudflare Worker)

---

## 🛠️ Cara Deploy ke Cloudflare Workers

### 1. Clone repository

```bash
git clone https://github.com/tukultangankiwo/remove-m-1-blogger/
cd remove-m-1-blogger
```

### 2. Masuk ke Cloudflare Dashboard

Buka [https://dash.cloudflare.com/](https://dash.cloudflare.com/)

### 3. Buat Worker Baru

- Masuk ke menu **Workers & Pages**
- Klik tombol **Create Application**
- Pilih **Create Worker**
- Hapus kode default dari editor
- Paste isi file `index.js` dari repo ini

### 4. Atur Route

Tambahkan Route agar Worker aktif di domain Blogger milikmu. Contoh:

```
blog.om.com/*
```

> Pastikan domain Blogger kamu sudah menggunakan nameserver Cloudflare.

### 5. Save & Deploy

Klik **Deploy**. Worker langsung aktif di domainmu.

---

## ✅ Contoh Hasil

**Sebelum:**

```
https://blog.om.com/tutorial-hacking.html?m=1
```

**Setelah redirect otomatis:**

```
https://blog.om.com/tutorial-hacking.html
```

---

## 💎 Kelebihan

| Fitur         | Penjelasan                                                         |
| ------------- | ------------------------------------------------------------------ |
| SEO Friendly  | Menghindari duplikat konten akibat `?m=1`                          |
| UX Lebih Baik | Pengunjung langsung ke versi desktop, lebih nyaman di semua device |
| Clean URL     | URL lebih enak dibagikan ke media sosial                           |
| Performant    | Dijalankan di edge Cloudflare, tanpa beban server                  |
| Aman          | Cegah redirect loop dari Blogger yang sering terjadi di `?m=1`     |

---

## 🔍 Cara Kerja Singkat

1. Cek apakah URL mengandung `?m=1`, jika iya → hapus → redirect ke versi bersih.
2. Jika tidak ada `?m=1`, fetch ke Blogger dengan User-Agent desktop.
3. Jika Blogger merespons dengan redirect ke URL yang mengandung `?m=1`, hapus lagi → redirect ulang ke versi bersih.

---

## 🤝 Kontribusi

Pull request dan issue sangat diterima! Bantu project ini makin bagus — open source spirit!
