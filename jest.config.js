module.exports = {
  preset: '@shelf/jest-mongodb',
  testTimeout: 30000,
  clearMocks: true,
  coverageDirectory: 'coverage',
  reporters: ['default', 'jest-junit'],
  testEnvironment: 'node',
  testResultsProcessor: 'jest-junit'
};
