# Sprint 1 - Design System Foundation

> **Goal Sprint**
>
> Setelah menyelesaikan Sprint 1, developer mampu membangun sebuah **Design System** yang menjadi *Single Source of Truth* untuk seluruh tampilan aplikasi. Semua komponen pada Sprint berikutnya (Button, Card, Input, Header, Dashboard, dll.) wajib menggunakan token yang telah dibuat pada sprint ini.

---

# Learning Objectives

Pada sprint ini kita mempelajari:

- Apa itu Design System
- Apa itu Design Token
- Single Source of Truth (SSOT)
- Perbedaan Java OOP dan Module TypeScript
- Named Export vs Default Export
- Barrel Export (`index.ts`)
- Theme Architecture
- Reusable Styling
- Konsep Theme pada React Native

---

# Mengapa Harus Membuat Theme?

Misalnya kita memiliki tombol.

Tanpa Theme

```tsx
<Button
    style={{
        backgroundColor:"#28A79E",
        padding:16,
        borderRadius:8
    }}
/>
```

Button kedua

```tsx
<Button
    style={{
        backgroundColor:"#28A79E",
        padding:16,
        borderRadius:8
    }}
/>
```

Button ketiga

```tsx
<Button
    style={{
        backgroundColor:"#28A79E",
        padding:16,
        borderRadius:8
    }}
/>
```

Terjadi pengulangan (*Hardcoded Value*).

Masalahnya:

- Sulit diubah
- Tidak konsisten
- Tidak scalable

---

# Solusi

Semua nilai visual dipindahkan ke Theme.

```text
Theme
│
├── colors
├── spacing
├── radius
├── typography
└── shadows
```

Lalu digunakan seperti

```tsx
backgroundColor: colors.primary

padding: spacing.md

borderRadius: radius.md

...typography.button

...shadows.sm
```

Sekarang seluruh aplikasi mengambil nilai dari satu sumber.

Inilah yang disebut

> **Single Source of Truth (SSOT)**

---

# Struktur Folder

```text
src/
│
├── components/
│
├── screens/
│
└── theme/
    │
    ├── colors.ts
    ├── spacing.ts
    ├── radius.ts
    ├── typography.ts
    ├── shadows.ts
    └── index.ts
```

---

# Theme Architecture

```text
Theme

↓

Design Token

↓

Reusable Component

↓

Screen

↓

Application
```

Artinya

```
Theme
```

tidak mengetahui adanya Button.

Tetapi

```
Button
```

menggunakan Theme.

Ini disebut

**One Way Dependency**

```
Theme

↓

Button

↓

Dashboard
```

---

# Design Token

Design Token adalah nilai desain yang digunakan kembali di seluruh aplikasi.

Contohnya

## Colors

```ts
colors.primary
```

menghasilkan

```ts
"#28A79E"
```

---

## Spacing

```ts
spacing.md
```

menghasilkan

```ts
16
```

---

## Radius

```ts
radius.md
```

menghasilkan

```ts
8
```

---

## Typography

```ts
typography.title
```

menghasilkan

```ts
{
    fontSize:20,
    fontWeight:"700",
    fontFamily:"Inter"
}
```

---

## Shadow

```ts
shadows.sm
```

menghasilkan sebuah object shadow.

---

# Kenapa Colors berupa String?

Property React Native

```tsx
backgroundColor
```

menerima

```ts
string
```

Misalnya

```tsx
backgroundColor:"#28A79E"
```

Sehingga

```ts
colors.primary
```

berupa String.

---

# Kenapa Spacing berupa Number?

Property

```tsx
padding

margin

gap
```

menerima

```ts
number
```

Misalnya

```tsx
padding:16
```

Maka

```ts
spacing.md
```

berupa Number.

Catatan:

TypeScript tidak memiliki tipe

```ts
int
```

melainkan

```ts
number
```

---

# Kenapa Radius berupa Number?

Karena

```tsx
borderRadius
```

menerima

```ts
number
```

Contoh

```tsx
borderRadius:8
```

Sehingga

```ts
radius.md
```

menghasilkan Number.

---

# Kenapa Typography berupa Object?

Typography bukan hanya fontSize.

Typography terdiri dari

- fontFamily
- fontSize
- fontWeight
- lineHeight
- letterSpacing
- color (opsional)

Misalnya

```ts
typography.title
```

menghasilkan

```ts
{
    fontFamily:"Inter",
    fontSize:20,
    fontWeight:"700"
}
```

Lalu digunakan langsung

```tsx
<Text style={typography.title}>
```

lebih baik daripada

```tsx
<Text
style={{
fontFamily:...
fontSize:...
fontWeight:...
}}
```

---

# Kenapa Shadow berupa Object?

Shadow terdiri dari beberapa property.

Misalnya

- shadowColor
- shadowOpacity
- shadowOffset
- shadowRadius
- elevation

Karena memiliki banyak property, maka shadow dibuat menjadi Object.

Misalnya

```ts
shadows.md
```

---

# as const

Semua Theme menggunakan

```ts
as const
```

Contoh

```ts
export const spacing = {
    sm:8,
    md:16
} as const;
```

Keuntungan

- Readonly
- Literal Type
- Mencegah perubahan nilai
- Aman digunakan sebagai Design Token

---

# Named Export

Setiap Theme menggunakan

```ts
export const
```

Contoh

```ts
export const colors={}
```

bukan

```ts
export default
```

Karena

Named Export

- Konsisten
- Mudah Auto Import
- Mudah Refactor
- Import selalu menggunakan nama yang sama

---

# Barrel Export

Daripada

```ts
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { radius } from "@/theme/radius";
```

kita membuat

```text
theme/index.ts
```

berisi

```ts
export * from "./colors";
export * from "./spacing";
export * from "./radius";
export * from "./typography";
export * from "./shadows";
```

Kemudian cukup

```ts
import {
colors,
spacing,
radius,
typography,
shadows
} from "@/theme";
```

Inilah yang disebut

**Barrel Export**

---

# Prinsip Penting

## Jangan Hardcode

Jangan

```tsx
padding:16
```

Gunakan

```tsx
padding:spacing.md
```

---

Jangan

```tsx
backgroundColor:"#28A79E"
```

Gunakan

```tsx
backgroundColor:colors.primary
```

---

Jangan

```tsx
borderRadius:8
```

Gunakan

```tsx
borderRadius:radius.md
```

---

Jangan

```tsx
fontSize:20
```

Gunakan

```tsx
...typography.title
```

---

# Dependency Flow

```text
Theme

↓

PrimaryButton

↓

Dashboard

↓

Application
```

Semua komponen wajib menggunakan Theme.

Komponen **tidak boleh** membuat styling sendiri jika token sudah tersedia.

---

# Hasil Sprint 1

Setelah sprint ini selesai, project memiliki:

```text
theme/
│
├── colors.ts
├── spacing.ts
├── radius.ts
├── typography.ts
├── shadows.ts
└── index.ts
```

Semua file tersebut akan digunakan kembali pada Sprint berikutnya.

---

# Sprint 2 Preview

Pada Sprint berikutnya kita akan membangun:

```text
PrimaryButton

↓

SecondaryButton

↓

Input

↓

Header

↓

Card

↓

Layout Component
```

Seluruh komponen tersebut **wajib menggunakan Theme** yang telah dibuat pada Sprint 1.

Dengan demikian tampilan aplikasi menjadi:

- Konsisten
- Mudah dirawat
- Mudah dikembangkan
- Mengikuti standar Design System modern
- Siap digunakan untuk project skala besar