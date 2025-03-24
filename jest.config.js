const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
  testEnvironment: 'jsdom',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^next/navigation$': '<rootDir>/__mocks__/next/navigation.js',
    '^@/components/(.*)$': '<rootDir>/components/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)
