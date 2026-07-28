# Sprint 3 - State Management & Interactive Component

> "UI yang baik bukan hanya terlihat bagus, tetapi juga dapat merespons interaksi pengguna."

---

# Tujuan Sprint

Pada Sprint 3 kita akan mulai mempelajari bagaimana sebuah Component dapat memiliki "kehidupan" melalui State.

Jika pada Sprint 2 Component hanya menerima data dari Parent menggunakan Props, maka pada Sprint 3 Component mulai dapat menyimpan dan mengubah datanya sendiri menggunakan React Hooks.

Sprint ini menjadi jembatan menuju pembuatan Form, Authentication, Dashboard Monitoring, hingga komunikasi dengan Backend.

---

# Learning Objectives

Setelah menyelesaikan Sprint 3 diharapkan mampu:

- Memahami apa itu State
- Memahami perbedaan Props dan State
- Menggunakan Hook `useState()`
- Memahami proses Re-render React
- Membuat Component yang bersifat interaktif
- Menghubungkan Event dengan perubahan State
- Mengelola Form menggunakan State
- Memahami konsep One Way Data Flow

---

# Mengapa Sprint Ini Penting?

Hampir seluruh aplikasi React Native dibangun di atas konsep State.

Contohnya:

Login Screen

```
Email
Password
Loading
Remember Me
Error Message
```

Seluruh data tersebut merupakan State.

Dashboard Monitoring

```
Heart Rate
SpO₂
Temperature
Connection Status
History Chart
```

Semuanya berubah setiap saat.

Perubahan tersebut dikontrol menggunakan State.

Tanpa State, aplikasi hanya menjadi tampilan statis.

---

# Roadmap Sprint 3

## 3.1 React State

Materi

- Apa itu State
- State vs Variable
- Kapan menggunakan State
- Lifecycle sederhana Component

Output

Memahami mengapa React memiliki `useState()`.

---

## 3.2 useState()

Materi

- Syntax `useState`
- Initial State
- Getter
- Setter
- Re-render

Output

Mampu menyimpan data pada Component.

---

## 3.3 Event Handling

Materi

- onPress
- onChangeText
- onSubmitEditing

Output

Menghubungkan interaksi pengguna dengan perubahan State.

---

## 3.4 Conditional Rendering

Materi

- if
- ternary operator
- logical &&
- loading indicator
- empty state

Output

UI dapat berubah berdasarkan kondisi.

---

## 3.5 Form State

Materi

- Input Email
- Input Password
- Validation sederhana
- Submit Form

Output

Membuat Login Form sederhana menggunakan State.

---

## 3.6 Component State

Materi

- Loading Button
- Disabled Button
- Toggle Button

Output

Mengembangkan `PrimaryButton` agar lebih interaktif.

Contoh:

```tsx
<PrimaryButton
    title="Login"
    onPress={handleLogin}
    isLoading={loading}
/>
```

---

## 3.7 Mini Project

Pada akhir Sprint 3 akan dibuat beberapa latihan:

- Counter App
- Toggle Theme
- Login Form
- Register Form
- Interactive PrimaryButton

---

# Hubungan dengan Project Synexa

Materi Sprint 3 akan langsung diterapkan pada project Synexa.

Contoh implementasi:

## Login Screen

State yang akan digunakan

```
email
password
loading
error
```

---

## Register Screen

State

```
nama
email
password
confirmPassword
loading
```

---

## Dashboard

State

```
heartRate
spo2
temperature
history
connectionStatus
```

---

## Button

State

```
pressed
loading
disabled
```

---

# Kompetensi Setelah Sprint 3

Setelah Sprint ini selesai, developer mampu:

✅ Membuat UI yang interaktif

✅ Mengelola data lokal menggunakan State

✅ Menghubungkan Event dengan perubahan UI

✅ Membuat Form Login dan Register

✅ Mengembangkan reusable component yang dinamis

Sprint ini menjadi fondasi sebelum memasuki Sprint 4 yang akan membahas komunikasi data dengan Backend, API, dan pengelolaan State pada level aplikasi.