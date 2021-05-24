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
      // Support offline support. Can be confusing in dev mode. See: https://github.com/expo/fyi/blob/master/enabling-web-service-workers.md
      offline: true,
    },
    argv,
  );
  return config;
};
