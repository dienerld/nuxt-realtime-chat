import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  stylistic: {
    overrides: { 'antfu/if-newline': 'off' },
  },
  vue: {
    overrides: {
      'vue/max-attributes-per-line': ['error', {
        singleline: {
          max: 3,
        },
        multiline: {
          max: 2,
        },
      }],
    },
  },
  rules: {
    'no-console': 'off',
  },
})
