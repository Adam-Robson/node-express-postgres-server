import js from '@eslint/js'

const eslintConfig = 'eslint-config';

export default [
  js.configs.recommended,
  {
    name: eslintConfig,
    files: [
      './**/*.js'
    ],
    ignores: [],
    languageOptions: {
      ecmaVersion: 'es2020',
      sourceType: 'commonjs',
      globals: [
        'process'
      ],
      parser: '@babel/eslint-parser',
      parserOptions: {},
    },
    linterOptions: {
      noInlineConfig: false,
      reportUnusedDisableDirectives: true,
    },
    plugins: [
      '@babel'
    ],
    rules: {
      noConsole: {
        allow: [
          'warn',
          'error',
          'info'
        ]
      },
      indent: [
        'error',
        2,
        {
          switchCase: 1
        }
      ],
      quotes: [
        'error',
        'single'
      ],
      semi: [
        'error',
        'always'
      ],
      spaceInParens: [
        'error'
      ],
      spaceInfixOps: 'error',
      objectCurlySpacing: [
        'error',
        'always'
      ],
      commaSpacing: 'error',
      eolLast: [
        'error',
        'always'
      ],
      arrowSpacing: [
        'error',
        {
          before: true,
          after: true
        }
      ],
      arrayBracketSpacing: 'error',
      preferConst: 'error',
      noVar: 'error',
      restSpreadSpacing: 'error',
      preferArrowCallback: 'error',
      objectShorthand: [
        'error',
        'always'
      ]
    }
  }
];
