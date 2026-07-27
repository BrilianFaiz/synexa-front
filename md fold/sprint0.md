# Sprint 0 — Project Architecture & Component Thinking

> Project : Synexa - Smart Wearable Monitoring Pasien Pasca Stroke
>
> Tech Stack
> - Expo SDK 54
> - React Native
> - TypeScript
> - Expo Router

---

# Tujuan Sprint

Sprint 0 bukan bertujuan membuat tampilan aplikasi.

Sprint ini bertujuan membangun **cara berpikir seorang React Developer** sebelum mulai menulis kode.

Output Sprint 0:

- Menentukan struktur project
- Memahami konsep Component
- Memahami Component Tree
- Menentukan reusable component
- Menentukan coding convention
- Menentukan arsitektur project

---

# Kenapa Tidak Langsung Coding?

Kesalahan yang sering dilakukan pemula adalah langsung membuat halaman.

Misalnya

Home

↓

Login

↓

Dashboard

↓

History

↓

Profile

Tanpa memikirkan struktur project.

Akibatnya:

- banyak copy paste
- sulit maintenance
- style tidak konsisten
- project semakin berantakan ketika fitur bertambah

Project besar selalu dimulai dari arsitektur.

---

# Cara Berpikir React

React bukan framework untuk membuat halaman.

React adalah framework untuk menyusun Component.

Contoh.

Home bukan terdiri dari gambar dan tulisan.

Tetapi terdiri dari Component.

Home

├── Header

├── Banner

├── Tutorial Section

│     ├── Step Card

│     ├── Step Card

│     ├── Step Card

│     └── Step Card

├── Primary Button

└── Bottom Navigation

Setiap kotak merupakan sebuah Component.

---

# Apa Itu Component?

Component adalah bagian kecil dari UI yang memiliki satu tugas tertentu.

Contoh

PrimaryButton

Tugasnya hanya menampilkan tombol.

Dia tidak boleh mengurus

- Firebase
- API
- Database
- AI
- Sensor

Karena setiap Component harus memiliki satu tanggung jawab.

Konsep ini disebut

Single Responsibility Principle (SRP).

---

# Kenapa Membuat Component?

Daripada menulis

<TouchableOpacity>

di semua halaman

lebih baik membuat

<PrimaryButton />

Ada beberapa alasan.

## 1. Reusability

Satu Component dapat digunakan berkali-kali.

Misalnya

Login

Register

History

Home

Profile

semuanya memakai

PrimaryButton.

Jika desain tombol berubah

cukup mengubah satu file.

---

## 2. Consistency

Semua tombol memiliki

- warna
- radius
- ukuran
- padding

yang sama.

UI menjadi konsisten.

---

## 3. Scalability

Jika nanti tombol memiliki

- loading
- icon
- disabled
- spinner

cukup mengubah PrimaryButton.

Semua halaman otomatis ikut berubah.

---

## 4. Maintainability

Kode lebih mudah dirawat.

Tidak perlu mencari style tombol di puluhan file.

---

## 5. Abstraction

Screen tidak perlu tahu implementasi tombol.

Screen hanya mengetahui

<PrimaryButton />

---

# Review Jawaban

Awalnya jawaban yang diberikan adalah

"Agar tombol bisa ditekan dan menangani onClick."

Jawaban tersebut benar.

Tetapi itu adalah fungsi TouchableOpacity.

Sedangkan alasan membuat Button menjadi Component adalah

- Reusability
- Maintainability
- Consistency
- Scalability
- Abstraction

---

# Analisis UI Synexa

Dari hasil analisis desain aplikasi,

didapat beberapa reusable component.

---

## Layout Component

Digunakan hampir di semua halaman.

- AppHeader
- BottomNavigation
- ScreenContainer

---

## Button Component

- PrimaryButton
- SecondaryButton
- IconButton
- SocialButton

---

## Card Component

- HealthCard
- StepCard
- HistoryCard
- ResultCard
- StatCard

---

## Form Component

Yang dimaksud Form bukan Screen Login.

Tetapi bagian yang berisi input.

Contoh

- LoginForm
- RegisterForm

Screen Login hanya memanggil

<LoginForm />

---

## Typography Component

Digunakan agar seluruh teks konsisten.

- Heading
- Title
- Subtitle
- Body
- Caption
- Label

---

## Common Component

Component kecil yang sering dipakai.

- Avatar
- Divider
- Badge
- Loader
- Chip
- EmptyState

---

# Component Tree

React melihat UI sebagai pohon Component.

Contoh halaman Home.

Home

├── AppHeader

│      ├── BackButton

│      ├── Title

│      └── Avatar

│

├── Banner

│      ├── Image

│      └── Overlay

│

├── TutorialSection

│      ├── StepCard

│      ├── StepCard

│      ├── StepCard

│      └── StepCard

│

├── PrimaryButton

│

└── BottomNavigation

React tidak melihat Home sebagai satu halaman besar.

Tetapi sebagai kumpulan Component kecil.

---

# Coding Convention

## Penamaan Component

Menggunakan PascalCase.

Contoh

PrimaryButton.tsx

HealthCard.tsx

AppHeader.tsx

---

## Penamaan Hook

Selalu diawali dengan use.

Contoh

useAuth.ts

useSensor.ts

useBluetooth.ts

---

## Penamaan Service

Menggunakan format

nama.service.ts

Contoh

auth.service.ts

sensor.service.ts

user.service.ts

---

## Penamaan Type

Menggunakan PascalCase.

Contoh

User.ts

StrokeResult.ts

History.ts

---

## Penamaan Folder

Selalu menggunakan lowercase.

Contoh

components

services

hooks

theme

Bukan

Components

Services

---

# Struktur Component yang Disepakati

components/

├── buttons/

│      PrimaryButton

│      SecondaryButton

│      IconButton

│      SocialButton

│

├── cards/

│      HealthCard

│      StepCard

│      HistoryCard

│      ResultCard

│      StatCard

│

├── forms/

│      LoginForm

│      RegisterForm

│

├── layout/

│      AppHeader

│      BottomNavigation

│      ScreenContainer

│

├── typography/

│      Heading

│      Title

│      Subtitle

│      Body

│      Caption

│      Label

│

└── common/

       Avatar

       Divider

       Badge

       Loader

       Chip

       EmptyState

---

# Kesalahan yang Sering Dilakukan Pemula

❌ Semua kode ditulis dalam satu file.

❌ Semua halaman memiliki style sendiri.

❌ Menulis TouchableOpacity berulang-ulang.

❌ Tidak memisahkan Component.

❌ Screen terlalu panjang (500+ baris).

---

# Best Practice

Screen hanya bertugas menyusun Component.

Contoh.

<Home>

<AppHeader />

<Banner />

<TutorialSection />

<PrimaryButton />

<BottomNavigation />

</Home>

Logika bisnis tidak ditulis di dalam Screen jika dapat dipisahkan.

---

# Hasil Sprint 0

✔ Memahami Component

✔ Memahami Component Tree

✔ Menentukan reusable component

✔ Menentukan coding convention

✔ Menentukan struktur awal components

Sprint berikutnya:

Sprint 0.5 — Project Folder Architecture & Design System