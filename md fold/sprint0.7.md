# Sprint 1 — Building the Design System (Part 1)

> Project : Synexa - Smart Wearable Monitoring Pasien Pasca Stroke

---

# Sprint Goal

Sprint 1 merupakan sprint pertama yang memasuki tahap implementasi.

Namun implementasi tidak langsung membuat halaman Login ataupun Home.

Sprint ini berfokus pada pembangunan **Design System** yang nantinya menjadi fondasi seluruh aplikasi.

Output Sprint 1:

- Membangun folder theme
- Memahami dependency Theme → Component → Screen
- Memahami Single Source of Truth (SSOT)
- Menentukan implementasi colors.ts
- Membuat reusable PrimaryButton

---

# Kenapa Tidak Langsung Membuat Screen?

Seluruh Screen bergantung pada Component.

Seluruh Component bergantung pada Theme.

Diagram dependency.

Theme

↓

Component

↓

Screen

Artinya Theme menjadi fondasi paling bawah.

Jika Theme belum dibuat maka seluruh Component akan menuliskan style masing-masing sehingga sulit dipelihara.

---

# Dependency Flow

Project Synexa menggunakan dependency sebagai berikut.

Theme

↓

PrimaryButton

↓

Home Screen

↓

Application

Screen tidak mengetahui implementasi Theme.

Screen hanya menggunakan Component.

Component yang bertanggung jawab mengambil nilai dari Theme.

---

# Analogi

Theme dapat dianalogikan sebagai toko material.

Berisi

- Warna
- Font
- Radius
- Shadow
- Spacing

Component adalah tukang.

Component mengambil material dari Theme.

Screen adalah rumah yang sudah selesai dibangun.

---

# Design Token pada PrimaryButton

PrimaryButton tidak menyimpan angka ataupun warna secara langsung.

PrimaryButton mengambil seluruh konfigurasi dari Theme.

Dependency.

PrimaryButton

↓

colors.primary

↓

colors.white

↓

spacing.md

↓

radius.lg

↓

typography.button

↓

shadows.md

Dengan cara tersebut seluruh Button memiliki tampilan yang konsisten.

---

# Kenapa Style Tidak Ditulis di Screen?

Contoh.

Home

↓

PrimaryButton

↓

Theme

Home cukup memanggil

<PrimaryButton />

Home tidak mengetahui

- warna
- radius
- shadow
- typography

Semua diatur oleh PrimaryButton.

Konsep ini merupakan implementasi Encapsulation.

---

# Encapsulation

Pada Java.

Car

↓

start()

↓

stop()

User tidak mengetahui bagaimana mesin bekerja.

React memiliki konsep yang sama.

<Home />

↓

<PrimaryButton />

↓

Theme

Screen tidak mengetahui bagaimana Button dibangun.

Screen hanya menggunakan Component.

---

# Single Source of Truth (SSOT)

Semua aturan visual hanya memiliki satu sumber.

Contoh.

Warna

↓

theme/colors.ts

Typography

↓

theme/typography.ts

Radius

↓

theme/radius.ts

Spacing

↓

theme/spacing.ts

Shadow

↓

theme/shadows.ts

Button

↓

PrimaryButton.tsx

Jika Designer mengubah warna utama aplikasi.

Developer hanya mengubah

theme/colors.ts

Seluruh aplikasi otomatis ikut berubah.

---

# OOP Mindset vs React Mindset

## Cara Berpikir Awal

Sebagai programmer Java muncul ide.

class Colors

↓

primary()

↓

secondary()

↓

new Colors()

Pendekatan ini benar pada OOP.

Karena Object memiliki

- Data
- Behavior

---

## Kenapa Tidak Menggunakan Class?

Colors tidak memiliki Behavior.

Colors hanya menyimpan Data.

Misalnya.

Primary

↓

#28A79E

Secondary

↓

#F1C40F

Karena bersifat statis maka Class menjadi tidak diperlukan.

---

# Pendekatan React

React lebih memilih menggunakan Module.

Contoh.

export const colors

↓

primary

↓

secondary

↓

background

↓

surface

Setiap Component cukup menggunakan.

colors.primary

tanpa membuat object baru.

---

# Kenapa Menggunakan Object?

Object lebih sederhana.

Tidak membutuhkan

new Colors()

Tidak memiliki State.

Tidak memiliki Behavior.

Hanya menyimpan konfigurasi.

Karena itu Theme lebih cocok menggunakan Object dibanding Class.

---

# Module Singleton

Module JavaScript hanya dibuat satu kali ketika pertama kali di-load.

Misalnya.

export const colors = {...}

Kemudian digunakan pada.

PrimaryButton

HealthCard

AppHeader

BottomNavigation

Semua Component menggunakan object colors yang sama.

Tidak dibuat ulang pada setiap import.

Konsep ini mendukung Single Source of Truth.

---

# Perbedaan Behavior dan Instance

Behavior

Merupakan aksi yang dimiliki Object.

Contoh.

car.start()

car.stop()

car.brake()

Instance

Merupakan object yang dibuat dari Class.

Contoh.

Car car1 = new Car();

Car car2 = new Car();

Pada Theme tidak diperlukan banyak instance karena Theme bersifat statis.

---

# Filosofi Theme

Theme bukan sekadar kumpulan warna.

Theme adalah pusat konfigurasi visual aplikasi.

Semua Component wajib mengambil nilai dari Theme.

Component tidak diperbolehkan menuliskan.

backgroundColor: "#28A79E"

padding: 16

borderRadius: 12

fontSize: 18

secara langsung apabila sudah tersedia Design Token.

---

# Best Practice

✔ Theme menjadi Single Source of Truth.

✔ Component mengambil seluruh konfigurasi dari Theme.

✔ Screen hanya menggunakan Component.

✔ Theme menggunakan Object.

✔ Tidak menggunakan Class untuk Theme.

---

# Arsitektur Saat Ini

Theme

├── colors

├── spacing

├── radius

├── typography

└── shadows

↓

Component

↓

Screen

↓

Application

---

# Hasil Sprint 1 (Part 1)

✅ Memahami Dependency Flow

✅ Memahami Encapsulation pada React

✅ Memahami Single Source of Truth

✅ Memahami Module Singleton

✅ Memahami alasan Theme menggunakan Object dibanding Class

✅ Siap mengimplementasikan colors.ts

---

# Next Step

Sprint 1 (Part 2)

- Membuat folder theme
- Mengimplementasikan colors.ts
- Mengimplementasikan spacing.ts
- Mengimplementasikan radius.ts
- Mengimplementasikan typography.ts
- Mengimplementasikan shadows.ts
- Export seluruh Theme melalui index.ts
- Membangun PrimaryButton pertama