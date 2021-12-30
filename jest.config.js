export default {
    coveragePathIgnorePatterns: ['/node_modules/', '/build/'],
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    globals: {
        'ts-jest': {
            type: 'module',
            tsconfig: 'tsconfig.jest.json',
            useESM: true,
        },
    },
    moduleNameMapper: {
        '\\.(scss|svg)$': '<rootDir>/universalMock.js',
    },
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: ['/node_modules/', '/build/'],
};
