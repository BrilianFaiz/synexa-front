 Wrote IMPORT_GUIDE.md
# Panduan Impor Komponen (React + TypeScript)

## 1. Export vs Import

### Named Export (Disarankan)
Gunakan ini untuk kemudahan *barrel file* (`index.ts`).

**File `src/components/Button.tsx`:**
```typescript
export const Button = () => <button>Click</button>;
```

**Import:**
```typescript
import { Button } from '@/components/Button';
```

### Default Export
Hanya satu per file, tidak disarankan jika ingin menggunakan *barrel file*.

**File `src/components/Button.tsx`:**
```typescript
const Button = () => <button>Click</button>;
export default Button;
```

**Import:**
```typescript
import Button from '@/components/Button';
```

---

## 2. Alias Path (`tsconfig.json`)

Alias mencegah path panjang seperti `../../../../components/Button`.

**`tsconfig.json`:**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

---

## 3. Barrel File (`index.ts`)

Mengumpulkan semua komponen agar import dari satu titik.

**File `src/components/index.ts`:**
```typescript
export * from './Button';
export * from './Text';
```

**Import di Page:**
```typescript
import { Button, Text } from '@/components';
```
