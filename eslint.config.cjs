//  eslint.config.cjs

//  This is a mapping of the configuration options that can be used
//  when using an `eslint.config.cjs` ESLint configuration file.

//  To include the pre-defined recommended rules from ESLint,
//  install the package @eslint/js. Then, require the package:
//  const js = require(@eslint/js);
//  and then add this to the array of configuration: js.configs.recommended
const js = require('@eslint/js');

const eslintConfig = 'eslint-config';

module.exports = [
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
      globals: [],
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
