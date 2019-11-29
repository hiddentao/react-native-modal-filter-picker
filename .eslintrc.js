module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  plugins: [
    'react',
    'jsx-a11y',
    'import',
    'react-native',
  ],
  rules: {
    'react/no-did-update-set-state': 0,
    'react/sort-comp': 1,
    'react/jsx-props-no-spreading': 0,
    'react/forbid-prop-types': 1,
    'no-underscore-dangle': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prefer-stateless-function': 0,
    'react/require-default-props': 0,
    'react/prefer-default-export': 0,
    'no-param-reassign': 0,
    'no-unused-expressions': 0,
  },
};
