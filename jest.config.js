module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  reporters: ['default', 'jest-junit'],
  testEnvironment: 'node',
  testResultsProcessor: 'jest-junit'
};
