const execa = require('execa')
const updatePackageVersion = require('./update-package-version')

module.exports = async (pluginConfig, { pkg, nextRelease: { version }, logger }) => {
  await updatePackageVersion(version, logger)
  logger.log(`Pushing version ${pluginConfig.name}:${version} to docker hub`)

  // Push both new version and latest
  execa('docker', ['tag', `${pluginConfig.name}:latest`, `${pluginConfig.name}:${version}`], { stdio: 'inherit' })
  execa('docker', ['push', `${pluginConfig.name}:${version}`], { stdio: 'inherit' })
  execa('docker', ['push', `${pluginConfig.name}:latest`], { stdio: 'inherit' })
}
