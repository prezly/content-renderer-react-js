module.exports.parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};

function importAll(r) {
    r.keys().forEach(r);
}

importAll(require.context('../src', true, /\.scss$/));
