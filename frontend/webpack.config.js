const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: [
          // Ensure that all packages starting with rn-material-ui-textfield are transpiled.
          'rn-material-ui-textfield',
        ],
      },
    },
    argv,
  );
  return config;
};
