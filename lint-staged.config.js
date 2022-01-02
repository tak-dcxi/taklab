module.exports = {
  '*.{ts,tsx}': [() => 'tsc --noEmit', 'eslint --fix'],
  '*.{css,scss,tsx}': 'stylelint --fix',
  '*': 'prettier -w -u',
}
