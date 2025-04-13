export default {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.mjs'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
};
