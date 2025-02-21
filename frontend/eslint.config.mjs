import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import stylisticJs from '@stylistic/eslint-plugin-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      '@stylistic/js': stylisticJs
    },
    rules: {
      'no-unused-vars': 'off',
      'import/order': 2,
      'import/no-duplicates': 2,
      'quotes': ['error', 'single'],
      'indent': ['error', 2],
      'react/jsx-indent': ['error', 2],
      'react/jsx-indent-props': ['error', 2],
      '@typescript-eslint/no-explicit-any': 'off',
      'semi': ['error', 'always'],
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: 'return',
        },
        {
          blankLine: 'always',
          prev: 'expression',
          next: 'if',
        },
        {
          blankLine: 'always',
          prev: 'expression',
          next: 'for',
        },
        {
          blankLine: 'always',
          prev: 'expression',
          next: 'function',
        },
        {
          blankLine: 'always',
          prev: 'import',
          next: 'const',
        },
        {
          blankLine: 'always',
          prev: 'import',
          next: 'export',
        },
        {
          blankLine: 'always',
          prev: 'const',
          next: 'export',
        },
        {
          blankLine: 'always',
          prev: 'let',
          next: 'export',
        },
        {
          blankLine: 'always',
          prev: 'function',
          next: 'export',
        },
        {
          blankLine: 'always',
          prev: 'import',
          next: 'let',
        },
        {
          blankLine: 'always',
          prev: 'function',
          next: 'expression',
        },
        {
          blankLine: 'always',
          prev: 'const',
          next: 'expression',
        },
        {
          blankLine: 'always',
          prev: '*',
          next: 'try',
        },
        {
          blankLine: 'always',
          prev: '*',
          next: 'throw',
        },
        {
          blankLine: 'always',
          prev: '*',
          next: 'function',
        },
        {
          blankLine: 'always',
          prev: 'function',
          next: '*',
        },
      ],
    },
  }
];

export default eslintConfig;
