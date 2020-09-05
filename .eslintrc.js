module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  plugins: ['simple-import-sort', 'import'],
  extends: [
    // Uses the recommended rules from @typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/recommended',
    // Uses the recommended rules from @eslint-plugin-react
    'plugin:react/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  root: true,
  rules: {
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/jsx-curly-spacing': ['error', {
      'when': 'always',
      'allowMultiline': false,
      'children': true,
      'spacing': {
        'objectLiterals': 'never',
      },
    }],
    'jsx-quotes': ['error', 'prefer-single'],
    'react/jsx-tag-spacing': ['error', {
      'closingSlash': 'never',
      'beforeSelfClosing': 'always',
      'afterOpening': 'never',
      'beforeClosing': 'never',
    }],
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-angle-bracket-type-assertion': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'eol-last': ['error', 'always'],
    'max-len': ['error', {
      'code': 100,
      'ignoreComments': false,
      'ignoreUrls': true,
    }],
    'semi': 2,
    'indent': [
      'error', 2,
      { 'SwitchCase': 1 },
    ],
    'padding-line-between-statements': [
      'error',
      { 'blankLine': 'always', 'prev': '*', 'next': 'return' },
    ],
    'simple-import-sort/sort': 'error',
    'import/newline-after-import': ['error', { 'count': 1 }],
    'no-multiple-empty-lines': ['error', { 'max': 1 }],
    'comma-spacing': ['error', { 'before': false, 'after': true }],
    'object-curly-spacing': ['error', 'always', { 'objectsInObjects': false }],
    'quotes': ['error', 'single', {
      'allowTemplateLiterals': true,
      'avoidEscape': true,
    }],
    'space-before-function-paren': ['error', {
      'anonymous': 'never',
      'named': 'never',
      'asyncArrow': 'always',
    }],
    'no-multi-spaces': ['error', { 'ignoreEOLComments': true }],
  },
  settings: {
    react: {
      // Tells eslint-plugin-react to automatically detect the version of React to use
      version: 'detect',
    },
  },
};
