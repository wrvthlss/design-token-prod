import eslintRecommended from '@eslint/js'; // For ESLint's recommended rules
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  eslintRecommended.configs.recommended,

  prettierConfig,

  {
    languageOptions: {
      globals: {
        __dirname: 'readonly',
        process: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
      },
    },
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'error', // Enforce Prettier formatting as ESLint errors
    },
  },
];