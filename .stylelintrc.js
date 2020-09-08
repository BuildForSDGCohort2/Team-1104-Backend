module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {
    'rule-empty-line-before': 'always-multi-line',
    'font-family-no-missing-generic-family-keyword': [
      true,
      {
        ignoreValues: [
          'icons',
          'evilebottnawi-icon-font-1',
          'evilebottnawi-icon-font-2'
        ]
      }
    ]
  }
};
