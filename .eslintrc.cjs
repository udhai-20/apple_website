module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
    
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh',"@sentry/react"],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "max-len":[2,250],
    "no-multiple-empty-line":[
      "error",{"max":1,"maxEOF":1}
    ],
    "object-curly-newline":0
  },
}


