module.exports = {
  root: true,
  extends: [
    '@samtayl',
    '@samtayl/node',
    'plugin:react/recommended',
  ],
  env: {
    browser: true,
    es2020: true,
  },
  parserOptions: {
    ecmaVersion: '2020',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
