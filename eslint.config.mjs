import path from 'node:path';
import { fileURLToPath } from 'node:url';
import typescriptEslintEslintPlugin from '@typescript-eslint/eslint-plugin';
import _import from 'eslint-plugin-import';
import { fixupPluginRules } from '@eslint/compat';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends(
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ),
  {
    plugins: {
      '@typescript-eslint': typescriptEslintEslintPlugin,
      import: fixupPluginRules(_import),
    },

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },

      parser: tsParser,
      ecmaVersion: 5,
      sourceType: 'module',

      parserOptions: {
        project: path.resolve(__dirname, 'tsconfig.json'),
      },
    },

    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'import/order': 2,
      'import/no-duplicates': 2,
      '@typescript-eslint/no-empty-object-type': [
        'error',
        { allowInterfaces: 'with-single-extends' },
      ],
      '@typescript-eslint/no-duplicate-enum-values': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
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
  },
];
