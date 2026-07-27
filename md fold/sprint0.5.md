# Sprint 0.5 — Project Foundation & Design System

> Project : Synexa - Smart Wearable Monitoring Pasien Pasca Stroke
>
> Sprint Goal:
> Membangun fondasi project sebelum menulis Component pertama.

---

# Tujuan Sprint

Sprint 0.5 bertujuan untuk membangun fondasi project.

Pada sprint ini belum ada pembuatan UI.

Fokus utama adalah:

- Menentukan struktur project
- Menentukan penggunaan folder src
- Memahami Design System
- Memahami Design Token
- Menentukan Color Role
- Menentukan Theme Architecture

---

# Kenapa Menggunakan Folder src?

Struktur project dibagi menjadi dua bagian besar.

## Root Project

Berisi konfigurasi project.

Contoh

package.json

tsconfig.json

app.json

.env

babel.config.js

eslint.config.js

README.md

Semua file ini digunakan untuk menjalankan project.

---

## src

Folder src digunakan untuk menyimpan seluruh source code aplikasi.

Contoh

app

components

services

hooks

theme

types

utils

Dengan pemisahan tersebut project menjadi lebih mudah dipahami.

Konsep ini disebut

Separation of Concerns.

---

# Keuntungan Menggunakan src

## 1. Memisahkan Konfigurasi dan Source Code

Root

↓

Konfigurasi

src

↓

Kode aplikasi

---

## 2. Project Lebih Rapi

Ketika project berkembang,

folder seperti berikut dapat ditambahkan tanpa mengganggu source code.

android

ios

docs

scripts

tests

.github

---

## 3. Mudah Dinavigasi

Developer baru cukup membuka

src/

untuk melihat seluruh kode aplikasi.

---

## 4. Scalability

Semakin besar project,

semakin penting pemisahan struktur.

Synexa diperkirakan memiliki

- Authentication
- Dashboard
- Monitoring
- AI Result
- History
- Profile
- Firebase
- API
- Sensor

Sehingga penggunaan src sangat direkomendasikan.

---

# Design System

Semua Component harus mengikuti aturan yang sama.

Daripada menulis

backgroundColor: "#28A79E"

padding: 16

borderRadius: 12

lebih baik menggunakan

colors.primary

spacing.md

radius.lg

typography.title

Komponen tidak lagi bergantung pada angka atau warna secara langsung.

Tetapi bergantung pada Design Token.

---

# Design Token

Design Token adalah nilai yang digunakan bersama oleh seluruh aplikasi.

Contoh

Color

Spacing

Typography

Radius

Shadow

Design Token menjadi bahasa yang dipahami semua Component.

---

# Theme Folder

Folder theme menjadi pusat seluruh aturan visual aplikasi.

Struktur

theme/

├── colors.ts

├── spacing.ts

├── radius.ts

├── typography.ts

├── shadows.ts

└── index.ts

---

# colors.ts

Tidak menyimpan warna berdasarkan nama.

Tetapi berdasarkan fungsi.

Contoh

primary

primaryLight

primaryDark

accent

background

surface

card

border

divider

textPrimary

textSecondary

success

warning

error

info

white

black

transparent

---

# Color Palette Synexa

Primary

Teal (#28A79E)

Digunakan untuk

- Tombol utama
- Navigasi aktif
- Ikon utama

---

Accent

Gold / Yellow Orange

Digunakan untuk

- Tombol rekomendasi
- Highlight
- Informasi penting

---

Background

White

Digunakan sebagai latar belakang utama.

---

Surface

White

Digunakan pada

- Form
- Panel
- Container

---

Card

Off White / White

Digunakan khusus pada Card.

Dipisahkan dari Surface agar mudah diubah di masa depan.

---

Border

Light Gray

Digunakan pada

- Input
- Divider
- Outline

---

Text

TextPrimary

TextSecondary

TextHint

---

Status Color

Success

Warning

Error

Info

---

# spacing.ts

Spacing digunakan agar seluruh UI memiliki jarak yang konsisten.

Contoh

xs

sm

md

lg

xl

xxl

Tidak diperbolehkan menggunakan angka acak.

Contoh yang salah

padding: 17

margin: 13

Contoh yang benar

padding: spacing.md

margin: spacing.sm

---

# radius.ts

Radius dibuat agar bentuk seluruh component konsisten.

Contoh

sm

md

lg

pill

Tidak menggunakan

borderRadius: 13

Tetapi

borderRadius: radius.lg

---

# typography.ts

Typography menentukan standar tulisan.

Contoh

Heading

Title

Subtitle

Body

Caption

Label

Setiap typography memiliki

fontSize

fontWeight

lineHeight

yang konsisten.

---

# shadows.ts

Shadow disatukan agar Android dan iOS memiliki tampilan yang seragam.

Contoh

sm

md

lg

Component cukup menggunakan

shadows.md

tanpa mengetahui implementasinya.

---

# Component Dependency

Semua Component bergantung kepada Theme.

Diagram

theme

├── colors

├── spacing

├── radius

├── typography

└── shadows

↓

PrimaryButton

↓

HealthCard

↓

Screen

Theme tidak mengetahui siapa yang menggunakannya.

Namun seluruh Component menggunakan Theme.

---

# Contoh Penggunaan Design Token

HealthCard

↓

Background

colors.card

↓

Padding

spacing.md

↓

Radius

radius.lg

↓

Shadow

shadows.md

↓

Title

typography.title

↓

Body

typography.body

↓

Border

colors.border

Tidak ada angka maupun warna yang ditulis langsung.

---

# Filosofi Design Token

Junior Developer berpikir

"Warna apa yang dipakai?"

Senior Developer berpikir

"Peran warna tersebut apa?"

Contoh

❌

#28A79E

✅

colors.primary

Karena warna dapat berubah tanpa mengubah seluruh Component.

---

# Best Practice

Seluruh Component harus mengambil style dari Theme.

Tidak diperbolehkan menulis

padding: 16

fontSize: 18

backgroundColor: "#28A79E"

secara langsung apabila sudah tersedia Design Token.

---

# Struktur Project Saat Ini

src/

├── app/

├── assets/

│

├── components/

│   ├── buttons/

│   ├── cards/

│   ├── common/

│   ├── forms/

│   ├── layout/

│   ├── typography/

│   └── monitoring/

│

├── constants/

├── hooks/

├── lib/

├── services/

├── theme/

├── types/

└── utils/

---

# Hasil Sprint 0.5

✅ Memahami fungsi folder src

✅ Memahami Separation of Concerns

✅ Memahami Design System

✅ Memahami Design Token

✅ Menentukan Theme Architecture

✅ Menentukan Color Role

✅ Menentukan struktur folder project

Sprint berikutnya

Sprint 1 — Building the Design System