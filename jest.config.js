module.exports = {
    coveragePathIgnorePatterns: ['/node_modules/', '/build/'],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.jest.json',
        },
    },
    moduleNameMapper: {
        '\\.(scss|svg)$': '<rootDir>/universalMock',
    },
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: ['/node_modules/', '/build/'],
    transform: {
        '^.+\\.(ts|tsx|js|jsx|mjs)$': 'babel-jest',
    },
    transformIgnorePatterns: ['/node_modules/(?!@prezly/slate-)(.*)'],
};
