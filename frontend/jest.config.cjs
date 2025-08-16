module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    // map static assets to a stub module if needed:
    '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/test/__mocks__/fileStub.js',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
};
