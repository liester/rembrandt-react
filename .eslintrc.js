module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true
    }
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js']
      }
    }
  },
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  plugins: ['react', 'import', 'babel'],
  globals: {},
  rules: {
    'array-bracket-spacing': ['error', 'never'],
    'arrow-parens': ['error', 'as-needed'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'block-spacing': ['error', 'always'],
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    camelcase: ['error', { properties: 'always' }],
    'comma-dangle': ['error', 'always-multiline'],
    'comma-spacing': ['error', { before: false, after: true }],
    'comma-style': ['error', 'last'],
    'computed-property-spacing': ['error', 'never'],
    curly: 'error',
    'eol-last': ['error', 'unix'],
    eqeqeq: 'error',
    'func-call-spacing': ['error', 'never'],
    'func-names': 'off',
    'import/no-unresolved': ['error', { ignore: ['config'] }],
    indent: ['error', 2, { SwitchCase: 1 }],
    'key-spacing': [
      'error',
      { beforeColon: false, afterColon: true, mode: 'strict' }
    ],
    'keyword-spacing': ['error', { before: true, after: true }],
    'max-len': ['error', 150, 2],
    'no-array-constructor': 'error',
    'no-cond-assign': 'error',
    'no-console': 'error',
    'no-const-assign': 'error',
    'no-duplicate-imports': 'error',
    'no-extra-semi': 'error',
    'no-fallthrough': 'error',
    'no-multi-spaces': 'error',
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'no-redeclare': ['error'],
    'no-trailing-spaces': 'error',
    'no-undef': 'error',
    'no-unused-expressions': 'error',
    'no-unused-vars': [
      'error',
      { args: 'after-used', ignoreRestSiblings: true }
    ],
    'no-var': 'error',
    'object-curly-spacing': ['error', 'always'],
    'one-var': [
      'error',
      {
        initialized: 'never',
        uninitialized: 'always'
      }
    ],
    'operator-linebreak': ['error', 'before'],
    'padded-blocks': ['error', 'never'],
    'prefer-const': 'error',
    'prefer-template': 'error',
    'quote-props': ['error', 'as-needed'],
    quotes: ['error', 'single', 'avoid-escape'],
    semi: 'off', // overridden by babel/semi
    'semi-spacing': ['error', { before: false, after: true }],
    'space-before-blocks': ['error', 'always'],
    'space-before-function-paren': ['error', 'never'],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': ['error', { int32Hint: false }],
    'spaced-comment': [
      'error',
      'always',
      {
        line: {
          markers: ['/'],
          exceptions: ['-']
        },
        block: {
          balanced: true,
          markers: ['!'],
          exceptions: ['*']
        }
      }
    ],
    strict: ['error', 'global'],
    'template-curly-spacing': ['error', 'never'],

    'babel/semi': ['error', 'always'],

    // react
    'jsx-quotes': ['error', 'prefer-double'],
    'react/default-props-match-prop-types': 'error',
    'react/display-name': 'off',
    'react/jsx-boolean-value': 'off',
    'react/jsx-indent': ['error', 2],
    'react/jsx-no-undef': 'warn',
    'react/jsx-sort-props': 'off',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'warn',
    'react/no-did-mount-set-state': ['warn'],
    'react/no-did-update-set-state': ['warn'],
    'react/no-multi-comp': 'off',
    'react/no-typos': 'error',
    'react/no-unknown-property': 'off',
    'react/no-unused-prop-types': 'error',
    'react/prop-types': ['error', { skipUndeclared: true }],
    'react/react-in-jsx-scope': 'off',
    'react/self-closing-comp': 'warn',
    'react/wrap-multilines': 'off'
  }
};
