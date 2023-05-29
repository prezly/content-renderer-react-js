module.exports = {
    extends: ['@prezly', '@prezly/eslint-config/react'],
    parserOptions: {
        project: ['./tsconfig.eslint.json'],
    },
    rules: {
        // TODO: Address violations of these rules
        'no-restricted-syntax': 'off',
        'func-style': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        'import/no-default-export': 'off',

        // TODO: This can be addressed with custom rule definitions
        '@typescript-eslint/naming-convention': 'off',
    },
    overrides: [
        {
            files: ['.eslintrc.js'],
            rules: {
                '@typescript-eslint/naming-convention': 'off',
            },
        },
        {
            files: ['**/*.stories.tsx', '**/*.stories.ts', './src/dev/**'],
            rules: {
                'import/no-extraneous-dependencies': 'off',
            },
        },
    ],
};
