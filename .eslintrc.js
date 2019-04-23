module.exports = {
  root: true,
  extends: ['plugin:prettier/recommended', 'eslint:recommended'],
  plugins: ['standard'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'none',
        bracketSpacing: true,
        jsxBracketSameLine: true,
        parser: 'flow'
      }
    ]
  }
}
