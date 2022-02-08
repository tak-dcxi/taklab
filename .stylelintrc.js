module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  plugins: ['stylelint-order'],
  rules: {
    'at-rule-no-unknown': null,
    'rule-empty-line-before': [
      'always',
      {
        except: ['after-single-line-comment', 'first-nested'],
        ignore: ['after-comment', 'first-nested'],
      },
    ],
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['first-nested', 'blockless-after-blockless'],
        ignore: ['after-comment'],
        ignoreAtRules: ['else'],
      },
    ],
    'order/properties-alphabetical-order': true,
    'value-keyword-case': null,
    'color-hex-case': 'lower',
    'number-leading-zero': null,
    'value-no-vendor-prefix': null,
    'property-no-vendor-prefix': null,
    'declaration-block-no-shorthand-property-overrides': null,
    'declaration-colon-newline-after': null,
    'value-list-comma-newline-after': null,
    'no-descending-specificity': null,
    'no-duplicate-selectors': null,
    'block-no-empty': null,
    'at-rule-blacklist': null,
    'custom-property-empty-line-before': null,
  },
  ignoreFiles: ['dist/**/*.css', 'node_modules/**/*.css'],
}
