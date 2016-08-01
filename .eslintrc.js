module.exports = {
  'extends': 'eslint:recommended',
  'env': {
    'node': true
  },
  'parserOptions': {
    'ecmaVersion': 6,
    'sourceType': 'module',
  },
  'rules': {
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
