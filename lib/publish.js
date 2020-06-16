const execa = require('execa')

module.exports = async (pluginConfig, { nextRelease: { version }, logger }) => {
  logger.log(`Pushing version ${pluginConfig.name}:${version} to docker hub`)

  // Push both new version and stable
  execa('docker', ['tag', `${pluginConfig.name}:stable`, `${pluginConfig.name}:${version}`], { stdio: 'inherit' })
  execa('docker', ['push', `${pluginConfig.name}:${version}`], { stdio: 'inherit' })
  execa('docker', ['push', `${pluginConfig.name}:stable`], { stdio: 'inherit' })
}
