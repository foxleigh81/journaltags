module.exports = {
  root: true,
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  overrides: [
    {
      files: ['**/*.js', '**/*.jsx'],
      env: {
        browser: true
      },
      extends: ['plugin:react/recommended', 'prettier']
    },
    {
      files: ['**/*.spec.js*']
    }
  ],
  env: {
    browser: true,
    node: true
  },
  rules: {
    'react/prop-types': [2, { ignore: ['children'] }]
  }
};
