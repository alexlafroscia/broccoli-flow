module.exports = {
  'extends': 'eslint:recommended',
  'plugins': [
    'mocha'
  ],
  'env': {
    'node': true
  },
  'parserOptions': {
    'ecmaVersion': 6,
    'sourceType': 'module',
  },
  'rules': {
    // Mocha
    'mocha/no-exclusive-tests': 'error',
    'mocha/no-skipped-tests': 'error',

    // Built-in
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'no-console': 'off',
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ]
  }
};
