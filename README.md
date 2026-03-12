# React + TypeScript + Vite Template

This is a minimal React + TypeScript template using [Vite](https://vite.dev/) with HMR, ESLint rules, and a modern frontend setup. It's optimized for fast development while giving you the flexibility to expand for production apps.

You can see a working demo of a project using this setup here: https://mutimutujehope.vercel.app/

---

## Available Plugins

Currently, two official React plugins are supported in Vite:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) – uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) – uses [SWC](https://swc.rs/) for Fast Refresh.

---

## React Compiler

The React Compiler is **not enabled by default** in this template due to its impact on dev & build performance.  
To add it, follow the official documentation: [React Compiler Installation](https://react.dev/learn/react-compiler/installation).

---

## ESLint Configuration

This template comes with a basic ESLint setup. For production apps, you may want to enable **type-aware lint rules** for stricter type safety and coding standards:

```js
import { defineConfig } from 'eslint-define-config';
import tseslint from '@typescript-eslint/eslint-plugin';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Recommended type-checked rules
      tseslint.configs.recommendedTypeChecked,
      // Strict rules (optional)
      tseslint.configs.strictTypeChecked,
      // Stylistic rules (optional)
      tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
