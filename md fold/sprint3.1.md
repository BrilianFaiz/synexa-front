# Sprint 3.1 - React State Fundamentals

> "State adalah jantung dari React. Tanpa State, Component hanyalah tampilan statis."

---

# Tujuan Sprint

Pada Sprint 3.1 fokus pembelajaran adalah memahami **mengapa React memiliki State** sebelum mempelajari cara menggunakan `useState()`.

Target Sprint ini bukan menghafal syntax, tetapi memahami bagaimana React memperbarui User Interface (UI).

---

# Learning Objectives

Setelah menyelesaikan Sprint 3.1 diharapkan mampu:

- Memahami apa itu State
- Memahami perbedaan Variable dan State
- Memahami mengapa perubahan Variable tidak memperbarui UI
- Memahami konsep Re-render
- Memahami fungsi `setState`
- Memahami alur perubahan UI pada React
- Memahami mengapa `useState()` mengembalikan Array

---

# 1. Apa itu State?

State adalah data yang dimiliki oleh sebuah Component.

Berbeda dengan Props yang berasal dari Parent Component, State dikelola oleh Component itu sendiri.

Contoh State:

```
Counter

count = 0
```

Ketika tombol ditekan

```
count

↓

1

↓

2

↓

3
```

Nilai tersebut berubah selama aplikasi berjalan.

Itulah yang disebut State.

---

# 2. Props vs State

Props

```
Parent

↓

Child
```

- Data berasal dari Parent
- Child tidak boleh mengubah Props
- Bersifat Read Only

---

State

```
Component

↓

Component
```

- Data dimiliki sendiri
- Bisa berubah
- Digunakan untuk membuat UI interaktif

---

# 3. Variable Biasa

Misalnya

```tsx
let count = 0;

count++;
```

Nilai Variable berubah.

Namun...

React **tidak mengetahui** bahwa Variable tersebut berubah.

Akibatnya UI tidak diperbarui.

---

# 4. Mengapa UI Tidak Berubah?

Misalnya

```tsx
let count = 0;

<Text>{count}</Text>
```

Kemudian

```tsx
count++;
```

Yang berubah hanyalah Variable.

React tidak melakukan Render ulang.

Sehingga layar tetap menampilkan

```
0
```

Walaupun di Memory

```
count = 1
```

---

# 5. Mengapa React Tidak Memantau Semua Variable?

Bayangkan sebuah aplikasi memiliki ribuan Variable.

```
let a
let b
let c
...

let z
```

Jika React harus memantau semuanya secara terus-menerus, maka performa aplikasi akan menjadi buruk.

Oleh karena itu React menggunakan mekanisme yang lebih efisien.

Developer harus memberi tahu React kapan sebuah data berubah.

---

# 6. useState()

React menyediakan mekanisme tersebut melalui Hook:

```tsx
useState()
```

State bukan hanya menyimpan data.

State juga memberi tahu React ketika terjadi perubahan.

---

# 7. Setter

Misalnya

```tsx
const [count, setCount] = useState(0);
```

Ketika

```tsx
setCount(1);
```

yang terjadi bukan hanya

```
count = 1
```

tetapi juga

```
React diberi tahu

↓

Component akan di-render ulang

↓

UI diperbarui
```

---

# 8. Re-render

Re-render adalah proses ketika React menjalankan kembali Function Component.

Misalnya

```
State berubah

↓

React menjalankan kembali Component

↓

JSX dibuat ulang

↓

Virtual DOM dibandingkan

↓

UI diperbarui
```

React hanya memperbarui bagian UI yang memang berubah.

---

# 9. Alur Kerja React

Ketika User menekan Button

```
User Click

↓

Event onPress

↓

setState()

↓

React mengetahui State berubah

↓

React melakukan Re-render

↓

JSX dijalankan ulang

↓

UI berubah
```

Inilah alur dasar seluruh aplikasi React.

---

# 10. useState Mengembalikan Array

Secara konsep

```tsx
const hasil = useState(0);
```

Menghasilkan

```tsx
[
    0,
    function setCount(){}
]
```

Index pertama

```
State
```

Index kedua

```
Setter
```

---

# 11. Destructuring

Tanpa Destructuring

```tsx
const hasil = useState(0);

const count = hasil[0];

const setCount = hasil[1];
```

Dengan Destructuring

```tsx
const [count, setCount] = useState(0);
```

Lebih singkat dan lebih mudah dibaca.

---

# 12. Mengapa React Menggunakan Array?

React memilih Array agar Developer bebas menentukan nama State.

Contoh

```tsx
const [count, setCount] = useState(0);

const [name, setName] = useState("");

const [loading, setLoading] = useState(false);

const [heartRate, setHeartRate] = useState(80);
```

Jika menggunakan Object

```tsx
const {
    value,
    setValue
}
```

Developer harus terus mengganti nama Property agar tidak bentrok.

Array membuat API React lebih fleksibel dan ringkas.

---

# 13. Analogi State

Bayangkan React seperti kasir.

Ketika Variable berubah

```
Variable berubah

↓

Kasir tidak diberi tahu

↓

Struk tetap
```

Ketika menggunakan State

```
setState()

↓

Kasir diberi tahu

↓

Struk dicetak ulang
```

Artinya

State bukan hanya menyimpan data, tetapi juga menjadi mekanisme pemberitahuan kepada React.

---

# 14. Konsep Penting

Variable

```
Nilai berubah

≠

UI berubah
```

State

```
State berubah

↓

React tahu

↓

Render ulang

↓

UI berubah
```

---

# Ringkasan

Pada Sprint ini dipelajari bahwa:

✅ State adalah data milik Component.

✅ Props berasal dari Parent, sedangkan State dikelola sendiri oleh Component.

✅ Perubahan Variable biasa tidak menyebabkan UI berubah.

✅ React tidak memantau seluruh Variable karena alasan performa.

✅ `useState()` digunakan untuk menyimpan State sekaligus memberi tahu React ketika terjadi perubahan.

✅ Perubahan State memicu Re-render.

✅ `useState()` mengembalikan Array yang berisi State dan Setter.

---

# Kompetensi Sprint 3.1

Setelah Sprint ini selesai, developer mampu:

- Memahami konsep State.
- Memahami perbedaan State dan Variable.
- Menjelaskan mengapa React membutuhkan `useState()`.
- Menjelaskan proses Re-render.
- Memahami alasan `useState()` mengembalikan Array.

---

# Next Sprint

Sprint 3.2

**Implementasi `useState()`**

Materi yang akan dipelajari:

- Syntax `useState()`
- Initial State
- Setter Function
- Multiple State
- Counter App
- Interactive Component
- State pada Form Login dan Register