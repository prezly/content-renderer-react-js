module.exports = {
    stories: ['../build/cjs/**/*.stories.@(js|jsx|ts|tsx|cjs)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
    ],
    framework: '@storybook/react',
    core: {
        builder: 'webpack5',
    },
};
