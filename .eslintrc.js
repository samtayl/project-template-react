module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: [
    'node',
    'react',
  ],
  extends: [
    '@samtayl',
    '@samtayl/node',
    'plugin:react/recommended',
  ],
};
