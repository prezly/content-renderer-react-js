import { createDefaultEsmPreset } from 'ts-jest';

const preset = createDefaultEsmPreset({
    tsconfig: 'tsconfig.jest.json',
});

export default {
    ...preset,
    coveragePathIgnorePatterns: ['/node_modules/', '/build/'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'mjs', 'jsx', 'json'],
    moduleNameMapper: {
        '\\.(scss|svg)$': '<rootDir>/universalMock.mjs',
    },
    testEnvironment: 'jsdom',
    // `tests/` holds the Playwright visual specs, which Jest must not pick up.
    testPathIgnorePatterns: ['/node_modules/', '/build/', '<rootDir>/tests/'],
};
