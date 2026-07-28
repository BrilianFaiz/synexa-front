# Sprint 2 - React Native Fundamental
## Component, Props, Interface, dan TypeScript

> Catatan belajar pribadi.
> Fokus hari ini adalah memahami konsep, bukan menghafal syntax.

---

# 1. Cara Berpikir React

React dibangun dari kumpulan **Component**.

Component adalah bagian UI yang dapat digunakan berulang kali (Reusable).

Contoh:

```
Button
Card
TextField
Header
BottomNavigation
Avatar
```

Semua itu adalah Component.

---

# 2. Presentation vs Logic

React memisahkan tampilan dengan logika.

Contoh:

```
LoginScreen
│
├── handleLogin()  ← Logic
│
└── PrimaryButton  ← Presentation
```

Button **tidak tahu cara login**.

Button hanya tahu:

- tampilkan UI
- ketika ditekan panggil function yang diberikan.

---

# 3. Props

Props adalah data yang dikirim dari Parent Component ke Child Component.

Contoh:

```tsx
<PrimaryButton
    title="Login"
    onPress={handleLogin}
/>
```

Secara konsep React mengubahnya menjadi:

```ts
PrimaryButton({
    title: "Login",
    onPress: handleLogin
})
```

Artinya:

Props hanyalah sebuah Object.

---

# 4. Props = Object

Contoh isi props

```ts
props = {
    title: "Login",
    onPress: handleLogin,
    isLoading: false
}
```

Karena props adalah object, maka kita bisa menggunakan:

```ts
props.title
props.onPress
props.isLoading
```

Atau menggunakan Destructuring

```ts
function PrimaryButton({
    title,
    onPress
}) {

}
```

---

# 5. Destructuring

Tanpa Destructuring

```ts
function PrimaryButton(props){

    props.title

    props.onPress

}
```

Dengan Destructuring

```ts
function PrimaryButton({
    title,
    onPress
}){

}
```

Lebih singkat dan lebih sering digunakan di React.

---

# 6. Interface

Interface adalah kontrak.

Interface menjelaskan bentuk Object.

Contoh

```ts
interface PrimaryButtonProps {

    title: string;

    onPress: () => void;

}
```

Artinya:

Object harus memiliki:

- title bertipe string
- onPress bertipe function

Interface **bukan isi data**, tetapi aturan.

---

# 7. Interface vs Object

Interface

```ts
interface UserCardProps{

    name: string;

    age: number;

}
```

Object

```ts
{

    name: "Faiz",

    age: 21

}
```

Interface = Aturan

Object = Data

---

# 8. Type Annotation

Interface digunakan sebagai tipe parameter.

```ts
function PrimaryButton(
    props: PrimaryButtonProps
){

}
```

atau

```ts
function PrimaryButton({
    title,
    onPress
}: PrimaryButtonProps){

}
```

Artinya:

Props yang masuk HARUS mengikuti aturan PrimaryButtonProps.

---

# 9. Optional Props

Props wajib

```ts
title: string
```

Props opsional

```ts
isLoading?: boolean
```

Tanda ?

Berarti

"Boleh ada, boleh tidak."

Contoh valid

```tsx
<PrimaryButton
    title="Back"
    onPress={goBack}
/>
```

Contoh juga valid

```tsx
<PrimaryButton
    title="Login"
    onPress={handleLogin}
    isLoading={true}
/>
```

---

# 10. Required Props

title dan onPress wajib.

Karena tanpa keduanya Button tidak memiliki fungsi.

Misalnya

```tsx
<PrimaryButton />
```

Error.

Karena:

- tidak ada title
- tidak ada onPress

Button hanya menjadi kotak tanpa arti.

---

# 11. Function Type

Function pada Interface ditulis seperti ini

```ts
onPress: () => void
```

Artinya

```
Function

↓

Tidak memiliki parameter

↓

Mengembalikan void
```

Mirip Java

```java
void login(){

}
```

---

# 12. Boolean

Java

```java
boolean
```

TypeScript

```ts
boolean
```

Bukan

```ts
bool
```

---

# 13. Component Naming

Nama Component menggunakan PascalCase.

Benar

```ts
PrimaryButton
```

Salah

```ts
primaryButton
```

---

# 14. Props Naming

Gunakan camelCase.

Benar

```ts
onPress
isLoading
```

Salah

```ts
onpress
isloading
```

---

# 15. Struktur Component

Secara umum Component memiliki urutan:

```tsx
Imports

↓

Interface

↓

Component

↓

Return JSX

↓

Export
```

---

# 16. Theme

Jangan Hardcode warna.

Jangan

```ts
backgroundColor: "#00BFA6"
```

Gunakan Theme

```ts
colors.primary
spacing.md
radius.lg
typography.body
```

Semua style berasal dari Theme.

---

# 17. Folder Structure

Project kecil

```
PrimaryButton.tsx
```

Project menengah

```
PrimaryButton

├── PrimaryButton.tsx

├── PrimaryButton.styles.ts

├── PrimaryButton.types.ts
```

Project besar

```
PrimaryButton

├── index.ts

├── PrimaryButton.tsx

├── PrimaryButton.styles.ts

├── PrimaryButton.types.ts
```

---

# 18. index.ts

index.ts disebut Barrel Export.

Contoh

```ts
export { default } from "./PrimaryButton";

export * from "./PrimaryButton.types";
```

Keuntungan

Import menjadi lebih pendek.

Tanpa index

```ts
import PrimaryButton from "./PrimaryButton/PrimaryButton";
```

Dengan index

```ts
import PrimaryButton from "./PrimaryButton";
```

---

# 19. Pola Berpikir Hari Ini

React bukan tentang menghafal syntax.

Urutannya adalah

```
UI

↓

Component

↓

Props

↓

Interface

↓

Type

↓

Theme

↓

Styling
```

Jika memahami urutan ini, maka syntax akan lebih mudah dipelajari.

---

# Kesimpulan

Hari ini saya memahami bahwa:

✅ Component adalah UI yang dapat digunakan kembali.

✅ Props adalah Object yang dikirim dari Parent ke Child.

✅ Interface adalah kontrak bentuk Props.

✅ Type Annotation memastikan Props sesuai Interface.

✅ Optional Props menggunakan tanda ?.

✅ React memisahkan Presentation dengan Logic.

✅ Theme digunakan agar Design System tetap konsisten.

Target berikutnya adalah mengimplementasikan `PrimaryButton.tsx` menggunakan konsep-konsep di atas.