module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  rules: {
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'no-public',
        overrides: {
          constructors: 'off',
        },
      },
    ],
    '@typescript-eslint/no-explicit-any': 0,
    'array-type': 0,
    'arrow-parens': 0,
    'interface-name': 0,
    'max-classes-per-file': 0,
    'no-console': 0,
    'no-empty': 0,
    'no-namespace': 0,
    'no-unused-expression': 0,
    'object-literal-sort-keys': 0,
    'only-arrow-functions': 0,
    'ordered-imports': 0,
    quotes: [2, 'single'],
    'comma-dangle': [
      2,
      {
        objects: 'always-multiline',
        arrays: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    eqeqeq: [2, 'smart'],
    'no-underscore-dangle': [2, { allowAfterThis: true }],
  },
};
