const { importAll } = require('../src/dev/importAll');

module.exports.parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
};

importAll(require.context('../src', true, /\.scss$/));
