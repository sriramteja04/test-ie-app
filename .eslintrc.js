module.exports = {
    extends: 'react-app',
    plugins: ['react', 'react-hooks'],
    env: {
        jest: true,
    },
    rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
    },
}
