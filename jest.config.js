module.exports = {
  preset: '@shelf/jest-mongodb',
  clearMocks: true,
  coverageDirectory: 'coverage',
  reporters: ['default', 'jest-junit'],
  testEnvironment: 'node',
  testResultsProcessor: 'jest-junit'
};
