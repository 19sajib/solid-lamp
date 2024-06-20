// jest.config.ts
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  rootDir: '.',
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'node',
};

export default config;
  