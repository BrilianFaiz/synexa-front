# Project Architecture

## Overview
Synexa frontend is an Expo 54 + React Native application with file-based routing through Expo Router.

The runtime entrypoint is defined in `package.json` as `expo-router/entry`. Expo app-level configuration lives in `app.json`.

The codebase is still early-stage. The current architecture is mostly screen-driven, uses local component state, and has not introduced a dedicated API/service layer or global state layer yet.

## Tech stack
- **Framework:** Expo `~54.0.34`
- **UI runtime:** React `19.1.0`, React Native `0.81.5`
- **Routing:** `expo-router` `~6.0.23`
- **Language:** TypeScript
- **Navigation deps:** `@react-navigation/native`, `@react-navigation/bottom-tabs`, `@react-navigation/elements`
- **Charts:** `react-native-chart-kit`, `react-native-svg`
- **UX/support libs:** `expo-haptics`, `expo-image`, `expo-splash-screen`, `react-native-reanimated`, `react-native-safe-area-context`, `react-native-screens`

## High-level structure

```text
front/
├─ app.json                      # Expo app config
├─ package.json                  # scripts, dependencies, runtime entry
├─ constants/
│  └─ theme.ts                   # light/dark theme tokens used by themed hooks
├─ scripts/
│  └─ reset-project.js           # Expo starter reset script
├─ src/
│  ├─ app/                       # Expo Router route files
│  │  ├─ layout.tsx              # currently empty; intended layout shell file but not _layout.tsx
│  │  ├─ dashboard.tsx           # dashboard screen with local chart state
│  │  ├─ login.tsx               # login placeholder screen
│  │  ├─ register.tsx            # registration form with local state
│  │  └─ (tabs)/
│  │     ├─ _layout.tsx          # currently empty
│  │     └─ index.tsx            # home/landing screen inside tabs group
│  ├─ assets/
│  │  └─ images/                 # app images and starter assets
│  ├─ components/
│  │  ├─ buttons/
│  │  │  └─ ButtonPrimary/       # reusable primary button component
│  │  ├─ ui/                     # starter UI helpers
│  │  ├─ themed-text.tsx         # theme-aware text wrapper
│  │  ├─ themed-view.tsx         # theme-aware view wrapper
│  │  ├─ parallax-scroll-view.tsx
│  │  ├─ haptic-tab.tsx
│  │  └─ external-link.tsx
│  ├─ hooks/
│  │  ├─ use-color-scheme.ts
│  │  ├─ use-color-scheme.web.ts
│  │  └─ use-theme-color.ts
│  └─ theme/                     # custom design tokens
│     ├─ colors.ts
│     ├─ spacing.ts
│     ├─ radius.ts
│     ├─ typography.ts
│     ├─ shadows.ts
│     └─ index.ts
└─ README.md                     # default Expo starter readme
```

## Routing and screen flow
Routing is file-based and lives under `src/app`.

### Current routes
- `src/app/(tabs)/index.tsx`
  - Current landing screen.
  - Presents entry actions for register, login, and dashboard.
  - Uses `useRouter()` directly inside the screen and calls `router.push(...)` on button presses.

- `src/app/login.tsx`
  - Placeholder login screen.
  - No form logic yet.

- `src/app/register.tsx`
  - Registration screen.
  - Uses local `useState()` for `nama`, `email`, and `password`.
  - Submit action currently logs form data to `console.log`.
  - Navigates to `/(tabs)` via `useRouter()`.

- `src/app/dashboard.tsx`
  - Monitoring dashboard screen.
  - Holds local state for `heartRate`, `spo2`, and `history`.
  - Simulates heart rate updates with `useEffect()` + `setInterval()`.
  - Navigates to `/(tabs)` via `useRouter()`.

### Layout state
There are two layout-related files in the repo right now:
- `src/app/layout.tsx`
- `src/app/(tabs)/_layout.tsx`

Both are currently empty.

That means the router shell is incomplete in the current codebase. Navigation exists at the screen level, but shared layout composition is not implemented yet.

## UI component architecture
The UI is split into:
1. **Route screens** under `src/app`
2. **Reusable components** under `src/components`

### Main reusable component in active use
`src/components/buttons/ButtonPrimary/`
- `ButtonPrimary.tsx` renders a `TouchableOpacity` + `Text`
- `ButtonPrimaryStyle.tsx` defines component styles with shared theme tokens
- `ButtonPrimaryType.tsx` defines the prop interface:
  - `title: string`
  - `onPress: () => void`

This is the clearest example of the current component pattern: a component folder with implementation, styles, and types colocated.

### Shared starter/theme-aware components
These components are present and reusable, but they are not central to the current user flow yet:
- `src/components/themed-text.tsx`
- `src/components/themed-view.tsx`
- `src/components/parallax-scroll-view.tsx`
- `src/components/haptic-tab.tsx`
- `src/components/external-link.tsx`
- `src/components/ui/collapsible.tsx`
- `src/components/ui/icon-symbol.tsx`
- `src/components/ui/icon-symbol.ios.tsx`
- `src/components/hello-wave.tsx`

Several of these look like Expo starter components kept from the template and not yet fully integrated into the app-specific flows.

## Styling and design tokens
The project currently has **two theme sources**.

### 1. App-wide light/dark theme source
`constants/theme.ts`
- Defines `Colors.light` and `Colors.dark`
- Defines `Fonts`
- Is consumed by `src/hooks/use-theme-color.ts`
- Powers theme-aware wrappers such as:
  - `src/components/themed-text.tsx`
  - `src/components/themed-view.tsx`
  - `src/components/ui/collapsible.tsx`

### 2. Custom design token set
`src/theme/*`
- `colors.ts`
- `spacing.ts`
- `radius.ts`
- `typography.ts`
- `shadows.ts`
- `index.ts`

This token set is used directly by `ButtonPrimaryStyle.tsx`.

### Current implication
The app is not using one unified design system yet.
- Theme-aware shared components resolve colors from `constants/theme.ts`
- The custom primary button resolves tokens from `src/theme/*`

So the styling architecture is partially split between Expo starter theming and app-specific tokens.

## Hooks and cross-cutting UI helpers
### `src/hooks/use-theme-color.ts`
This hook is the main theme resolver for themed components.
- Reads the current color scheme from `useColorScheme()`
- Accepts optional light/dark overrides
- Falls back to `Colors[theme][colorName]` from `constants/theme.ts`

### `src/hooks/use-color-scheme.ts`
Provides a small hydration-safe wrapper around `react-native` color scheme detection for web/static rendering.

### `src/hooks/use-color-scheme.web.ts`
Exports the native `useColorScheme` directly for web.

## State and data flow
Current state management is entirely local to screens/components.

### Register screen
`src/app/register.tsx`
- Holds form values in component state with `useState()`
- No validation layer
- No API call
- No persistence
- No auth/session storage

### Dashboard screen
`src/app/dashboard.tsx`
- Holds display data in component state
- Generates heart rate updates in-component with `setInterval()`
- Keeps a rolling chart history array in local state
- No backend sync

### What is not present yet
There is currently no visible:
- API client module
- service/repository layer
- global state store
- React context for business/domain state
- storage layer such as AsyncStorage
- auth/session management layer

The current data flow is UI-local and mocked.

## Charts and monitoring UI
The monitoring screen in `src/app/dashboard.tsx` uses `LineChart` from `react-native-chart-kit`.

Current chart characteristics:
- data source comes from local `history` state
- chart width is derived from `Dimensions.get('window').width - 32`
- data is simulated in the component rather than loaded externally

This makes the dashboard a presentation-first prototype rather than a connected monitoring feature.

## Assets and configuration notes
- App configuration is defined in `app.json`
- App images in the repo are currently under `src/assets/images`
- `app.json` references image paths under `./assets/images/...`

That means asset organization should be treated carefully when wiring build/runtime assets, because config paths and source tree layout are not fully aligned in the current repo snapshot.

## Current limitations
The current architecture has a few clear gaps:
- `src/app/layout.tsx` exists but is empty and is not named `_layout.tsx`
- `src/app/(tabs)/_layout.tsx` exists but is empty
- login is still a placeholder screen
- register only stores local state and logs to console
- dashboard uses generated/mock data
- theming is split across `constants/theme.ts` and `src/theme/*`
- there is no API/service/state architecture yet

## Summary
Today, this project is best described as an early Expo Router application with:
- route-based screens in `src/app`
- one active reusable button component pattern
- starter themed components still available from the Expo template
- local screen state only
- a split theming approach
- no backend or domain layer yet

That is a solid base for UI prototyping, but the next architectural step will be to unify layout, theme, and data flow once real authentication and patient-monitoring APIs are introduced.
