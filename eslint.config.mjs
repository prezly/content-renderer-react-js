import reactConfig from '@prezly/eslint-config/react';

export default [
    {
        ignores: [
            '.prettierrc.js',
            'build/',
            'coverage/',
            'node_modules/',
            'storybook-static/',
            'example/.next/',
        ],
    },
    ...reactConfig,
    {
        files: ['**/*.{cjs,js,jsx,mjs,ts,tsx}'],
        languageOptions: {
            parserOptions: {
                project: ['./tsconfig.eslint.json'],
                projectService: false,
            },
        },
        rules: {
            'no-restricted-syntax': 'off',
            'func-style': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-namespace': 'off',
            '@typescript-eslint/no-use-before-define': 'off',
            'import/no-default-export': 'off',
            '@typescript-eslint/naming-convention': 'off',
        },
    },
    {
        files: ['**/*.stories.{ts,tsx}', 'src/dev/**'],
        rules: {
            'import/no-extraneous-dependencies': 'off',
        },
    },
    {
        files: ['**/*.{cjs,js,jsx,mjs}'],
        rules: {
            '@typescript-eslint/consistent-type-imports': 'off',
            '@typescript-eslint/no-deprecated': 'off',
            '@typescript-eslint/no-import-type-side-effects': 'off',
            '@typescript-eslint/no-require-imports': 'off',
        },
    },
];
