import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react' // 1. 引入 react 插件
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      react, // 2. 註冊插件
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: {
      react: { version: 'detect' }, // 自動偵測 React 版本
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules, // 3. 繼承 React 標準規則
      ...react.configs['jsx-runtime'].rules, // 4. 支援 React 17+ 的 JSX 轉譯
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'no-console' : 'warn',
      // 關鍵：這兩行確保 ESLint 知道 JSX 標籤代表變數已被使用
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/prop-types': 'off',
    },
  },
])