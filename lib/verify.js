const execa = require('execa')
const SemanticReleaseError = require('@semantic-release/error')

module.exports = async (pluginConfig, { pkg, logger }) => {
  for (const envVar of ['DOCKER_EMAIL', 'DOCKER_USERNAME', 'DOCKER_PASSWORD']) {
    if (!process.env[envVar]) {
      throw new SemanticReleaseError(`Environment variable ${envVar} is not set`)
    }
  }
  try {
    await execa(
      'docker',
      [
        'login',
        '-e=' + process.env.DOCKER_EMAIL,
        '-u=' + process.env.DOCKER_USERNAME,
        '-p=' + process.env.DOCKER_PASSWORD,
      ],
      { stdio: 'inherit' }
    )
  } catch (err) {
    throw new SemanticReleaseError('docker login failed')
  }
}
