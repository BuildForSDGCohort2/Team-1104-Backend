module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    node: true,
    commonjs: true,
    jest: true
  },
  extends: ['airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'comma-dangle': ['error', 'never'],
    'linebreak-style': ['error', 'windows'],
    'arrow-body-style': ['error', 'always'],
    'import/newline-after-import': 'off',
    'new-cap': ['error', { newIsCap: false }],
    'func-names': ['error', 'never'],
    'object-shorthand': ['error', 'never'],
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTaggedTemplates: true,
        allowTernary: false
      }
    ],
    'no-useless-escape': ['error', 'never'],
    'object-shorthand': ['error', 'never']
  }
};
